import React, { useState } from "react";
import '../css/Soporte.css'
import { FaLifeRing, FaKey } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalBody, FormGroup, ModalHeader } from 'reactstrap';
import Gmail from '../img/gmail.png'
import Axios from "../../servers/Axios"

export default function Soporte() {
    const [mostrarFormularioSoporte, setMostrarFormularioSoporte] = useState(false);
    const [mostrarFormularioRecuperar, setMostrarFormularioRecuperar] = useState(false);
    const [modalmensaje, setModalmensaje]= useState(false);
    const [formdatos,setFordatos]= useState({
        usuario:'',
        apellido:'',
        nombre:'',
        institucion:'',
        telefono:'',
        lugar:'',
    });

    const toggleFormularioSoporte = () => {
        setMostrarFormularioSoporte(!mostrarFormularioSoporte);
        setMostrarFormularioRecuperar(false); // Oculta el otro formulario
    };

    const toggleFormularioRecuperar = () => {
        setMostrarFormularioRecuperar(!mostrarFormularioRecuperar);
        setMostrarFormularioSoporte(false); // Oculta el otro formulario
    };

    const toggleModal=()=>{
        setModalmensaje(!modalmensaje);
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFordatos(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const enviarDatos = async (e) => {
      e.preventDefault();
      console.log(formdatos)
        try {
            //await axios.post("https://api-rest-htj4.onrender.com/api/correo",formdatos);
            await Axios.post("/correo",formdatos);
            
            console.log("Datos enviados correctamente", );
            toggleModal();
        } catch (error) {
            console.error("Error al enviar los datos", error);
        }
    };

    return (
        <div className="contenedor">
            <div className="barra1" onClick={toggleFormularioSoporte}>
                <FaLifeRing /> Soporte 
            </div>
            {mostrarFormularioSoporte && (
                <form className="form">
                    <h2>Soporte</h2>
                    <p style={{position:"absolute", top:"80px",textAlign:"center", padding:"50px 50px 50px 50px"}}>
                        ¡Bienvenido a nuestro servicio de soporte! Estamos disponibles las 24 horas para ayudarte. Si has experimentado pérdida o robo de datos, te recomendamos que contactes con nosotros de inmediato al número 9341053850. Nuestros técnicos están preparados para proporcionarte una solución rápida y segura.
                        Si tienes algún problema con la página, como lentitud de carga o dificultades para acceder con tu contraseña o usuario, por favor envía un mensaje detallando el problema a [correo electrónico]. Nos comprometemos a resolverlo lo antes posible.
                        Además, valoramos tus consejos e ideas para mejorar nuestro servicio. Si tienes alguna sugerencia o comentario, no dudes en compartirlo con nosotros. Estamos atentos a todas tus ideas para seguir mejorando. ¡Tu opinión cuenta!</p>
                    {
                     <div className="form-floating" style={{position:"absolute", top:"70%", left:"30%"}}>
                      <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height:"200%", width:"200%"}}></textarea>
                        <label for="floatingTextarea2" >tu comentario es importante</label>
                      </div>
                      
                    }
                </form>
            )}

                <div className="barra2" onClick={toggleFormularioRecuperar}>
                <FaKey className="bordered border-dark" /> Recuperar  
                </div>
                {mostrarFormularioRecuperar && (
              
                <form className="form">
                    <h2>Recuperar</h2>
                <form className="row g-3 needs-validation"  style={{position:"absoluta", top:"80px",left:"10px", padding:"10px 10px 10px 10px"}}>
                    <div className="col-md-4">
                      <label for="validationCustom01" className="form-label">Apellidos</label>
                      <input type="text" className="form-control" name="apellido" id="validationCustom01"  
                      onChange={ handleChange}
                      required />
                      <div class="valid-feedback">
                        Looks good!
                      </div>
                    </div>
                    

                    <div class="col-md-4">
                      <label for="validationCustomUsername" className="form-label">Nombre</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" className="form-control" name="nombre"id="validationCustomUsername" aria-describedby="inputGroupPrepend" required 
                        onChange={ handleChange}
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <label for="validationCustomUsername" className="form-label">Lugar</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" className="form-control" name="lugar"id="validationCustomUsername" aria-describedby="inputGroupPrepend" required 
                        onChange={ handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label for="validationCustomUsername" className="form-label">telefono</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" className="form-control" name="telefono" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required
                        onChange={ handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label for="validationCustomUsername" className="form-label">escuela</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" className="form-control" name="institucion" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required 
                        onChange={ handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label for="validationCustomUsername" className="form-label">Usuario</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" className="form-control" name="usuario" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required
                        onChange={ handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <Button className="btn btn-primary"  onClick={enviarDatos}>Recuperar</Button>
                    </div>
                  </form>
                    
                </form>
            )}

            <Modal isOpen={modalmensaje} toggle={toggleModal} className="modal-custom" >
                <ModalHeader  toggle={toggleModal}>
                    <ModalBody>
                        <h2>Se enviarán los datos de recuperación a tu correo electrónico</h2>
                        <a href="https://mail.google.com/">
                            <img
                                src={Gmail}
                                alt="Gmail"
                                style={{width:"150px",height:"150px", position:"absolute", top:"150px", left:"250px"}}
                            />
                        </a> 
                        <FormGroup>

                        </FormGroup>
                        <div className="space"></div>
                        <FormGroup>
                            <div className="space"></div>
                        </FormGroup>
                    </ModalBody>
                </ModalHeader>
            </Modal>
        </div>
    );
}
