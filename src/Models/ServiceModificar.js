import React from 'react';
import BarraNav from '../nav';
import RegistroService from '../RegistroService';


function ServiceModificar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroService extra='True' />
        </>
    )
    
}
export default ServiceModificar;