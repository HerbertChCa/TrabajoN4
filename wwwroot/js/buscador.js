document.addEventListener("DOMContentLoaded", function () {
    const buscador = document.getElementById("buscador");
    const tarjetas = document.querySelectorAll(".tarjeta-perro");

    buscador.addEventListener("input", function () {
        const texto = this.value.toLowerCase();

        tarjetas.forEach(tarjeta => {
            const nombre = tarjeta.getAttribute("data-nombre").toLowerCase();
            const caracteristicas = tarjeta.getAttribute("data-caracteristicas").toLowerCase();

            if (nombre.includes(texto) || caracteristicas.includes(texto)) {
                tarjeta.style.display = "block";
            } else {
                tarjeta.style.display = "none";
            }
        });

        
        if (typeof paginar === "function") {
            paginar();
        }
    });
});
