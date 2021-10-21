const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment();
let carrito={}

/* Se cargan los datos del archivo CURSO.JSON */

document.addEventListener('DOMContentLoaded', ()=>{
    fetchData()
})

const fetchData = async()=> {
    try{
        const res= await fetch('./json/cursos.json')
        const data = await res.json()
        cargarCursos(data)
    }catch(error){
        console.log(error)
    }
}

/* Se "pintan" dinámicamente los datos del archivo CURSO.JSON en templates ubicados en HTML */

const cargarCursos = data =>{
    data.forEach(producto=>{
        templateCard.querySelector('h4').textContent=producto.title
        templateCard.querySelector('h1').innerHTML=`$${producto.precio}`
        templateCard.querySelector('.btn-outline-danger').dataset.id=producto.id
        
        for (const c of producto.contenido){
            templateCard.querySelector('li').innerHTML +=`<li>${c}</li>`
        };

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
        templateCard.querySelector('li').textContent =""

    })
    
    items.appendChild(fragment)
}

/* Eventos y funciones para agregar cursos al carrito */

items.addEventListener('click',e=>{
    addCarrito(e)
    
})

const addCarrito = e =>{
    if(e.target.classList.contains('btn-outline-danger')){
        setCarrito(e.target.parentElement),
        toastr.success('Ir al carrito', 'Producto agregado', {
            "positionClass": "toast-bottom-right",
             "progressBar": true,
            "closeButton": true,
            onHidden: function (toast) {
                toast.onclick = window.location.href = './checkout.html';
            },
            timeOut: 5000   
            })
    }
    e.stopPropagation()
}

/* Se alojan los objetos en el localStorage. Además se pinta el contador del carrito */

const setCarrito = objeto=>{
    const producto ={
        id:objeto.querySelector('.btn-outline-danger').dataset.id,
        nivel:objeto.querySelector('h4').textContent,
        precio:objeto.querySelector('h1').textContent.substring(1),
        cantidad:1
    }
    
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad=carrito[producto.id].cantidad+1
    }

    carrito[producto.id]={...producto}

    localStorage.setItem( 'objectToPass', JSON.stringify(carrito) );
    var myData = localStorage.getItem("objectToPass");
    
    
    let cart=document.getElementById("countCart");
    cart.innerHTML=`${Object.keys(JSON.parse(myData)).length}`
   
}

