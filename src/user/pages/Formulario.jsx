import React, { useState, useEffect } from "react";
import { PiUserFill } from "react-icons/pi";
import { FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Formulario.css';  
import Swal from 'sweetalert2';
import Axios from "../../servers/Axios";



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
    Swal.fire({
      title: 'Cargando...',
      allowOutsideClick: false
  });
  Swal.showLoading();
    try {
        const response = await Axios.post("/login", { usuario, contraseña });
        const { access, refresh, roles } = response.data; // Extraer los tokens de la respuesta
        Swal.close();
        if (access && refresh) { // Verificar si los tokens están presentes en la respuesta
            localStorage.setItem("access_token", access); // Almacenar el token de acceso en el localStorage
            localStorage.setItem("refresh_token", refresh); // Almacenar el token de actualización en el localStorage
            
            // Configurar el interceptor de Axios para enviar automáticamente el token de acceso en todas las solicitudes
            Axios.interceptors.request.use(config => {
                const accessToken = localStorage.getItem("access_token");
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            });
            
            console.log(access, refresh, roles)
            // Redirigir según el rol del usuario
            if (roles === "Usuario" || roles === "Administrador") {
                Navigate(roles === "Usuario" ? "/Casa" : "/Perfil");      
            } else {
                console.log("No se encuentra");
            }
        } else {
            console.log("No se recibieron los tokens en la respuesta");
        }
    } catch (error) {
        if (error.response.status === 500) {
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error del usuario'
          })
        
      } else if (error.response.status === 400) {
          const { msg } = error.response.data;
          if (msg === "Password incorrecto") {
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Contraseña incorrecta'
              });
          } else if (msg === "Usuario inactivo") {
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Usuario inactivo'
              });
          } else if (msg === "El Usuario es obligatorio" || msg === "El password es obligatorio") {
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: msg
              });
          }
      }
  } }


  return (
    <div className="Formulario_1" //style={{ backgroundImage:`url(${Perfil})` }}
    >
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
        <div className="recuperar">
          <p>olvidaste tu contraseña<Link to="/Soporte">Soporte</Link></p>
        </div>
      </form>
    </div>
  );
}
