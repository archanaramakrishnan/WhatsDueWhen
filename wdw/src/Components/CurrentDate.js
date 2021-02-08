//Ref: https://medium.com/create-a-clocking-in-system-on-react/create-a-react-app-displaying-the-current-date-and-time-using-hooks-21d946971556
import  React, { useState , useEffect } from 'react'
import './Home.css'

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export const CurrentDate = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
            // <p className='date'> {date.toLocaleDateString(undefined, options)}</p>
            date.toLocaleDateString(undefined, options)
    )
}

export default CurrentDate