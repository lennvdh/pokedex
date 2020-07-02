const run = document.getElementById('run');
run.addEventListener('click', (e)=>{
    e.preventDefault();
    let pokemon = document.getElementById('pokeinput').value.toLowerCase();
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            console.log(data.id);
            console.log(data.types)
            console.log(data.moves);
            for(let i = 0; i<data.moves; i++){
                console.log(data.moves[i]);
            }
        });
})
