let pokemon = document.getElementById('pokeinput').value;
let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
fetch(url)
    .then(response => response.json())
    .then((data) => {
        console.log(data)
    });