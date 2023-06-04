let currentPokemon;
let pokedex = [];
let pokeNames = [];
let offset = 0;
let pokemonLimit = 50;
const pokeTyp = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'];
const pokeTypcolor = ['#A9A878', '#F07F2F', '#6890F0', '#78C74F', '#F7D02F', '#98D8D8', '#BE1F37', '#A040A1', '#E0C068', '#A890F0', '#F85888', '#A8B821', '#B7A038', '#705797', '#6F5848', '#7038F8', '#B8B8CF', '#EE99AC'];


function init() {
    first50Pokemon();
}


//-----------------------------------------------------//
//-------------------- API include --------------------//
//-----------------------------------------------------//


async function first50Pokemon(){
    for (i = 1; i <= 50; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        pokedex.push(currentPokemon);
    }
    loadPokemon();
    allPokemon();
}


async function allPokemon() {
    for (i = 51; i <= 350; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        pokedex.push(currentPokemon);
    }
    loadNames();
}


//--------------------------------------------------------------//
//-------------------- Array pokeNames fill --------------------//
//------------------------ for search --------------------------//
//--------------------------------------------------------------//


function loadNames() {
    for (i = 0; i < pokedex.length; i++) {
        pokeNames.push(pokedex[i].name);
    }
}


//------------------------------------------------------//
//-------------------- show PokeDex --------------------//
//------------------------------------------------------//


function loadPokemon() {

    for (i = offset; i < pokemonLimit; i++) {
        let pokeId = pokedex[i].id;
        let pokeName = pokedex[i].name;
        pokeName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
        renderPokemon(i, pokeId, pokeName);
    }
    document.getElementById('morePokemon').classList.remove('d-none');
}


function renderPokemon(i, pokeId, pokeName) {
    document.getElementById('allPokemon').innerHTML += `
        <div class="pokeCard">
            <div id="pokemonNr${(i)}">
                <div>
                    <div>
                        <span class="pokeId"># ${pokeId}</span>
                    </div>
                    <div>
                        <span class="pokeName">${pokeName}</span>
                    </div>
                </div>
                <div>
                    <img onclick="infoCard(${i})" src="${pokedex[i].sprites.other['official-artwork'].front_default}">
                </div>
            </div>
     </div>
    `;
}


function infoCard(i) {
    document.getElementById('infoCardContainer').classList.remove('d-none');
    document.getElementById('body').style="overflow: hidden;";
    loadIdName(i)
    loadBicPicture(i)
    loadWeightHeight(i)
    loadTable(i)
}


//--------------------------------------------------------------//
//-------------------- load next 20 Pokemon --------------------//
//--------------------------------------------------------------//


function morePokemon() {
    if (pokemonLimit == 350) {
        offset = pokemonLimit;
        pokemonLimit = 10;
        document.getElementById('button').classList.add('d-none');
    } else {
        offset = pokemonLimit;
        pokemonLimit += 20;
    }
    loadPokemon();
}


//-------------------------------------------------------------//
//-------------------- show select Pokemon --------------------//
//-------------------------------------------------------------//


function loadIdName(i) {
    let pokeId = pokedex[i].id;
    let pokeName = pokedex[i].name;
    pokeName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
    document.getElementById('nameId').innerHTML = `
        <span class="pokeIdBig" onclick="closeInfoCardContainer()"># <span>${pokeId}</span></span>
        <span class="pokeNameBig" onclick="closeInfoCardContainer()"><u id="pokeNameBig">${pokeName}</u></span>
    `;
}


function loadBicPicture(i) {
    let bigPictureNow = pokedex[i].sprites.other['official-artwork'].front_default;
    let bigPictureAgo = pokedex[i + 1].sprites.other['official-artwork'].front_default;
    if (i == 0) {
        if (i == 0) {
            picturOne(i, bigPictureNow, bigPictureAgo);
        }
    } else {
        pictureCenter(i, bigPictureNow, bigPictureAgo);
    }
    if (i == 849) {
        pictureLast(i, bigPictureNow, bigPictureAgo);
    }
}


function loadWeightHeight(i) {
    let weight = pokedex[i].weight;
    let height = pokedex[i].height;
    document.getElementById('characterDeteils').innerHTML = `
        <div>Gewicht: <span>${weight}</span> Kg</div>
        <div>Größe: <span>${height}</span> m</div>
        <div id="characterTyp"></div>
        `;
    loadCharacterTyp(i);
}


function loadCharacterTyp(i) {
    let typ1 = pokedex[i].types[0].type['name'];
    let typ1b = typ1.charAt(0).toUpperCase() + typ1.slice(1);
    let index1 = pokeTyp.indexOf(typ1);
    if (pokedex[i].types.length == 1) {
        load1PokemonTyp(typ1b, index1);
    } else {
        let typ2 = pokedex[i].types[1].type['name'];
        let typ2b = typ2.charAt(0).toUpperCase() + typ2.slice(1);
        let index2 = pokeTyp.indexOf(typ2);
        load2PokemonTyp(typ1b, typ2b, index1, index2);
    }
}


function loadTable(i) {
    let hp = pokedex[i].stats[0].base_stat;
    let attack = pokedex[i].stats[1].base_stat;
    let defense = pokedex[i].stats[2].base_stat;
    let specialAttack = pokedex[i].stats[3].base_stat;
    let specialDefense = pokedex[i].stats[4].base_stat;
    let speed = pokedex[i].stats[5].base_stat;
    document.getElementById('table').innerHTML = tableAndProgress(hp, attack, defense, specialAttack, specialDefense, speed);
}


//--------------------------------------------------------//
//-------------------- search Pokemon --------------------//
//--------------------------------------------------------//


function search() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    document.getElementById('allPokemon').innerHTML = ``;
    if (search == 0) {
        offset = 0;
        loadPokemon();
    } else {
        document.getElementById('morePokemon').classList.add('d-none');
        for (let i = 0; i < pokeNames.length; i++) {
            let pokemon = pokeNames[i];
            if (pokemon.toLowerCase().includes(search)) {
                let pokeId = pokedex[i].id;
                let pokeName = pokedex[i].name;
                renderPokemon(i, pokeId, pokeName);
            }
        }
    }
}
