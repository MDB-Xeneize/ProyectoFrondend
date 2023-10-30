
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom';
import AgregarInOut from './AgregarInOut';




export class RegistroInOutClass extends Component {
    constructor(props) {
        super(props);

        this.state = {
            InOut: [],
            InfoAdicional: false,
            id_viaje_info: 0,
            registroSelect: null,
            redireccion: false,
            modales: false,
            seleccion: ''
        }

    }

    componentDidMount() {

        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token')
            }
        }
        const url = "http://localhost:8080/api/inOut";
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
                            InOut: result.body
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


    renderInfo(registro, index) {
        if (this.state.redireccion) {
            if (this.state.registroSelect.id_viaje === registro.id_viaje) {
                return (
                    <>
                        <tr key={index}  >
                            <td>{registro.id_viaje}</td>
                            <td>{registro.nombre}</td>
                            <td>{moment.utc(registro.fecha).format('DD/MM/YYYY')}</td>
                            <td>{registro.hora}</td>
                            {/* <td>{registro.origen}</td>
                            <td>{registro.destino}</td> */}
                            <td>{registro.carga}</td>
                            <td>{registro.peso_total}</td>
                            <td>{registro.id_chofer}</td>
                            <td>{registro.id_vehiculo}</td>


                            <td>
                                <Link to='' className='btn btn-primary' onClick={() => this.handleClickInfo(registro.id_viaje, this.props.id_viaje_info)}>
                                    <span class="material-symbols-outlined">+Info</span>
                                </Link>
                                {(this.props.extra === true) ?
                                    (<Link to='' className='btn btn-warning' onClick={() => this.handleClickModificar(registro)}>
                                        <span class="material-symbols-outlined">Modificar</span>
                                    </Link>) : null
                                }

                            </td>
                            <td>

                                {((registro.peso_total - registro.carga_maxima) > 0) ? (<buton className="badge rounded-pill bg-danger">Exedido</buton>) : (null)}

                            </td>
                        </tr>

                        {this.state.InfoAdicional && this.state.id_viaje_info === registro.id_viaje ? (this.renderInfoAdicional(registro)) : (null)}
                    </>
                )
            }
            else {
                return (null)
            }
        }
        else {
            return (
                <>
                    <tr key={index}  >
                        <td>{registro.id_viaje}</td>
                        <td>{registro.nombre}</td>
                        <td>{moment.utc(registro.fecha).format('DD/MM/YYYY')}</td>
                        <td>{registro.hora}</td>
                        {/* <td>{registro.origen}</td>
                        <td>{registro.destino}</td> */}
                        <td>{registro.carga}</td>
                        <td>{registro.peso_total}</td>
                        <td>{registro.id_chofer}</td>
                        <td >{registro.id_vehiculo}</td>
                        <td>
                            {(this.props.borrar === undefined) ? <Link to='' className='btn btn-primary' onClick={() => this.handleClickInfo(registro.id_viaje, this.props.id_viaje_info)}>
                                <span className="material-symbols-outlined">+Info</span>
                            </Link> : null}
                            {(this.props.borrar === undefined || this.state.seleccion !== '') ? null :
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={() => this.handleClickSwitch(registro)} />
                                    <label className="form-check-label" for="flexSwitchCheckDefault">Eliminar</label>
                                </div>

                            }
                            {(this.props.extra === 'True') ?
                                (<Link to='' className='btn btn-warning' onClick={() => this.handleClickModificar(registro)}>
                                    <span class="material-symbols-outlined">Modificar</span>
                                </Link>) : null
                            }
                            {(this.props.borrar === true && this.state.seleccion === registro.id_viaje) ?
                                (<Link to='' className='btn btn-danger' onClick={() => this.handleClickBorrar(registro)}>
                                    <span className="material-symbols-outlined">Eliminar</span>
                                </Link>) : null
                            }
                            {(this.props.borrar === true && this.state.seleccion === registro.id_viaje) ?
                                (<Link to='' className='btn btn-success' onClick={() => this.handleClickSwitch(registro)}>
                                    <span className="material-symbols-outlined">Cancelar</span>
                                </Link>) : null
                            }

                        </td>
                        <td>

                            {((registro.peso_total - registro.carga_maxima) > 0) ? (<buton className="badge rounded-pill bg-danger">Exedido</buton>) : (null)}

                        </td>
                    </tr>
                    {this.state.InfoAdicional && this.state.id_viaje_info === registro.id_viaje ? (this.renderInfoAdicional(registro)) : (null)}

                </>
            )
        }
    }

    renderInfoAdicional(registro) {
        //Renderiza solo Informacion Adicional dentro de la misma tabla
        return (
            <>

                <tr className='tablaAdicionalHead'>
                    <th colSpan={5}>
                        Origen
                    </th>
                    <th colSpan={5}>
                        Destino
                    </th>
                </tr>
                <tr className='tablaAdicionalRow'>
                    <td colSpan={5}>{registro.origen}</td>
                    <td colSpan={5}>{registro.destino}</td>
                </tr>

                <tr className='tablaAdicionalHead'>
                    <th>
                        Id_Tipo
                    </th>
                    <th>
                        Matricula
                    </th>
                    <th colSpan={2}>
                        Marca
                    </th>
                    <th colSpan={1}>
                        Modelo
                    </th>
                    <th>
                        Tara
                    </th>
                    <th>
                        Capacidad Maxima
                    </th>
                    <th colSpan={3}>
                        Gestiona Us.
                    </th>

                </tr>

                <tr className='tablaAdicionalRow'>
                    <td>{registro.id_vehiculo}</td>
                    <td>{registro.matricula}</td>
                    <td colSpan={2}>{registro.marca}</td>
                    <td colSpan={1}>{registro.modelo}</td>
                    <td>{registro.tara}</td>
                    <td>{registro.carga_maxima}</td>
                    <td colSpan={3}>{registro.nickname}</td>

                </tr>

            </>

        );
    }

    handleClickInfo(id_viaje) {

        //tenemos el id y mostramos o no opcion +info
        this.state.id_viaje_info === id_viaje ?
            this.setState((prevState) => ({

                id_viaje_info: id_viaje,
                InfoAdicional: !prevState.InfoAdicional,
            })) : this.setState((prevState) => ({

                id_viaje_info: id_viaje,
                InfoAdicional: true,
            }))

    }

    handleClickModificar(registro) {

        this.setState({ redireccion: true, registroSelect: registro });
        //Estado modificar o informar
    }

    handleClickSwitch(registro) {

        var seleccion = this.state.seleccion; // Copia el objeto seleccion del estado

        if (seleccion !== '' && seleccion === registro.id_viaje) {
            // Si la clave ya existe en seleccion, la eliminamos
            seleccion = '';
        } else {
            // Si la clave no existe, la agregamos
            seleccion = registro.id_viaje;
        }

        // Actualizamos el estado con la nueva selección
        this.setState({ seleccion });

    }

    handleClickBorrar(registro) {

        const seleccionJSON = JSON.stringify(this.state.seleccion)
        let parametros = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': sessionStorage.getItem('token')
            }
        }


        const url = `http://localhost:8080/api/inOut/${registro.id_viaje}/${registro.id_tipo}/${seleccionJSON}`;// por el momento queda en el tintero
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
                        this.componentDidMount();
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


    render() {


        const Fila = this.state.InOut.map((registro, index) => {
            return (
                <>
                    {this.renderInfo(registro, index)}
                </>
            )

        });
        const Form = this.state.redireccion ? (<AgregarInOut registro={this.state.registroSelect} extra={true} />) : (null);
        // Renderizo la tabla y el formulario para modificar


        return (
            <>
                <div className='container-fluid bottom '>
                    <div className='row-fluid'>
                        <div className='col-fluid'>
                            {this.props.borrar === true ? <h2>Eliminar Registro</h2> : <h3>Registro de Acceso</h3>};
                        </div>
                    </div>
                    <div className='row-fluid'>
                        <div className='col-fluid'>

                            <table className="table table-striped table-hover">

                                <thead >
                                    <tr>
                                        <th>
                                            Id_Viaje
                                        </th>
                                        <th>
                                            Tipo
                                        </th>
                                        <th>
                                            Fecha
                                        </th>
                                        <th>
                                            Hora
                                        </th>
                                        {/* <th>
                                            Origen
                                        </th>
                                        <th>
                                            Destino
                                        </th> */}
                                        <th>
                                            Carga
                                        </th>
                                        <th>
                                            Peso Total
                                        </th>
                                        <th>
                                            Chofer
                                        </th>
                                        <th >
                                            Vehiculo
                                        </th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody >
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

export default RegistroInOut;


export function RegistroInOut({ extra, borrar }) {

    const parametros = useParams();

    const useNavigateP = useNavigate();

    return (
        <>
            <RegistroInOutClass extra={extra} borrar={borrar} useNavigateEnvuelto={useNavigateP} params={parametros} />
        </>
    );
}



