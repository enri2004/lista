import { Button } from "antd";
import React from "react";
import './Clave.css'

export default function Clave(){
    let letras="qwertyuiopasdfghjklñzxcvbnm";
    let  numero="123456789";
    let Clave= numero+ letras;

    const generarClave=(longitud)=>{
        let matricula="";
        for (let x=0;x<longitud;x++){
            let pasword = Math.floor(Math.random()* Clave.length)
            matricula +=Clave.charAt(pasword)
            
    }





    return(
        <div>
            <form onClick={generarClave} >
                <input  type="Text" />
                <Button></Button>
            </form>
        </div>
    )


    }}


