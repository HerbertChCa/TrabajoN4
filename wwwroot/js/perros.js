document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const sizeFilter = document.getElementById("sizeFilter");
  const weightFilter = document.getElementById("weightFilter");
  const genderFilter = document.getElementById("genderFilter");
  const allCards = Array.from(document.querySelectorAll(".dog-card"));
  const pagContainer = document.getElementById("paginacion");

  const ITEMS_POR_PAGINA = 10; 
  let paginaActual = 1;

  function coincide(card) {
    const q = (searchInput.value || "").toLowerCase().trim();
    const tam = sizeFilter.value;
    const pesoFiltro = weightFilter.value;
    const gen = genderFilter.value;

    const nombre = card.dataset.nombre.toLowerCase();
    const desc = card.dataset.descripcion.toLowerCase();
    const tamano = card.dataset.tamano;
    const peso = parseFloat(card.dataset.peso || "0");
    const genero = card.dataset.genero;

    if (q && !nombre.includes(q) && !desc.includes(q)) return false;

    if (tam && tamano !== tam) return false;

    if (pesoFiltro) {
      if (pesoFiltro === "menos10" && !(peso < 10)) return false;
      if (pesoFiltro === "10a25" && !(peso >= 10 && peso <= 25)) return false;
      if (pesoFiltro === "mas25" && !(peso > 25)) return false;
    }
    if (gen && genero !== gen) return false;

    return true;
  }

  function render() {
  
    const filtradas = allCards.filter(coincide);
   
    const totalPaginas = Math.max(1, Math.ceil(filtradas.length / ITEMS_POR_PAGINA));
    if (paginaActual > totalPaginas) paginaActual = totalPaginas;

    allCards.forEach(c => (c.style.display = "none"));
    const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
    const fin = inicio + ITEMS_POR_PAGINA;
    filtradas.slice(inicio, fin).forEach(c => (c.style.display = "block"));

    dibujarPaginacion(totalPaginas);
  }

  function crearLi(texto, activo, deshabilitado, onClick) {
    const li = document.createElement("li");
    li.className = `page-item ${activo ? "active" : ""} ${deshabilitado ? "disabled" : ""}`.trim();
    const a = document.createElement("a");
    a.className = "page-link";
    a.href = "#";
    a.textContent = texto;
    if (!deshabilitado && onClick) {
      a.addEventListener("click", (e) => { e.preventDefault(); onClick(); });
    }
    li.appendChild(a);
    return li;
  }

  function dibujarPaginacion(total) {
    pagContainer.innerHTML = "";


    pagContainer.appendChild(
      crearLi("«", false, paginaActual === 1, () => {
        if (paginaActual > 1) { paginaActual--; render(); }
      })
    );

    for (let i = 1; i <= total; i++) {
      pagContainer.appendChild(
        crearLi(String(i), paginaActual === i, false, () => {
          paginaActual = i; render();
        })
      );
    }

    // »
    pagContainer.appendChild(
      crearLi("»", false, paginaActual === total, () => {
        if (paginaActual < total) { paginaActual++; render(); }
      })
    );
  }

  
  searchInput?.addEventListener("input", () => { paginaActual = 1; render(); });
  sizeFilter?.addEventListener("change", () => { paginaActual = 1; render(); });
  weightFilter?.addEventListener("change", () => { paginaActual = 1; render(); });
  genderFilter?.addEventListener("change", () => { paginaActual = 1; render(); });

  render();
});
