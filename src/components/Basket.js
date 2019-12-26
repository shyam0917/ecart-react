import React, { Component } from 'react';
import util from '../util';


export default class Basket extends Component {
    render() {
        const { cartItems } = this.props;

        return (         
    <div>
 <div className="alert alert-primary">
     {(cartItems.length===0)? "Cart is Empty" : <div>You have {cartItems.length} items in the basket. <hr /></div>}
 {cartItems.length>0 && 
<div>
    <ul style={{marginLeft:-15}}>
{cartItems.map(item=>(
    <li key={item.id}>
     <b>{item.title}</b>
     <button style={{float:"right",fontSize:"13px",padding:"2px"}} className="btn btn-danger btn-xs" onClick={e=>this.props.handleRemoveFromCart(e,item)}>x</button>
     <br/>
     {item.count} x {util.formatCurrency(item.price)}
    </li>
))}
    </ul>
</div>}
 </div>
    </div>
        )
    }
}
