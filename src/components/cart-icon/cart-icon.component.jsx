import { useDispatch, useSelector } from 'react-redux';
import { ShippingIcon, ShoppingIconContainer, ItemCount } from './cart-icon.styles';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
    const dispatch = useDispatch()
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);
    const toggle = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <ShoppingIconContainer onClick={toggle} >
            <ShippingIcon className='shopping-icon' />
            <ItemCount>{cartCount}</ItemCount>
        </ShoppingIconContainer>
    );
}

export default CartIcon;