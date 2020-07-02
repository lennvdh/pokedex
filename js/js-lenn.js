let url = "https://pokeapi.co/api/v2/pokemon/ditto";
fetch(url)
    .then(response => response.json)
    .then(poke => {
        console.log(poke)
    })