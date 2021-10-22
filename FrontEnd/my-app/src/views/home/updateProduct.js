import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";
import './myProducts.css'
import './updateProduct.css'

function Update() {
    const [validacion, setValidacion] = useState(true);
    var id = "";
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
        id = verificar.id;
        console.log(verificar)
    }
    catch {
        console.log("No hay Token")
    }

    const [name, setName] = useState("");
    const [reference, setReference] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [cuantity, setCuantity] = useState(0);

    const idProduct = cookies.get('idProduct')
    console.log(id)
    useEffect(() => {
        axios.get(`http://localhost:4000/api/product/product/${idProduct}`, {
        }).then((response) => {
            console.log(response.data)
            setName(response.data.name)
            setReference(response.data.reference)
            setPrice(response.data.price)
            setDescription(response.data.description)
            setCuantity(response.data.cuantity)
        });
    }, []);
    const actualizar = () => {
        axios.put(`http://localhost:4000/api/product/update/${idProduct}`, {
            name: name,
            reference: reference,
            price: price,
            description: description,
            cuantity: cuantity,
            id: id
        }).then((response) => {
            console.log(response.data)
            cookies.remove('idProduct');
            window.location.replace('./myProducts');
        });
    }

    const borrar = () => {
        axios.delete(`http://localhost:4000/api/product/delete/${idProduct}`, {

        }).then((response) => {
            console.log(response.data.mensaje)
            cookies.remove('idProduct');
            window.location.replace('./myProducts');
        });
    }
    const regresar = () => {
        cookies.remove('idProduct');
        window.location.replace('./myProducts');
    }
    const verificarBorrar = () => {
        swal({
            title: "Advertencia",
            text: "¿Esta seguro de eliminar el producto?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(respuesta => {
            if (respuesta) {
                swal({
                    title: "Producto Eliminado",
                    icon: "success"
                })
                borrar()
            }
        })
    }
    const verificarActualizacion = () => {
        swal({
            title: "Advertencia",
            text: "¿Esta seguro de actualizar el producto?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(respuesta => {
            if (respuesta) {
                swal({
                    title: "Producto Actualizado",
                    icon: "success"
                })
                actualizar()
            }
        })
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1>Actualizar Producto</h1>
                    <h5 className="card-subtittle text-muted">EzBuy</h5>
                    <input type="text" value={name} placeholder="Nombre" onChange={(event) => { setName(event.target.value) }} />
                    <input type="text" value={reference} placeholder="Referencia" onChange={(event) => { setReference(event.target.value) }} />
                    <input type="text" value={price} placeholder="Precio" onChange={(event) => { setPrice(event.target.value) }} />
                    <input type="text" value={description} placeholder="Descripcion" onChange={(event) => { setDescription(event.target.value) }} />
                    <input type="text" value={cuantity} placeholder="Cantidad" onChange={(event) => { setCuantity(event.target.value) }} />
                    <hr></hr>
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Vendido por:</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled value={id} />
                    </div>
                    <hr></hr>
                    <div className="botonesUpdate">
                        <a className="actualizar" onClick={() => verificarActualizacion()}><span>Actualizar</span></a>
                        <a className="borrar" onClick={() => verificarBorrar()}><span>Borrar</span></a>
                        <a className="regresar" onClick={() => regresar()}><span>Regresar</span></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Update;