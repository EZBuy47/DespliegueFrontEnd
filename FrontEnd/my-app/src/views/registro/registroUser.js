import React, { useState } from "react";
import { Redirect } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import './registro.css';
import axios from "axios";
import swal from "sweetalert";

function RegistroUser() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const rol ="User"
    const [validacion, setValidacion] = useState(false);
    var error=[];

    const enviar = () => {
        axios.post('http://localhost:4000/api/user/register', {
            name: name,
            email: email,
            password: password,
            rol: rol
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
                    <input type="text" placeholder="Nombres" onChange={e => setName(e.target.value)} />
                    <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
                    <input type="text" placeholder="Correo" onChange={e => setEmail(e.target.value)} />
                    <input type="text" placeholder="Rol" disabled value="Usuario"/>
                    <a className="btn btn-block" onClick={enviar}>Registrarse</a>
                    {console.log(name, email, password)}
                </div>
            </div>
        </div>
    );
}
export default RegistroUser;