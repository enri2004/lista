import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from 'reactstrap';
//import { QrReader } from 'react-qr-reader';
//import {RNCamera} from "react-native-camera"
import Axios from '../../servers/Axios';

function App() {
    const [scanResult, setScanResult] = useState('');
   // const [showPopcorn, setShowPopcorn] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    //const [scanning, setScanning] = useState(false);
    const [attendanceCount, setAttendanceCount] = useState(0);


    //const onOpenCloseCamera=()=>setScanning((prevState)=>!prevState);

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
            } catch (error) {
                console.error("Error al obtener los datos de los alumnos:", error);
            }
        }

        fetchData();
    }, []);
    // Frontend: enviar el ID del alumno junto con la lista de asistencia al backend
// Frontend: enviar el ID del alumno junto con la lista de asistencia al backend

    /*
    const handleCameraScan = (scannedData) => {
        if (scannedData) {
            setScanResult(scannedData);
            processScanResult(scannedData);
            
        }
    };

    const processScanResult = (scannedData) => {
        const foundStudent = scannedData.trim();
        const studentData = filteredData.find((item) => item.Matricula === foundStudent);

        if (!studentData) {
            console.log("Estudiante no encontrado");
           
        } else {
            setShowPopcorn(true);
        }
    };


    const handleError = (err) => {
        console.error(err);
    };

*/


    const enviarAsistenciaAlBackend = async (_id, asistencia) => {
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

            await Axios.patch(`/alumnos/editarAsistencia/${_id}`, { asistencia }, config);
            
        } catch (error) {
            console.error("Error al enviar la asistencia al backend:", error);
        }
    };

    const handleAttendance = async (_id, index) => {
        setAttendanceCount(prevCount => prevCount + 1);
    
        const updatedData = [...filteredData];
        updatedData[index].asistencia = !updatedData[index].asistencia;
    
        try {
            const asistencia = updatedData[index].asistencia ? '❌':'✅';
            await enviarAsistenciaAlBackend(_id, asistencia);
            setFilteredData(updatedData);
        } catch (error) {
            console.error("Error al enviar la asistencia al backend:", error);
        }
    };
    


    return (
        <div>
            <h1>Tabla de Datos</h1>
            <Table>
                <thead>
                    <tr>
                        <th class="bg-primary p-2 text-white bg-opacity-75">ID</th>
                        <th class="bg-primary p-2 text-white bg-opacity-75">Nombre</th>
                        <th class="bg-primary p-2 text-white bg-opacity-75">Apellidos</th>
                        <th class="bg-primary p-2 text-white bg-opacity-75">Matricula</th>
                        <th class="bg-primary p-2 text-white bg-opacity-75">Asistencia</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item,index) => (
                        <tr key={item.id}>
                            <td class="bg-primary p-2 text-dark bg-opacity-25">{item.id}</td>
                            <td class="bg-primary p-2 text-dark bg-opacity-10">{item.Nombre}</td>
                            <td class="bg-primary p-2 text-dark bg-opacity-10">{item.Apellidos}</td>
                            <td class="bg-primary p-2 text-dark bg-opacity-10">{item.Matricula}</td>
                            <td>{item.asistencia ? '❌' : '✅'}</td>
                            <td>
                                <Button onClick={() => handleAttendance(item._id, index)}>
                                    {item.asistencia ? 'Presente' : 'Ausente'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/*<div>
                <h2>Escáner de QR</h2>
                {!scanning && <button onClick={onOpenCloseCamera}>Activar cámara</button>}
                {scanning && (
                    <>
                        <QrReader
                            delay={300}
                            onError={handleError}
                            onScan={handleCameraScan}
                            style={{ display: 'none' }}
                        />
                        <button onClick={onOpenCloseCamera}>Desactivar cámara</button>
                    </>
                )}
                <p>{scanResult}</p>
                {showPopcorn && <img src="https://media.giphy.com/media/xT5LMQo3rU8JMOaJcM/giphy.gif" alt="Palomitas" />}
            </div>*/}
        </div>
    );
};

export default App;
