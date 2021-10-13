const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment();
let carrito={}

document.addEventListener('DOMContentLoaded', ()=>{
    fetchData()
})

items.addEventListener('click',e=>{
    addCarrito(e)
    
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

const cargarCursos = data =>{

    data.forEach(producto=>{
        templateCard.querySelector('h4').textContent=producto.title
        templateCard.querySelector('h1').innerHTML=`$${producto.precio}`
        templateCard.querySelector('.btn-outline-danger').dataset.id=producto.id
        const prueba = producto.contenido
        
        for (const c of prueba){
            templateCard.querySelector('li').innerHTML +=`<li>${c}</li>`
        };

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
        templateCard.querySelector('li').textContent =""

    })
    
    items.appendChild(fragment)
}

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
    var dato=JSON.parse(myData);
    var cont=0;
    
    for(const c in carrito){
            cont++;
    }

    let cart=document.getElementById("countCart");
    cart.innerHTML=`${cont}`
    
}

