const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment();
let carrito=[]


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
        //console.log(data)
        pintarCards(data)
    }catch(error){
        console.log(error)
    }
}

const pintarCards = data =>{
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
    for(const c of dato){
        if(c != null){
            console.log(c)
        }
    }
    
}



/*const pintarCarrito=()=>{
    console.log(carrito)
    let cart=document.getElementsByClassName("animal");
    console.log(cart);
    Object.values(carrito).forEach(producto=>{
        cart[0].innerHTML=producto.nivel;  
    })
    
     



}*/





/*
const cursos=[];
const carrito=[];

class Curso{
    constructor(nivel, precio, contenido){
        this.nivel=nivel;
        this.precio=precio;
        this.contenido=contenido;
    }s

    agregarCurso(){
        alert("Agregaste el curso al carrito");
    }

    quitarCurso(){
        alert("Quitaste el curso del carrito");
    }
}

const curso1={ nivel:1,
               precio:1700,
               contenido:"Cocción del arroz\nVinagreta Zu\nCortes del salmón"};


const curso2= new Curso(2,1700,"Arroz con Tinta de Calamar");
const curso3= new Curso(3,2800, "Todo lo que necesitás a un precio increible");

cursos.push(curso1);
cursos.push(curso2);
cursos.push(curso3);

do{
    opcion=parseInt(prompt("Seleccione una opción para continuar: \n 1.Mostrar cursos disponibles \n 2.Agregar un curso al carrito \n 3.Quitar un curso del carrito \n 4.Mostrar Carrito"));
    switch (opcion){
        case 1:
            alert("Cursos Disponibles");
            for (const c of cursos){
                alert("Nivel "+c.nivel+"\n\nContenido:\n"+c.contenido+"\n\nPrecio Por Mes\n$"+c.precio+"\n");
                
            };
            break;
        case 2:
            numCurso=parseInt(prompt("Indique el nivel que quiere agregar"));
            var z=0;
            for (const c of cursos){
                if(c.nivel==numCurso){
                    carrito.push(c);
                    alert("Se agregó el curso Nivel "+c.nivel+" al carrito");
                    break;
                }
            };

   
            break;

        case 3:
            numCurso=parseInt(prompt("Indique el nivel que quiere quitar"));
            var z=0;
            for(const c of carrito){
                if(c.nivel==numCurso){
                    var i = carrito.indexOf(c);
                    carrito.splice(i,1);
                    alert("Se quitó el curso Nivel "+c.nivel+" al carrito");
                }
            }
            break;
        
        case 4:
        
        let productos=document.getElementsByClassName("my-0-productos");
        let m=0;
        for (const c of carrito){
            productos[m].innerHTML="Nivel "+c.nivel;   
            m++;
        }

        let precios=document.getElementsByClassName("text-muted-precio");
        let k=0;
        for (const c of carrito){
            precios[k].innerHTML="$"+c.precio;   
            k++;
        }
            let aPagar="$"+Total(carrito);
            document.getElementById("total").innerHTML=aPagar;
            break;    
        default:
        alert("Opción invalida"); 
            break;       
    }    
} while (opcion!=4);
*/






