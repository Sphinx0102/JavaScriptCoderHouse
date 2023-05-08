// Constantes Globales
const url = 'https://harry-potter-api.onrender.com/db';

const bandoSection = document.getElementById('bando');
const personajesSection = document.getElementById('personajes');
const hechizosSection = document.getElementById('hechizos');
const conteiner = document.getElementById('bodyContainer');
const perfilSection = document.getElementById('perfil');
const lore = document.getElementById('lore');
const comenzar = document.createElement('button');
const LoreComienzo = 'Bienvenid@ a esta Aventura donde podras tomar piel de uno de los personajes de la conocida Saga y formar parte de la gran batalla entre Brujos y Magos Tenebrosos.';


let cont = 0;

const bandos = [
	{
		nombre: 'orden',
		datos: {
			titulo: 'Orden del Fénix',
			descripcion:
				'La Orden del Fénix es una organización secreta fundada por Albus Dumbledore para luchar contra Lord Voldemort y sus seguidores durante la Primera Guerra Mágica.',
			logo: 'https://i.pinimg.com/736x/c9/c4/bb/c9c4bbeb0d74a36d48d4f484c9e77fd7.jpg',
		},
	},
	{
		nombre: 'tenebroso',
		datos: {
			titulo: 'Magos Tenebrosos',
			descripcion:
				'Los Magos Tenebrosos son aquellos que utilizan la magia para fines malignos y buscan el poder y la dominación sobre los demás.',
			logo: 'https://i.pinimg.com/564x/33/86/3e/33863ea103afb60b1b960ed9b509ede0.jpg',
		},
	},
];

const bandosHashMap = createHashMap(bandos, 'nombre');

// Fin Constantes Globales

// Clases


class Perfil {
	bando;
	personaje;
	hechizos = [];

}



class Personajes {
	personajeList = [];
	bando = {
		orden: [],
		tenebroso: [],
	};
	personajeListHashMap = {};

	setPersonajeList(personajeList) {
		this.personajeList = personajeList;
		this.cacheBando(personajeList);
		this.personajeListHashMap = createHashMap(personajeList, 'id');
	}

	cacheBando(personajeList = this.personajeList) {
		personajeList.forEach((personaje) => {
			if ((personaje.casaDeHogwarts === 'Gryffindor') || (personaje.casaDeHogwarts === 'Ravenclaw')) {
				this.bando.orden.push(personaje);
			}
			if (personaje.casaDeHogwarts === 'Slytherin') {
				this.bando.tenebroso.push(personaje);
			}
		})
		return this;
	}

	getPersonajeByBando(bandoType) {
		if (this.bando[bandoType].length > 0) return this.bando[bandoType];

	}

}

class Hechizos {
	hechizosList = [];
	maleficios = ['Avada Kedavra', 'Imperio', 'Crucio'];
	hechizosListHashMap = {};


	setHechizosList(hechizosList) {
		this.hechizosList = hechizosList;
		this.hechizosListHashMap = createHashMap(hechizosList, 'id');
	}


	getHechizosByBando(bando) {
		if (bando == 'orden') {
			return this.hechizosList.filter((hechizo) => (!this.maleficios.includes(hechizo.hechizo)))
		}
		else if (bando == 'tenebroso') {
			return this.hechizosList;
		}
		swal({
			title: '¡Error!',
			text: 'No se selecciono un bando valido',
			icon: 'error'
		});
	}

}

class HarryPotterWiki {
	personajes;
	hechizos;
	url;

	constructor(personajes, hechizos, url) {
		this.personajes = personajes;
		this.hechizos = hechizos;
		this.url = url;
	}

	loadApi() {
		return new Promise((resolve, reject) => {
			fetch(this.url)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					this.personajes.setPersonajeList(data.personajes);
					this.hechizos.setHechizosList(data.hechizos);
					return resolve({ message: 'Carga exitosa!!', data });
				})
				.catch((error) => {
					console.log(error);
					reject({ message: 'Error al intentar cargar el servidor', error });
				})
		})
	}



}


// Fin Clases

// instancias de clases

const personajes = new Personajes();
const hechizos = new Hechizos();
const harryWiki = new HarryPotterWiki(personajes, hechizos, url);
const perfil = new Perfil();



// Funciones
function buttonHome() {
	const WikiButton = document.getElementById('title');
	const button = document.createElement('button');
	button.textContent = 'Harry Potter Wiki';
	button.classList.add('button-style');
	button.addEventListener('click', () => {
		window.location.href = '/';
	})
	WikiButton.parentNode.replaceChild(button, WikiButton);

}

function loreEvent(message) {
	const loreHistory = document.createElement('h1');
	loreHistory.setAttribute('id', 'lore-text');
	lore.innerHTML = '';
	loreHistory.textContent = message;
	lore.appendChild(loreHistory);
	if(message == LoreComienzo){
		const button = document.createElement('button');
		button.textContent = 'Comenzar';
		button.classList.add('btnComenzar');
		button.addEventListener('click', () => {
		  bandoSection.style.display = 'flex';
		  loreEvent("Deberas Elegir un bando para comenzar esta aventura");
		});
		lore.appendChild(button);
	}
  }



