
document.addEventListener('DOMContentLoaded',  async function() { 

    try {
  
      //fetch() es una función integrada en JavaScript que se utiliza para 
      //realizar solicitudes de red y obtener recursos de forma asíncrona.
      //Puede hacer solicitudes a recursos en la web, como archivos JSON, imágenes, 
      //archivos de texto, etc.
  
  
      //Espere a que se adquiera los datos del json y luego metalo en la variable "response"
      const response = await fetch('data/marvel.json');
      
      //Una vez tenemos los datos en la variable, lo pasamos a convertir en un arvicho.json.
      const data = await response.json();
  
      //Traemos del html (document) el container con el id "card-container" 
      //y lo agregamos a una variable.
      const cardContainer = document.getElementById('card-container');
      
  
      const cardContainerMarvel = document.getElementById('card-ContainerMarvel');
      const cardContainerDc = document.getElementById('card-ContainerDc');
  
  
  
      //itera sobre cada elemento del arreglo data, y para cada elemento, 
      //ejecuta el código definido dentro de la función de flecha. 
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
          button.addEventListener('click', function() { //Le aladimos funcionalidad al boton
            modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
              //Para el display de descripcionContainer: Si descripcionContainer es igual a none entonces "display: block", si no "display: none"
            });
  
          
          const modal = document.createElement('div');
          modal.classList.add('description-container');
  
          const span = document.createElement('span');
          span.classList.add('close');
  
          const descriptionContainer = document.createElement('p')
          descriptionContainer.textContent = cardData.description;
  
  
          modal.style.display = 'none';
  
  
  
          card.appendChild(img);
          card.appendChild(cardInfo);
          cardInfo.appendChild(modal);
          cardInfo.appendChild(name);
          cardInfo.appendChild(button);
  
          cardContainer.appendChild(card);
      });
  
  } catch (error) {
      console.log('Hubo un error al obtener los datos:', error);
  }
  });