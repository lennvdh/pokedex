///// VARIABLES
//// DOM elements
const pokename = document.querySelector('.name');
const frontimg = document.querySelector('.pokemonFrontImg');
const backimg = document.querySelector('.pokemonBackImg');
const idCtn = document.querySelector('.idScreenCtn');
const typeHeading = document.querySelector('.typeHeading');
const pokeTypes = document.querySelector('.types');
const pokemoves = document.querySelectorAll('.pokeMove');
const waringMsg = document.querySelector('.warningCtn');
const prevEvo = document.querySelector('.prevEvo');
const nextEvo = document.querySelector('.nextEvo');
const imgctn = document.getElementById('pokemontypecolor');

//// Buttons to add event listener
// Button to display pokemon
const run = document.getElementById('run');
// Button to display previous/next id
const prevId = document.querySelector('#prevId');
const nextId = document.querySelector('#nextId');

////// FUNCTIONS
//// Assist functions
// Function to capitalize the first letter of string
const capitalizeString = (string) => string.charAt(0).toUpperCase()+string.substring(1,string.length);
// Function to clear the field
const clearDisplay = () => {
    idCtn.innerHTML = '';
    pokename.innerHTML = '';
    typeHeading.innerHTML = '';
    pokeTypes.innerHTML = '';
    pokemoves.forEach(item => item.innerHTML = '');
    frontimg.style.background = 'none';
    backimg.style.background = 'none';
    prevEvo.innerHTML = '';
    prevEvo.classList.remove('displayed');
    nextEvo.innerHTML = '';
    nextEvo.classList.remove('displayed');
    imgctn.style.backgroundColor = "#000"


}

