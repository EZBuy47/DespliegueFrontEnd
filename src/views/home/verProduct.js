import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";

function VerProducto() {
    const [validacion, setValidacion] = useState(true);
    const cookies = new Cookies();
    const cook = cookies.get('auth-token');

    var idComprador = ""
    var nameComprador = ""
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
        idComprador = verificar.id;
        nameComprador = verificar.name;
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
    const [idUser, setIdUser] = useState("");
    const [nameP, setnameP] = useState("");
    const [cantidadCompra, setCantidadCompra] = useState(0);
    var total = 0;
    var nuevaCantidad = 0;

    const idProduct = cookies.get('buyProductid');
    useEffect(() => {
        axios.get(`http://localhost:4000/api/product/product/${idProduct}`, {
        }).then((response) => {
            console.log(response.data)
            setName(response.data.name)
            setReference(response.data.reference)
            setPrice(response.data.price)
            setDescription(response.data.description)
            setCuantity(response.data.cuantity)
            setnameP(response.data.nameU)
            setIdUser(response.data.idUser)
        });
    }, []);

    const verificarCompra = () => {
        console.log(cuantity)
        console.log(cantidadCompra)
        total = cantidadCompra * price;
        if (cantidadCompra <= cuantity) {
            swal({
                title: "¿Esta seguro de realizar la compra?",
                text: "El total a pagar seria " + "$ " + total,
                icon: "warning",
                buttons: ["No", "Si"]
            }).then(respuesta => {
                if (respuesta) {
                    swal({
                        title: "Compra Realizada",
                        icon: "success"
                    })
                    nuevaCantidad = cuantity - cantidadCompra;
                    compra();
                }
            });
        }
        else {
            swal({
                title: "El vendedor cuenta con solo " + cuantity + " cantidades disponibles",
                icon: "warning"
            });
        }
    }
    const regresar = () => {
        cookies.remove('buyProductid');
        window.location.replace('./home');
    }
    const compra = () => {
        axios.post('http://localhost:4000/api/compras/addCompra', {
            nameVendedor: nameP,
            idVendedor: idUser,
            idProduct: idProduct,
            nameComprador: nameComprador,
            idComprador: idComprador,
            CantidadComprada: cantidadCompra,
            TotalPago: total
        })
        console.log(nuevaCantidad)
        axios.put(`http://localhost:4000/api/product/update/${idProduct}`, {
            name: name,
            reference: reference,
            price: price,
            description: description,
            cuantity: nuevaCantidad,
            id: idUser
        }).then(response => {
            console.log("Compra Realizada")
            cookies.remove('buyProductid')
            window.location.replace('./home');
        });
    }
    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1>Comprar Producto</h1>
                    <h5 className="card-subtittle text-muted">EzBuy</h5>
                    <input type="text" disabled value={name} placeholder="Nombre" />
                    <input type="text" disabled value={reference} placeholder="Referencia" />
                    <input type="text" disabled value={price} placeholder="Precio" />
                    <input type="text" disabled value={description} placeholder="Descripcion" />
                    <input type="text" disabled value={cuantity} placeholder="Cantidad" />
                    <input type="text" placeholder="Cantidad a Comprar" onChange={(event) => { setCantidadCompra(event.target.value) }} />
                    <hr></hr>
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Vendido por:</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled value={idUser} />
                    </div>
                    <hr></hr>
                    <div className="botonesUpdate">
                        <a className="comprar" onClick={() => verificarCompra()}><span>Comprar</span></a>
                        <a className="regresar" onClick={() => regresar()}><span>Regresar</span></a>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default VerProducto;