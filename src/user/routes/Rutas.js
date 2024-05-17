import React, {useState,useEffect}from "react";
import Formulario from '../pages/Formulario.jsx'
import {Routes,Route} from 'react-router-dom'
import  Layout  from "../Layout/Menu.js"
import Soporte from '../pages/Soporte.js'
 import Admin_Home from '../../admin/Admin_Home.js'
import Admin_menu from "../../admin/Admin_pages/Admin_menu.js";
import Matricula from "../../admin/Admin_pages/Matricula.jsx";
import Datos_alumnos from "../pages/Datos_alumnos.js";
import Clave from "../../admin/Admin_componest/Claves.js";
import Configuraciones from "../pages/Configuraciones.js";
import Admin_usuario from "../../admin/Admin_pages/Admin_usuarios.js"
import Login_fondo from "../img/Login_fondo.js"
import FON from '../img/Fon.gif'
import '../css/Rutas.css'
import Perfil from '../../admin/Admin_pages/Perfil_admin.js'
import App from '../pages/Tabla.js'
import Capa from "../pages/Capa.js";
import CodigoQr from "../../admin/Admin_pages/generarQr.js";
import Perfil_usuario from "../pages/Perfil.js"
import Datos from "../pages/Datos.js"

export default function Rutas() {
    const[refresch,setRefresch]=useState(true);
    useEffect(()=>{
        const tiempo=setTimeout(()=>{
          setRefresch(false);

        },30); //tiempo de carga

        return ()=>clearTimeout(tiempo);
    },[])

    
    
    return(
        <div>
            {refresch ?(
              <div>
                <img className="carga"
                src={FON}
                alt="FON"
                
                
                />
            </div>
            ):(
                <div>
      <div className="App">
      <Routes>
    
      <Route exact path= "/" element={<><Formulario/><Login_fondo/></>} />
      <Route exact path= "/Soporte" element={<Soporte/>} />
      <Route exact path="/Clave" element={<> <Layout/> <Clave/></>}/>
      <Route exact path="/Tabla" element={<><App/><Layout/></>}/>
      <Route exact path="/Configuarcaion" element={<><Configuraciones/><Layout/></>}/>
      <Route exact path="/Casa"  element={<><Layout/><Capa/></>}/>
    <Route exact path="/Perfil/usuario"  element={<><Layout/><Perfil_usuario/></>}/>
    <Route exact path="/asistencia" element={<><Layout/><Datos/></>}/>
      {/* rutas de los admin*/}
      <Route exact path="/Datos_alumnos" element={<> <Layout/> <Datos_alumnos/></>}/>
      <Route exact path="/Admin Usuario" element={<><Admin_menu/><Admin_usuario/></>}/>
      <Route exact path="/Admin_Home" element={<> <Admin_menu/> <Admin_Home/></>}/>
      <Route exact path="/Matricula" element={<> <Admin_menu/> <Matricula/></>}/>
      <Route exact path="/Perfil" element={<><Admin_menu/><Perfil/></>}/>
      <Route exact path="/CodigoQr" element={<><CodigoQr/></>}   />
      </Routes>
    </div>
                </div>   
    )}
        </div>

)
  
}
