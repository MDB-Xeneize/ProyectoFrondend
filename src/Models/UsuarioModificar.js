import React from 'react';
import BarraNav from '../nav';
import RegistroUsuario from '../RegistroUsuario';
import NavOptions from '../navOptions';

function UsuarioModificar(){
    
    return(
        <>
        <BarraNav/>
        <RegistroUsuario extra='True' />
        <NavOptions opcion='option5'/>
        </>
    )
    
}
export default UsuarioModificar;