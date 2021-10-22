import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './inicio.css';
function inicio(){
    return(
        <body>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div className="contenedor1">
                            <h1 className="bienvenida">Bienvenido</h1>
                            <p className="parrafo">Aqui se supone que va algo para describir la empresa pero no se me ocurre nada</p>
                            <hr></hr>
                            <a class="btn btn-block">Registrar</a>
                            <hr></hr>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}
export default inicio;