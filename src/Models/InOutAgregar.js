import React from 'react';
import BarraNav from '../nav';
import AgregarInOut from '../AgregarInOut';
import NavOptions from '../navOptions';
function InOutAgregar(datos){
    debugger
    return(
        
        <>
        <BarraNav/>
        <AgregarInOut dato={datos}/>
        <NavOptions opcion='option1'/>
        </>
        )
}
export default InOutAgregar;
