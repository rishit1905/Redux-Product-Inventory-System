import React from 'react';
import { Link } from 'react-router-dom';
import "./menu.css"

class Menu extends React.Component {
    state = {}
    render() {
        return (
            <div className="flex-container">
                <div id="item1">
                    <h3>PRODUCT INVENTORY SYSTEM</h3>
                </div>
                <div id="item2">
                    <Link to="/">
                        <button className="headerButton">Home</button>
                    </Link>
                </div>
                <div id="item3">
                    <Link to="/addproduct">
                        <button className="headerButton">Add Product</button>
                    </Link>
                </div>
            </div >
        );
    }
}

export default Menu;

