import React, { useState } from "react";
import {useEffect } from 'react';
import { Redirect } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../registro/registro.css';
import axios from "axios";
import swal from "sweetalert";

function LoginGoogle() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [alreadyRegistered, setAlreadyRegistered] = useState(true);
    const rol ="User"
    var estado=false;
    const [validacion, setValidacion] = useState(false);
    var error=[];
    
    useEffect(() => {
        axios.get('http://localhost:3001/obtainstate', {
           
        }).then((response) => {
            console.log(response.data);
            estado=response.data;
        });
    }, []);



    useEffect(() => {
        axios.get('http://localhost:3001/obtainnameemail', {
           
        }).then((response) => {
            console.log(response.data);
            setEmail(response.data.email);
            setName(response.data.name);
        });
    }, []);

    const enviar = () => {
        axios.post('https://ezbuyb.herokuapp.com/api/user/register', {
            name: name,
            email: email,
            password: password,
            rol: rol,
            alreadyRegistered:true
        }).then(response => {
            console.log(response.data)
            console.log(response.data.mensaje, response.data.name)
            if (response.data.mensaje === false) {
                swal({
                    title: "Error",
                    text: "Usuario ya existe",
                    icon: "error"
                })
            }
            else {
                if(response.data.error){
                    swal({
                        title:"Error",
                        text:response.data.error,
                        icon:"error"
                    })
                }
                else{
                    swal({
                        title: "Bienvenido " + response.data.name,
                        text: "Bienvenido a EzBuy, por favor inicia sesion",
                        icon: "success"
                    })
                    setValidacion(true)
                }
            }
        });
    }
    if (validacion === true) {
        console.log(name, email, password)
        return <Redirect to={"/"} />
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1>Registro Usuario</h1>
                    <h5 className="card-subtittle text-muted">EzBuy</h5>
                    <input type="text" placeholder="Nombres" disabled value={name} />
                    <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
                    <input type="text" placeholder="Correo" disabled value={email} />
                    <input type="text" placeholder="Rol" disabled value="Usuario"/>
                    <a className="btn btn-block" onClick={enviar}>Registrarse</a>
                    {console.log(name, email, password)}
                </div>
            </div>
        </div>
    );
}
export default LoginGoogle;