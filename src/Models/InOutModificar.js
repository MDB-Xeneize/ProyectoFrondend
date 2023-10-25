import React from 'react';
import BarraNav from '../nav';
import RegistroInOut from '../RegistroInOut';
import NavOptions from '../navOptions';

function InOutModificar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroInOut extra='True' />
        <NavOptions opcion='option1'/>
        </>
    )
    
}
export default InOutModificar;