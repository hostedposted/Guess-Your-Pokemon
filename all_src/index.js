import "./style.scss";
import Swal from "sweetalert2";
import json from "./pokemon.json";

(async() => {
const all_pokemon = [];

json.forEach(element => {
    all_pokemon.push(element.name);
});
while (true) {
    const res = await Swal.fire({
        html: "<b>Pick Your Pokémon!</b>",
        input: "select",
        inputOptions: all_pokemon,
        allowOutsideClick: false
    });

    if (!res.value) {
        await Swal.fire("<b>No Pokemon Entered</b>");
        continue;
    }
    const pokemon = json[res.value];

    await Swal.fire({
        title: pokemon.name,
        html: `Types: ${pokemon.type.join(", ")}<br>Length: ${pokemon.length}<br><a target="_blank" href="/">Homepage</a>`,
        allowOutsideClick: false,
    });
}
})();