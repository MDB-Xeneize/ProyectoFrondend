import React from 'react';
import BarraNav from '../nav';
import RegistroInOut from '../RegistroInOut';
import NavOptions from '../navOptions';

function InOut( ){
    
    return(
        <>
        <BarraNav/>
        
        <RegistroInOut/>
        <NavOptions opcion='option1'/>
        </>
    )
    
}
export default InOut;
