import React, { useState, useRef, useEffect } from "react";
import th from "../img/confi.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "../../servers/Axios";
import perfil from '../img/perfil.jpg';
import '../css/Perfil_usuario.css';

function Perfil() {
  const imageCambio = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deslis, setDelist] = useState(false);
  const [deslis2, setDelist2] = useState(false);
  const [datos, setDatos] = useState({
    apellido: "",
    institucion: "",
    materia: "",
    semestre: "",
    sexo: "",
    email: "",
    telefono: "",
    fecha_nacimiento: "",
    nombre: "",
    edad: "",
    lugar: "",
    usuario: "",
    contraseña: "",
    roles: "",
    contraseña1: "",
    avatar: "",
    active: "",
  });

  useEffect(() => {
    hadleinfo();   }, []); 
  const toggleDeslis = () => {
    setDelist(!deslis);
  };

  const toggleDeslis2 = () => {
    setDelist2(!deslis2);
    
  };

  const archivo = () => {
    imageCambio.current.click();
  };

  const hadleImagenChage = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const hadleinfo = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        console.error(
          "No se encontró ningún token de acceso en el almacenamiento local"
        );
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await Axios.get("/obtener", config);
      const { data } = response;
      localStorage.setItem("info", JSON.stringify(data));
      console.log("Datos del usuario guardados localmente:", data);
      setDatos(data);
    } catch (error) {
      console.error("erro");
    }
  };

/*  
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('avatar', selectedImage);

      const response = await Axios.post(`editar${_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  };
*/

  return (
    <div>
      
      <div onClick={archivo} onChange={hadleinfo} className="perfil-image-container">
        <input
          type="file"
          ref={imageCambio}
          onChange={hadleImagenChage}
          style={{ display: "none" }}
        />
        {selectedImage ? (
          <img alt="avatar" src={URL.createObjectURL(selectedImage)} className="perfil-image" />
        ) : (
          <img alt="th" src={th} className="perfil-image" />
        )}
      </div>
      <div
        style={{
          position: "absolute",
          top: "200px",
          left: "400px",
        }}
      >
        <div style={{
          position:"absolute",
          width:"400px",
          height:"80px",
          left:"120px",
          top:"80px",
          background: "linear-gradient(90deg, #8c52ff, #ffd1b4)",
          borderRadius:"50% 50%"
          
        }}>
          <input type="text" value={`${datos.nombre} ${datos.apellido}`} className="nombre" />

        </div>
      </div>
      <div
        onClick={toggleDeslis}
        style={{
          position: "absolute",
          //width: "calc(40% - 20px)", // Ajustamos el ancho al 40% del contenedor principal, menos 20px de margen
          width:"400px",
          height: "50px",
          top:"50%",
          left:"15%",
          background: "linear-gradient(90deg, #8c52ff, #ffd1b4)",
          clipPath: "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 10% 50%, 0% 0%)",
    
        }}
      
      >
        <div style={{textAlign:"center", marginTop:"10px",marginLeft:"-20px"}}>
        <h4>info-personal</h4>
        </div>
        </div>
        <div>
          {deslis && (
            <div
              className="Personal"
              style={{
                position: "absolute",
                //width: "calc(40% - 20px)", // Ajustamos el ancho al 40% del contenedor principal, menos 20px de margen
                width:"310px",
                height: "350px",
                top:"55%",
                left:"18%",
                background: "linear-gradient(90deg, #8c52ff, #ffd1b4)",
                clipPath: "polygon(100% 0%, 84% 50%, 100% 100%, 0 100%, 0% 50%, 0 0)",
                transform:"rotate(90deg)"
            
                                    }}
              
            >
              <div style={{
                position: "absolute",
                //width: "calc(40% - 20px)", // Ajustamos el ancho al 40% del contenedor principal, menos 20px de margen
                width:"300px",
                height: "290px",            
                transform:"rotate(-90deg)",
                left:"10px",
                top:"0"
              }}>
              <div>
                <label className="Edad">Edad</label>
              <input type="text" className="Input_Edad" value={datos.edad} />
              </div>
              <div>
                <label className="Sexo">Sexo</label>
              <input type="text" className="Input_Sexo" value={datos.sexo} />
              </div>
              <div>
                <label className="Telefono">Telefono</label>
              <input type="text" className="Input_Tele" value={datos.telefono} />
              </div>
              <div>
                <label className="Emael">email</label>
              <input type="text"className="Input_Emael" value={datos.email} />
              </div>
              <div>
                <label className="Lugar">Lugar</label>
              <input type="text" className="lugar" />
              </div>
              <div>
                <label className="Fecha">Fecha de Nacimiento</label>
              <input type="text"className="Input_Fecha" value={datos.fecha_nacimiento} />
              </div>
            </div>
            </div>
          )}
          
        </div>
      <div
        onClick={() => {
          toggleDeslis2();
        }}
        style={{
            position: "absolute",
            //width: "calc(40% - 20px)", // Ajustamos el ancho al 40% del contenedor principal, menos 20px de margen
            width:"400px",
            height: "50px",
            top:"50%",
            left:"60%",
            background: "linear-gradient(90deg, #8c52ff, #ffd1b4)",
            clipPath: "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 10% 50%, 0% 0%)",
            //transform:"rotate(90deg)
        
        }}
        id="elemento"
        className="elemento"
      >
        <div style={{textAlign:"center", marginTop:"10px",marginLeft:"-20px"}}>
        <h4>info-academico</h4>
        </div>
        </div>
          {deslis2 && (
            <div
            style={{
              position: "absolute",
              width:"310px",
              height: "350px",
              top:"55%",
              left:"63%",
              background: "linear-gradient(90deg, #8c52ff, #ffd1b4)",
              clipPath: "polygon(100% 0%, 84% 50%, 100% 100%, 0 100%, 0% 50%, 0 0)",
              transform:"rotate(90deg)"
            }}
          >
            <div style={{
                position: "absolute",
                //width: "calc(40% - 20px)", // Ajustamos el ancho al 40% del contenedor principal, menos 20px de margen
                width:"300px",
                height: "290px",            
                transform:"rotate(-90deg)",
                left:"10px",
                top:"0"
              }}>
            <div>
              <label className="Institucion">Institucion</label>
              <input type="text" className="input_Institucion" value={datos.institucion}/>
              </div>
              <div>
                <label className="Materia">Materia</label>
              <input type="text" className="input_Materia" value={datos.materia} />
              </div>
              <div>
                <label className="Semestre">Semestre</label>
              <input type="text" className="input_Semestre" value={datos.semestre} />
              </div>
              <div>
                <label className="Estado">estado</label>
              <input type="text" className="Active"value={datos.active} />
              </div>
         
            </div>
              </div>
          )}
        {//<button onClick={handleUpload}>Guardar cambios</button>
        }
        </div>
 );
}

export default Perfil;
