import React, { useState,useRef } from "react";
import th from "../img_Admin/th.jpg"
import '../css_admin/Perfil.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Modal, ModalBody, FormGroup, ModalHeader } from 'reactstrap';
import axios from "axios";

export default function Perfil(){
const imageCambio = useRef(null);
const [imagen,setImagen]=useState("")
const [selectedImage, setSelectedImage] = useState(null);

const archivo =()=>{
    imageCambio.current.click(); 
}
const hadleImagenChage=(e)=>{
const file=e.target.files[0];
console.log(file);
setSelectedImage(file);
setImagen(URL.createObjectURL(file));
}



const hadlsubirChage=async(e)=>{
e.preventDefault();
if (!selectedImage) return;
const formData = new FormData();
formData.append("imagen",selectedImage)

try{
    await axios.post('https://api-rest-htj4.onrender.com/api/saveData',formData);
    console.log("se envio la imagen")
}catch(error){
    console.error("error",error)
}


}



    return(
        
        
        <div onClick={archivo} className="perfil-image-container" >
            <input type="file" ref={imageCambio} onChange={hadleImagenChage} style={{display:"none"}}/>
             {imagen ? <img alt="" src={""} className="perfil-image" onClick={hadlsubirChage}/> : <img alt="th"  src={th}  className="perfil-image" />  }
        </div>
    )
}

