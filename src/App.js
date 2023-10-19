import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Inicio from './Models/inicio';
import Login from './Models/Login';
import Menu from './Models/Menu';
import InOut from './Models/InOut';
import InOutAgregar from './Models/InOutAgregar'
import InOutModificar from './Models/InOutModificar';
import InOutBorrar from './Models/InOutBorrar';
import Chofer from './Models/Chofer';
import ChoferAgregar from './Models/ChoferAgregar'
import ChoferModificar from './Models/ChoferModificar';
import ChoferBorrar from './Models/ChoferBorrar';
import Vehiculo from './Models/Vehiculo';
import VehiculoAgregar from './Models/VehiculoAgregar';
import VehiculoModificar from './Models/VehiculoModificar';
import VehiculoBorrar from './Models/VehiculoBorrar';
import Service from './Models/Service'
import ServiceAgregar from './Models/ServiceAgregar'
import ServiceModificar from './Models/ServiceModificar'
import ServiceBorrar from './Models/ServiceBorrar'
import Usuario from './Models/Usuario'
import UsuarioAgregar from './Models/UsuarioAgregar';
import UsuarioModificar from './Models/UsuarioModificar';
import UsuarioBorrar from './Models/UsuarioBorrar';
import Contactos from './Models/Contactos';

function App() {
    return (
        <>
            { }
            <Router>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/Menu" element={<Menu />} />
                    <Route path="/Contactos" element={<Contactos />} />
                    <Route path="/InOut" element={<InOut />}/>
                    <Route path="/InOutAgregar" element={<InOutAgregar />}/>
                    <Route path="/InOutModificar" element={<InOutModificar />}/>
                    {/* <Route path="/InOutModificar/ModificarRegistro" element={<InOutAgregar/>}/> */}
                    <Route path="/InOutBorrar" element={<InOutBorrar/>}/>
                    <Route path="/Chofer" element={<Chofer />}/>
                    <Route path="/ChoferAgregar" element={<ChoferAgregar />}/>
                    <Route path="/ChoferModificar" element={<ChoferModificar />}/>
                    <Route path="/ChoferBorrar" element={<ChoferBorrar />}/>
                    <Route path="/Vehiculo" element={<Vehiculo />}/>
                    <Route path="/VehiculoAgregar" element={<VehiculoAgregar />}/>
                    <Route path="/VehiculoModificar" element={<VehiculoModificar />}/>
                    <Route path="/VehiculoBorrar" element={<VehiculoBorrar />}/>
                    <Route path="/Service" element={<Service />}/>
                    <Route path="/ServiceAgregar" element={<ServiceAgregar />}/>
                    <Route path="/ServiceModificar" element={<ServiceModificar />}/>
                    <Route path="/ServiceBorrar" element={<ServiceBorrar />}/>
                    <Route path="/Usuario" element={<Usuario />}/>
                    <Route path="/UsuarioAgregar" element={<UsuarioAgregar />}/>
                    <Route path="/UsuarioModificar" element={<UsuarioModificar />}/>
                    <Route path="/UsuarioBorrar" element={<UsuarioBorrar />}/>
                    {/* <Route path='/Carro' element={<DemoCarousel/>}/> */}
                </Routes>
            </Router>
            <ToastContainer /> 
        </>
    );
}


function Texto() {
    const pr = useParams();
    return <>Texto {pr.text}</>
}
function Na() {
    const navigate = useNavigate();
    return <>
        <button onClick={() => navigate(-1)}>← Back</button>
        <button onClick={() => navigate('/texto/test')}>← text</button>
    </>;
}




export default App;
