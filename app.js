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
                <div class="col-6 col-md-4 col-lg-3">

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

                                <span class="badge bg-danger mb-3">
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