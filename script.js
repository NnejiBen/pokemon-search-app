document.getElementById('search-button').addEventListener('click', function(event) {
    event.preventDefault();
    
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(data => {
            // Destructure data
            const { name, id, weight, height, sprites, types, stats } = data;
            
            // Update name and ID
            document.getElementById('pokemon-name').textContent = name.toUpperCase();
            document.getElementById('pokemon-id').textContent = `#${id}`;
            
            // Update weight and height
            document.getElementById('weight').textContent = `Weight: ${weight}`;
            document.getElementById('height').textContent = `Height: ${height}`;
            
            // Update image
            let imgElement = document.getElementById('sprite');
            if (!imgElement) {
                imgElement = document.createElement('img');
                imgElement.id = 'sprite';
                document.querySelector('.weight-and-height').appendChild(imgElement);
            }
            imgElement.src = sprites.front_default;

            // Update types
            const typesContainer = document.getElementById('types');
            typesContainer.innerHTML = '';  // Clear previous types
            types.forEach(typeInfo => {
                const typeElement = document.createElement('div');
                typeElement.textContent = typeInfo.type.name.toUpperCase();
                typesContainer.appendChild(typeElement);
            });

            // Update stats
            document.getElementById('hp').textContent = stats[0].base_stat;
            document.getElementById('attack').textContent = stats[1].base_stat;
            document.getElementById('defense').textContent = stats[2].base_stat;
            document.getElementById('special-attack').textContent = stats[3].base_stat;
            document.getElementById('special-defense').textContent = stats[4].base_stat;
            document.getElementById('speed').textContent = stats[5].base_stat;
        })
        .catch(error => {
            alert(error.message);
        });
});