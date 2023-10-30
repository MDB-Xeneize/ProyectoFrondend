import React,{Component} from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";

import 'react-toastify/dist/ReactToastify.css';
class LogeoClass extends React.Component { 
    constructor(props) {
        super(props)

        this.state = {
            nickname: '',
            password: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let usuario = {
            nickname: this.state.nickname,
            password: this.state.password
        }

        let parametros = {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        
        fetch("http://localhost:8080/api/security/login", parametros)
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
                        sessionStorage.setItem('token', result.body.token)
                        var tokenDecoded = jwt_decode(result.body.token)
                        sessionStorage.setItem('rol', tokenDecoded.rol)
                        sessionStorage.setItem('id_usuario', tokenDecoded.rol_id)
                        sessionStorage.setItem('permisos', tokenDecoded.permisos)
                        sessionStorage.setItem('email', tokenDecoded.email)
                        sessionStorage.setItem('nickname', tokenDecoded.nickname)
                        
                        toast.success("Acceso permitido", {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });

                        
                        this.props.navigate("/Menu")

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
                (error) => {
                    toast.error(error.message, {
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
            );
    }
    
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }


    render() {
    return (
        <div className="container bottom">

        <div className="row">
            <div className="col-3">
            </div>
            <div className="col-6">
                <form className="log" onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label for="exampleInputusuario1" className="form-label log" >Usuario</label>
                        <input 
                        name="nickname" 
                        className="form-control" 
                        id="nickname" 
                        aria-describedby="USUARIO" 
                        onChange={this.handleChange}
                        value={this.state.nickname}
                        />
                        <div className="form-text">No comparta su Usuario y Contraseña con nadie más.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Contraseña</label>
                        <input 
                        name="password" 
                        type="password" 
                        className="form-control" 
                        id="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        />
                    </div>
                    <div className="mb-3 form-check" hidden >
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">Verificado</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
            </div>
            <div className="col-3">
                
            </div>
        </div>

    </div>
    );
}
}

export default Logeo;

export function Logeo() {
    const p = useParams();

    const navigate = useNavigate();

    return (
        <>
            <LogeoClass navigate={navigate} params={p} />
        </>
    );
}