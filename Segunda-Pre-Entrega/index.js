class Movie{
    constructor(nombre, valoracionIndididual, valoracion, cantidadValoracion){
        this.nombre = nombre;
        this.valoracionIndididual= valoracionIndididual;
        this.valoracion = valoracion;
        this.cantidadValoracion = cantidadValoracion;
    }
}

let Avatar = new Movie("Avatar: El Camino del Agua", 0, 0, 0);
let Wale = new Movie("The Wale", 0, 0, 0);
let Llaman = new Movie("Llaman a la puerta", 0, 0, 0);
let Megan = new Movie("M3gan", 0, 0, 0);
let Gato = new Movie("Gato Con botas: El Ultimo Deseo", 0, 0, 0);

let cartelera = [Avatar, Wale, Llaman, Megan, Gato];

let opcion= parseInt(prompt(`Bienvenido a Play Cinema. Ingrese alguna de las opciones para operar:
                    1-Ver Cartelera
                    2-Ver Valoraciones de la cartelera
                    3-Realizar una valoracion de una pelicula
                    4-Salir`));


function printCartelera(cartelera){
    let mensaje = "Cartelera: \n"
    cartelera.forEach(movie => {
        mensaje +=`\nPelicula: ${movie.nombre}`;
    });
    alert(mensaje);
}

function valoracionTotal(cartelera){
    let mensaje = "Cartelera: \n"
    cartelera.forEach(movie => {
        mensaje +=`\nPelicula: ${movie.nombre}, Valoracion: ${movie.valoracion}`;
    });
    alert(mensaje);
}

function valorateMovie(movie, valoracionIndididual){
    movie.valoracionIndididual = valoracionIndididual;
    movie.cantidadValoracion += 1;
    movie.valoracion = ((movie.valoracion * movie.cantidadValoracion) + movie.valoracionIndididual) / (movie.cantidadValoracion + 1);
}

while(opcion != 4){
    switch(opcion){
        case 1:{
            printCartelera(cartelera);
            break;
        }
        case 2:{
            valoracionTotal(cartelera);
            break;
        }
        case 3:{
            let opcion2 = parseInt(prompt(`Bienvenido al espacio de FeedBack de peliculas en cartelera.
Selecciona el numero correspondiente de la pelicula a valorar o opcion 6 para finalizar la devolucion
                            1- Avatar: El Camino del Agua
                            2- The Wale
                            3- Llaman a la puerta
                            4- M3gan
                            5- Gato Con botas: El Ultimo Deseo`));
            
                                        
            while(opcion2 != 6){
                switch(opcion2){
                    case 1:{
                        let valoracion= parseFloat(prompt("Ingrese en una escala del 1 al 10 su valoracion:"));
                        valorateMovie(Avatar, valoracion);
                        alert(`la valoracion actual de la pelicula: ${Avatar.nombre} es: ${Avatar.valoracion}`);
                        break;
                    }
                    case 2:{
                        let valoracion= parseFloat(prompt("Ingrese en una escala del 1 al 10 su valoracion:"));
                        valorateMovie(Wale, valoracion);
                        alert(`la valoracion actual de la pelicula: ${Wale.nombre} es: ${Wale.valoracion}`);
                        break;
                    }
                    case 3:{
                        let valoracion= parseFloat(prompt("Ingrese en una escala del 1 al 10 su valoracion:"));
                        valorateMovie(Llaman, valoracion);
                        alert(`la valoracion actual de la pelicula: ${Llaman.nombre} es: ${Llaman.valoracion}`);
                        break;
                    }
                    case 4:{
                        let valoracion= parseFloat(prompt("Ingrese en una escala del 1 al 10 su valoracion:"));
                        valorateMovie(Megan, valoracion);
                        alert(`la valoracion actual de la pelicula: ${Megan.nombre} es: ${Megan.valoracion}`);
                        break;
                    }
                    case 5:{
                        let valoracion= parseFloat(prompt("Ingrese en una escala del 1 al 10 su valoracion:"));
                        valorateMovie(Gato, valoracion);
                        alert(`la valoracion actual de la pelicula: ${Gato.nombre} es: ${Gato.valoracion}`);
                        break;
                    }
                    default:{
                        alert("Opcion Ingresada no correspondiente. Intente de nuevo");
                        break;
                    }
                }
                opcion2 = parseInt(prompt(`Bienvenido al espacio de FeedBack de peliculas en cartelera.
                                    Selecciona el numero correspondiente de la pelicula a valorar o opcion 6 para finalizar la devolucion
                                    1- Avatar: El Camino del Agua
                                    2- The Wale
                                    3- Llaman a la puerta
                                    4- M3gan
                                    5- Gato Con botas: El Ultimo Deseo`));
            }
            break;
        }
        default:{
            alert("Opcion Ingresada no correspondiente. Intente de nuevo");
            break;
        }
    }
    opcion= parseInt(prompt(`Bienvenido a Play Cinema. Ingrese alguna de las opciones para operar:
                    1-Ver Cartelera
                    2-Ver Valoraciones de la cartelera
                    3-Realizar una valoracion de una pelicula
                    4-Salir`));

}