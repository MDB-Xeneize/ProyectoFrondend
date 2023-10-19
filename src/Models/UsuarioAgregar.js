import React from 'react';
import BarraNav from '../nav';
import AgregarUsuario from '../AgregarUsuario';

function UsuarioAgregar(datos){
    debugger
    return(
        
        <>
        <BarraNav/>
        <AgregarUsuario dato={datos}/>
        </>
        )
}
export default UsuarioAgregar;