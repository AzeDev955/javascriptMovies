/**
 * Vamos a crear dos montones de tarjetas, uno de películas y otro de recursos relacionados:
 * 
 */
const draggables = [document.querySelectorAll(".draggable")];
const containerDrag = document.querySelectorAll(".adivinar");

const NMOVIES = 5
const NELEMENTSPMOVIE = 3
const getMoviesDeck = () => {
    let movieDeck = []
    for(let i = 1; i <= NMOVIES; i++) {
        movieDeck.push("0"+i+"M")
    }
    //Barajamos con un método dela librería Underscore. Esta librería ofrece muchas funciones,
    //en este caso uso shuffle que recibe un arrayy lo devuelve de forma aleatoria
    movieDeck = _.shuffle(movieDeck)
    console.log(typeof(movieDeck))
    return movieDeck;
}
const quitarPeli = (listaPelis) => {
    if(listaPelis.lenght === 0){
        throw 'No hay mas tarjetas'
    }
    tarjeta = listaPelis.pop()
    return tarjeta
}
const getElementsDeck = () => {
    let elementDeck = []
    for(let i = 1; i <= NMOVIES; i++) {
        for(let j = 0; j < NELEMENTSPMOVIE; j++) {
            elementDeck.push("0"+i+"C"+j)
        } 
    }
    //Barajamos
    elementDeck = _.shuffle(elementDeck)
    return elementDeck;
}

//let movieDeck = getMoviesDeck()
let peliculas = Array.from(getMoviesDeck())
let elementos = Array.from(getElementsDeck())

const eventoClickPeliculas = () => {
    const botonClick = document.getElementById("btn pelicula");
    const contenedorImagen = document.querySelector("#pelicula-caratula");
    
    botonClick.addEventListener('click', ()=>{
            if(peliculas.length > 0){
                let peli = quitarPeli(peliculas)
                const imgPeli = document.createElement("img");
                imgPeli.src = `assets/movies/${peli}.jpg`
                imgPeli.classList.add('elemento')

                const imagenAnterior = contenedorImagen.querySelector("img");

                if (imagenAnterior) {

                  contenedorImagen.replaceChild(imgPeli, imagenAnterior);

                } else {

                    contenedorImagen.appendChild(imgPeli);
                    
                }
            }
        }
    )
}

const eventoClickTarjetas = () => {
    const botonClick = document.getElementById("btn adivinar")
    const contenedorImagen = document.querySelector("#elementos-pelicula")

    botonClick.addEventListener('click', ()=>{
        if (elementos.length > 0){
            

            let personaje = quitarPeli(elementos);
            const imgPersonaje = document.createElement("img");
            imgPersonaje.src = `assets/characters/${personaje}.jpg`;
            imgPersonaje.classList.add("elemento");
            imgPersonaje.setAttribute("draggable","true")
            draggables.push(imgPersonaje)
            hacerImgDraggable(imgPersonaje)
            contenedorImagen.appendChild(imgPersonaje)

            
        }
    })
}


const botonRestart = () => {
    const botonClick = document.getElementById("btn restart")

    botonClick.addEventListener('click', ()=>{
        let pelis = document.querySelector("#pelicula-caratula");
        let personajes = document.querySelector("#elementos-pelicula");
        let containers = document.querySelectorAll(".adivinar")

        containers.forEach(container =>{
            container.innerHTML = "";
        })
        pelis.innerHTML= "";
        personajes.innerHTML="";
        peliculas = Array.from(getMoviesDeck())
        elementos = Array.from(getElementsDeck())

    })
}


const hacerImgDraggable = (img) =>{
    img.addEventListener("dragstart", (e) => {
      img.classList.add("dragging");
      draggedElement = img;
      e.dataTransfer.effectAllowed = "move";
    });

    img.addEventListener("dragend", () => {
      img.classList.remove("dragging");
      draggedElement = null;
    });
}


containerDrag.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  container.addEventListener("drop", (e) => {
    e.preventDefault();
    if (draggedElement && container.children.length < 1) {
      container.appendChild(draggedElement);

      //aqui quiero poner una funcion entera que devuelva un boolean, la funcion tiene que comprobar la imagen c
      //con la pelicula y de ahi agregar la peli o sumar un intento
    }
  });
});



eventoClickPeliculas()
eventoClickTarjetas()
botonRestart()
    

