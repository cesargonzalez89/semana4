const searchBtn = document.getElementById('search-btn'); // search button
const inputField = document.getElementById('pokeName'); // search field input
const nameScreen = document.getElementById('name-screen'); //name-screen
const aboutScreen = document.getElementById('about-screen'); // about-text screen
const heightScreen = document.getElementById('height-screen'); // height screen
const weightScreen = document.getElementById('weight-screen'); // spices screen

const fetchPokemon = () =>{
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) => {
        //console.log(res);
        if(res.status!="200"){
            console.log(res);
            nameScreen.innerHTML = "No encontrado";
            aboutScreen.innerHTML = "Sin informacion";
            heightScreen.innerHTML = ``;
            weightScreen.innerHTML = ``;
            document.getElementById("type1").style.backgroundImage = `url('')`;
            document.getElementById("type2").style.backgroundImage = `url('')`;
            inputField.value = '';
            pokeImage("./sad-pikachu.gif");
            return;
        }else{
            return res.json();
        }        
    }).then((data) => {
        console.log(data);
        
        let id = ('00' + data.id).slice(-3);
        let pokeImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
        //console.log(pokeImg);
        pokeImage(pokeImg);
        setDescription(id);

         // Set Type
         if(data.types.length > 0){
            document.getElementById("type1").style.backgroundImage = `url('${getAssetTypeEs(data.types[0].type.name)}')`;
        }
        if(data.types.length > 1){
            document.getElementById("type2").style.backgroundImage = `url('${getAssetTypeEs(data.types[1].type.name)}')`;
        } else {
          document.getElementById("type2").style.backgroundImage = `url('')`;
        }

        nameScreen.innerHTML = data.name;
        heightScreen.innerHTML = `Altura: ${data.height}M`;
        weightScreen.innerHTML = `Peso: ${data.weight}Kg`;
        inputField.value = '';
    })
}

//fetchPokemon();

const pokeImage = (url) => {
    console.log(url);
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}

//pokeImage("");

const imprimir = () =>{
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value;
    console.log("Hola " + pokeInput);
}

inputField.addEventListener(
    'keydown',
    (event) => event.key === 'Enter' && searchBtn.click()
  );

//searchBtn.addEventListener('click', () => getPokemonData(inputField.value));
searchBtn.addEventListener('click', () => fetchPokemon());










function setDescription(numPokemon){
    fetch("https://pokeapi.co/api/v2/pokemon-species/" + numPokemon)
      .then((response) => response.json())
      .then((data) => {
        // Set description of Pokemon
        if(data.flavor_text_entries.find((text_entry) => text_entry.language.name === 'es')){
          var description = data.flavor_text_entries.find((text_entry) => text_entry.language.name === 'es').flavor_text;
          description = description.replace(/\n/g, ' ').replace(/\f/g, ' ');
          aboutScreen.innerHTML= description;
        }
      });
  }
  
  function getAssetTypeEs(type){
      console.log(type);
    switch(type){
      case 'normal':
        return './Tipo_normal.gif';
      case 'fighting':
        return './Tipo_lucha.gif';
      case 'flying':
        return './Tipo_volador.gif';
      case 'poison':
        return './Tipo_veneno.gif';
      case 'ground':
        return './Tipo_tierra.gif';
      case 'rock':
        return './Tipo_roca.gif';
      case 'bug':
        return './Tipo_bicho.gif';
      case 'ghost':
        return './Tipo_fantasma.gif';
      case 'steel':
        return './Tipo_acero.gif';
      case 'fire':
        return './Tipo_fuego.gif';
      case 'water':
        return './Tipo_agua.gif';
      case 'grass':
        return './Tipo_planta.gif';
      case 'electric':
        return './Tipo_el%C3%A9ctrico.gif';
      case 'psychic':
        return './Tipo_ps%C3%ADquico.gif';
      case 'ice':
        return './Tipo_hielo.gif';
      case 'dragon':
        return './Tipo_drag%C3%B3n.gif';
      case 'dark':
        return './Tipo_siniestro.gif';
      case 'fairy':
        return './Tipo_hada.gif';
      default:
        return './UnknownIC_Big.png';
    }
  }
  