//// Main functions
// function to display pokemon
const displayPokemon = (pokemon) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            idCtn.innerHTML = data.id;
            //// Fetching evolution chain id
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}/`)
                .then(response2 => response2.json())
                .then(data2 => {
                    fetch(data2.evolution_chain.url)
                        .then(response3 => response3.json())
                        .then(data3 => {
                            let path = data3.chain;
                            let evolutionArr = [path.species.name];

                            // Define a function to collect the names of all evolutions on this series
                            const getSpecies = path => {
                                while (path.evolves_to.length > 0) {
                                    //evolutionArr.push(path.evolves_to[0].species.name);
                                    for(let i = 0; i<path.evolves_to.length; i++){
                                        evolutionArr.push(path.evolves_to[i].species.name);
                                    }
                                    path = path.evolves_to[0];
                                }
                            }
                            // Call function
                            getSpecies(path);
                            // Find position of the current pokemon in the series of evolutions
                            let pos = evolutionArr.indexOf(data.name);
                            // Variables to store the name of the previous/next evolution (if they exists)
                            let prevEvolutionName = '', nextEvolutionName = '';
                            // Check if there is a previous evolution
                            if (pos-1 >= 0) {
                                prevEvolutionName = evolutionArr[pos-1];
                                // Fetch and display image of the previous evolution
                                fetch(`https://pokeapi.co/api/v2/pokemon/${prevEvolutionName}`)
                                    .then(res => res.json())
                                    .then(data => {
                                        prevEvo.innerHTML = `<img src="${data.sprites.front_shiny}"/>`;
                                        // Add click event to this image
                                        document.querySelector('.prevEvo img').addEventListener('click', ()=>{
                                            clearDisplay();
                                            displayPokemon(prevEvolutionName);
                                        })
                                    })
                            }

                            // Check if there is a next evolution
                            if (pos+1 < evolutionArr.length) {
                                nextEvolutionName = evolutionArr[pos+1]
                                // Fetch and display image of the next evolution
                                fetch(`https://pokeapi.co/api/v2/pokemon/${nextEvolutionName}`)
                                    .then(res => res.json())
                                    .then(data => {
                                        nextEvo.innerHTML = `<img src="${data.sprites.front_shiny}"/>`;
                                        // Add click event to this image
                                        document.querySelector('.nextEvo img').addEventListener('click', ()=>{
                                            clearDisplay();
                                            displayPokemon(nextEvolutionName);
                                        })
                                    })
                            }
                        })
                })

            // Displaying all information concerning the current pokemon
            pokename.innerHTML = data.name.toUpperCase();
            frontimg.style.background = `url(${data.sprites.front_shiny}) center no-repeat`;
            frontimg.style.backgroundSize = 'contain';
            backimg.style.background = `url(${data.sprites.back_shiny}) center no-repeat`;
            backimg.style.backgroundSize = 'contain';
            typeHeading.innerHTML = 'Type:';
            for (let i = 0; i < data.types.length; i++) {
                if (i === 0) {
                    pokeTypes.innerHTML += `<p>${capitalizeString(data.types[i].type.name)}</p>`
                } else {
                    pokeTypes.innerHTML += `<p> - ${capitalizeString(data.types[i].type.name)}</p>`
                }
                if(data.types[0].type.name === "grass"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#78C850";
                }else if(data.types[0].type.name === "fire"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#AB1F23";
                }else if(data.types[0].type.name === "water"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#86A8FC";
                }else if(data.types[0].type.name === "dragon"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#448B95";
                }else if(data.types[0].type.name === "bug"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#A8B820";
                }else if(data.types[0].type.name === "dark"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#5A5979";
                }else if(data.types[0].type.name === "electric"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#EAEB41";
                }else if(data.types[0].type.name === "fairy"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#FFAEC9";
                }else if(data.types[0].type.name === "normal"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#A8A878";
                }else if(data.types[0].type.name === "ice"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#DCEDED";
                }else if(data.types[0].type.name === "ground"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#E0C068";
                }else if(data.types[0].type.name === "flying"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#A890F0";
                }else if(data.types[0].type.name === "poison"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#A040A0";
                }else if(data.types[0].type.name === "fighting"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#C03028";
                }else if(data.types[0].type.name === "psychic"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#F85888";
                }else if(data.types[0].type.name === "rock"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#B8A038";
                }else if(data.types[0].type.name === "ghost"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#8A77AA";
                }else if(data.types[0].type.name === "steel"){
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#B8B8D0";
                }else{
                    document.getElementById('pokemontypecolor').style.backgroundColor = "#fff";
                }
            }

            // Make an array storing maximum 4 random index values to display elements in array "data.moves"
            let randomMove = [];
            if(data.moves.length > 4){
                for (let i = 0; randomMove.length < 4; i++) {
                    let num = Math.floor(Math.random() * data.moves.length);
                    if (randomMove.indexOf(num) === -1) {
                        randomMove.push(num);

                    }
                }
                for(let i = 0; i < randomMove.length; i++){
                    pokemoves[i].innerHTML = capitalizeString(data.moves[randomMove[i]].move.name);
                }
            }else{
                for(let i =0; i < data.moves.length; i++){
                    pokemoves[i].innerHTML = capitalizeString(data.moves[i].move.name);
                }
            }
            

        })
        .catch(err => {
            console.log(err);
            waringMsg.style.display = 'block';
            setTimeout(()=>{
                waringMsg.style.display = 'none';
            }, 3000);
        })
    ;
}

////// UI action
//// Search button
run.addEventListener('click', (e) => {
    e.preventDefault();
    let pokemon = document.getElementById('pokeinput').value.toLowerCase();
    clearDisplay();
    displayPokemon(pokemon);
    document.getElementById('pokeinput').value = '';
})


//// Prev/next Id button
prevId.addEventListener('click', () => {
    let id = parseInt(idCtn.innerHTML);
    if (id > 1) {
        id--;
    }
    clearDisplay();
    displayPokemon(id);
})

nextId.addEventListener('click', () => {
    let id = parseInt(idCtn.innerHTML);
    let totalNumberPokemon = 964;
    if (id < totalNumberPokemon) {
        id++;
    }
    clearDisplay();
    displayPokemon(id);
})

