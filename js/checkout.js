/*------------ FORMULARIO -----------------*/

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

/* Función que carga todos los paises consumiendo el archivo PAISES.JSON */
traerDatosDePaises();

/* Función que carga todos las provincias de Argentina en consumiendo el archivo PROVINCIAS.JSON, si se elige otro pais ofrece la opción "OTROS.." */
document.querySelector('#country').addEventListener('click',traerDatosDeProvincias);


/* Expresiones regulares para validar información del formulario */

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    direccion:/^.{1,40}$/,
    codPostal: /^\d{1,4}$/
}

const campos = {
	direccion: false,
	nombre: false,
	apellido: false,
	correo: false,
	codigo:false
}

/* Testing con las expresiones regulares generadas anteriormente */

const validarFormulario = (e) => {
    console.log(e.target.name)
    switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
        case "apellido":
			validarCampo(expresiones.nombre, e.target, 'apellido');
		break;
        case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;

        case "direccion":
			validarCampo(expresiones.direccion, e.target, 'direccion');
		break;

        case "codigo":
			validarCampo(expresiones.codPostal, e.target, 'codigo');
		break;

	}
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        campos[campo] = true;
	} else {
		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

/* Valida si todos los datos son correctos. Depende la respuesta, genera un toast distinto */

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
    if(campos.nombre && campos.apellido && campos.correo && campos.direccion && campos.codigo){
		formulario.reset();
        
        toastr.success('¡Realizada exitosamente!', 'COMPRA', {
            "positionClass": "toast-top-center",
             "progressBar": true,
            "closeButton": true,
            timeOut: 5000,  
            });
        
        
	} else {
		toastr.error('Por favor rellena los datos correctamente', 'ERROR', {
            "positionClass": "toast-top-center",
             "progressBar": true,
            "closeButton": true,
            timeOut: 5000,  
            });
	}
});

/*------------ CARRITO -----------------*/

const niveles=document.getElementById('niveles');
const footer=document.getElementById('footer');

const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment();
let carrito ={}


/* Pinta el carrito con la información guardada en el localStorage */
document.addEventListener('DOMContentLoaded', e => {fetchData()});
niveles.addEventListener('click', e => { btnAumentarDisminuir(e) })

const fetchData = async () => {
    var myData = localStorage.getItem("objectToPass");      
    localStorage.clear();
    const data = JSON.parse(myData)
    carrito=data
    pintarCarrito()
}


const pintarCarrito = () =>{
    niveles.innerHTML=''
    Object.values(carrito).forEach(producto=>{
            templateCarrito.querySelectorAll('td')[0].textContent=producto.nivel
            templateCarrito.querySelectorAll('td')[1].textContent=producto.cantidad
            templateCarrito.querySelector('span').textContent=producto.cantidad*producto.precio
            
            templateCarrito.querySelector('.btn-info').dataset.id = producto.id
            templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

            const clone = templateCarrito.cloneNode(true)
            fragment.appendChild(clone)
    })
    niveles.appendChild(fragment)
    pintarFooter()
}

const pintarFooter = () => {
    footer.innerHTML = ''

    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío</th>
        `
        return
    }
    
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

}
/* Funcionalidad para sumar y restar dentro del carrito */

const btnAumentarDisminuir = e => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito(carrito)
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}

/*------------ FUNCIONES -----------------*/


function comprar(){
   event.preventDefault();
   var myData = parseInt(localStorage.getItem("objectToPass"));
   localStorage.clear();
   toastr.success('Realizada exitosamente', 'Compra', {
    "positionClass": "toast-bottom-right",
     "progressBar": true,
    "closeButton": true,
    timeOut: 5000,
    })
}



function traerDatosDeProvincias(){
    let texto= document.getElementById("country");
    
    let selected = texto.options[texto.selectedIndex].text;
    console.log(selected)
    if(selected=='Argentina'){
        llenarConDatosDeProvincias();
    }else{
        let res = document.querySelector('#state');
        res.innerHTML=`
        <option>Otra</option>
        `;
    }
}

function traerDatosDePaises(){
    const xhttp= new XMLHttpRequest();
    xhttp.open('GET', './json/paises.json',true);
    xhttp.send();
    

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==200){
           let paises = JSON.parse(this.responseText);
           ordenarAsc(paises, 'name'); 
           let res = document.querySelector('#country');
           res.innerHTML='';
           for(let item of paises){
                
            res.innerHTML += `
                <option>${item.name}</option>
                `
            }
        }
    }
    let pais = document.getElementById("country").value;

}

function llenarConDatosDeProvincias(){
    const xhttp= new XMLHttpRequest();
    xhttp.open('GET', './json/provincias.json',true);
    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==200){
           let provincias = JSON.parse(this.responseText);
           ordenarAsc(provincias, 'nombre'); 
           console.log(provincias);
           let res = document.querySelector('#state');
           res.innerHTML='';
           for(let item of provincias){
                
            res.innerHTML += `
                <option>${item.nombre}</option>
                `
            }

        }
    }
}

function ordenarAsc(p_array_json, p_key) {
    p_array_json.sort(function (a, b) {
       return a[p_key] > b[p_key];
    });
 }