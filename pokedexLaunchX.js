const searchBtn = document.getElementById('search-btn'); // search button
const inputField = document.getElementById('pokeName'); // search field input
const nameScreen = document.getElementById('name-screen'); //name-screen
//const imageScreen = document.getElementById('main-screen'); // image screen
//const imageScreen = document.getElementById('pokeImg'); // image screen
const aboutScreen = document.getElementById('about-screen'); // about-text screen
const typeScreen = document.getElementById('type-screen'); // type screen
const idScreen = document.getElementById('id-screen'); // spices screen

const fetchPokemon = () =>{
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) => {
        //console.log(res);
        if(res.status!="200"){
            console.log(res);
            nameScreen.innerHTML = "No encontrado";
            typeScreen.innerHTML = "N/A";
            idScreen.innerHTML = "";
            aboutScreen.innerHTML = "Sin informacion";
            inputField.value = '';
            pokeImage("./sad-pikachu.gif");
            return;
        }else{
            return res.json();
        }        
    }).then((data) => {
        console.log(data);
        
        let id = ('00' + data.id).slice(-3);
        //imageScreen.style.backgroundImage = `url('https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png')`;
        
        //let pokeImg = data.sprites.front_default;
        let pokeImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
        //console.log(pokeImg);
        pokeImage(pokeImg);
        nameScreen.innerHTML = data.name;
        typeScreen.innerHTML = data.types[0].type.name;
        idScreen.innerHTML = `#${data.id}`;
        aboutScreen.innerHTML = `Height: ${data.height * 10}cm Weight: ${
        data.weight / 10
        }kg`;
        inputField.value = '';
    })
}

//fetchPokemon();

const pokeImage = (url) => {
    console.log(url);
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
    //imageScreen.style.backgroundImage = url;
}

//pokeImage("");

const imprimir = () =>{
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value;
    console.log("Hola " + pokeInput);
}









/*const getPokemonData = (pokemon) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => response.json())
    .then((data) => {
      let id = ('00' + data.id).slice(-3);
      imageScreen.style.backgroundImage = `url('https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png')`;
      nameScreen.innerHTML = data.name;
      typeScreen.innerHTML = data.types[0].type.name;
      idScreen.innerHTML = `#${data.id}`;
      aboutScreen.innerHTML = `Height: ${data.height * 10}cm Weight: ${
        data.weight / 10
      }kg`;
      inputField.value = '';
    });
};*/

inputField.addEventListener(
    'keydown',
    (event) => event.key === 'Enter' && searchBtn.click()
  );

//searchBtn.addEventListener('click', () => getPokemonData(inputField.value));
searchBtn.addEventListener('click', () => fetchPokemon());