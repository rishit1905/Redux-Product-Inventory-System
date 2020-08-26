import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import addProductBroadcast from '../action/addproductbroadcast';
import axios from "axios";
import "./addproduct.css"

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
}
class AddProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageURL: "",
            name: "",
            category: "",
            price: 0,
            quantity: 0,
            stock: "",
            errors: {
                imageError: "",
                nameError: "",
                categoryError: "",
                priceError: "",
                quantityError: "",
                stockError: ""
            },
            buttonStatus: true
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (validateForm(this.state.errors)) {
            console.log("Valid")
            this.setState({ buttonStatus: false })
        } else {
            console.log("Not Valid")
            this.setState({ buttonStatus: true })
        }
    }

    checkValidation = () => {
        let errors = this.state.errors;
        if (this.state.imageURL === "") {
            this.setState({ buttonStatus: true })
            errors.imageError = "Kindly upload the image!"
            return false
        }
        if (this.state.name === "") {
            this.setState({ buttonStatus: true })
            errors.nameError = "Product name required!"
            return false
        }
        if (this.state.category === "") {
            this.setState({ buttonStatus: true })
            errors.categoryError = "Product category required!"
            return false
        }
        if (this.state.price === 0) {
            this.setState({ buttonStatus: true })
            errors.priceError = "Product price required!"
            return false
        }
        if (this.state.quantity === 0) {
            this.setState({ buttonStatus: true })
            errors.quantityError = "Product quantity required!"
            return false
        }
        if (this.state.stock === "") {
            this.setState({ buttonStatus: true })
            errors.stockError = "Product stock required!"
            return false
        }

        return true;
    }

    getUrl = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.imageError = "" || (!event.target.value.trim().match(/[(http(s)?)://(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)) ? "Enter authentic URL !" : ""
        this.setState({ imageURL: event.target.value })

    }

    getName = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.nameError = "" || (!event.target.value.trim().match(/^([a-zA-Z0-9 _-]+)$/)) ? "Only non-empty alphanumeric values allowed !!" : ""
        this.setState({
            name: event.target.value
        })

    }
    getCategory = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.categoryError = event.target.value === "" ? "Select a category !!" : ""
        this.setState({ category: event.target.value })

    }
    getPrice = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.priceError = (!event.target.value.match(/^(?:[1-9]\d*)(?:\.(?!.*000)\d+)?$/)) ? "Invalid price !!" : ""
        this.setState({
            price: event.target.value
        })

    }
    getQuantity = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors;
        errors.quantityError = (!event.target.value.match(/^[1-9]+[0-9]*$/)) ? "Quantity is invalid!!" : ""
        this.setState({ quantity: event.target.value })
    }
    getStock = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.stockError = event.target.value === "" ? "Select stock availability !!" : ""
        this.setState({
            stock: event.target.value
        })

    }

    allProducts() {
        axios.get("http://localhost:3000/products")
            .then(response => {
                console.log(response)
                this.props.newProduct(response.data)
                this.props.history.push("/")
            }, error => {
                console.log(error)
            })
    }

    addProduct = (event) => {
        if (this.checkValidation()) {
            event.preventDefault()
            let product = {
                imageURL: this.state.imageURL,
                name: this.state.name,
                category: this.state.category,
                price: this.state.price,
                quantity: this.state.quantity,
                stock: this.state.stock
            }
            axios.post("http://localhost:3000/products", product)
                .then(response => {
                    console.log(response)
                    console.log("New Product Added !")
                    this.allProducts()
                }, error => {
                    console.log(error)
                })

        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <form onChange={this.handleSubmit} noValidate>
                    <fieldset>
                        <legend>Add Product</legend>
                        <label htmlFor="Image">Image:</label>
                        <input type="url" id="imageURL" onChange={this.getUrl} placeholder="Image URL*" noValidate />
                        <br></br>
                        {errors.imageError.length > 0 && <span className="error">{errors.imageError}</span>}
                        <br />
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" onChange={this.getName}
                            placeholder="Product Name *" noValidate />
                        <br></br>
                        {errors.nameError.length > 0 && (
                            <span className="error">{errors.nameError}</span>
                        )}
                        <br />
                        <label>Category:</label>
                        <select defaultValue={this.state.selectValue} id="category"
                            onChange={this.getCategory}
                        >
                            <option value="">--select--</option>
                            <option value="Mobiles">Mobiles</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Cameras">Cameras</option>
                        </select>
                        <br></br>
                        {errors.categoryError.length > 0 && (
                            <span className="error">{errors.categoryError}</span>
                        )}
                        <br />
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number" name="price" id="price" onChange={this.getPrice} required
                            placeholder="Product Price *"
                            noValidate />
                        <br></br>
                        {errors.priceError.length > 0 && (
                            <span className="error">{errors.priceError}</span>
                        )}

                        <br />
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number" name="quantity" id="quantity" onChange={this.getQuantity} required
                            placeholder="Product Quantity *"
                            noValidate />
                        <br></br>
                        {errors.quantityError.length > 0 && (
                            <span className="error">{errors.quantityError}</span>
                        )}
                        <br />
                        <label htmlFor="stock">Stock Available:</label>
                        <select defaultValue={this.state.selectValue} id="stock"
                            onChange={this.getStock}
                        >
                            <option value="">--select--</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <br></br>
                        {errors.stockError.length > 0 && (
                            <span className="error">{errors.stockError}</span>
                        )}
                        <br />
                        <button disabled={this.state.buttonStatus} onClick={this.addProduct}>Add</button>
                        <br />
                    </fieldset>
                </form>
            </div>
        );
    }
}

function convertPropsToEvent(dispatch) {
    return bindActionCreators({
        newProduct: addProductBroadcast
    }, dispatch)
}
export default connect(null, convertPropsToEvent)(AddProduct);