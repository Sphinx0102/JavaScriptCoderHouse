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
let bandosHashMap;
let bandos;
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
			loreEvent(randomNarrative(bandos[0].lore));
			break;
		default:
			loreEvent(randomNarrative(bandos[1].lore));
			break;
	}
	
	perfilSection.appendChild(cardPerfil);
}


function randomNarrative(narrative) {
	const indexRandom = Math.floor(Math.random() * narrative.length);
	return narrative[indexRandom];
}



function createCard(data) {
	const card = document.createElement('div');
	const imagen = document.createElement('img');
	const description = document.createElement('p');
	const checkbox = document.createElement('input');

	card.classList.add('card');
	//card de personaje
	if (data.personaje) {
		if (data.casaDeHogwarts != 'ninguna') {
			imagen.src = data.imagen;
			description.textContent = data.personaje;
			checkbox.type = 'checkbox';
		}
	} 
	//card de hechizo
	else if (data.uso) {
		const nombre = document.createElement('h1');
		nombre.textContent = data.hechizo;
		card.appendChild(nombre);
		description.textContent = data.uso;
		checkbox.type = 'checkbox';
	} 
	//card de bando
	else {
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
		console.log('Error al Crear la card', data);
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

async function fetchJson() {
	try {
	  const response = await fetch('LoreEvent.json');
	  
	  if (!response.ok) {
		throw new Error('Error al cargar el archivo JSON');
	  }
  
	  const jsonData = await response.json();
	  const bandosJSON = jsonData.bandos;
  
	  return bandosJSON;
	} catch (error) {
	  console.error('Error:', error);
	  throw error; // Propagar el error para manejarlo en la función llamadora si es necesario
	}
  }
  


async function main() {
	
	loreEvent(LoreComienzo);
	bandos = await fetchJson();
		
	bandosHashMap = createHashMap(bandos, 'nombre');
	bandos.forEach((bando) => createCard(bando));

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

	
	buttonHome();


}

main();