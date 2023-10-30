import React from 'react';
import BarraNav from '../nav';
import RegistroService from '../RegistroService';
import NavOptions from '../navOptions';

function ServiceModificar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroService extra='True' />
        <NavOptions opcion='option4'/>
        </>
    )
    
}
export default ServiceModificar;