import React from 'react';
import NavBar from './Navbar';

const WebPage = ({children}) => {
        return(
            <div>
                <NavBar />
                {children}
            </div>
        );
}

export default WebPage;