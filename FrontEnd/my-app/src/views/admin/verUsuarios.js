import React from "react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";
import '../home/myProducts.css'

function VerUsuarios (){
    const [validacion, setValidacion] = useState(true);
    const [listausers, setListaUsers] = useState([]);
    const useMountEffect = (fun) => useEffect(fun, []);
    var id = ""
    var nameUser = ""
    const cookies = new Cookies();
    const cook = cookies.get('auth-token');
    axios.post('http://localhost:4000/api/colsuAdmin', {
        cook
    }).then((response) => {
        console.log(response.data)
        if (response.data === false) {
            swal({
                title: "Acceso Denegado",
                text: "Primero inicie Sesion",
                icon: "warning"
            });
            setValidacion(false)
        }
        if(response.data.mensaje === false){
            swal({
                title:"Advertencia",
                text:"Usted no es Administrador",
                icon:"warning"
            })
            setTimeout(2000)
            window.location.replace('./home');
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
        axios.get('http://localhost:4000/api/user/allUsers', {
        }).then((response) => {
            setListaUsers(response.data);
            console.log(response.data)
        });
    }, []);
    return(
        <div className="productos">
            {listausers.reverse().map((val, key) => {
                return (
                    <div className="card">
                        <div className="card-body" >
                            <h1 className="card-title">{val.name}</h1>
                            <h5 className="card-subtittle text-muted">EzBuy</h5>
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text" id="inputGroup-sizing-sm">Nombre Usuario:</span>
                                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled value={val.name} />
                            </div>
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text" id="inputGroup-sizing-sm">Email:</span>
                                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled value={val.email} />
                            </div>
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text" id="inputGroup-sizing-sm">Rol de Usuario:</span>
                                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled value={val.rol} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default VerUsuarios;