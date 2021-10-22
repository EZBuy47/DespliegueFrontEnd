import React, { useState } from "react";
import { Redirect } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../registro/registro.css'
import axios from "axios";
import Cookies from "universal-cookie";
import swal from 'sweetalert';
import { useHistory, useParams } from "react-router-dom";

function Logout() {
    const cookies = new Cookies();
    cookies.remove('auth-token');
    window.location.replace('./');
    axios.get('http://localhost:4000/api/user/logout').then((response) => {
        console.log(response)
    });
    return (
        <div className="container">
        </div>
    )
}
export default Logout;