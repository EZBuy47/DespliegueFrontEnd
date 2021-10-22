import React from "react";
import '../login/opcionLogin.css';

function OpcionRegistro() {

    const Usuario = () => {
        window.location.replace('./registroUser');
    }
    const Admin = () => {
        window.location.replace('./registroAdmin');
    }
    return (
        <div className="container"><h1>Seleccione la opcion de registro</h1>
            <hr></hr>
            <div className="contenedorOpciones">
                <button className="opcion" onClick={() => { Usuario() }}><span>Usuario</span></button>
                <button className="opcion" onClick={() => { Admin() }}><span>Administrador</span></button>
            </div>
        </div>
    )
}
export default OpcionRegistro;