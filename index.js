

const btnSearchPokemon = document.getElementById("btn");
const display = document.getElementById("wrap-img");
const displayOff = document.getElementById("display-off");
const notFindLed = document.getElementById("not-find");
const findLed = document.getElementById("find");
const btnReset = document.getElementById("reset");

btnReset.addEventListener("click", reset);
btnSearchPokemon.addEventListener("click", displayPokemon);

function reset() {
  findLed.className = "fnd fnd-off";
  notFindLed.className = "fnd fnd-off";
  display.innerHTML = "";
  displayOff.style.display = "flex";
  let userInput = (document.getElementById("word").value = "");
  let par = document.getElementById("text");
  displayOff.removeChild(par);
}

async function displayPokemon() {
  try {
    let userInput = document.getElementById("word").value.trim();
    let url = `https://pokeapi.co/api/v2/pokemon/${toLower(userInput)}`;
    const response = await fetch(url);
    const pokemon = await response.json();
    if (userInput.length == 0) return error();
    display.style.display = "flex"

    displayOff.style.display = "none";
    display.innerHTML = `
    <div id="img">
          <img
            src="${pokemon.sprites.other["official-artwork"].front_default}"
            alt="Imagine"
          />
          <div id="info">
            <p>Nome : <span class="info-pokemon">${capitalizeTheFirstLetter(
              pokemon.name
            )}</span></p>
            <p>Altezza : <span class="info-pokemon">${pokemon.height}</span></p>
            <p>Numero : <span class="info-pokemon"> ${pokemon.id}</span></p>
            <p>Peso : <span class="info-pokemon"> ${pokemon.weight}</span></p>
            <p>Abilità : <span class="info-pokemon"> ${capitalizeTheFirstLetter(
              pokemon.abilities[0].ability.name
            )} // ${capitalizeTheFirstLetter(
      pokemon.abilities[1].ability.name
    )} </span></p>
            <p>Tipo : <span class="info-pokemon">${capitalizeTheFirstLetter(
              pokemon.types[0].type.name
            )}</p>
          </div>
        </div>
    `;
    notFindLed.className = "fnd fnd-off";
    findLed.className = "fnd fnd-ok";
    document.getElementById("word").value = "";
  } catch {
    document.getElementById("word").value = "";
    error();
  }
}

function error() {
  let prev = document.getElementById("text");
  display.style.display = "none"
  if (!prev) {
  } else {
    displayOff.removeChild(prev);
  }
  notFindLed.className = "fnd fnd-not";
  findLed.className = "fnd fnd-off";
  let par = document.createElement("p");
  par.setAttribute("id", "text");
  par.textContent = "Pokemon not found 😬";
  displayOff.appendChild(par);
  displayOff.style.display = "flex"
}

function toLower(string) {
  return string.toLowerCase();
}

function capitalizeTheFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}
