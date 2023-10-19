import React from 'react';
import BarraNav from '../nav';
import AgregarService from '../AgregarService';

function ServiceAgregar(datos){
    debugger
    return(
        
        <>
        <BarraNav/>
        <AgregarService dato={datos}/>
        </>
        )
}
export default ServiceAgregar;