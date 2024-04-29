import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Modal, ModalBody, FormGroup, ModalHeader } from 'reactstrap';
import Asistencia from "../components/Asistencia";
import '../css/Datos_alumnos.css';


export default function Datos_alumnos(){
    const [Data, setData] = useState([]);

    useEffect(() => {
        const savedData = localStorage.getItem("alumnosData");
        if (savedData) {
            setData(JSON.parse(savedData));
        } else {
            // Si no hay datos guardados, inicializa los datos
            setData([
                { id: 1, nombre: "enri", apellido_paterno: "molina", apellido_materno: "hernandez", matricula: "234sm22", qr: "sin opcion", asistencia: "" },
                { id: 2, nombre: "juan", apellido_paterno: "caraveo", apellido_materno: "Lopez", matricula: "526565w", qr: "sin opcion", asistencia: "" },
                { id: 3, nombre: "yahaira", apellido_paterno: "juarez", apellido_materno: "montuy", matricula: "52813mj", qr: "sin opcion", asistencia: "" },
                { id: 4, nombre: "maria", apellido_paterno: "chavaria", apellido_materno: "coctecon", matricula: "685s8", qr: "sin opcion", asistencia: "" },
                { id: 5, nombre: "martha", apellido_paterno: "molina", apellido_materno: "hernandez", matricula: "8265992ks", qr: "sin opcion", asistencia: "" }
            ]);
        }
    }, []);

    const [modalEditar, setModalEditar] = useState(false);
    const [alumnoSeleccionado,setAlumnoSeleccionado]=useState(null);
    const [asistenciaActual, setAsistenciaActual] = useState(""); // Estado para almacenar la asistencia actual

    const toggleModalEditar = (alumno) => {
        setModalEditar(!modalEditar);
        setAlumnoSeleccionado(alumno);
        setAsistenciaActual(alumno.asistencia); // Al abrir el modal, guarda la asistencia actual del alumno
    };

    const actualizarAsistencia = (asistencia) => {
        if (alumnoSeleccionado) {
            const updatedData = Data.map((alumno) => {
                if (alumno.id === alumnoSeleccionado.id) {
                    return { ...alumno, asistencia: asistencia };
                }
                return alumno;
            });
            // Actualiza tus datos en la base de datos aquí
            // setData(updatedData);
            setData(updatedData); // Actualiza los datos en el estado
            localStorage.setItem("alumnosData", JSON.stringify(updatedData));
        setModalEditar(false); // Cierra el modal después de actualizar la asistencia
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
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido paterno</th>
                            <th>Apellido materno</th>
                            <th>Matrícula</th> 
                            <th>QR</th> 
                            <th>Asistencia</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Data.map((alumno, index) => (
                            <tr key={alumno.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{alumno.nombre}</td>
                                <td>{alumno.apellido_paterno}</td>
                                <td>{alumno.apellido_materno}</td>
                                <td>{alumno.matricula}</td>
                                <td>{alumno.qr}</td> 
                                <td>{alumno.asistencia}</td>  
                                <td>
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
                        <>
                            <table className="table" striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido paterno</th>
                                        <th>Apellido materno</th>
                                        <th>Matrícula</th>
                                        <th>QR</th>
                                        <th>Asistencia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{alumnoSeleccionado.nombre}</td>
                                        <td>{alumnoSeleccionado.apellido_paterno}</td>
                                        <td>{alumnoSeleccionado.apellido_materno}</td>
                                        <td>{alumnoSeleccionado.matricula}</td>
                                        <td>{alumnoSeleccionado.qr}</td>
                                        <td>{asistenciaActual}</td> {/* Muestra la asistencia actual */}
                                    </tr>
                                </tbody>
                            </table>
                            </>
                    )}
                    
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
