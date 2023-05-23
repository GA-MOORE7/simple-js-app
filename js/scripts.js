(function () {
    let pokemonList = [
        {name: 'Pikachu', height: 0.4, type: 'electric'},
        {name: 'Pidgeot', height: 1.5, type: ['normal', 'flying']},
        {name: 'Horsea', height: 0.4, type: 'water'},
        {name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
        {name: 'Beedrill', height: 1, type: ['bug', 'poison']}
]})();

pokemonList.forEach(function(pokemon) {
    if (pokemon.height < 1.6) {
        document.write('<li>' + pokemon.name + ' ' + '(height: ' + pokemon.height + ')' + '</li>');
    } else {
        document.write('<li>' + pokemon.name + ' ' + '(height: ' + pokemon.height + ')' + ' - Wow, that\'s big!' + '</li>'); 
    }   
}
);
