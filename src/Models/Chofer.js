import React from 'react';
import BarraNav from '../nav';
import RegistroChofer from '../RegistroChofer';
import NavOptions from '../navOptions';

function Chofer(){
    
    return(
        <>
        <BarraNav/>
        <RegistroChofer/>
        <NavOptions opcion='option3'/>
        </>
    )
    
}
export default Chofer;
