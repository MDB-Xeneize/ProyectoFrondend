import React from 'react';
import BarraNav from '../nav';
import RegistroService from '../RegistroService';
import NavOptions from '../navOptions';

function ServiceBorrar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroService borrar={true} />
        <NavOptions opcion='option4'/>
        </>
    )
    
}
export default ServiceBorrar;