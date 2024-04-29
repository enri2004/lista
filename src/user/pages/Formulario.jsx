import React, { useState, useEffect } from "react";
import { PiUserFill } from "react-icons/pi";
import { FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Formulario.css';  
import axios from "axios";

export default function Formulario() {
  const Navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");


  const haldleVerificar=(e)=>{
    e.preventDefault();
    if(e.target.name=="usuario"){
      setUsuario(e.target.value);
    }
    else if (e.target.name=="contraseña"){
      setContraseña(e.target.value);
    }
  }


  const botonActualizar = async (e) => {
    e.preventDefault();
    try {      // Realizar la solicitud POST con axios.post
      const response = await axios.post("https://api-rest-htj4.onrender.com/api/login", { usuario, contraseña });
      console.log(response.data);
      
      const {roles}=response.data;
      
      if(roles=="Usuario" || roles === "Administrador") {
        Navigate(roles === "Usuario" ? "/Home" : "/Admin_Home");      
      }else{
        console.log ("no se encuentra")
      }
    } catch (error) {
      console.error('Error al enviar los datos', error);
    }
  };
  

  return (
    <div className="Formulario_1" style={{ backgroundImage: `url(C:\\Users\\molin\\Desktop\\RollCall\\roll-calls\\src\\user\\img\\2471314.gif)` }}>
      <form className="Formulario_2" onSubmit={botonActualizar}>
        <h1 className="roll-calls">Bienvenido Roll-calls</h1>
        <div className="inputs">
          <PiUserFill className="icono-1" />
          <input type="text" name="usuario" 
          value={usuario} onChange={haldleVerificar}
      required/>
          <span> ingresa tu nombre</span>
          <i></i>
        </div>
        <div className="inputs">
          <FaLock className="icono-2" />
          <input type="password" name="contraseña" 
          value={contraseña} onChange={haldleVerificar}
           required/>
          <span>contraseña</span>
          <i></i>
        </div>
        <div>
          <input type="submit"  />
        </div>
        <div class="recuperar">
          <p>olvidaste tu contraseña<Link to="/Soporte">Soporte</Link></p>
        </div>
      </form>
    </div>
  );
}
