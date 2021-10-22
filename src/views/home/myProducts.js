import React from "react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";
import './myProducts.css'

function MisProductos() {
    const [validacion, setValidacion] = useState(true);
    const [listaProductos, setListaProductos] = useState([]);
    const useMountEffect = (fun) => useEffect(fun, []);
    var id = ""
    var nameUser = ""
    const cookies = new Cookies();
    const cook = cookies.get('auth-token');
    axios.post('http://localhost:4000/api/admin', {
        cook
    }).then((response) => {
        if (response.data === false) {
            swal({
                title: "Acceso Denegado",
                text: "Primero inicie Sesion",
                icon: "warning"
            });
            setValidacion(false)
        }
    });
    if (validacion === false) {
        window.location.replace('./');
    }
    try {
        const verificar = jwt.verify(cook, process.env.REACT_APP_TOKEN_SECRET);
        id = verificar.id
        nameUser = verificar.name
        console.log(verificar)
    }
    catch {
        console.log("No hay Token")
    }
    useEffect(() => {
        axios.post('http://localhost:4000/api/product//myProducts', {
            idUser: id
        }).then((response) => {
            setListaProductos(response.data);
            console.log(response.data)
        });
    }, []);
    const update = async (id) => {
        const cookies = new Cookies();
        await cookies.set('idProduct',id,{maxAge:10*60},{path:'/'})
        window.location.replace('./UpdateProduct');
    }
    return (
        <div className="productos">
            {listaProductos.reverse().map((val, key) => {
                return (
                    <div className="card">
                        <div className="card-body" >
                            <button className="btn btn-block" onClick={()=> update(val._id)}>Editar
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-vector-pen" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z" />
                                    <path fill-rule="evenodd" d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z" />
                                </svg>
                            </button>
                            <h1 className="card-title">{val.name}</h1>
                            <h5 className="card-subtittle text-muted">EzBuy</h5>
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Vendido por:</span>
                                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled value={nameUser} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
export default MisProductos;