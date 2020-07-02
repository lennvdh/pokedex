// variables
const pokename = document.querySelector('.name');
const frontimg = document.querySelector('.pokemonFrontImg');
const backimg = document.querySelector('.pokemonBackImg');
const run = document.getElementById('run');
const id = document.querySelector('.idScreenCtn');
const pokeTypes = document.querySelector('.types');
const pokemoves = document.querySelectorAll('.pokeMove')

run.addEventListener('click', (e)=>{
    e.preventDefault();
    let pokemon = document.getElementById('pokeinput').value.toLowerCase();
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            id.innerHTML = data.id;
            pokename.innerHTML = data.name;
            frontimg.innerHTML = `<img src=${data.sprites.front_shiny} alt='front' />`
            backimg.innerHTML = `<img src=${data.sprites.back_shiny} alt='back' />`
            for(let i = 0; i<data.types.length; i++){
                pokeTypes.innerHTML += `<p>${data.types[i].type.name.toUpperCase()}</p>`
            }
            console.log(data);
            console.log(data.types)
            console.log(data.moves);
            let randomMove = []; 
            for (let i = 0; randomMove.length < 4; i++) {
                let num = Math.floor(Math.random()*data.moves.length);
                if (randomMove.indexOf(num) === -1) {
                    randomMove.push(num);
                        pokemoves[i].innerHTML = data.moves[num].move.name.toUpperCase();
                } 
            }

        });
})
