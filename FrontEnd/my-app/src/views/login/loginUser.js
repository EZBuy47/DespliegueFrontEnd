import React, { useState } from "react";
import { Redirect } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../registro/registro.css'
import axios from "axios";
import Cookies from "universal-cookie";
import swal from 'sweetalert';
import { useHistory, useParams } from "react-router-dom";

function Login(){
    const history = useHistory();
    const[password,setPassword] = useState("");
    const[email,setEmail] =useState("");
    const[Redireccionar,setRedireccionar]=useState(false);

    const enviar = ()=>{
        axios.post('http://localhost:4000/api/user/loginUser',{
            email:email,
            password:password
        }).then(async (response)=>{
            if(response.data.message=="success"){
                const cookies = new Cookies();
                await cookies.set('auth-token',response.data.token, {path:'/'})
                swal({
                    title:"Bienvenido Usuario",
                    icon:"success"
                });
                setTimeout(1000);
                setRedireccionar(true)
            }
            else{
                const error =response.data;
                swal({
                    title:"Error al iniciar Sesion",
                    text:response.data.error,
                    icon:"error"
                })
            } 
        });
    }
    if(Redireccionar === true){
        window.location.replace('./home');
    }
    return(
            <div class="card">
                <div class="card-body">
                    <h1>Iniciar Sesion</h1>
                    <h5 class="card-subtittle text-muted">EzBuy</h5>
                    <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)}/>
                    <a class="btn btn-block" onClick={enviar}>Iniciar Sesion</a>
                    {console.log(email,password)}
                </div>
            </div>
    );
}
export default Login;