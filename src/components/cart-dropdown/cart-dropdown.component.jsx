import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdoenContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate('/checkout');
    }

    return (
        <CartDropdoenContainer>
            <CartItems>
                {
                    cartItems.length ?
                        (cartItems.map((i) => (<CartItem key={i.id} cartItem={i} />)))
                        : (<EmptyMessage>No Items</EmptyMessage>)

                }
            </CartItems>
            <Button onClick={goToCheckout}>Checkout</Button>
        </CartDropdoenContainer>)
}

export default CartDropdown;