import React from 'react';
import BarraNav from '../nav';
import RegistroChofer from '../RegistroChofer';
import NavOptions from '../navOptions';

function ChoferModificar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroChofer extra='True' />
        <NavOptions opcion='option3'/>
        </>
    )
    
}
export default ChoferModificar;