    const datosEspecies = {
      alamillo: { nombre: "Alamillo (<i>Populus tremuloides</i>)", co2: 35, o2: 150, temp: 2.5, agua: 1400 },
      anacahuita: { nombre: "Anacahuita (<i>Cordia boissieri</i>)", co2: 18, o2: 120, temp: 1.5, agua: 1000 },
      anacua: { nombre: "Anacua (<i>Ehretia anacua</i>)", co2: 28, o2: 135, temp: 2.4, agua: 1250 },
      barreta: { nombre: "Barreta (<i>Helietta parvifolia</i>)", co2: 16, o2: 112, temp: 1.7, agua: 950 },
      chapote_amarillo: { nombre: "Chapote Amarillo (<i>Casimiroa greggii</i>)", co2: 22, o2: 110, temp: 1.8, agua: 950 },
      chapote_negro: { nombre: "Chapote Negro (<i>Diospyros texana</i>)", co2: 18, o2: 100, temp: 1.5, agua: 800},
      colorin: { nombre: "Colorín (<i>Dermatophyllum secundiflorum</i>)", co2: 18, o2: 100, temp: 1.5, agua: 800 },
      crespon: { nombre: "Crespón (<i>Lagerstroemia indica</i>)", co2: 24, o2: 128, temp: 1.9, agua: 1100 },
      duraznillo: { nombre: "Duraznillo (<i>Cercis canadensis</i>)", co2: 22, o2: 110, temp: 1.8, agua: 950 },
      ebano: { nombre: "Ébano (<i>Ebenopsis ebano</i>)", co2: 22, o2: 130, temp: 2.0, agua: 1100 },
      encino_blanco: { nombre: "Encino Blanco (<i>Quercus canbyi.</i>)", co2: 40, o2: 160, temp: 2.5, agua: 1500 },
      encino_bravo: {nombre: "Encino Bravo (<i>Quercus fusiformis</i>)", co2: 30, o2: 140, temp: 2.3, agua: 1200 },
      encino_roble: { nombre: "Encino Roble (<i>Quercus polymorpha</i>)", co2: 42, o2: 165, temp: 2.6, agua: 1550 },
      fresno: { nombre: "Fresno Plumero (<i>Fraxinus berlandieriana</i>)", co2: 25, o2: 145, temp: 2.2, agua: 1300 },
      hierba_del_potro: { nombre: "Hierba del Potro (<i>Erythrostemon mexicanus</i>)", co2: 22, o2: 120, temp: 1.9, agua: 1000 },
      huizache: { nombre: "Huizache (<i>Acacia farnesiana</i>)", co2: 15, o2: 110, temp: 1.8, agua: 900 },
      limoncillo: {nombre: "Limoncillo (<i>Esenbeckia</i>)", co2: 20, o2: 110, temp: 1.7, agua: 900 },
      mimbre: { nombre: "Mimbre (<i>Chilopsis linearis</i>)", co2: 20, o2: 115, temp: 1.7, agua: 950 },
      mezquite: { nombre: "Mezquite (<i>Prosopis glandulosa</i>)", co2: 30, o2: 140, temp: 2.3, agua: 1200 },
      nogal_nuez_lisa: { nombre: "Nogal Nuez Lisa (<i>Carya illinoinensis</i>)", co2: 35, o2: 150, temp: 2.5, agua: 1300 },
      olmo: { nombre: "Olmo (<i>Ulmus crassifolia</i>)", co2: 30, o2: 140, temp: 2.3, agua: 1200 },
      palo_blanco: { nombre: "Palo Blanco (<i>Celtis laevigata</i>)", co2: 28, o2: 135, temp: 2.4, agua: 1250 },
      pino_piñonero: { nombre: "Pino Piñonero (<i>Pinus cembroides</i>)", co2: 25, o2: 100, temp: 2.0, agua: 1000 },
      retama: { nombre: "Retama (<i>Parkinsonia aculeata</i>)", co2: 20, o2: 100, temp: 1.5, agua: 900 },
      sicomoro: { nombre: "Sicomoro Mexicano (<i>Platanus occidentalis mexicana</i>)", co2: 38, o2: 170, temp: 2.8, agua: 1600 },
      sabino: { nombre: "Sabino (<i>Taxodium mucronatum</i>)", co2: 45, o2: 175, temp: 3.0, agua: 1700 },
      sauce: { nombre: "Sauce (<i>Salix nigra</i>)", co2: 35, o2: 150, temp: 2.5, agua: 1400 },
      tronadora: { nombre: "Tronadora (<i>Tecoma stans</i>)", co2: 14, o2: 105, temp: 1.5, agua: 900 }
    };

    let contador = 0;
    let resultadosPorEspecie = [];
    let total = { co2: 0, o2: 0, agua: 0 };
    let aniosSeleccionados = 1;

