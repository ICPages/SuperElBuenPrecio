document.addEventListener("DOMContentLoaded", cargarOfertas);

async function cargarOfertas() {

    const contenedor = document.getElementById("productosContainer");

    try {

        const respuesta = await fetch("productos.json");
        const productos = await respuesta.json();

        const ofertas = productos.filter(producto =>
            producto.activo &&
            producto.descuento > 0
        );

        contenedor.innerHTML = "";

        ofertas.forEach(producto => {

            contenedor.innerHTML += `
                <div class="producto-item">

                    <div class="producto-card">

                        <img src="${producto.imagen}"
                             alt="${producto.nombre}"
                             onerror="this.src='Img/sinfoto.webp'">

                        <div class="p-3">

                            <h5>${producto.nombre}</h5>

                            <p class="mb-2">
                                <span class="text-decoration-line-through text-muted">
                                    $${producto.precioAntes.toFixed(2)}
                                </span>

                                <span class="descuento badge mb-3">
                                ${producto.descuento}% OFF
                            </span>
                            </p>

                            <div class="precio">
                                $${producto.precioAhora.toFixed(2)}
                            </div>

                        </div>

                    </div>

                </div>
            `;

        });

        contenedor.innerHTML += `
    <div class="producto-item">

        <a href="tienda.html"
           class="producto-card ver-todos-card text-decoration-none">

            <div class="ver-productos h-100 d-flex flex-column justify-content-center align-items-center p-4">

                <i class="bi bi-grid-3x3-gap-fill mb-3"></i>

                <h4 class="text-center">Ver todos los productos</h4>

                <p class="text-center mb-0">Explora nuestro catálogo completo</p>

            </div>

        </a>

    </div>
`;

    } catch (error) {

        console.error("Error al cargar ofertas:", error);

        contenedor.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    No se pudieron cargar las ofertas.
                </div>
            </div>
        `;

    }

}
