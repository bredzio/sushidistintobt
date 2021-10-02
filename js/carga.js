cargarCarrito();


function cargarCarrito(){
    var myData = localStorage.getItem("objectToPass");
    var dato=JSON.parse(myData);

    var cont=0;
    for(const c of dato){
        if(c != null){
            cont++;
        }
    }
    let cart=document.getElementById("countCart");
    cart.innerHTML=`${cont}`
}