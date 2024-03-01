
document.addEventListener('DOMContentLoaded', async function () {

    try {

        //fetch() es una función integrada en JavaScript que se utiliza para 
        //realizar solicitudes de red y obtener recursos de forma asíncrona.
        //Puede hacer solicitudes a recursos en la web, como archivos JSON, imágenes, 
        //archivos de texto, etc.


        //Espere a que se adquiera los datos del json y luego metalo en la variable "response"
        const responseMarvel = await fetch('data/marvel.json');
        const responseDc = await fetch('data/dc.json');

        //Una vez tenemos los datos en la variable, lo pasamos a convertir en un arvicho.json.
        const dataMarvel = await responseMarvel.json();
        const dataDc = await responseDc.json();

        //Traemos del html (document) el container con el id "card-container" 
        //y lo agregamos a una variable.
        const cardContainer = document.getElementById('card-container');


        const cardContainerMarvel = document.getElementById('containerMarvel');
        const cardContainerDc = document.getElementById('containerDc');


        const dialog = document.querySelector('.modal');



        //itera sobre cada elemento del arreglo data, y para cada elemento, 
        //ejecuta el código definido dentro de la función de flecha.
        createCard(dataMarvel, cardContainerMarvel);
        createCard(dataDc, cardContainerDc);


        function createCard(data, section) {
            data.forEach(cardData => {


                const card = document.createElement('div'); //Creamos el contenedor de cada card
                card.classList.add('card'); //le añadimos el nombre de la clase al contenedor div.


                const img = document.createElement('img'); //Agregamos la imagen al contenedor
                img.src = cardData.picture;


                const cardInfo = document.createElement('div');//Creamos un contenedor para el name y button
                cardInfo.classList.add('cardInfo');


                const name = document.createElement('p'); //Agregamos el nombre
                name.textContent = cardData.name;


                const button = document.createElement('button');//Agregamos el boton
                button.textContent = cardData.button;

                const cerrarButton = document.getElementById('botonModal');

                function mostrarModal (){
                   
                    const imgModal = document.getElementById('imagenModal');
                    imgModal.src = cardData.picture;

                    const tituloModal = document.getElementById('tituloModal');
                    tituloModal.textContent = cardData.name;

                    const descripcionModal = document.getElementById('descripcionModal');
                    descripcionModal.textContent = cardData.description;

                    dialog.show();
                }

                function cerrarModal(){
                    dialog.close();
                }

                
                button.addEventListener('click', function () { //Le aladimos funcionalidad al boton
                
                    mostrarModal();
                
                });

                cerrarButton.addEventListener('click', function () { //Le aladimos funcionalidad al boton
                
                    cerrarModal();
                
                });

                card.appendChild(img);
                card.appendChild(cardInfo);
                cardInfo.appendChild(name);
                cardInfo.appendChild(button);
                section.appendChild(card);
            });
        }

        //NO TOCAR
        const inputBuscador = document.getElementById('input');
        console.log(inputBuscador);

        inputBuscador.addEventListener('input', () => {
            let busquedaDePersonaje = inputBuscador.value.toUpperCase();
            console.log(busquedaDePersonaje);

            const marvelFilter = dataMarvel.filter(personaje => personaje.name.toUpperCase().includes(busquedaDePersonaje));
            const dcFilter = dataDc.filter(personaje => personaje.name.toUpperCase().includes(busquedaDePersonaje));

            cardContainerMarvel.innerHTML = '';
            cardContainerDc.innerHTML = '';

            createCard(marvelFilter, cardContainerMarvel);
            createCard(dcFilter, cardContainerDc);

        })
        //NO TOCAR

    } catch (error) {
        console.log('Hubo un error al obtener los datos:', error);
    }

    const sections = document.querySelectorAll('.section');

    const valueSelect = document.getElementById('universos');

    valueSelect.addEventListener('change', function () {
        
        const selectedValue = valueSelect.value;
        console.log(selectedValue)
        sections.forEach(section => {
            if (section.id === selectedValue) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    });

});

