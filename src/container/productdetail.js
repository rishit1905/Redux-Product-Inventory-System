import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import deleteProductBroadcast from "../action/deleteproductbroadcast";
import axios from "axios";
import "./productdetail.css";
import { withRouter } from 'react-router-dom';

class ProductDetail extends React.Component {

    allProducts = () => {
        axios.get("http://localhost:3000/products")
            .then(response => {
                console.log(response)
                this.props.delete(response.data)
            }, error => {
                console.log(error)
            })
    }

    deleteProduct = () => {
        axios.delete("http://localhost:3000/products/" + this.props.product.id)
            .then(response => {
                console.log(response);
                console.log("Product with id: " + this.props.product.id + " and name: " + this.props.product.name + " deleted")
                this.allProducts()
            }, error => { console.log(error) })
    }

    editProduct = (e) => {
        e.preventDefault()
        this.props.history.push("/editproduct")
    }

    render() {
        if (this.props.product === null) {
            return (
                <div>
                    <h2>No products clicked for details..</h2>
                </div>
            )
        }
        else {
            return (
                <div id="flex-containers">
                    <h3>PRODUCT DETAIL</h3>
                    <img src={this.props.product.imageURL} alt="" />
                    <b>Name:</b> <p>{this.props.product.name}</p>
                    <b>Category:</b><p>{this.props.product.category}</p>
                    <b>Price:</b> <p>{this.props.product.price}</p>
                    <b>Quantity:</b> <p>{this.props.product.quantity}</p>
                    <b>Stock Available:</b> <p>{this.props.product.stock}</p>
                    <button onClick={this.editProduct}>Edit</button>
                    <button onClick={this.deleteProduct}>Delete</button>
                </div>
            );
        }

    }
}

function convertStoreToProps(store) {
    console.log("Product detail received from store")
    console.log(store)
    return {
        product: store.productClicked
    }
}

function eventDispatch(dispatch) {
    return bindActionCreators({
        delete: deleteProductBroadcast
    }, dispatch)
}

export default withRouter(connect(convertStoreToProps, eventDispatch)(ProductDetail));