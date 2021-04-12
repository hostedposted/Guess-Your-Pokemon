import "./style.scss";
import Swal from "sweetalert2";
import json from "./pokemon.json";

const Input = Swal.mixin({
	input: "text",
    allowOutsideClick: false,
	showCancelButton: true,
	showConfirmButton: true
});

const NumberInput = Input.mixin({
	input: "number"
});

const LetterInput = Swal.mixin({
    input: "select",
    allowOutsideClick: false,
    inputOptions: { a: "a", b: "b", c: "c", d: "d", e: "e", f: "f", g: "g", h: "h", i: "i", j: "j", k: "k", l: "l", m: "m", n: "n", o: "o", p: "p", q: "q", r: "r", s: "s", t: "t", u: "u", v: "v", w: "w", x: "x", y: "y", z: "z", "(": "(", ")": ")" }
});

const NumWords = { 1: "first", 2: "second", 3: "third", 4: "fourth", 5: "fifth", 6: "sixth", 7: "seventh", 8: "eighth", 9: "ninth", 10: "tenth", 11: "eleventh", 12: "twelfth" };

function findFirstDifferentCharacter (string1, string2) {
    if (string1.length !== string2.length) return;
    for (let index = 0; index < string1.length; index++) {
        if (string1[index] !== string2[index]) return index;
    }
}

