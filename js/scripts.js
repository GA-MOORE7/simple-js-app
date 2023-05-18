let pokemonList = [
    {name: 'Pikachu', height: 0.4, type: 'electric'},
    {name: 'Pidgeot', height: 1.5, type: ['normal', 'flying']},
    {name: 'Horsea', height: 0.4, type: 'water'},
    {name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
    {name: 'Beedrill', height: 1, type: ['bug', 'poison']}
];

// Create a list of Pokemon using a for loop (+ conditional)
for (let i=0; i < pokemonList.length; i++) {
    if (pokemonList[i].height < 1.6) {
        document.write('<li>' + pokemonList[i].name + ' ' + '(height: ' + pokemonList[i].height + ')' + '</li>');
    } else {
        document.write('<li>' + pokemonList[i].name + ' ' + '(height: ' + pokemonList[i].height + ')' + ' - Wow, that\'s big!' + '</li>'); 
    }   
}

