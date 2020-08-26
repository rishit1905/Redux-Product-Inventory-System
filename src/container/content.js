import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AllContainers from './allcontainers';
import AddProduct from './addproduct';
import EditProduct from './editproduct';

class Content extends React.Component {
    state = {  }
    render() { 
        return ( 
            <Switch>
                <Route path="/" exact component={AllContainers}></Route>
                <Route path="/addproduct" exact component={AddProduct}></Route>
                <Route path="/editproduct" exact component={EditProduct}></Route>
            </Switch>
         );
    }
}
 
export default Content;