// cards de genero de libros
console.table(genero)

const contLibros = document.getElementById('genero');

function rendLibros(genero){
    for(const prod of genero){
        contLibros.innerHTML += `
        <div class="card" style="width: 18rem;">
            <a href=${prod.pagina}> 
                <img src=${prod.foto} class="card-img-top" alt=${prod.categoria} > </a>
                <h3 class="card-title">${prod.categoria}</h3>
        </div>
        `;
    }
};

rendLibros(genero);

//cards de los nuevos libros


const novLibros = document.getElementById('novedad');

function rendNovedad(novedadesLibros){
    for(const prod of novedadesLibros){
        novLibros.innerHTML += `
        <div class="card" style="width: 18rem;">
            <a href=${prod.pagina}> 
                <img src=${prod.foto} class="card-img-top" alt=${prod.categoria} > </a>
        </div>
        `;
    }
};

rendNovedad(novedadesLibros);

//cards libros mas vendidos 

const masVendido = document.getElementById('masVentas');

function rendVendido(masVendidos){
    //masVendido.innerHTML='';
    for(const prod of masVendidos){
        masVendido.innerHTML += `
        <div class="card" style="width: 18rem;">
            <a href=${prod.pagina}> 
                <img src=${prod.foto} class="card-img-top" alt=${prod.categoria} > </a>
        </div>
        `;
    }
};

rendVendido(masVendidos);

//carro

const tablaBody = document.getElementById('tablabody')
const cienFiccion = document.getElementById('cienciaFiccion');
const finalizar = document.getElementById('finalizar');
const vaciar = document.getElementById('vaciar');

function rendFiccion(librosCienciaFiccion){
    for(const prod of librosCienciaFiccion){
        cienFiccion.innerHTML += `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src=${prod.foto} alt=${prod.nombre}/>
                <div class="card-body">
                    <p class="card-text">$ ${prod.precio}</p>
                    <button id=${prod.id} class="btn btn-primary compra">Comprar</button>
                </div>
        </div>
    `;
    }
    //aignando al boton
    let botones = document.getElementsByClassName('compra');
    for (const boton of botones) {
        boton.addEventListener('click', () => {
            console.log('Hiciste click en el boton cuyo id es ' + boton.id);
            const prodACarro = librosCienciaFiccion.find((librosCienciaFiccion) => librosCienciaFiccion.id == boton.id);
            console.log(prodACarro);
            agregarAlCarrito(prodACarro);
        });
    }
};

rendFiccion(librosCienciaFiccion);

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//si hay carro abandonado

if(carrito.length != 0){
    tabla()
};

function tabla(){
    for(const prod of carrito){
        tablaBody.innerHTML += `
        <tr>
            <td>${prod.nombre}</td>
            <td>${prod.precio}</td>
        </tr>
        `;
    }
};

// prdofuctos agregados al carro
function agregarAlCarrito(producto) {
    carrito.push(producto);
    console.table(carrito);
    //libreria swal
    Swal.fire({
        title: 'Agregado al carrito',
        text: 'Buena elección!',
    });
    tablaBody.innerHTML += `
        <tr>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
        </tr>
    `;

    const totalCarro= carrito.reduce((acumuladore,produ) => acumuladore+produ.precio,0 ) 
    console.log('Total ' + totalCarro)
    document.getElementById('totalCarrito').innerText='total: $'+ totalCarro;
    localStorage.setItem('carrito',JSON.stringify(carrito));
};

//filtrar libro por categoria

const categoriaFiltrada = masVendidos.filter((libro) => libro.categoria === "Ciencia Ficción");

console.log(categoriaFiltrada);
rendVendido(categoriaFiltrada);

//vaciar el carro

vaciar.onclick=()=>{
    //libreria toastify
    Toastify({
    text: "Tu carrrito fue vaciado",
    duration: 5000,
    close:true,
    }).showToast();
    carrito=[]
    tablaBody.innerHTML=''
    document.getElementById('totalCarrito').innerText='total: $';
    localStorage.removeItem('carrito')
}

//finalizar compra

finalizar.onclick=()=>{
    Swal.fire('gracias por tu compra')
    carrito=[]
    tablaBody.innerHTML=''
    document.getElementById('totalCarrito').innerText='total: $';
    localStorage.removeItem('carrito')
}