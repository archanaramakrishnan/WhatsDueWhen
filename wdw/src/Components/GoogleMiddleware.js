import axios from 'axios';
import React, { useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const GoogleMiddleware = () => {
    const history = useHistory();
    const isProfessor = localStorage.getItem('isProfessor')
    
    useEffect(async () => {
        const body = {isProfessor: isProfessor}
        await axios.post('http://localhost:5000/users/update-isprofessor', body, {withCredentials: true})
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            });
        
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