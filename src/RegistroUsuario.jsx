import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom';
import AgregarChofer from './AgregarChofer';
import AgregarUsuario from './AgregarUsuario';



export class RegistroUsuarioClass extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            rol:'',
            id_usuario:'',
            permisos:'',
            password:'',
            nickname:'',
            email:'',
            Usuario: [],
            InfoAdicional: false,
            id_usuario_info:0,
            registroSelect:null,
            redireccion:false,
            modales:false,
            seleccion:''
        }

    }

    componentDidMount() {
        debugger
        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token')
            }
        }

        const url = "http://localhost:8080/api/usuario";
        fetch(url,parametros)
            .then(res => {
                debugger
                return res.json()
                    .then(body => {

                        return {
                            status: res.status,
                            ok: res.ok,
                            headers: res.headers,
                            body: body
                        };
                    })
            }).then(

                result => {
                    if (result.ok) {
                        this.setState({
                            Usuario: result.body
                        });
                    } else {
                        toast.error(result.body.message, {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                }
            ).catch(
                (error) => { console.log(error) }
            );
    }
    
    
    renderInfo(registro,index){
        if(this.state.redireccion){    
            if(this.state.registroSelect.id_usuario===registro.id_usuario){       
                return(
                    <>
                        <tr key={index}  >
                            <td>{registro.id_usuario}</td>
                            <td>{registro.nickname}</td>
                            <td>{registro.email}</td> 
                            <td>{registro.password}</td> 
                            <td>{registro.rol}</td>                   
                            <td>{registro.permisos}</td>
                            <td>

                                {(this.props.extra===true)?
                                (<Link to='' className='btn btn-warning' onClick={() => this.handleClickModificar(registro)}>
                                    <span class="material-symbols-outlined">Modificar</span>
                                </Link>):null
                                }
                                
                            </td>
                        </tr>

 
                    </>      
                )
            }
            else{
                return(null)
            }
        }
        else{
            return(
                <>
                    <tr key={index}  >
                        <td>{registro.id_usuario}</td>
                        <td>{registro.nickname}</td>
                        <td>{registro.email}</td>                    
                        <td>{registro.password}</td>
                        <td>{registro.rol}</td>
                        <td>{registro.permisos}</td>
                        <td>
                            {(this.props.borrar===undefined||this.state.seleccion!=='')?null: 
                                    <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"onClick={() => this.handleClickSwitch(registro)}/>
                                    <label className="form-check-label" for="flexSwitchCheckDefault"></label>
                                    </div>

                            }
                            {(this.props.extra==='True')?
                            (<Link to='' className='btn btn-warning' onClick={() => this.handleClickModificar(registro)}>
                                <span class="material-symbols-outlined">Modificar</span>
                            </Link>):null
                            }
                            {(this.props.borrar===true&&this.state.seleccion===registro.id_usuario)?
                            (<Link to='' className='btn btn-danger' onClick={() => this.handleClickBorrar(registro)}>
                                <span className="material-symbols-outlined">Eliminar</span>
                            </Link>):null
                            }
                               {(this.props.borrar===true&&this.state.seleccion===registro.id_usuario)?
                            (<Link to='' className='btn btn-success' onClick={() => this.handleClickSwitch(registro)}>
                                <span className="material-symbols-outlined">Cancelar</span>
                            </Link>):null
                            }
                            
                        </td>
                        <td>                                                
                        </td>
                    </tr>                
                </>
            )
        }
    }
 

    handleClickModificar(registro){
        debugger
        this.setState({redireccion:true , registroSelect: registro});
 //Estado modificar o informar
    }
    
    handleClickSwitch(registro){
        debugger
        var seleccion = this.state.seleccion ; // Copia el objeto seleccion del estado

        if (seleccion!==''&& seleccion===registro.id_usuario) {
          // Si la clave ya existe en seleccion, la eliminamos
          seleccion='';
        } else {
          // Si la clave no existe, la agregamos
          seleccion = registro.id_usuario;
        }
      
        // Actualizamos el estado con la nueva selección
        this.setState({ seleccion });
    
    }

    handleClickBorrar(registro){
        
 //Estado modal activado
        debugger
        const seleccionJSON = JSON.stringify(this.state.seleccion)

    let parametros = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': sessionStorage.getItem('token')
        }
    }  
 
    debugger
 const url = `http://localhost:8080/api/usuario/${registro.id_usuario}`;
 fetch(url, parametros)
     .then(res => {
         debugger
         return res.json()
             .then(body => {

                 return {
                     status: res.status,
                     ok: res.ok,
                     headers: res.headers,
                     body: body
                 };
             })
     }).then(

        result => {
            debugger
            if (result.ok) {
                toast.success(result.body.message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });        
                var seleccion = this.state.seleccion ; // Copia el objeto seleccion del estado
                this.setState({ seleccion });
                this.componentDidMount();
            }else {
                 toast.error(result.body.message, {
                     position: "bottom-center",
                     autoClose: 5000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                     theme: "light",
                 });
             }
             debugger
         }
     ).catch(
         (error) => { console.log(error) }
     );
        
    }


    render(){
        
        debugger
        // if(this.state.modales){
        //     this.borrarRegistro();
        //     this.props.useNavigateEnvuelta('/InOut')
        // }
        const Fila = this.state.Usuario.map((registro, index) => {
            return (
                <>
                    {this.renderInfo(registro,index)}
                </>
            )

        });
        const Form = this.state.redireccion ? (<AgregarUsuario registro={this.state.registroSelect} extra={true} />):(null) ;  
// Renderizo la tabla y el formulario para modificar
        

        return (
            <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        
                            <table className="table table-striped table-hover">
                           
                                <thead>
                                    <tr>
                                        <th>
                                            Id_Usuario
                                        </th>
                                        <th>
                                            Nickname
                                        </th>
                                        <th>
                                            Email
                                        </th>
                                        <th>
                                            Password
                                        </th>
                                        <th>
                                            Rol
                                        </th>
                                        <th>
                                            Permiso
                                        </th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {Fila}

                                </tbody>
                                

                            </table>
                        
                        {Form}
                    </div>
                </div>

            </div>
            </>
        );
    }
}

export default RegistroUsuario;


export function RegistroUsuario({extra,borrar}) {
    debugger
    const parametros = useParams();
    
    const useNavigateP = useNavigate();
    
    return (
        <>
            <RegistroUsuarioClass extra={extra} borrar={borrar} useNavigateEnvuelto={useNavigateP} params={parametros} />
        </>
    );
}


  
