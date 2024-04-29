import React, {useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';

export default function carga(){
    
    const[refresch,setRefresch]=useState(true);
    const Navigate=useNavigate()
    useEffect(()=>{
        const tiempo=setTimeout(()=>{
          setRefresch(false);

        },60); //tiempo de carga

        return ()=>clearTimeout(tiempo);
    },[])

    
    
    return(
        <div>
            {refresch ?(
                
            <img
            
            
            />
            ):(
                <div>
                    Navigate('/');
                </div>   
    )}
        </div>
    )
}