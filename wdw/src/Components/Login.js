import React from 'react';
import {GoogleLogin} from 'react-google-login';

const clientId = '395610592492-f0jmbsmpkpi6616mn5vq31i1u9eib5ne.apps.googleusercontent.com';

function Login() {
    const onSuccess = (res) => {
        console.log('[Login Success] currerntUser: ', res.profileObj);
    };

    const onFailure = (res) => {
        console.log('[Login failed] res: ', res);
    };

    return (
        <div>
            <GoogleLogin
                clientId = {clientId}
                buttonText = "Login"
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy = {'single_host_origin'}
                style = {{marginTop: '100px'}}
                isSignedIn = {true}
            />
        </div>
    )
}

export default Login;