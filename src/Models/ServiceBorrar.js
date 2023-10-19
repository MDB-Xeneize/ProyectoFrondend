import React from 'react';
import BarraNav from '../nav';
import RegistroService from '../RegistroService';


function ServiceBorrar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroService borrar={true} />
        </>
    )
    
}
export default ServiceBorrar;