import React from 'react';
import BarraNav from '../nav';
import RegistroUsuario from '../RegistroUsuario';
import NavOptions from '../navOptions';

function Usuario(){
    
    return(
        <>
        <BarraNav/>
        <RegistroUsuario/>
        <NavOptions opcion='option5'/>
        </>
    )
    
}
export default Usuario;