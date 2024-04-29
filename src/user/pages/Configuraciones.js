import React, { useRef, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import '../css/Configuracion.css'
import confi from '../img/confi.jpg'

function Configuracion(){
//    const Navigate= useNavigate ("")
    const imageCambio =useRef(null);
    const [imagen,setImagen]=useState(" ");
    const  [selectImagen, setSelectImage]=useState(null)


const Cambio =()=>{
    imageCambio.current.click();
    
}

const handleCambio=(e)=>{
    const file=e.target.files[0];
    console.log(file);
    setSelectImage(file);
    setImagen(URL.createObjectURL(file))
}
/*const enviar=()=>{
    Navigate("/Home");
}*/

    return(

        <>
        <div className='Configuracion' onClick={Cambio}>
            <input type='file' ref={imageCambio} onChange={handleCambio} style={{display:"none"}} />
            {imagen ? <img src={imagen} alt='' className='perfil-imagen'/>:<img src={confi} alt='confi' className='perfil-imagen'/>}
        </div>
        <div className='Cuadro1'>
        <div>
        <div style={{position:"absolute",top:"50px",left:"162px",transform:"rotate(45deg)"}}>
            <label >idioma</label>
            <select >
                <option>Español</option>
                <option>Engles</option>
                <option>frances</option>
                <option>portuges</option>
                <option>chino</option>
                <option>japones</option>
            </select>
        </div>

            </div>
        </div >
        <div className='Cuadro2' >
            <div style={{ position:"absolute",left:"200px", top:"40px",transform:"rotate(45deg)"}}>       
                 <label><Link to="/soporte">soporte</Link></label>
            </div>

        </div>
        
        <div className="Cuadro3">
        <div>
            <label>privasidad</label>
            <label>Información del titular del sitio</label>
            <label>Tipo de datos recopilados</label>
            <label>Propósito de la recopilación de datos</label>
            <label>Consentimiento del usuario</label>
            <label>Seguridad de los datos</label>
            <label>Derechos del usuario </label>
            <label>Cookies y tecnologías de seguimiento</label>
           { /*<button onClick={enviar}>enviar</button>*/}
        </div>
        </div>





        
   
   </> )
}
export default Configuracion;