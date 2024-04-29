import React, { useState } from 'react';
import { Button } from "antd";
import '../css_admin/Matricula.css';
import axios from 'axios';
import Formulario from '../../user/pages/Formulario';
import QRCode from 'qrcode.react';

export default function Matricula() {

    const [formData, setFormData] = useState({
        usuario:'',
        contraseña:'',
        apellido_paterno: '',
        apellido_materno: '',
        nombre: '',
        institucion: '',
        materia: '',
        semestre: '',
        sexo: '',
        email: '',
        telefono: '',
        fecha_nacimiento: '',
        edad: '',
        lugar: '',
        roles:'',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const QRCode= generarQR(formData);
            await axios.post('https://api-rest-htj4.onrender.com/api/saveData', formData);
            console.log('Datos enviados correctamente');
            e.target.reset();
            document.getElementById('codigo-qr').innerHTML=" "

        } catch (error) {
            console.error('Error al enviar los datos', error);
            // Mostrar mensaje de error al usuario
        }
    };

        const generarQR = (formData) => {

            const qrData = [];
            for (const campo in formData) {
                const nombreCampo = campo;
                const valorCampo = formData[campo];
                qrData.push(`${nombreCampo}= ${valorCampo}`);
            }
            const qrValue = qrData.join('\n');
            return <QRCode value={qrValue} />;
        };
    
    
   
   
    return (
        <div>
            {<form className="contenedor" id='Formulario' onSubmit={handleSubmit}>
                <h1 >INGRESAR DATOS DE LOS USUARIOS</h1>
                
                    <div className ='input'>
                    <input type="text"  required=" " name="apellido_paterno"  onChange={handleChange} />
                    <span className='span_apellido'>apellido paterno</span>
                    <i className='i'></i>
                    </div>
                    <div className='input_materno'>
                    <input type="text" required=" " name="apellido_materno" onChange={handleChange} />
                    <span className='span_materno'>apellido materno</span>
                    <i className="i_materno"></i>
                    </div>

                    <div className='input_Nombre'>
                    <input type="text" required=" " name="nombre"  onChange={handleChange} />    
                    <span className="span_nombre">Nombre</span>
                    <i  className="i_nombre"></i>
                    </div>

                    <div className='input_instituto'>
                    <input type="text" required=" " name="institucion" onChange={handleChange} />
                    <span className='span_instituto'>Institucion</span>
                    <i className="i_instituto"></i>
                    </div>

                    <div className='input_edad'>
                    <input type="number" min={1} max={100} required=" "  name="edad" onChange={handleChange} />
                    <span className='span_edad'>Edad</span>
                    <i className='i_edad'></i>
                    </div>
                    <div className='input_sexo'>
                    <input type="text" required=" "  name="sexo" onChange={handleChange} />
                    <span className='span_sexo'>Sexo</span>
                    <i className='i_sexo'></i>
                    </div>
                    <div className='input_telef'>
                    <input type="tel"  required=" " name="telefono"  onChange={handleChange} />
                    <span className='span_telef'>Telefono</span>
                    <i className='i_telef'></i>
                    </div>                
                    <div className='input_data'>
                    <input type="date" required=" " name="fecha_nacimiento" className="form_date" />
                    <span className="span_data">fecha nacimiento</span>
                    <i className="i_data"></i>
                    </div>
                    <div className='input_email'>
                    <input type="email" required=" " name="email" onChange={handleChange} />
                    <span className='span_email'>email</span>
                    <i className='i_email'></i>
                    </div>
                    <div className='input_lugar'>
                    <input type="text" required=" " name="lugar" onChange={handleChange} />
                    <span className='span_lugar'>lugar</span>
                    <i className='i_lugar'></i>
                    </div>
                     
                    <div className='input_materia'>
                    <input type="text" required=" " name="materia" onChange={handleChange} />
                    <span className='span_materia'>Materia</span>
                    <i className='i_materia'></i>
                    </div>
                    <div className='input_semestre'>
                    <input type="text" required=" " name="semestre" onChange={handleChange} />
                    <span className='span_semestre'>Semestre</span>
                    <i className='i_semestre'></i>
                    </div>
                    <div className='input_usuario'>
                    <input type="tex" required=" " name="usuario"onChange={handleChange} />
                    <span className='span_usuario'>Usuario</span>
                    <i className='i_usuario'></i>
                    </div>

                    <div className='input_contraseña'>
                    <input type="tex" required=" "  name="contraseña" onChange={handleChange} />
                    <span className='span_contraseña'>Contraseña</span>
                    <i className='i_contraseña'></i>
                    </div>
                    {/*<div className='input_rol'>
                    <input type="text" required=" "  name="roles" onChange={handleChange} />
                    <span className='span_rol'>roles</span>
                    <i className='i_rol'></i>
                    </div>*/ }
                    

                <div className='input_rol'>
                        <div clas="select-container">
                        <label class="select-label" for="select-body"></label>
                        <div id="select-category-container" class="select-body">
                    <select name="roles" id="select-category" onChange={handleChange} >
                    <option value="Roles">Roles</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Usuario">Usuario</option>
                    </select>
                    <div>
                        <div class='select-icon'>
                        <i class="fa fa-chevron-down" aria-hidden="true"></i>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                
                
                <Button type="primary" htmlType="submit" className="boton1" >enviar</Button>
            </form>}
            {formData.roles&&(
                <div className='qr'>
            {generarQR(formData) 
       }       </div>)
             } 
        </div>
    )
}