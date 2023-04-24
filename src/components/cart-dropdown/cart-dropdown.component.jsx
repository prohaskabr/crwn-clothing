import { useContext, useState } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    console.log(cartItems);
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.map((i) => (<CartItem key={i.id} cartItem={i} />))
                }
            </div>
            <Button>Checkout</Button>
        </div>)
}

export default CartDropdown;