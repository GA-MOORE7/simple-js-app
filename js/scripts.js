let pokemonList = [
    {name: 'Pikachu', height: 0.4, type: 'electric'},
    {name: 'Pidgeot', height: 1.5, type: ['normal', 'flying']},
    {name: 'Horsea', height: 0.4, type: 'water'},
    {name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
    {name: 'Beedrill', height: 1, type: ['bug', 'poison']}
];

for (let i=0; i < pokemonList.length; i++) {
    document.write('<li>' + pokemonList[i].name + ' ' + '(height: ' + pokemonList[i].height + ')' + '</li>'); 
}

