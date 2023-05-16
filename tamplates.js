function doNotClose(event) {
    event.stopPropagation();
}


function closeInfoCardContainer() {
    document.getElementById('infoCardContainer').classList.add('d-none');
    document.getElementById('body').style="";
}


function picturOne(i, bigPictureNow, bigPictureAgo){
    document.getElementById('bigPicture').innerHTML = `
        <img id="bigPictureNow" src="${bigPictureNow}">
        <img onclick="bigPictureAgo(${(i)})" class="selectPokemon" src="${bigPictureAgo}">
    `;
}


function pictureCenter(i, bigPictureNow, bigPictureAgo){
    let bigPictureBack = pokedex[i - 1].sprites.other['official-artwork'].front_default;
    document.getElementById('bigPicture').innerHTML = `
        <img onclick="bigPictureBack(${(i)})" class="selectPokemon" src="${bigPictureBack}">
        <img id="bigPictureNow" src="${bigPictureNow}">
        <img onclick="bigPictureAgo(${(i)})" class="selectPokemon" src="${bigPictureAgo}">
    `;
}


function pictureLast(C){
    let bigPictureBack = pokedex[i - 1].sprites.other['official-artwork'].front_default;
    document.getElementById('bigPicture').innerHTML = `
        <img onclick="bigPictureBack(${(i)})" class="selectPokemon" src="${bigPictureBack}">
        <img id="bigPictureNow" src="${bigPictureNow}">
    `;
}


function bigPictureBack(i) {
    infoCard(i - 1);
}


function bigPictureAgo(i) {
    infoCard(i + 1);
}


function load1PokemonTyp(typ1b, index1){
    document.getElementById('characterTyp').innerHTML = `
        <span>Typ: </span>
        <span style="border-bottom: 4px solid ${pokeTypcolor[index1]};border-top: 4px solid ${pokeTypcolor[index1]}">${typ1b}</span>
    `;
}


function load2PokemonTyp(typ1b, typ2b, index1, index2){
    document.getElementById('characterTyp').innerHTML = `
        <span>Typ: </span>
        <span style="border-bottom: 4px solid ${pokeTypcolor[index1]};border-top: 4px solid ${pokeTypcolor[index1]}">${typ1b}</span>
        <span>/</span>
        <span style="border-bottom: 4px solid ${pokeTypcolor[index2]};border-top: 4px solid ${pokeTypcolor[index2]}">${typ2b}</span>
    `;
}


function tableAndProgress(hp, attack, defense, specialAttack, specialDefense, speed){
   return `
    <tr>
        <td>HP:</td>
        <td>
            <div class="progressContainer">
                <div class="progressBar" style="width: ${hp}%">${hp}</div>
            </div>
        </td>
    </tr>
    <tr>
        <td>Attack:</td>
        <td>
            <div class="progressContainer">
                <div class="progressBar" style="width: ${attack}%">${attack}</div>
            </div>
        </td>
    </tr>
    <tr>
        <td>Defense</td>
        <td>
            <div class="progressContainer">
                <div class="progressBar" style="width: ${defense}%">${defense}</div>
            </div>
        </td>
    </tr>
    <tr>
        <td>Special-Attack:</td>
        <td>
            <div class="progressContainer">
                <div class="progressBar" style="width: ${specialAttack}%">${specialAttack}</div>
            </div>
        </td>
    </tr>
    <tr>
        <td>Secial-Defense:</td>
        <td>
            <div class="progressContainer">
                <div class="progressBar" style="width: ${specialDefense}%">${specialDefense}</div>
            </div>
        </td>
    </tr>
    <tr>
        <td>Speed:</td>
        <td>
            <div class="progressContainer">
                <div class="progressBar" style="width: ${speed}%">${speed}</div>
            </div>
        </td>
    </tr>
`;
}