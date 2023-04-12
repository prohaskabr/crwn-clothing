import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect} from '../../utils/firebase/firebase.util'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
const SignIn = ()=>{

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
 
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    };
   
    return(
    <div>
        <h1>Sign-in Page</h1>
        <h1>Sign-in Page</h1>
        <button onClick={logGoogleUser}> Sign in with Google</button>
        <button onClick={signInWithGoogleRedirect}> Sign in with Google Redirect</button>
        <SignUpForm />
    </div>
    )

}

export default SignIn;