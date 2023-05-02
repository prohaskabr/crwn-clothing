import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { ShippingIcon, ShoppingIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const toggle = () => setIsCartOpen(!isCartOpen);

    return (
        <ShoppingIconContainer onClick={toggle} >
            <ShippingIcon className='shopping-icon' />
            <ItemCount>{cartCount}</ItemCount>
        </ShoppingIconContainer>
    );
}

export default CartIcon;