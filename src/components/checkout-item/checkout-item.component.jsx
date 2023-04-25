import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({ item }) => {
    const { name, imageUrl, price, quantity } = item;
    const { addItemToCart, removeItemFromCart, deleteItemFromCart } = useContext(CartContext);
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>

            <span className='quantity'>
                <div className='arrow' onClick={() => removeItemFromCart(item.id)}>&#10094;</div>
                <span className='value'>{quantity}</span>
                < div className='arrow' onClick={() => addItemToCart(item)}>&#10095;</div>
            </span >
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => deleteItemFromCart(item.id)}>&#10005;</div>
        </div >)
}

export default CheckoutItem;