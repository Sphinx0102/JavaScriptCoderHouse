const abrirModal = document.querySelectorAll("[data-open]");
const cerrarModal = document.querySelectorAll("[data-close]");
const visible = "es-visible";


//añade la clase visible para abrir el modal
for(const el of abrirModal){
    el.addEventListener("click", function(){
        getGoogleMapLink();
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(visible);
    });
}

for(const el of cerrarModal){
    el.addEventListener("click", function(){
        this.parentElement.parentElement.parentElement.classList.remove(visible);
    });
}

//cierra el modal si se hace click fuera de el
document.addEventListener("click", e =>{
    if(e.target == document.querySelector(".modal.es-visible")){
        document.querySelector(".modal.es-visible").classList.remove(visible);
    }
});

//dibuja el iframe dentro del modal
function ModalGoogleMap(coordenadas){
    let rute = `https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=${coordenadas[0]},${coordenadas[1]}&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`
    let map = document.getElementById('modalUbicacion');
    map.innerHTML = `<iframe id="frame" class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${rute}" ></iframe>`
}


//recupera el link y lo fragmenta
function getGoogleMapLink (){
    const link = prompt("Ingrese el enlace de Google Maps");
    if(link){
        const latLngRegex = /@(-?\d+\.\d+),(-?\d+\.\d+),/;
        const latLngArray = latLngRegex.exec(link);
        if (latLngArray) {
          let latitud = parseFloat(latLngArray[1]);
          let longitud = parseFloat(latLngArray[2]);
          let coordenadas = [];
          coordenadas.push(latitud, longitud);
          ModalGoogleMap(coordenadas);
        } else {
          console.log("No se pudo extraer la latitud y la longitud de ese enlace");
        }
    }
    else{
        console.log("El Link Ingresado no es valido");
    }
}

