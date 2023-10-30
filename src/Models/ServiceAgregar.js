import React from 'react';
import BarraNav from '../nav';
import AgregarService from '../AgregarService';
import NavOptions from '../navOptions';

function ServiceAgregar(datos){
    return(
        
        <>
        <BarraNav/>
        <AgregarService dato={datos}/>
        <NavOptions opcion='option4'/>
        </>
        )
}
export default ServiceAgregar;