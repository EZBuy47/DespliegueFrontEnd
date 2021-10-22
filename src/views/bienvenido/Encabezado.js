import React from "react";
import { Component } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Encabezado.css';
import logo2 from './logo2.png';
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";

class Encabezado extends Component {
    render() {
        const cookies = new Cookies();
        const cook = cookies.get('auth-token');
        var verificacion = "";
        var existeUsuario = false;
        var existeAdmin = false;
        var InicioRegistro = true;
        try {
            const verificar = jwt.verify(cook, process.env.REACT_APP_TOKEN_SECRET);
            InicioRegistro = false;
            verificacion = verificar;
        }
        catch {
            console.log("No hay Token")
        }
        
        const name = verificacion.name;
        const id = verificacion.id;
        const rol = verificacion.rol;
        if(rol=="Admin"){
            existeAdmin=true;
        }
        if(rol== "User"){
            existeUsuario=true;
        }
        console.log(name, id)
        return (
            <div className="container-fluid">
                <nav className="navbar navbar-expand justify-content-between">
                    <nav className="navbar-nav">
                        <div className="container">
                            <img src={logo2} className="App-logo" />
                        </div>
                        <div className="containerNombre" >
                            <Link className="home" to="/" style={{ textDecoration: 'none' }}>EzBuy</Link>
                        </div>
                        {existeUsuario &&
                            <div className="containerNombre" >
                                <Link className="home" to="/home" style={{ textDecoration: 'none' }}>Bienvenido&nbsp;&nbsp;{name}</Link>
                            </div>
                        }
                        {existeAdmin &&
                            <div className="containerNombre" >
                                <Link className="home" to="/home" style={{ textDecoration: 'none' }}>Administrador&nbsp;{name}</Link>
                            </div>
                        }
                    </nav>
                    <nav className="navbar-nav">
                        <div className="botones">
                            {InicioRegistro &&
                                <Link className="link" to="/opcionRegistro" style={{ textDecoration: 'none' }}><span>Registro</span></Link>
                            }
                            {InicioRegistro &&
                                <Link className="link" to="/opcionLogin" style={{ textDecoration: 'none' }}><span>Iniciar Sesion</span></Link>
                            }
                            {InicioRegistro &&
                                <Link className="link" to="#" style={{ textDecoration: 'none' }}><span>Contactanos</span></Link>
                            }
                            {InicioRegistro &&
                                <Link className="link" to="#" style={{ textDecoration: 'none' }}><span>Sobre Nosotros</span></Link>
                            }
                            {existeUsuario &&
                                <Link className="link" to="/myProducts" style={{ textDecoration: 'none' }}> <span>Mis Productos </span></Link>
                            }
                            {existeUsuario &&
                                <Link className="link" to="/addProduct" style={{ textDecoration: 'none' }}> <span>Agregar Productos </span></Link>
                            }
                            {existeUsuario &&
                                <Link className="link" to="/misCompras" style={{ textDecoration: 'none' }}> <span>Mis Compras</span> </Link>
                            }
                            {existeUsuario &&
                                <Link className="link" to="/logout" style={{ textDecoration: 'none' }}> <span>Salir </span></Link>
                            }
                            {existeAdmin &&
                                <Link className="link" to="/allUsers" style={{ textDecoration: 'none' }}> <span>Ver Usuarios </span></Link>
                            }
                            {existeAdmin &&
                                <Link className="link" to="/home" style={{ textDecoration: 'none' }}> <span>Ver Productos </span></Link>
                            }
                            {existeAdmin &&
                                <Link className="link" to="/allCompras" style={{ textDecoration: 'none' }}> <span>Ver Compras </span></Link>
                            }
                            {existeAdmin &&
                                <Link className="link" to="/logout" style={{ textDecoration: 'none' }}> <span>Salir </span></Link>
                            }
                        </div>
                    </nav>
                </nav>
                <hr></hr>
            </div>
        );
    }
}
export default Encabezado;