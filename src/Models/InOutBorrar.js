import React from 'react';
import BarraNav from '../nav';
import RegistroInOut from '../RegistroInOut';
import NavOptions from '../navOptions';

function InOutBorrar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroInOut borrar={true} />
        <NavOptions opcion='option1'/>
        </>
    )
    
}
export default InOutBorrar;