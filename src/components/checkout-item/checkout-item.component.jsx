import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart, deleteItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import './checkout-item.styles.scss';

const CheckoutItem = ({ item }) => {
    const dispatch = useDispatch();
    const { name, imageUrl, price, quantity } = item;
    const cartItems = useSelector(selectCartItems);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>

            <span className='quantity'>
                <div className='arrow' onClick={() => dispatch(removeItemFromCart(cartItems, item.id))}>&#10094;</div>
                <span className='value'>{quantity}</span>
                < div className='arrow' onClick={() => dispatch(addItemToCart(cartItems, item))}>&#10095;</div>
            </span >
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => dispatch(deleteItemFromCart(cartItems, item.id))}>&#10005;</div>
        </div >)
}

export default CheckoutItem;