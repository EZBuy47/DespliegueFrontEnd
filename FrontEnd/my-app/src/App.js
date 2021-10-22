import React from "react";
import { Route } from 'react-router-dom';
import Encabezado from "./views/bienvenido/Encabezado"
import inicio from './views/bienvenido/inicio';
import registroUser from './views/registro/registroUser';
import loginUser from './views/login/loginUser';
import addProduct from './views/home/addProduct';
import Logout from "./views/logout/logout";
import home from './views/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import myProduct from './views/home/myProducts';
import updateProducts from './views/home/updateProduct';
import verProduct from './views/home/verProduct';
import './App.css';
import OpcionLogin from "./views/login/opcionLogin";
import LoginAdmin from "./views/login/loginAdmin";
import OpcionRegistro from "./views/registro/opcionRegistro";
import RegistroAdmin from "./views/registro/registroAdmin";
import MisCompras from "./views/compras/comprasUser";
import AllCompras from "./views/admin/allCompras";
import VerUsuarios from "./views/admin/verUsuarios";


function App() {
  return (
    <div className="App">
      <Encabezado />
      <Route exact path="/" component={inicio}/>
      <Route exact path= '/registroUser' component={registroUser}/>
      <Route exact path= '/loginUser' component = {loginUser}/>
      <Route exact path= '/addProduct' component = {addProduct}/>
      <Route exact path= '/home' component = {home}/>
      <Route exact path= '/logout' component = {Logout}/>
      <Route exact path= '/myProducts' component ={myProduct}/>
      <Route exact path= '/UpdateProduct' component ={updateProducts}/>
      <Route exact path= '/verProduct' component={verProduct} />
      <Route exact path= '/opcionLogin' component={OpcionLogin} />
      <Route exact path= '/loginAdmin' component={LoginAdmin} />
      <Route exact path= '/opcionRegistro' component={OpcionRegistro} />
      <Route exact path= '/registroAdmin' component={RegistroAdmin}/>
      <Route exact path= '/misCompras' component={MisCompras} />
      <Route exact path= '/allCompras' component={AllCompras} />
      <Route exact path= '/allUsers' component={VerUsuarios}/>
    </div>
  );
}

export default App;
