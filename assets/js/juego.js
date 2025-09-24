/**
 * Vamos a crear dos montones de tarjetas, uno de películas y otro de recursos relacionados:
 * 
 */
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
        for(let j = 1; j <= NELEMENTSPMOVIE; j++) {
            elementDeck.push("0"+i+"C"+j)
        } 
    }
    //Barajamos
    elementDeck = _.shuffle(elementDeck)
    return elementDeck;
}

//let movieDeck = getMoviesDeck()
let peliculas = Array.from(getMoviesDeck())
//let elementDeck = getElementsDeck()
let elementos = Array.from(getElementsDeck())

const eventoClickPeliculas = () => {
    const botonClick = document.getElementById("btn pelicula");
    const contenedorImagen = document.querySelector("#pelicula-caratula");
    
    botonClick.addEventListener('click', ()=>{
            if(peliculas.length > 0){
                peli = quitarPeli(peliculas)
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
    const contenedorImagen = document.querySelector("elementos")

    botonClick.addEventListener('click', ()=>{
        if (elementos.length > 0){
            tarjeta = quitarPeli(elementos)
            const imgTarjeta = document.createElement("img")
            imgTarjeta.src = `assets/characters/${tarjeta}.jpg`
            imgTarjeta.classList.add('elemento')

            contenedorImagen.appendChild(imgTarjeta)
        }
    })
}

eventoClickPeliculas()
eventoClickTarjetas()
    //Cuando le demos al click se ponga una carta aleatoria 

