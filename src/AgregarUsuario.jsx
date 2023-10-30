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
            rol: 'Administrador',
            permisos: '1',
            Usuario: [],
            desabilitar: true
        }
    }

    componentDidMount() {


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
        if (name === 'nickname' && value.length <= 20) {
            this.setState({ [name]: value });
        }
        if (name === 'email' && value.length <= 40) {
            this.setState({ [name]: value });
        }
        if (name === 'password' && value.length <= 100) {
            // this.setState({'desabilitar':false})
            this.setState({ [name]: value });
        }
        else {
            this.setState({ [name]: value });
        }
    }




    verificarCampos = () => {
        let enviar = true;

        if (this.state.nickname === '') {
            enviar = false;
            this.MensajeError("Agregue el Nickname, menos de 20 caracteres");
        }
        if (this.state.email === '') {
            enviar = false;
            this.MensajeError("Agregue el email");
        } else {
         
            const count = (this.state.email.match(/@/g) || []).length;
            if (count === 1) {
                const parts = this.state.email.split("@");
                let username = parts[0].toString();
                const dominio = parts[1].toString();
                var validUsernameRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+$/; //expresion regular para validar el username del email
                if (validUsernameRegex.test(username)) { 
                    username = dominio;
                    var validUsernameRegex =  /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/; //expresion regular para validar el dominio del email
                    if (validUsernameRegex.test(username)) { 
                        enviar = true;
                    }else{
                        enviar = false;
                        this.MensajeError("El dominio del email puede contener solo letras, numeros - y varios . pero no seguidos ");
                    }

                }else{
                    enviar = false;
                this.MensajeError("El username del email puede contener solo letras, numeros y estos signos !#$%&'*+/=?^_`{|}~.-]+$/");
                }

            } else {
                enviar = false;
                this.MensajeError("El email debe contener @ y una sola vez");
            }
        }

        if (this.state.password === '') {
            enviar = false;
            this.MensajeError("El password es requerido");
        } else {
            if (this.state.password === '') {
                enviar = false;
                this.MensajeError("El password es requerido");
            }

        }
        return enviar
    }

    MensajeError(mensaje) {
        toast.error(mensaje, {
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





    handleSubmit = (event) => {
        event.preventDefault()
        const enviar = this.verificarCampos();
        if (enviar === true) {

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
    }


    render() {

        return (
            <>
                <div className='container bottom'>
                    <div className='row'>
                        <div className='col'>
                            {this.props.registro.extra !== undefined ? <h3>Modificar Registro de Usuario</h3> : <h3>Registrar Usuario</h3>};
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
                                        type="password"
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

    const parametros = useParams();

    const useNavigateP = useNavigate();

    return (
        <>
            <AgregarUsuarioClass registro={registro} useNavigateEnvuelta={useNavigateP} params={parametros} />
        </>
    );
}