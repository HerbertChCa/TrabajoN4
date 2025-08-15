document.addEventListener("DOMContentLoaded", function () {
  paginar();
});

function paginar() {
  const TODAS = Array.from(document.querySelectorAll(".tarjeta-perro"));
  const itemsPorPagina = 10;

  
  const tarjetas = TODAS.filter(t => t.style.display !== "none" && t.offsetParent !== null);

  const totalPaginas = Math.max(1, Math.ceil(tarjetas.length / itemsPorPagina));
  const contenedor = document.getElementById("paginacion");
  let paginaActual = 1;

  function mostrarPagina(p) {
    paginaActual = p;
    TODAS.forEach(t => (t.style.display = "none"));
    const inicio = (p - 1) * itemsPorPagina;
    const fin = p * itemsPorPagina;
    tarjetas.slice(inicio, fin).forEach(t => (t.style.display = "block"));
    renderControles();
  }

  function crearLi(texto, claseExtra = "", onClick = null) {
    const li = document.createElement("li");
    li.className = `page-item ${claseExtra}`.trim();
    const a = document.createElement("a");
    a.className = "page-link";
    a.href = "#";
    a.textContent = texto;
    if (claseExtra.includes("ellipsis")) a.classList.add("ellipsis");
    if (onClick) {
      a.addEventListener("click", (e) => { e.preventDefault(); onClick(); });
    }
    li.appendChild(a);
    return li;
  }

  function windowedPages(total, actual, windowSize = 7) {
    // si total <= windowSize, mostramos todas
    if (total <= windowSize) return Array.from({ length: total }, (_, i) => i + 1);

    const half = Math.floor(windowSize / 2);
    let start = Math.max(1, actual - half);
    let end = Math.min(total, start + windowSize - 1);
    if (end - start + 1 < windowSize) {
      start = Math.max(1, end - windowSize + 1);
    }

    const pages = [];
    if (start > 1) pages.push(1);
    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < total - 1) pages.push("...");
    if (end < total) pages.push(total);

    return pages;
  }

  function renderControles() {
    contenedor.innerHTML = "";

    // Anterior
    contenedor.appendChild(
      crearLi("«", paginaActual === 1 ? "disabled" : "", () => {
        if (paginaActual > 1) mostrarPagina(paginaActual - 1);
      })
    );

    // Números + "..."
    const pages = windowedPages(totalPaginas, paginaActual, 7);
    pages.forEach(p => {
      if (p === "...") {
        contenedor.appendChild(crearLi("…", "disabled ellipsis"));
      } else {
        contenedor.appendChild(
          crearLi(p, paginaActual === p ? "active" : "", () => mostrarPagina(p))
        );
      }
    });

    // Siguiente
    contenedor.appendChild(
      crearLi("»", paginaActual === totalPaginas ? "disabled" : "", () => {
        if (paginaActual < totalPaginas) mostrarPagina(paginaActual + 1);
      })
    );
  }

  // Primera render
  mostrarPagina(1);
}

