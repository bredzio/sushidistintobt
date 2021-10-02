const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment();
let carrito=[]


document.addEventListener('DOMContentLoaded', ()=>{
    fetchData()
})

items.addEventListener('click',e=>{
    addCarrito(e),
    toastr.success('Ir al carrito', 'Producto agregado', {
        "positionClass": "toast-bottom-right",
         "progressBar": true,
        "closeButton": true,
        timeOut: 5000,
        //onHidden: function() {
        //    window.location.href = './checkout.html';
        //}    
        })
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
        templateCard.querySelector('h1').textContent=producto.precio
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
        console.log(e.target.parentElement)
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto=>{
    const producto ={
        id:objeto.querySelector('.btn-outline-danger').dataset.id,
        nivel:objeto.querySelector('h4').textContent,
        precio:objeto.querySelector('h1').textContent
    }
    carrito[producto.id]={...producto}


    localStorage.setItem( 'objectToPass', JSON.stringify(carrito) );
    var myData = localStorage.getItem("objectToPass");
    var dato=JSON.parse(myData);
    var cont=0;
    for(const c of dato){
        if(c != null){
            cont++;
        }
    }
    console.log(cont)

    let cart=document.getElementById("cart");
    cart.innerHTML=`${cont}`
    
}