// recibe un array y una clave y devuelve un objeto de mapa/hash donde cada elemento del array es un valor del mapa.


function createHashMap(array, key) {
	return array.reduce((acum, currentValue) => {
		return {
			...acum,
			[`${currentValue[key]}`]: currentValue
		}
	}, {})
}


function createPerfilCard(data) {
	const cardPerfil = document.createElement('div');
	cardPerfil.classList.add('perfil-card');

	const bandoContainer = document.createElement('div');
	const nameBando = document.createElement('h2');
	nameBando.textContent = data.bando.datos.titulo;
	const imageBando = document.createElement('img');
	imageBando.src = data.bando.datos.logo;
	bandoContainer.appendChild(nameBando);
	bandoContainer.appendChild(imageBando);

	const personajeContainer = document.createElement('div');
	const imagePersonaje = document.createElement('img');
	imagePersonaje.src = data.personaje.imagen;
	const namePersonaje = document.createElement('h3');
	namePersonaje.textContent = data.personaje.personaje;
	personajeContainer.appendChild(namePersonaje);
	personajeContainer.appendChild(imagePersonaje);

	const hechizosContainer = document.createElement('div');
	hechizosContainer.classList.add('hechizos-container');

	for (let i = 0; i < 5 && i < data.hechizos.length; i++) {
		const hechizoItem = document.createElement('p');
		hechizoItem.textContent = `${data.hechizos[i].hechizo}`;
		hechizosContainer.appendChild(hechizoItem);
	}

	cardPerfil.appendChild(bandoContainer);
	cardPerfil.appendChild(personajeContainer);
	cardPerfil.appendChild(hechizosContainer);
	switch(data.bando.nombre){
		case 'orden':
			loreEvent(`Habiendo elegido el bando ${data.bando.datos.titulo}, tomaste partido en la batalla como ${data.personaje.personaje}.\n
				Dentro del campo de batalla, mientras batallabas contra un enemigo, utilizaste el hechizo ${data.hechizos[3].hechizo}, el cual te ayudó a poder girar las tornas y poder derrotarlo`);
			break;
		default:

			if (data.hechizos.some(hechizo => hechizo.hechizo === 'Avada Kedavra')) {
			  loreEvent(`Habiendo elegido el bando ${data.bando.datos.titulo}, tomaste partido en la batalla como ${data.personaje.personaje}.\n
			  En el punto álgido de la batalla, pronunciaste el Avada Kedavra con despiadada determinación. Un rayo verde trazó un arco mortal a través del campo de guerra, cobrando la vida de sus oponentes sin piedad. Los cuerpos caían inertes, dejando un silencio sepulcral en su estela.`);
			} else if (data.hechizos.some(hechizo => hechizo.hechizo === 'Imperio')) {
			  loreEvent(`Habiendo elegido el bando ${data.bando.datos.titulo}, tomaste partido en la batalla como ${data.personaje.personaje}.\n
			  Lanzaste la Maldición Imperius en una táctica despiadada para controlar a los magos opositores. Uno tras otro, los valientes hechiceros caían bajo tu dominio, convirtiéndose en títeres de los oscuros deseos de los magos tenebrosos. Los cuerpos y mentes esclavizados eran utilizados como armas vivientes contra sus propios aliados, sembrando el caos y la traición en las filas enemigas.`);
			} else if (data.hechizos.some(hechizo => hechizo.hechizo === 'Crucio')) {
			  loreEvent(`Habiendo elegido el bando ${data.bando.datos.titulo}, tomaste partido en la batalla como ${data.personaje.personaje}.\n
			  Desataste el hechizo Cruciatus en medio del campo de batalla, provocando que los gritos de agonía resonaran en el aire. Tus enemigos se retorcían y caían al suelo, incapaces de soportar el intenso sufrimiento impuesto por la maldición. Además, aquellos valientes que lograban resistir eran embrujados con una oscuridad que los consumía lentamente, convirtiéndolos en sombras de lo que una vez fueron.`);
			} else {
			  loreEvent(`Habiendo elegido el bando ${data.bando.datos.titulo}, tomaste partido en la batalla como ${data.personaje.personaje}.\n
			  Dentro del campo de batalla, mientras batallabas contra un mago, utilizaste el hechizo ${data.hechizos[3].hechizo}, el cual te ayudó a obtener ventaja y, consecuentemente, terminar matando a dicho mago.`);
			}
			break;
	}
	
	perfilSection.appendChild(cardPerfil);
}






