 import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Products from './components/Products';
import Filter from './components/Filter';
import Basket from './components/Basket';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { size: '', sort: '', cartItems: [], products: [], filteredProducts: [] };
  this.handleAddToCart=this.handleAddToCart.bind(this);
  this.handleRemoveFromCart=this.handleRemoveFromCart.bind(this);
  }

  componentWillMount(){
fetch('http://localhost:8000/products').then(res=>res.json()).then(
  data=> this.setState({
   products: data,
   filteredProducts: data
  })
)

  }

  handleAddToCart=(e,item)=>{
this.setState(state=>{
  const cartItems =state.cartItems;
  let productAlreadyInCart=false; 
  cartItems.forEach(cp=>{
    if(cp.id===item.id){
      productAlreadyInCart=true;
      cp.count++;
    }
  })
    if(!productAlreadyInCart){
      cartItems.push({...item,count:1})
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    return {cartItems:cartItems};

})
  }

  handleRemoveFromCart=(e,item)=>{
    this.setState(state=>{
      const cartItems=state.cartItems.filter(cartitem=>{
        return cartitem.id!==item.id
      })
      localStorage.setItem('cartItem', cartItems);
      return {cartItems};
    })
  }

  handleChangeSize=(e)=>{
  this.setState({size:e.target.value})
  this.listProducts();
  }

  handleChangeSort = (e) => {
    this.setState({ sort: e.target.value });
    this.listProducts();
  }

  listProducts(){
    this.setState(state=>{
      if(state.sort!==""){
        state.products.sort((a,b)=>
      (state.sort==='lowest' ? ((a.price>b.price)? 1:-1):((a.price<b.price) ? 1:-1))
        )
      }
      else {
        state.products.sort((a,b) => (a.id>b.id) ? 1:-1)
      }
      if(state.size!==""){
        return {filteredProducts: state.products.filter(a=>a.availableSizes.includes(state.size.toUpperCase()))}
      }
      return { filteredProducts: state.products };
    })
  }

  render() {
  return (
    <div className="container">
    <h5>Ecommerce shopping cart</h5>
    <hr/>
    <div className="row">
      <div className="col-md-8">
        <Filter size={this.state.size} sort={this.state.sort} handleChangeSize={this.handleChangeSize} 
        handleChangeSort={this.handleChangeSort} count={this.state.filteredProducts.length}></Filter>
        <Products products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart} />
      </div>
      <div className="col-md-4">
        <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart}>
        </Basket>
      </div>
    </div>
    </div>
  );
}

}

export default App;