async function main () {
    await Swal.fire({
        title: "How this works.",
        allowOutsideClick: false,
        html: "This tool allows you to guess a pokemon from some clues. <br/><br/>You can get a random pokemon and needed information by going <a onclick='window.open(\"/random.html\")' style='color:teal'>here.<a/> <br/><br/>Or you can get needed info about a pokemon <a onclick='window.open(\"/all.html\")' style='color:teal'>here.</a>"
    });
    const pokemon = json.map(element => element.name);
    const options = { 0: "What are the type/s?", 1: "What is the first letter?", 2: "What is the second letter?", 3: "What is the last letter?", 4: "How many letters are in its name?", 5: "See all pokemon left." };
    while (true) {
        if (pokemon.length === 2) {
            const index = findFirstDifferentCharacter(pokemon[0], pokemon[1]);
            if (index) {
                let letter = await LetterInput.fire({
                    html: `What is the ${NumWords[index + 1]} letter in your pokemon's name?`,
                    icon: "question",
                    allowOutsideClick: false
                });
                if (!letter.value) {
                    await Swal.fire({
                        html: "Invalid input.",
                        icon: "error",
                        allowOutsideClick: false
                    });
                    continue;
                }
                letter = letter.value;
                if (pokemon[0][index] === letter) {
                    await Swal.fire({
                        title: "Pokémon",
                        html: `The Pokemon Is <b>${pokemon[0]}.</b>`,
                        allowOutsideClick: false
                    });
                } else if (pokemon[1][index] === letter) {
                    await Swal.fire({
                        title: "Pokémon",
                        html: `The Pokemon Is <b>${pokemon[1]}.</b>`,
                        allowOutsideClick: false
                    });
                } else {
                    await Swal.fire({
                        title: "Pokémon",
                        html: "Pokemon could not be found.",
                        allowOutsideClick: false
                    });
                }
                break;
            }
        }
        if (pokemon.length === 1) {
            await Swal.fire({
                title: "Pokémon",
                html: `The Pokemon Is <b>${pokemon[0]}.</b>`,
                allowOutsideClick: false
            });
            break;
        }
        if (pokemon.length === 0) {
            await Swal.fire({
                title: "Pokémon",
                html: "Pokemon could not be found.",
                allowOutsideClick: false
            });
            break;
        }
        const picked = await Swal.fire({
            html: "What Question Do You Want To Answer?",
            icon: "question",
            input: "select",
            inputOptions: options,
            allowOutsideClick: false
        });

        if (!picked.value) {
            await Swal.fire({
                html: "Invalid question.",
                icon: "error",
                allowOutsideClick: false
            });
            continue;
        }

        if (parseInt(picked.value) === 0) {
            const amount = await Swal.fire({
                html: "How many type/s does your pokemon have?",
                input: "select",
                inputOptions: ["1 type", "2 types"],
                showCancelButton: true,
                icon: "question",
                allowOutsideClick: false
            });
            if (!amount.value) {
                await Swal.fire({
                    html: "Invalid input.",
                    icon: "error",
                    allowOutsideClick: false
                });
                continue;
            }
            const types = ["normal", "fire", "water", "grass", "flying", "fighting", "poison", "electric", "ground", "rock", "psychic", "ice", "bug", "ghost", "steel", "dragon", "dark", "fairy"];
            if (parseInt(amount.value) === 0) {
                const type = await Swal.fire({
                    html: "What is the type of the pokemon?",
                    input: "select",
                    inputOptions: types,
                    showCancelButton: true,
                    icon: "question",
                    allowOutsideClick: false
                });
                if (!type.value) {
                    await Swal.fire({
                        html: "Invalid input.",
                        icon: "error"
                    });
                    continue;
                }
                json.forEach(element => {
                    if (!element.type.includes(types[parseInt(type.value)]) || element.type.length !== 1) {
                        const index = pokemon.indexOf(element.name);
                        if (index > -1) {
                            pokemon.splice(index, 1);
                        }
                    }
                });
            } else if (parseInt(amount.value) === 1) {
                let type = await Swal.fire({
                    html: "What is the first type of the pokemon?",
                    input: "select",
                    inputOptions: types,
                    showCancelButton: true,
                    icon: "question",
                    allowOutsideClick: false
                });
                if (!type.value) {
                    await Swal.fire({
                        html: "Invalid input.",
                        icon: "error",
                        allowOutsideClick: false
                    });
                    continue;
                }
                json.forEach(element => {
                    if (!element.type.includes(types[parseInt(type.value)])) {
                        const index = pokemon.indexOf(element.name);
                        if (index > -1) {
                            pokemon.splice(index, 1);
                        }
                    }
                });
                type = await Swal.fire({
                    html: "What is the second type of the pokemon?",
                    input: "select",
                    inputOptions: types,
                    showCancelButton: true,
                    icon: "question",
                    allowOutsideClick: false
                });
                if (!type.value) {
                    await Swal.fire({
                        html: "Invalid input.",
                        icon: "error",
                        allowOutsideClick: false
                    });
                    continue;
                }
                json.forEach(element => {
                    if (!element.type.includes(types[parseInt(type.value)])) {
                        const index = pokemon.indexOf(element.name);
                        if (index > -1) {
                            pokemon.splice(index, 1);
                        }
                    }
                });
                await Swal.fire({
                    title: "Success",
                    html: "Pokemon who do not have those types have been removed.",
                    icon: "success",
                    allowOutsideClick: false
                });
                delete options[0];
                continue;
            }
            await Swal.fire({
                title: "Success",
                html: "Pokemon who do not have that type have been removed.",
                icon: "success",
                allowOutsideClick: false
            });
            delete options[0];
        } else if (parseInt(picked.value) === 1) {
            const letter = await LetterInput.fire({
                html: "What letter does your pokemon start with?",
                icon: "question",
                showCancelButton: true
            });
            if (!letter.value) {
                await Swal.fire({
                    html: "Invalid input.",
                    icon: "error",
                    allowOutsideClick: false
                });
                continue;
            }
            json.forEach(element => {
                if (element.name[0] !== letter.value) {
                    const index = pokemon.indexOf(element.name);
                    if (index > -1) {
                        pokemon.splice(index, 1);
                    }
                }
            });
            await Swal.fire({
                title: "Success",
                html: `Pokemon who do not start with ${letter.value} have been removed.`,
                icon: "success",
                allowOutsideClick: false
            });
            delete options[1];
        } else if (parseInt(picked.value) === 2) {
            const letter = await LetterInput.fire({
                html: "What is the second letter in your pokemon's name?",
                icon: "question",
                showCancelButton: true
            });
            if (!letter.value) {
                await Swal.fire({
                    html: "Invalid input.",
                    icon: "error",
                    allowOutsideClick: false
                });
                continue;
            }
            json.forEach(element => {
                if (element.name[1] !== letter.value) {
                    const index = pokemon.indexOf(element.name);
                    if (index > -1) {
                        pokemon.splice(index, 1);
                    }
                }
            });
            await Swal.fire({
                title: "Success",
                html: `Pokemon with a second letter that is not ${letter.value} have been removed.`,
                icon: "success",
                allowOutsideClick: false
            });
            delete options[2];
        } else if (parseInt(picked.value) === 3) {
            const letter = await LetterInput.fire({
                html: "What letter does your pokemon end with?",
                icon: "question",
                showCancelButton: true
            });
            if (!letter.value) {
                await Swal.fire({
                    html: "Invalid input.",
                    icon: "error",
                    allowOutsideClick: false
                });
                continue;
            }
            json.forEach(element => {
                if (element.name[element.name.length - 1] !== letter.value) {
                    const index = pokemon.indexOf(element.name);
                    if (index > -1) {
                        pokemon.splice(index, 1);
                    }
                }
            });
            await Swal.fire({
                title: "Success",
                html: `Pokemon who do not end with ${letter.value} have been removed.`,
                icon: "success",
                allowOutsideClick: false
            });
            delete options[3];
        } else if (parseInt(picked.value) === 4) {
            const length = await NumberInput.fire({
                html: "How many letters are in your pokémon's name?",
                icon: "question",
                showCancelButton: true
            });
            if (!length.value) {
                await Swal.fire({
                    html: "Invalid input.",
                    icon: "error",
                    allowOutsideClick: false
                });
                continue;
            }
            json.forEach(element => {
                if (element.length !== parseInt(length.value)) {
                    const index = pokemon.indexOf(element.name);
                    if (index > -1) {
                        pokemon.splice(index, 1);
                    }
                }
            });
            await Swal.fire({
                title: "Success",
                html: `Pokemon who do not have ${length.value} letters in there name have been removed.`,
                icon: "success",
                allowOutsideClick: false
            });
            delete options[4];
        } else if (parseInt(picked.value) === 5) {
            await Swal.fire({
                html: pokemon.join(", "),
                allowOutsideClick: false
            });
        }
    }
    main();
}

main();
