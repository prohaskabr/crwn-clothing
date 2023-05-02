import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { UserContext } from '../../contexts/user.context';
import { SignOutUser } from '../../utils/firebase/firebase.util';
import { CartContext } from '../../contexts/cart.context';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';


const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);

    return (<Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrwnLogo className='logo' />
            </LogoContainer>
            <NavLinks>
                <NavLink to="/shop" >
                    Shop
                </NavLink>

                {currentUser ? (
                    <NavLink as='span' className='nav-link' onClick={SignOutUser}>
                        SIGN OUT
                    </NavLink>
                ) : (
                    <NavLink to="/auth" >
                        Sign-in
                    </NavLink>
                )}
                <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
    </Fragment>)
}

export default Navigation;