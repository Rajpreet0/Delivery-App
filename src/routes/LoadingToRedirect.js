import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const LoadingToRedirect = () => {

   const navigate = useNavigate();
   const  [count, setCount] = useState(3);

    useEffect(() =>  {
   
        const interval = setInterval(() =>  {
            setCount((currentCount) => --currentCount);
        }, 1000);

        count === 0 && navigate('/');

        return () => clearInterval(interval);
    }, [count]); 

    return(
       <>
       </>
    )
}

export default LoadingToRedirect;