function createCard(data) {
	const card = document.createElement('div');
	const imagen = document.createElement('img');
	const description = document.createElement('p');
	const checkbox = document.createElement('input');

	card.classList.add('card');
	if (data.personaje) {
		if (data.casaDeHogwarts != 'ninguna') {
			imagen.src = data.imagen;
			description.textContent = data.personaje;
			checkbox.type = 'checkbox';
		}
	} else if (data.uso) {
		const nombre = document.createElement('h1');
		nombre.textContent = data.hechizo;
		card.appendChild(nombre);
		description.textContent = data.uso;
		checkbox.type = 'checkbox';
	} else {
		imagen.src = data.datos.logo;
		description.textContent = data.datos.descripcion;
		checkbox.type = 'checkbox';
	}
	card.appendChild(imagen);
	card.appendChild(description);
	if (data.nombre == 'tenebroso') {
		checkbox.setAttribute('id', 'tenebroso');
		card.setAttribute('id', 'card-tenebroso')
		bandoEvent(checkbox);
	}
	else if (data.nombre == 'orden') {
		checkbox.setAttribute('id', 'orden');
		card.setAttribute('id', 'card-orden')
		bandoEvent(checkbox);
	}
	if (data.datos) {
		bandoSection.appendChild(card);
	}
	else if (data.personaje) {
		card.setAttribute('class', 'card-personaje');
		checkbox.setAttribute('id', data.id);
		personajeEvent(checkbox);
		personajesSection.appendChild(card);
	}
	else if (data.hechizo) {
		card.setAttribute('class', 'hechizo-card');
		checkbox.setAttribute('id', data.id)
		hechizosEvent(checkbox);
		hechizosSection.appendChild(card);
	}
	else {
		console.log('Error al Crear la card');
	}
	card.appendChild(checkbox);

}





function bandoEvent(element) {
	let personajeByBando = [];
	let revelio = false;
	element.addEventListener('click', (event) => {
		let id = event.target.id;
		perfil.bando = bandosHashMap[id];
		personajeByBando = personajes.getPersonajeByBando(id);
		personajesSection.innerHTML = '';
		personajeByBando.forEach((personaje) => {
			createCard(personaje);
		});
		bandoSection.style.display = 'none';
		loreEvent(`${id} ` + 'fue el bando que has Seleccionado, Ahora seleccionaras el personaje que te caracterizara');
		if (event.target.id == 'tenebroso') {
			conteiner.style.backgroundImage = ''
		}
		else {
			conteiner.style.backgroundImage = ''
		}
	})
	element.addEventListener('mouseover', (event) => {
		if (revelio == false) {
			swal({
				title: 'Revelio',
				timer: 500,
				buttons: false,
			})
			revelio = true;
		}
	})
}


function personajeEvent(element) {
	let hechizoByBando = [];
	element.addEventListener('click', (event) => {
		const bando = perfil.bando.nombre;
		const id = event.target.id
		perfil.personaje = personajes.personajeListHashMap[id];
		hechizoByBando = hechizos.getHechizosByBando(bando);
		loreEvent('Bienvenid@'+ ` ${event.target.parentNode.innerText} ` + 'termina de elegir tus 5 hechizos para embarcarte en esta aventura');
		hechizosSection.innerHTML = '';
		hechizoByBando.forEach((hechizo) => {
			createCard(hechizo);
		});
		personajesSection.style.display = 'none';
	})
}


function hechizosEvent(element) {
	element.addEventListener('click', (event) => {
		if (cont < 5) {
			const id = event.target.id;
			let hechizoSelected = hechizos.hechizosListHashMap[id];
			if (!perfil.hechizos.some(hechizo => hechizo.id === hechizoSelected.id)) {
				perfil.hechizos.push(hechizoSelected);
				cont++;
				event.target.parentNode.style.border = '3px solid #8b0000';
			}
			else {
				swal({
					title: 'No Permitido',
					text: 'No puedes seleccionar el mismo hechizo',
					icon: 'info',
					timer: 2500,
					closeOnEsc: false,
					closeOnClickOutside: false,
					buttons: false,
				})
			}
		}
		if(cont == 5){
			hechizosSection.style.display = 'none';
			perfilSection.innerHTML = '';
			createPerfilCard(perfil);
		}
	})

}


function buttonEvent(element) {
	element.addEventListener('click', (event) => {
		const id = event.target.id;
		if (id == 'bandoSection') {
			bandoSection.style.display = 'flex'
			personajesSection.style.display = 'none'
			hechizosSection.style.display = 'none'
			perfilSection.style.display = 'none'
		}
		if (id == 'personajesSection' && !personajesSection.innerHTML == '') {
			bandoSection.style.display = 'none'
			personajesSection.style.display = 'grid'
			hechizosSection.style.display = 'none'
			perfilSection.style.display = 'none'

		}
		if (id == 'hechizosSection' && !hechizosSection.innerHTML == '') {
			bandoSection.style.display = 'none'
			personajesSection.style.display = 'none'
			hechizosSection.style.display = 'flex'
			perfilSection.style.display = 'none'
		}
		if (id == 'perfilSection' && !perfilSection.innerHTML == '') {
			bandoSection.style.display = 'none'
			personajesSection.style.display = 'none'
			hechizosSection.style.display = 'none'
			perfilSection.style.display = 'flex'
		}
	})
}



function main() {
	
	loreEvent(LoreComienzo);

	
	harryWiki.loadApi()
	swal({
		title: 'Cargando...',
		icon: 'info',
		closeOnEsc: false,
		closeOnClickOutside: false,
		buttons: false,
		timer: 3000,
	})

	console.log(perfil);

	bandos.forEach((bando) => createCard(bando));
	buttonHome();


}

main();