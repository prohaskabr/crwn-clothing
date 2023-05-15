import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selecto';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { SignOutUser } from '../../utils/firebase/firebase.util';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

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