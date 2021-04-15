import "./style.scss";
import Swal from "sweetalert2";
import json from "./pokemon.json";

var pokemon = json[Math.floor(Math.random() * json.length)];

Swal.fire({
    title: pokemon.name,
    html: `Types: ${pokemon.type.join(", ")}<br>Length: ${pokemon.length}<br><a target="_blank" href="/">Homepage</a>`,
    allowOutsideClick: false,
    showConfirmButton: false
});