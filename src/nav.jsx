import React from 'react';
import {  useParams,useNavigate } from 'react-router-dom';
import SeparateWays from './AgregarSeparate';

class BarraNavClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          token: ''
        };
      }
    componentDidMount() {
        debugger
        const tokenG = sessionStorage.getItem('token');
        if (tokenG !== this.state.token) {
          this.setState({ token: tokenG });
        }
      }

    handleClickSalir = () => {
        debugger
        sessionStorage.removeItem('token');
        this.setState({ token: '' });
        this.props.useNavigateEnvuelto('/'); 
        //navigate('/')

    }



    render(){
    return (
        <>
        <div className=" barranav">
            <div className='row'>

                <div className='col-8 abs-center'>
                    <nav className="navbar navbar-expand-lg navbar-light bg-transparent ">
                        <div className="container-fluid">
                        {this.state.token !== "" && this.state.token !== null ? (null):(<a className="navbar-brand textoNav" href="http://localhost:3000/"><i>Inicio</i></a>) }                     
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    {this.state.token !== "" && this.state.token !== null ? (null):(<a className="nav-link  textoNav" aria-current="page" href="http://localhost:3000/Login"><i>Login</i></a>) }
                                    {this.state.token !== "" && this.state.token !== null ? (<a className="nav-link textoNav" href="http://localhost:3000/Menu"><i>Menú</i></a>):(null) }
                                    {this.state.token !== "" && this.state.token !== null ? (null):(<a className="nav-link textoNav" href="http://localhost:3000/Contactos"><i>Contactos</i></a>) }
                                    {this.state.token !== "" && this.state.token !== null&&sessionStorage.getItem('permisos') === '3'? (<a className="nav-link textoNav" href="http://localhost:3000/UsuarioAgregar" tabIndex="-1" aria-disabled="true"><i>Registrar Usuarios</i></a>):(null) }
                                    {this.state.token !== "" && this.state.token !== null&&sessionStorage.getItem('permisos') !== '3'? (<a className="nav-link textoNav" href="http://localhost:3000/UsuarioModificar" tabIndex="-1" aria-disabled="true"><i>Modificar  Usuarios</i></a>):(null) }

                                    {this.state.token !== "" && this.state.token !== null ? (<button className="nav-link textoNav"  onClick={this.handleClickSalir } tabIndex="-1" aria-disabled="true"><i>Salir</i></button>):(null) } 
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div col-2>
                    {this.state.token !== "" && this.state.token !== null ? (<p className="nav-link textoRell" ><i>{`Usuario:${sessionStorage.getItem('email')} Rol:${sessionStorage.getItem('rol')}`} </i></p>):(null) }
                </div>
            </div>

        </div>
        <SeparateWays/>
        </>
    );
}
}


export default BarraNav;

export function BarraNav() {
    debugger
    const parametros = useParams();
    const useNavigateP = useNavigate();
    
    return (
        <>
            <BarraNavClass useNavigateEnvuelto={useNavigateP} params={parametros} />
        </>
    );
}
