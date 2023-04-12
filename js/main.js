/*Acortamos un poco el codigo, sumamos filtado de "tipo" de calzado y un filtrado de precio maximo a buscar.
Tambien sumamos una variable carrito para acumular los objetos seleccionados,y adaptamos el proceso de compra a la variable carrito.
codigo puede mejorar su logica y funcionalidad(ejemplo: cocatenar variable de talles e colores), conte con poco tiempo pido disculpas!!!*/

const suUsuario = "Lemus";
const suTarjeta = 1234567;
let ingreso = false;
let carrito = [];
//lista de productos
const calzados = [
    {nombre: "Nike", precio: 4000 , tipo:"Deportivo"},
    {nombre: "Adidas", precio: 3900, tipo:"Deportivo"},
    {nombre: "Under", precio: 5000, tipo:"Deportivo"},
    {nombre: "Puma", precio: 4900, tipo:"Deportivo"},
    {nombre: "New Balance", precio: 5200, tipo:"Deportivo"},

    {nombre: "Botas", precio: 5000, tipo:"Casual"},
    {nombre: "Nauticas", precio: 4900, tipo:"Casual"},
    {nombre: "Sneakers", precio: 6000, tipo:"Casual"},
    {nombre: "Levi’s", precio: 5390, tipo:"Casual"},
    {nombre: "Converse", precio: 5999,  tipo:"Casual"},
    
    {nombre: "Cuero", precio: 7000, tipo:"Formal"},
    {nombre: "Zapatos sin cordones", precio: 5900, tipo:"Formal"},
    {nombre: "Desert", precio: 6900, tipo:"Formal"},
    {nombre: "Oxford", precio: 6199, tipo:"Formal"},
    {nombre: "Gaziano & Girling", precio: 10000, tipo:"Formal"}
];
//talles
const talles=["S","M","L","XL","G"];

//agregamos producto nuevo
let nuevoProducto = new agregarProductos("Reebok", 4500, "Deportivo");
//agregamos la variable a Calzados
calzados.push(nuevoProducto);
//sin stock
calzados.splice(5,1);

//Comienzo de la pagina:
alert("Bienvenid@s a TIENDA ONLINE");

let saldo;
while (true) {
    let apellido = prompt("Ingrese su Apellido");
        if (apellido === suUsuario){
            let saldo = 40000;
            alert("Bienvenido " + apellido);
            for (let i = 2; i >= 0; i--) {
                let tarjeta = parseFloat(prompt("Ingrese su numero de tarjeta. Tiene " + (i + 1) + " oportunidades."));
                if (tarjeta === suTarjeta) {
                alert("Ingreso con exito.");
                alert("Su saldo actual es " + "$" + saldo);
                ingreso = true;
                break;
                } else {
                    alert("Tarjeta incorrecta. Reintente.");
                }
            }
        } else {
            alert("Apellido de usuario no reconocido");
        }
        if (ingreso) {
        ingresoExitoso();
        break;
    //pausamos la funcion asi no queda el ingreso guardado.
        } else {
        alert("No se pudo acceder a su cuenta.");
        }
}
//funcion ingreso
function ingresoExitoso() {
    let tipoCalzado = prompt("Ingrese el tipo de calzado que busca:\n1. Deportivo\n2. Casual\n3. Formal \n4. Cancelar compras \n5. Carrito \n6. Salir ");

if (tipoCalzado === "1" || tipoCalzado === "2" || tipoCalzado === "3") {
    let precioMax = parseFloat(prompt("Ingrese precio maximo:"));

    switch (tipoCalzado) {
        case "1":
            let deportivos = calzados.filter(calzado => calzado.tipo === "Deportivo" && calzado.precio <= precioMax);
            agregarAlCarrito(deportivos);
            ingresoExitoso();
        break;
        case "2":
            let casuales = calzados.filter(calzado => calzado.tipo === "Casual" && calzado.precio <= precioMax);
            agregarAlCarrito(casuales);
            ingresoExitoso();
        break;
        case "3":
            let formales = calzados.filter(calzado => calzado.tipo === "Formal" && calzado.precio <= precioMax);
            agregarAlCarrito(formales);
            ingresoExitoso();
        break;
        default:
            alert("Opcion invalida");
        break;
    }
    } else {
        switch (tipoCalzado) {
            case "4":
                cancelarCompra();
                ingresoExitoso();
            break;
            case "5":
                mostrarCarritoCompras();
                confirmarCompras();
                ingresoExitoso();
            break;
            case "6":
                salida();
            break;
            default:
                alert("Opcion invalida");
            break;
        }
    }
}
 //FUNCION DE PROCESAR COMPRA
