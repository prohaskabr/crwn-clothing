import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.context';
import CheckoutItem from '../checkout-item/checkout-item.component';
import './checkout.styles.scss';

const Checkout = () => {
    const { cartItems, setIsCartOpen, cartTotal } = useContext(CartContext);
    setIsCartOpen(false);
    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map((item) => {
                    return (<CheckoutItem key={item.id} item={item} />)
                })}
            <span className='total'>Total: ${cartTotal}</span>
        </div>)
}

export default Checkout;
