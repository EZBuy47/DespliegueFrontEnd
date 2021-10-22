import React from "react";
import { useState } from 'react';
import axios from "axios";
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";


function Agregar() {
    const [validacion, setValidacion] = useState(true);
    const [name, setName] = useState("");
    const [reference, setReference] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [cuantity, setCuantity] = useState(0);
    var id = "";
    var nameU ="";
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
        nameU = verificar.name
        console.log(id,nameU)
    }
    catch {
        console.log("No hay Token")
    }

    const enviarDatos = () => {
        axios.post('http://localhost:4000/api/product/addproduct', {
            name: name,
            reference: reference,
            price: price,
            description: description,
            cuantity: cuantity,
            idUser: id,
            nameU: nameU
        }).then((response) => {
            if (response.data.mensaje === true) {
                window.location.replace('./myProducts');
            }
        });
    }
    const comprobar = () => {
        const error = [];
        if (!cuantity) {
            error.push({ text: "Por favor ingrese cantidad" });
        }
        if (!description) {
            error.push({ text: "Por favor ingrese descripcion" });
        }
        if (price == 0) {
            error.push({ text: "Por favor ingrese precio" });
        }
        if (!reference) {
            error.push({ text: "Por favor ingrese referencia" });
        }
        if (!name) {
            error.push({ text: "Por favor ingrese nombre" });
        }
        if (error.length > 0) {
            error.map((texto, index) => {
                var unir = texto.text;
                swal({
                    title: unir,
                    icon: "error",
                    button: "Aceptar"
                })
            });
        }
        else {
            console.log("Enviando...")
            enviarDatos();
        }
    }
    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1>Agregar Producto</h1>
                    <h5 className="card-subtittle text-muted">EzBuy</h5>
                    <input type="text" placeholder="Nombre" onChange={(event) => { setName(event.target.value) }} />
                    <input type="text" placeholder="Referencia" onChange={(event) => { setReference(event.target.value) }} />
                    <input type="text" placeholder="Precio" onChange={(event) => { setPrice(event.target.value) }} />
                    <input type="text" placeholder="Descripcion" onChange={(event) => { setDescription(event.target.value) }} />
                    <input type="text" placeholder="Cantidad" onChange={(event) => { setCuantity(event.target.value) }} />
                    <hr></hr>
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Vendido por:</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled value={id} />
                    </div>
                    <a className="btn btn-block" onClick={() => comprobar()}>Agregar Producto</a>
                </div>
            </div>
        </div>
    );
}
export default Agregar;