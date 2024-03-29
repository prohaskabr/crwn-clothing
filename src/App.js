import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from './utils/firebase/firebase.util';
import { useEffect } from 'react';
import { setCurrentUser } from './store/user/user.action';
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './components/checkout/checkout.component';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {

      if (user) {
        await createUserDocumentFromAuth(user);
      }

      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
