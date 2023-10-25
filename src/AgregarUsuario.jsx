import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';



export class AgregarUsuarioClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id_usuario: '',          /*nombre es en la tabla tipo_viaje como se llama a entrada o salida*/
            nickname: '',
            email: '',
            password: '',
            rol: '',
            permisos: '',
            Usuario: [],
            desabilitar: true
        }
    }

    componentDidMount() {
        debugger

        if (this.props.registro.registro !== undefined) {

            this.setState({
                nickname: this.props.registro.registro.nickname,
                email: this.props.registro.registro.email,
                password: 'Ingrese una contraseña',//this.props.registro.registro.password,
                rol: this.props.registro.registro.rol,
                permisos: this.props.registro.registro.permisos,
                id_usuario: this.props.registro.registro.id_usuario
            });
        }
        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token')
            }
        }

        const url = "http://localhost:8080/api/usuario";
        fetch(url, parametros)
            .then(res => {
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
                        debugger
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

    handleChange = (event) => {
        const { name, value } = event.target;
        debugger
        // Si estás manejando la fecha, puedes formatearla antes de actualizar el estado
        // if (name === 'fecha_nacimiento') {
        //   const formattedDate = moment(value).format('YYYY-MM-DD');
        //   this.setState({ [name]: formattedDate });
        // } else {
        this.setState({ [name]: value });
        if (name === 'password') {
            this.setState({'desabilitar':false})
        }
        // }

        // this.setState({ [event.target.name]: event.target.value });
    }



    handleSubmit = (event) => {
        event.preventDefault()
        debugger
        if (this.state.desabilitar === false) {
            let registro = {
                nickname: this.state.nickname,
                email: this.state.email,
                password: this.state.password,
                rol: this.state.rol,
                permisos: this.state.permisos,
                id_usuario: this.state.id_usuario

            }
            //Es Modificar o Agregar?
            let parametros = null;
            if (this.props.registro.extra !== undefined) {
                parametros = {
                    method: 'PUT',
                    body: JSON.stringify(registro),
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': sessionStorage.getItem('token')
                    }
                }

            }
            else {
                parametros = {
                    method: 'POST',
                    body: JSON.stringify(registro),
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': sessionStorage.getItem('token')
                    }
                }
            }
            debugger
            const url = this.props.registro.extra !== undefined ? `http://localhost:8080/api/usuario/${this.props.registro.registro.id_usuario}` : "http://localhost:8080/api/usuario"
            fetch(url, parametros)
                .then(res => {
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
                            const notify = () => toast("pelarse");

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

                            debugger
                            this.props.useNavigateEnvuelta('/Usuario')

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
        else { toast.error("El password es requerido", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });}
    }


    render() {
        // const OptionChofer = this.state.InOutChofer.map((chofer, index) => {
        //     return (

        //         <>
        //         <option key={index} value={chofer.id_chofer}>{`${chofer.id_chofer} ${chofer.dni} ${chofer.apellido}  ${chofer.nombre}`}</option>
        //         </>
        //         )
        //     }
        // )

        // const OptionVehiculo = this.state.InOutVehiculo.map((vehiculo, index) => {
        //     return (

        //         <>
        //         <option key={index} value={vehiculo.id_vehiculo}>{`${vehiculo.id_vehiculo} ${vehiculo.matricula}  ${vehiculo.marca}  ${vehiculo.modelo}`}</option>
        //         </>
        //         )
        //     }
        // )


        return (
            <>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            {this.props.registro.extra === true ? <h1>Modificar Registro de Usuario</h1> : <h1>Registrar Usuario</h1>};
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-2'>

                        </div>
                        <div className='col'>

                            <form onSubmit={this.handleSubmit}>
                                <br />
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nickname"
                                        placeholder="Nickname"
                                        onChange={this.handleChange}
                                        value={this.state.nickname}
                                        name='nickname'
                                    />
                                    <label htmlFor="nickname">Nickname</label>
                                </div>

                                <br />

                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        placeholder="algo@algo.com"
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                        name='email'
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>

                                <br />

                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="password"
                                        placeholder="Ingrese una contraseña"
                                        onChange={this.handleChange}
                                        value={this.state.password}
                                        name='password'
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>

                                <br />
                                {sessionStorage.getItem('permisos') === '3' ?
                                    <select className="form-select"
                                        id="rol"
                                        aria-label="Default select example"
                                        onChange={this.handleChange}
                                        value={this.state.rol}
                                        name='rol'
                                    >
                                        <option selected disabled>Rol</option>
                                        <option value="Administrador">Administrador del sistema</option>
                                        <option value="Supervisor">Supervisor de logística</option>
                                        <option value="Usuario">Usuario de registro</option>
                                        <option value="Soporte">Soporte técnico</option>
                                        <option value="Auditor">Auditor de Seguridad</option>
                                        <option value="Mantenimiento">Personal de mantenimiento</option>
                                    </select>

                                    : null}

                                <br />

                                {/* <div className="form-floating">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="permisos"
                                        placeholder="número"
                                        onChange={this.handleChange}
                                        value={this.state.permisos}
                                        name='permisos'
                                    />
                                    <label htmlFor="permisos">Permiso</label>
                                </div> */}
                                {sessionStorage.getItem('permisos') === '3' ?
                                    <select className="form-select"
                                        id="permisos"
                                        aria-label="Default select example"
                                        onChange={this.handleChange}
                                        value={this.state.permisos}
                                        name='permisos'
                                    >
                                        <option selected disabled>Permiso</option>
                                        <option value="1">Lectura de registros</option>
                                        <option value="2">Lectura,Creacion y Modificacion de registros</option>
                                        <option value="3">Lectura,Creacion,Modificacion y Eliminacion de registros</option>
                                    </select> : null}

                                <br />

                                <input className='btn btn-primary'
                                    type="submit"
                                    value="Guardar"
                                />
                            </form>
                        </div>
                        <div className='col-2'>

                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default AgregarUsuario;



export function AgregarUsuario(registro, extra) {
    debugger
    const parametros = useParams();

    const useNavigateP = useNavigate();

    return (
        <>
            <AgregarUsuarioClass registro={registro} useNavigateEnvuelta={useNavigateP} params={parametros} />
        </>
    );
}