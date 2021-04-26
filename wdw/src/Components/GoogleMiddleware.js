import React, { useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const GoogleMiddleware = () => {
    const history = useHistory();
    const isProfessor = localStorage.getItem('isProfessor')
    
    useEffect(async () => {
        redirectUser();
    }, [])

    const redirectUser = () => {
        if (isProfessor === "true") {
            history.push('/calendarpageprof')
        } else if (isProfessor === "false") {
            history.push('/calendarpagestudent')
        }
    }
    
    return (null);
};

export default GoogleMiddleware;