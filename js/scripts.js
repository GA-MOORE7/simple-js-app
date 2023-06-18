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

    // Create a showModal function using Bootstrap
        function showModal(item) {
            
            let modalBody = $('.modal-body');
            let modalTitle = $('.modal-title');
            let modalHeader = $('.modal-header');

            modalTitle.empty();
            modalBody.empty();

            let nameElement = $("<h1>" + item.name + "</h1>"); 

            let imageElement = $('<img class="modal-img style="width:50%">');
            imageElement.attr("src", item.imageUrl);
            
            // let imageElementBack = $('<img class="modal-img" style="width:50%">');
            // imageElementBack.attr("src", item.imageUrlBack);
            
            let heightElement = $("<p>" + "height : " + item.height + "</p>");

            let weightElement = $("<p>" + "weight : " + item.weight + "</p>");         
           
            modalTitle.append(nameElement);
            modalBody.append(imageElement);
            // modalBody.append(imageElementBack);
            modalBody.append(heightElement);
            modalBody.append(weightElement);

            item.types.forEach(item => {
                let typesElement = $("<p>" + "types : " + item.type.name + "</p>");                
                modalBody.append(typesElement);
            })

            item.abilities.forEach(item => {
                let abilitiesElement = $("<p>" + "abilities : " + item.ability.name + "</p>");                 
                modalBody.append(abilitiesElement); 
            })       
                    
        };
      
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

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
          showModal(item);  
        });        
    }

// Pokemon list with buttons
    function addListItem(pokemon) {
        let container = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');

        // task 10 (step 2)
        listItem.classList.add('list-group-item');
        
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');

        // task 10 (step 3)
        button.classList.add('btn');
        button.classList.add('btn-primary');

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
            item.weight = details.weight;
            item.abilities = details.abilities;
            // item.imageUrlBack = details.imageUrlBack;
            // item.imageElementFront = details.imageUrlFront;
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
        showDetails: showDetails,         
    };  
})();


// forEach loop
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);      
  });
});
