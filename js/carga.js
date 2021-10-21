/* Script para mantener contador en el carrito en todas las páginas */

cargarCarrito();
function cargarCarrito(){
    var myData = localStorage.getItem("objectToPass");

    let cart=document.getElementById("countCart");
    cart.innerHTML=`${Object.keys(JSON.parse(myData)).length}`
}