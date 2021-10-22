import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../registro/registro.css'
import axios from "axios";
import Cookies from "universal-cookie";
import swal from 'sweetalert';

function LoginAdmin(){
    const[password,setPassword] = useState("");
    const[email,setEmail] =useState("");
    const[key,setKey]=useState(0)
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
                    title:"Bienvenido Administrador",
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
    const verificarAdmin = () =>{
        if(key==process.env.REACT_APP_KEY){
            enviar();
        }
        else{
            swal({
                title:"Error",
                text:"LLave incorrecta",
                icon:"error"
            })
        }
    }
    return(
            <div class="card">
                <div class="card-body">
                    <h1>Iniciar Sesion</h1>
                    <h5 class="card-subtittle text-muted">EzBuy</h5>
                    <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)}/>
                    <input type="password" placeholder="Llave Administrador" onChange={e => setKey(e.target.value)}/>
                    <a class="btn btn-block" onClick={verificarAdmin}>Iniciar Sesion</a>
                    {console.log(email,password)}
                </div>
            </div>
    );
}
export default LoginAdmin;