import "./style.scss";
import Swal from "sweetalert2";
import json from "./pokemon.json";

var pokemon = json[Math.floor(Math.random() * json.length)];

Swal.fire({
    title: pokemon.name,
    html: `Types: ${pokemon.type.join(", ")}<br>Length: ${pokemon.length}<br><a onclick="window.open('/')" style="color:teal">Homepage</a>`,
    allowOutsideClick: false,
    showConfirmButton: false
});