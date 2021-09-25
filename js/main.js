alert("Academia Sushi Distinto");
let opcion=0;
let numCurso=0;
const cursos=[];
const carrito=[];

class Curso{
    constructor(nivel, precio, contenido){
        this.nivel=nivel;
        this.precio=precio;
        this.contenido=contenido;
    }

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

traerDatosDePaises();
document.querySelector('#country').addEventListener('click',traerDatosDeProvincias);




function Total(carrito) {
    let valorTotal=0;
     for(const c of carrito){
        valorTotal=valorTotal+c.precio;
     }
     valorTotal=valorTotal-500;
    return valorTotal;
} 


function traerDatosDeProvincias(){
    let texto= document.getElementById("country");
    let selected = texto.options[texto.selectedIndex].text;
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
    console.log(pais.innerHTML);

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



