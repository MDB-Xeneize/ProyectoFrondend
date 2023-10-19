import React from 'react';
import Carrusel from '../carrusel';
import BarraNav from '../nav';

import {  useNavigate } from 'react-router-dom'
//import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';



function Inicio() {
        const navigate = useNavigate();

        const [token, setToken] = useState("");

        useEffect(() => {
                const tokenG = sessionStorage.getItem('token')
                if (tokenG !== token) {
                        setToken(tokenG)
                }

        }, [token]);


        const Logout = (token) => {
                debugger
                sessionStorage.removeItem('token');
                setToken("");
                navigate('/')
        }



        const handleClickIngresar = () => {
                debugger
                navigate("/Login");

        }


      //  if (token !== "" && token !== null) {
                return (
                        <>
                                <BarraNav />
                                <Carrusel />
                                <div className='row'>
                                        <div className='col-4'>
                                        </div>
                                        <div className='col-4'>
                                                <button className='btn btn-primary centrado' onClick={handleClickIngresar} ><h2><i>Ingresar</i></h2></button>
                                                {/* {token !== "" && token !== null? (<button className="btn btn-primary " onClick={() => Logout(token)}><h2><i>Salir</i></h2></button>):(null)} */}
                                        </div>
                                        <div className='col-4'>
                                        </div>
                                </div>
                        </>
                )
   

}
export default Inicio;
