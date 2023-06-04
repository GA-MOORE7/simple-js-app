let pokemonRepository = (function() {
    let modalContainer = document.querySelector('#modal-container');
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; 

    function getAll() {
        return pokemonList;
    }
    function add(pokemon) { 
        if (
          typeof pokemon === "object" && 
          'name' in pokemon //&&
          //'detailsUrl' in pokemon
        ) {
          pokemonList.push(pokemon)
        } else {
            console.log('pokemon is not correct');
        }        
    }

    /* Create a showModal function */
    function showModal(title, text, image) {
        // let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal)

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        let imageElement = document.createElement('img');
        imageElement.src = image;


        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(imageElement);
        modal.appendChild(contentElement);        
        modalContainer.appendChild(modal);
        
        modalContainer.classList.add('is-visible');
      }
      
    function hideModal() {
        // let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        // let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    // let modalContainer = document.querySelector('#modal-container');
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function() 
        {
          console.log(item);
          showModal(item.name, `Height: ${item.height}`, item.imageUrl);  
        });        
    }

// Pokemon list with buttons
    function addListItem(pokemon) {
        let container = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        container.appendChild(listItem);
        //Event listener with click functionality
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        });        
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                //console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }
    
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        getAll: getAll,
        add: add,
        loadList: loadList,
        loadDetails: loadDetails, 
        addListItem: addListItem,
        showDetails: showDetails           
    };  
})();

// Test of return functions inside IIFE
// console.log(pokemonRepository.getAll());
// pokemonRepository.add({ name: 'Squirtle', height: 1, types: ['poop']});
// console.log(pokemonRepository.getAll());


// forEach loop
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);      
  });
});
