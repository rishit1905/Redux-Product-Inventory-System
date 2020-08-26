import React from 'react';
import ProductList from "./productlist";
import ProductDetail from './productdetail';

class AllContainers extends React.Component {
    state = {}
    render() {
        return (
            <div>
                <ProductList />
                <hr />
                <ProductDetail />
            </div>
        );
    }
}

export default AllContainers;