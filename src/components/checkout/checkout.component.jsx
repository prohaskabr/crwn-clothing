import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import CheckoutItem from '../checkout-item/checkout-item.component';
import './checkout.styles.scss';

const Checkout = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    useEffect(() => {
        dispatch(setIsCartOpen(false))
    }, []);

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
