import React from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

const clientId = '395610592492-f0jmbsmpkpi6616mn5vq31i1u9eib5ne.apps.googleusercontent.com';

function Logout()
{
    const onSuccess = () => {
        alert('Logout made successfully');
    }

    return (
        <div>
            <GoogleLogout
                clientId = {clientId}
                buttonText = "Logout"
                onLogoutSuccess = {onSuccess}
            ></GoogleLogout>
        </div>
    )
}

export default Logout;