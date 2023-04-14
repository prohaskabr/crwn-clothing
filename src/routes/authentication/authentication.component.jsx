import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect} from '../../utils/firebase/firebase.util'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss';

const Authentication = ()=>{

    const getAuthResponse = async ()=>{
        var response = await getRedirectResult(auth);
        if(response){
            const {user} = response;
            createUserDocumentFromAuth(user);
        } 
    };

    useEffect(()=> {
        getAuthResponse();
     }, []);
 
    
   
    return(
    <div className='authentication-container'>
        <SignInForm />
        <SignUpForm />
    </div>
    )

}

export default Authentication;