function procesarCompra(productoSeleccionado){
    saldo=40000;
    if(saldo < productoSeleccionado.precio){
        alert("Saldo no disponible. Saldo actual: $" + saldo);
    }else{
        saldo -= productoSeleccionado.precio;
        alert("Gracias por su compra!. Su saldo es de $" + saldo);
        let index = carrito.indexOf(productoSeleccionado);
        carrito.splice(index, 1);
    }
}
//Funcion cancelar compras.
function cancelarCompra(){
    if(saldo != 40000){
        alert("Se han cancelado todas sus compras.");
        carrito=0;
        saldo = 40000;
        alert("Saldo actual $ " + saldo);
    }else{
        alert("Usted aun no tiene compras realizadas");
    }
}
//funcion salida
function salida(){
    let ingreso = true;
    while (ingreso) {
        let opcion = prompt("¿Desea salir de la tienda?\n1. Si\n2. No");
        switch(opcion){
            case "1":
                alert("¡Gracias! ¡Vuelva pronto!");
                ingreso = false;
                break;
            case "2":
                ingresoExitoso();
                break;
            default:
                alert("Opcion invalida. Por favor, elija nuevamente.");
                break;
        }
    }
}
//Carrito de compras5
function agregarAlCarrito(productos) {
    if (productos.length === 0) {
        alert("No se encontraron productos en la busqueda.");
    } else {
        let mensaje = "Seleccione un producto para agregar al carrito: \n";
        for (let i = 0; i < productos.length; i++) {
            mensaje += `${i + 1}. ${productos[i].nombre} - $${productos[i].precio}\n`;
        }
        let seleccion = parseInt(prompt(mensaje));
        if (seleccion > 0 && seleccion <= productos.length) {
            let productoSeleccionado = productos[seleccion - 1];
            carrito.push(productoSeleccionado);
            alert(`${productoSeleccionado.nombre} ha sido agregado al carrito.`);
            mostrarCarritoCompras();
        } else {
            alert("Seleccion invalida.");
        }
    }
}
//Funcion agregar producto del carrito
function mostrarCarritoCompras() {
    let mensaje = "Productos en el carrito:\n";
    for (let i = 0; i < carrito.length; i++) {
        mensaje += `${i + 1}. ${carrito[i].nombre} - $${carrito[i].precio}\n`;
    }
    alert(mensaje);
}
//funcion confirmar compra
function confirmarCompras() {
    let afirmacion = prompt("Opciones: \n1. Comprar \n2. Seguir navegando");
    switch (afirmacion) {
        case "1":
            if (carrito.length > 0) {
                mostrarCarritoCompras();

                let seleccion = parseInt(prompt("Ingrese el numero del producto que desea comprar:"));
                
                if (seleccion > 0 && seleccion <= carrito.length) {
                    let productoSeleccionado = carrito[seleccion - 1];
                    procesarCompra(productoSeleccionado);
                    mostrarCarritoCompras();
                } else {
                    alert("Seleccion invalida.");
                }
            } else {
                alert("El carrito de compras vacio.");
            }
            break;
        case "2":
            ingresoExitoso();
            break;
        default:
            alert("Opcion invalida.");1
            break;
    }
}
//funcion agregar producto mediante this
function agregarProductos(nombre,precio,tipo){
    this.nombre=nombre;
    this.precio=precio;
    this.tipo=tipo;
}
