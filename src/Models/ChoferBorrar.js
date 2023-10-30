import React from 'react';
import BarraNav from '../nav';
import RegistroChofer from '../RegistroChofer';
import NavOptions from '../navOptions';

function ChoferBorrar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroChofer borrar={true} />
        <NavOptions opcion='option3'/>
        </>
    )
    
}
export default ChoferBorrar;