import React from 'react';
import BarraNav from '../nav';
import RegistroService from '../RegistroService';
import NavOptions from '../navOptions';

function Service(){
    
    return(
        <>
        <BarraNav/>
        <RegistroService/>
        <NavOptions opcion='option4'/>
        </>
    )
    
}
export default Service;