function agregarEntrada() {
  const contenedor = document.getElementById('especiesContainer');
  const div = document.createElement('div');
  div.className = 'entry';
  div.id = `entry_${contador}`;
  const opciones = Object.keys(datosEspecies).sort().map(e => `<option value="${e}">${datosEspecies[e].nombre}</option>`).join('');
  div.innerHTML = `
    <div class="entry-row" style="margin-bottom:-0.4rem;">
      <label for="especie_${contador}">Especie:</label>
      <button type="button" class="btn btn-danger btn-sm eliminar-btn float-end" title="Eliminar esta especie" onclick="eliminarEntrada('entry_${contador}')">X</button>
    </div>
    <select id="especie_${contador}">${opciones}</select>
    <label for="cantidad_${contador}">Cantidad:</label>
    <input type="number" id="cantidad_${contador}" placeholder="Ej. 10" min="1" />
  `; 
  contenedor.appendChild(div);
  contador++;
}

function eliminarEntrada(id) {
  const entry = document.getElementById(id);
  if (entry) entry.remove();
}

function calcularImpactoProyecto() {
  resultadosPorEspecie = [];
  total = { co2: 0, o2: 0, agua: 0 };
  let entradasValidas = 0;
  for (let i = 0; i < contador; i++) {
    const especieInput = document.getElementById(`especie_${i}`);
    const cantidadInput = document.getElementById(`cantidad_${i}`);
    if (!especieInput || !cantidadInput) continue;

    const especie = especieInput.value;
    const cantidad = parseInt(cantidadInput.value);
    if (!especie || isNaN(cantidad) || cantidad <= 0) continue;

    entradasValidas++;
    const datos = datosEspecies[especie];

    resultadosPorEspecie.push({
      nombre: datos.nombre,
      cantidad,
      co2: datos.co2 * cantidad,
      o2: datos.o2 * cantidad,
      agua: datos.agua * cantidad,
      temp: datos.temp
    });

    total.co2 += datos.co2 * cantidad;
    total.o2 += datos.o2 * cantidad;
    total.agua += datos.agua * cantidad;
  }
  if (entradasValidas === 0) {
    document.getElementById('resultado').innerHTML = '<strong>Por favor, agrega al menos una especie y cantidad válida.</strong>';
    return;
  }
  document.getElementById('especiesContainer').innerHTML = "";
  contador = 0;
  mostrarProyeccion(1);
}

function mostrarProyeccion(anios) {
  aniosSeleccionados = anios;
  const exportable = document.getElementById('exportable');
  if (resultadosPorEspecie.length === 0) {
    document.getElementById('resultado').innerHTML = '<strong>Primero calcula el proyecto.</strong>';
    exportable.style.display = 'none';
    return;
  }

  let html = `<h2>Resultados por especie a ${anios} año(s)</h2>`;
  html += `<table class="table table-bordered table-striped tabla-resultados">
    <thead>
      <tr>
        <th>Especie</th>
        <th>Cantidad</th>
        <th>CO₂ (kg)</th>
        <th>O₂ (kg)</th>
        <th>Agua (L)</th>
        <th>Reducción (°C)</th>
      </tr>
    </thead>
    <tbody>`;
  resultadosPorEspecie.forEach(r => {
    html += `<tr>
      <td>${r.nombre}</td>
      <td>${r.cantidad}</td>
      <td>${(r.co2 * anios).toFixed(1)}</td>
      <td>${(r.o2 * anios).toFixed(1)}</td>
      <td>${(r.agua * anios).toLocaleString()}</td>
      <td>${r.temp}</td>
    </tr>`;
  });
  html += `</tbody></table>`;

  html += `<h3>Total del proyecto a ${anios} año(s)</h3>
    <ul>
      <li><strong>CO₂ total capturado:</strong> ${(total.co2 * anios).toFixed(1)} kg</li>
      <li><strong>O₂ total producido:</strong> ${(total.o2 * anios).toFixed(1)} kg</li>
      <li><strong>Agua total interceptada:</strong> ${(total.agua * anios).toLocaleString()} L</li>
    </ul>`;

  document.getElementById('resultado').innerHTML = html;
  exportable.style.display = 'block';
}

function exportarImagen() {
  const exportable = document.getElementById("exportable");
  html2canvas(exportable).then(canvas => {
    const link = document.createElement("a");
    link.download = "impacto_arbolado.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

    agregarEntrada();
