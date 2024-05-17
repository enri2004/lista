import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Modal, ModalBody, FormGroup, ModalHeader } from 'reactstrap';
import Asistencia from "../components/Asistencia";
import '../css/Datos_alumnos.css';
import Axios from "../../servers/Axios";
import '../css/Datos_alumnos.css'

export default function Datos_alumnos(){
    const [Data, setData] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [alumnoSeleccionado,setAlumnoSeleccionado]=useState(null);
    const [asistenciaActual, setAsistenciaActual] = useState(""); 
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                if (!accessToken) {
                    console.error('No se encontró ningún token de acceso en el almacenamiento local');
                    return;
                }
                
                const config = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                };
                
                const response = await Axios.get("/Id_maestro", config);
                const id_maestro = response.data.id_maestro;
                
                const alumnosResponse = await Axios.get("http://127.0.0.1:3000/alumnos");
                const allData = alumnosResponse.data;
                
                // Filtrar los datos de los alumnos por el id_maestro
                const filteredAlumnos = allData.filter(alumno => alumno.Id_maestro === id_maestro);
                
                setData(allData); // Establecer todos los datos de los alumnos
                setFilteredData(filteredAlumnos); // Establecer los datos filtrados por el id_maestro
            } catch(error) {
                console.error("Error al obtener los datos de los alumnos:", error);
            }
        };
        
        fetchData();
    }, []);
     
    const toggleModalEditar = (alumno) => {
        setModalEditar(!modalEditar);
        setAlumnoSeleccionado(alumno);
        setAsistenciaActual(alumno.asistencia); // Al abrir el modal, guarda la asistencia actual del alumno
    };

    const actualizarAsistencia = async (asistencia) => {
        if (alumnoSeleccionado) {
            const paselista = {
                _id: alumnoSeleccionado._id, // Utiliza el _id del alumno seleccionado
                id:alumnoSeleccionado.id,
                Nombre:alumnoSeleccionado.Nombre,
                Apellidos:alumnoSeleccionado.Apellidos,
                Matricula:alumnoSeleccionado.Matricula,
                asistencia: asistencia,
            };
    
            try {
                await Axios.patch(`/alumnos/editar/${alumnoSeleccionado._id}`, paselista);
                console.log("Se enviaron los datos correctamente");
                const updatedData = Data.map((alumno) => {
                    if (alumno._id === alumnoSeleccionado._id) {
                        return { ...alumno, asistencia: asistencia };
                    }
                    return alumno;
                });
                setData(updatedData);
                setModalEditar(false);
            } catch (error) {
                console.error("Error al enviar los datos:", error);
            }
        }
    };
    
    const guardarCambios = () => {
        actualizarAsistencia(asistenciaActual); // Llama a la función de actualización con la asistencia actual
    };

    return(
        <>
            <Container>
                <table className="table" striped bordered hover>
                    <thead>
                        <tr>
                            <th class="bg-primary p-2 text-white bg-opacity-75">#</th>
                            <th class="bg-primary p-2 text-white bg-opacity-75">Nombre</th>
                            <th class="bg-primary p-2 text-white bg-opacity-75">Apellidos</th>
                            <th class="bg-primary p-2 text-white bg-opacity-75">Matrícula</th> 
                            <th class="bg-primary p-2 text-white bg-opacity-75">Asistencia</th>
                            <th class="bg-primary p-2 text-white bg-opacity-75">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((alumno, index) => (
                            <tr key={alumno.id}>
                                <th scope="row" class="bg-primary p-2 text-dark bg-opacity-25">{index + 1}</th>
                                <td class="bg-primary p-2 text-dark bg-opacity-10">{alumno.Nombre}</td>
                                <td class="bg-primary p-2 text-dark bg-opacity-10">{alumno.Apellidos}</td>
                                <td class="bg-primary p-2 text-dark bg-opacity-10">{alumno.Matricula}</td>
                                <td class="bg-primary p-2 text-dark bg-opacity-10">{alumno.asistencia === "✔️" ? "✔️" : (alumno.asistencia === "❌" ? "❌" : "✅")}</td> 
                                <td class="bg-primary p-2 text-dark bg-opacity-10">
                                    <Button color="primary" onClick={() => toggleModalEditar(alumno)}>Editar</Button>
                                </td>  
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        

            <Modal isOpen={modalEditar} toggle={toggleModalEditar} className="modal-custom">
                <ModalHeader toggle={toggleModalEditar}>Asistencia</ModalHeader>
                <ModalBody>
                {alumnoSeleccionado && (
    <Container>
        <table className="table-bordered border-dark" striped bordered hover style={{position:"absolute",left:"10px",width:"700px", height:"100px"}}>
            <thead>
                <tr>
                    <th className="bg-primary text-white">Nombre</th>
                    <th className="bg-primary text-white">Apellidos</th>
                    <th className="bg-primary text-white">Matrícula</th>
                    <th className="bg-primary text-white">QR</th>
                    <th className="bg-primary text-white">Asistencia</th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-primary text-dark bg-opacity-10">
                    <td>{alumnoSeleccionado.Nombre}</td>
                    <td>{alumnoSeleccionado.Apellidos}</td>
                    <td>{alumnoSeleccionado.Matricula}</td>
                    <td>{alumnoSeleccionado.qr}</td>
                    <td>{asistenciaActual}</td> {/* Muestra la asistencia actual */}
                </tr>
            </tbody>
        </table>
    </Container>
)}
/*
                    
                    <FormGroup>
                     <Asistencia onAsistenciaChange={setAsistenciaActual} />
                     <Button color="primary" className="button"onClick={guardarCambios}>Guardar</Button>
                     </FormGroup>
                     <FormGroup>
            <div className="space"></div> {/* Espacio entre el componente Asistencia y el botón Guardar */}
                </FormGroup>
                <FormGroup>
                 <div className="space"></div> {/* Espacio entre el componente Asistencia y el botón Guardar */}
                </FormGroup>
            

                </ModalBody>
            </Modal>
        </>
    );
} 
