

import { useState } from "react";



const useRequest = ( )=>{

    console.log('hook is running')
    const [isLoading , setIsLoading] = useState(true);
    const [error , setError] = useState();


    // send request , get response , handle the response in the function and set loading and error state
    const sendRequest = async (config , responseHndler)=>{
        try{

            // send request to the server
            const res = await fetch(config.url , {
                method: config.method ? config.method: 'GET',
                headers: config.headers ? config.headers : {},
                body: config.body ? JSON.stringify(config.body) : null
            });

            // get the response 
            const response = await res.json();

            // handell the response
            responseHndler(response)

        } catch (err){
            setError(err.message)
        }

        // finish the loading case
        setIsLoading(false)
    }
    


    return {
        sendRequest,
        isLoading,
        error
    }
    
}

export default useRequest;