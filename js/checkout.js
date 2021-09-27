var myData = localStorage.getItem("objectToPass");
localStorage.clear();
var dato=JSON.parse(myData);

let dto=0;
traerDatosDePaises();
document.querySelector('#country').addEventListener('click',traerDatosDeProvincias);
valorTotal(dto)

document.querySelector('#canjear').addEventListener('click',cupon);
document.querySelector('#continuar').addEventListener('click',comprar);

let productos=document.getElementsByClassName("my-0-productos");
let m=0;

for (const d of dato){
    if(d != null){
        productos[m].innerHTML=d.nivel;   
        m++;
    }
   
}

function comprar(){
   var myData = parseInt(localStorage.getItem("objectToPass"));
   localStorage.clear();
   switch(myData){
        case 1700:
            window.location.href="https://mpago.la/2K2Av4V";
            break;
        case 3400:
            window.location.href="https://mpago.la/1M95wUF";
            break;
        case 5100:
            window.location.href="https://mpago.la/2GRPedK";
            break;
        default:
            break;    
    }
}


function valorTotal(dto){
    let total=0;
    let precios=document.getElementsByClassName("text-muted-precio");

    let k=0;
    for (const c of dato){
        if(c != null){
        precios[k].innerHTML=`$${c.precio}`;   
        k++;

        total=total+parseInt(c.precio)-dto;
        }
        
    }
    localStorage.setItem( 'objectToPass', total);
    
    document.getElementById("total").innerHTML=`$${total}`;
    document.getElementById("cant").innerHTML=`${k}`;
}
          

function cupon(){
    let cupon=document.getElementsByClassName("form-control")[0].value;
    if(cupon==="SUSHIPROMO"){        
        let codigopromo=document.getElementById("promoo");
        codigopromo.innerHTML=`<h6 class="my-0 " id="promoo" >Código promocional</h6>
        <small>${cupon}</small>`

        let descuento=document.getElementById("descuento");
        descuento.innerHTML=` <span class="text-success" id="descuento">-$500</span>`
        
        let total=document.getElementById("total").value;
        let dto=500;
        valorTotal(dto);

    }

}


function Total(carrito) {
    let valorTotal=0;
     for(const c of carrito){
        valorTotal=valorTotal+c.precio;
     }
     
     valorTotal=valorTotal;
    return valorTotal;
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