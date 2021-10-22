import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from "react-router";
import Cookies from "universal-cookie";
import { withRouter } from 'react-router-dom';

function Productos() {
    const [validacion, setValidacion] = useState(true);
    const [listaProductos, setListaProductos] = useState([]);
    const cookies = new Cookies();
    const cook = cookies.get('auth-token')
    console.log(cook)
    axios.post('http://localhost:4000/api/admin', {
        cook
    }).then((response) => {
        console.log(response.data);
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
    useEffect(() => {
        axios.get('http://localhost:4000/api/product/allProducts', {
        }).then((response) => {
            setListaProductos(response.data);
        });
    }, []);
    const verProducto = async (id) =>{
        const cookies = new Cookies();
        await cookies.set('buyProductid',id,{maxAge:10*60},{path:'/'})
        window.location.replace('./verProduct');
    }
    return (
        <div className="productos">
            {listaProductos.reverse().map((val, key) => {
                return (
                    <div className="card">
                        <div className="card-body" >
                            <button className="btn btn-block" onClick={()=> verProducto(val._id)} >Comprar&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                                </svg>
                            </button>
                            <h1 className="card-title">{val.name}</h1>
                            <h5 className="card-subtittle text-muted">EzBuy</h5>
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Vendido por:</span>
                                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled value={val.nameU} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
export default Productos;