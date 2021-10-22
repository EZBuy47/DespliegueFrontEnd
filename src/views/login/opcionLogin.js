import React from "react";
import './opcionLogin.css';

function OpcionLogin (){

    const Usuario = () =>{
        window.location.replace('./loginUser');
    }
    const Admin = () =>{
        window.location.replace('./loginAdmin');
    }
    return(
        <div className="container"><h1>Seleccione la opcion de Inicio de Sesion</h1>
            <hr></hr>
            <div className="contenedorOpciones">
                <button className="opcion" onClick={() => { Usuario() }}><span>Usuario</span></button>
                <button className="opcion" onClick={() => { Admin() }}><span>Administrador</span></button>
            </div>
        </div>
    )
}
export default OpcionLogin;