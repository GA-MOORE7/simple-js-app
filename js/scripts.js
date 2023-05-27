let pokemonRepository = (function () {

    let pokemonList = [
        {name: 'Pikachu', height: 0.4, types: ['electric']},
        {name: 'Pidgeot', height: 1.5, types: ['normal', 'flying']},
        {name: 'Horsea', height: 0.4, types: ['water']},
        {name: 'Charizard', height: 1.7, types: ['fire', 'flying']},
        {name: 'Beedrill', height: 1, types: ['bug', 'poison']}
    ];

    function getAll () {
        return pokemonList;
    }
    function add (pokemon) { 
        if (
          typeof pokemon === "object" && 
          'name' in pokemon &&
          'height' in pokemon &&
          'types' in pokemon
        ) {
          pokemonList.push(pokemon)
        } else {
            console.log('pokemon is not correct');
        }        
    }

    function addListItem (pokemon){
        let container = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        container.appendChild(listItem);
    }

    return {
        getAll: getAll,
        add: add, 
        addListItem: addListItem             
    };  
})();

// Test of return functions inside IIFE
// console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Squirtle', height: 1, types: ['poop']});
// console.log(pokemonRepository.getAll());

// forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);      
});
