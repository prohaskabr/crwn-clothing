import { signInWithGooglePopup, createUserFromAuth } from "../../utils/firebase.utils";

const SignIn = ()=>{
    const logGoogleUser = async() =>{
        const response = await signInWithGooglePopup();
        const user = await createUserFromAuth(response);
    }

    return(
        <div>
        <h1>Sign in page</h1>
        <button onClick={logGoogleUser}>
            Sign in with Google
        </button>
        </div>
        
    )
}

export default SignIn;