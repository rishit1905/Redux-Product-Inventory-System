import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import productClickedBroadcast from "../action/productclickedbroadcast";
import axios from "axios";
import "./productlist.css";
import displayProductBroadcast from '../action/displayproductbroadcast';

class ProductList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchValue: "",
            filteredProducts: []
        }
    }

    UNSAFE_componentWillMount() {
        console.log("Mounting all products");
        this.allProducts()
    }

    allProducts() {
        axios.get("http://localhost:3000/products")
            .then(response => {
                console.log(response)
                this.props.sendAllProduct(response.data)
            }, error => {
                console.log(error)
            })
    }

    searchProduct = (event) => {
        let searchV = event.target.value
        if (searchV === "") {
            this.allProducts()
        }
        this.setState({ searchValue: searchV })
        console.log(searchV)
        let searchF = []
        searchF = this.props.products.filter(f => {
            return f.name.toLowerCase().startsWith(searchV.trim().toLowerCase())
        })
        this.setState({ filteredProducts: searchF })
        console.log(searchF)
    }

    getAllProducts = () => {
        if (this.state.searchValue !== "") {
            if (this.state.filteredProducts.length === 0) {
                return <li onClick={() => { this.props.clickedProduct(null) }}>No such product exists !!</li>
            }
            else {
                console.log("Received props from store")
                return this.state.filteredProducts.map(p => {
                    return (
                        <li key={p.id} onClick={() => { this.props.clickedProduct(p) }}>
                            <img src={p.imageURL} alt="" /><br></br>
                            <p>{p.name}</p><br></br>
                        </li>
                    )
                })
            }
        }
        else {
            console.log("Received props from store")
            return this.props.products.map(p => {
                return (
                    <li key={p.id} onClick={() => { this.props.clickedProduct(p) }}>
                        <img src={p.imageURL} alt="" /><br></br>
                        <p>{p.name}</p><br></br>
                    </li>
                )
            })
        }
    }

    render() {
        if (this.props.products.length === 0) {
            return (
                <div><h2>All products will be displayed here!!</h2></div>
            );
        }
        return (
            <div>
                <div id="flex-container2">
                    <div id="item">
                        <input type="search" placeholder="Search" value={this.state.searchValue} onChange={this.searchProduct} />
                    </div>
                </div>
                <ul>
                    {this.getAllProducts()}
                </ul>

            </div >
        );
    }
}

function convertStoreToProps(store) {
    console.log("Received complete store")
    console.log(store)
    return {
        products: store.allProductReducer
    }
}

function convertEventToProps(dispatch) {
    return bindActionCreators({
        clickedProduct: productClickedBroadcast,
        sendAllProduct: displayProductBroadcast
    }, dispatch)
}

export default connect(convertStoreToProps, convertEventToProps)(ProductList);