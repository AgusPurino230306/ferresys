/* FerreSys - Gestión ferretera (JavaScript puro, sin librerías) */
const $ = (s) => document.querySelector(s);
const pesos = (n) => '$ ' + n.toLocaleString('es-AR');
const conSigno = (n) => (n < 0 ? '-' : '') + pesos(Math.abs(n));

/* ================= DATOS (arrays de objetos) ================= */
const productosBase = [
  { codigo:'HEM-001', nombre:'Martillo carpintero 500g', categoria:'Herramientas manuales', stock:18, minimo:8, costo:4200, precio:6500 },
  { codigo:'HEE-001', nombre:'Taladro percutor 650W', categoria:'Herramientas eléctricas', stock:7, minimo:4, costo:62000, precio:89000 },
  { codigo:'FIJ-001', nombre:'Tornillo autoperforante 6x1" (caja x100)', categoria:'Fijaciones', stock:6, minimo:20, costo:2800, precio:4300 },
  { codigo:'PIN-001', nombre:'Látex interior blanco 20L', categoria:'Pinturas', stock:14, minimo:10, costo:42000, precio:61000 },
  { codigo:'PLO-001', nombre:'Cinta teflón 12mm', categoria:'Plomería', stock:3, minimo:30, costo:350, precio:700 },
  { codigo:'ELE-001', nombre:'Cable unipolar 2,5mm x 100m', categoria:'Electricidad', stock:9, minimo:15, costo:38000, precio:52000 },
  { codigo:'ADH-001', nombre:'Adhesivo epoxi 25ml', categoria:'Adhesivos', stock:22, minimo:10, costo:2100, precio:3400 },
  { codigo:'SEG-001', nombre:'Guantes de seguridad (par)', categoria:'Seguridad', stock:5, minimo:20, costo:1500, precio:2600 },
  { codigo:'JAR-001', nombre:'Manguera de jardín 1/2" x 25m', categoria:'Jardín', stock:11, minimo:6, costo:9800, precio:15500 },
  { codigo:'CER-001', nombre:'Candado de bronce 40mm', categoria:'Cerrajería', stock:4, minimo:12, costo:3600, precio:5900 },
];
const facturas = [
  { numero:'0001-00001245', cliente:'Constructora Del Valle', items:12, fecha:'2026-08-19', total:184500, estado:'pagada' },
  { numero:'0001-00001244', cliente:'Carpintería Rivas', items:8, fecha:'2026-08-18', total:67300, estado:'pagada' },
  { numero:'0001-00001243', cliente:'Electricidad Gómez', items:5, fecha:'2026-08-18', total:29800, estado:'pendiente' },
  { numero:'0001-00001242', cliente:'Corralón San José', items:15, fecha:'2026-08-17', total:112000, estado:'pagada' },
  { numero:'0001-00001241', cliente:'Pinturería Color', items:3, fecha:'2026-08-16', total:8900, estado:'pagada' },
  { numero:'0001-00001240', cliente:'Constructora Sur', items:9, fecha:'2026-08-15', total:44200, estado:'pendiente' },
  { numero:'0001-00001239', cliente:'Obra Av. Mitre', items:20, fecha:'2026-08-14', total:215600, estado:'anulada' },
];
const presupuestos = [
  { numero:'PRES-0089', cliente:'Constructora Andes', fecha:'2026-08-19', vence:'2026-08-26', total:95000, estado:'pendiente' },
  { numero:'PRES-0088', cliente:'Hotel Las Palmas', fecha:'2026-08-17', vence:'2026-08-24', total:432000, estado:'aprobado' },
  { numero:'PRES-0087', cliente:'Colegio San Martín', fecha:'2026-08-15', vence:'2026-08-22', total:188000, estado:'rechazado' },
  { numero:'PRES-0086', cliente:'Municipalidad Local', fecha:'2026-08-12', vence:'2026-08-19', total:760000, estado:'aprobado' },
  { numero:'PRES-0085', cliente:'Club Deportivo Norte', fecha:'2026-08-10', vence:'2026-08-17', total:55000, estado:'pendiente' },
];
const fiados = [
  { cliente:'Ana Beatriz Sosa', tel:'11-2233-4455', deuda:12500, compra:'2026-08-18', cuotas:3, nota:'Paga los viernes' },
  { cliente:'Ramón Castillo', tel:'11-6677-8899', deuda:7200, compra:'2026-08-15', cuotas:1, nota:'Cuenta corriente activa' },
  { cliente:'Gloria Méndez', tel:'11-9988-7766', deuda:31000, compra:'2026-08-10', cuotas:5, nota:'Adeuda desde julio' },
  { cliente:'Héctor Paredes', tel:'11-1122-3344', deuda:4800, compra:'2026-08-19', cuotas:2, nota:'' },
  { cliente:'Marta Villalba', tel:'11-4455-6677', deuda:18200, compra:'2026-08-12', cuotas:4, nota:'Llamar para recordar' },
];
const empleados = [
  { nombre:'Martina López', iniciales:'ML', tel:'11-4523-8811', rol:'Encargada', turno:'Mañana', ingreso:'2021-03-15', salario:285000, activo:true },
  { nombre:'Carlos Rodríguez', iniciales:'CR', tel:'11-6677-9902', rol:'Cajero', turno:'Tarde', ingreso:'2022-07-01', salario:220000, activo:true },
  { nombre:'Sofía Gómez', iniciales:'SG', tel:'11-2234-5566', rol:'Repositora', turno:'Mañana', ingreso:'2023-01-10', salario:195000, activo:true },
  { nombre:'Diego Fernández', iniciales:'DF', tel:'11-8899-0011', rol:'Cajero', turno:'Noche', ingreso:'2022-11-20', salario:220000, activo:false },
  { nombre:'Valeria Torres', iniciales:'VT', tel:'11-5544-3322', rol:'Supervisora', turno:'Tarde', ingreso:'2020-06-05', salario:310000, activo:true },
];
const APERTURA = 20000;
const cierres = [
  { fecha:'2026-08-19', turno:'Mañana', empleado:'Martina', ventas:184300, egresos:15000, dif:0 },
  { fecha:'2026-08-18', turno:'Tarde', empleado:'Carlos', ventas:97200, egresos:8500, dif:0 },
  { fecha:'2026-08-18', turno:'Mañana', empleado:'Martina', ventas:142800, egresos:12000, dif:-400 },
  { fecha:'2026-08-17', turno:'Tarde', empleado:'Carlos', ventas:88500, egresos:6200, dif:0 },
  { fecha:'2026-08-17', turno:'Mañana', empleado:'Martina', ventas:119600, egresos:9800, dif:0 },
];
// Productos cargados desde el formulario (se guardan en el navegador)
function leerExtra() {
  try { return JSON.parse(localStorage.getItem('ferresys_extra')) || []; } catch { return []; }
}
// Almacenamiento en el navegador: ventas, ajustes de stock y precios modificados
const ls = (k, def) => { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch { return def; } };
const guardarLS = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
const productos = () => {
  const precios = ls('ferresys_precios', {}), ajustes = ls('ferresys_stock', {});
  return [...productosBase, ...leerExtra()].map((p) => ({ ...p, precio: precios[p.codigo] ?? p.precio, stock: p.stock + (ajustes[p.codigo] || 0) }));
};
function ajustarStock(codigo, delta) { const a = ls('ferresys_stock', {}); a[codigo] = (a[codigo] || 0) + delta; guardarLS('ferresys_stock', a); }
const bajoMinimo = (p) => p.stock < p.minimo;
const esperado = (c) => APERTURA + c.ventas - c.egresos;

/* ================= HELPERS DE DOM ================= */
function el(tag, clase, texto) {                 // crea un elemento (textContent = seguro)
  const e = document.createElement(tag);
  if (clase) e.className = clase;
  if (texto !== undefined) e.textContent = texto;
  return e;
}
const tag = (texto, tipo) => el('span', 'tag ' + tipo, texto);
function llenar(tbody, filas) {                   // cada celda: texto, [texto, clase] o Node
  tbody.replaceChildren();
  filas.forEach((celdas) => {
    const tr = el('tr');
    celdas.forEach((c) => {
      let td;
      if (c instanceof Node) { td = el('td'); td.append(c); }
      else if (Array.isArray(c)) td = el('td', c[1], c[0]);
      else td = el('td', '', c);
      tr.append(td);
    });
    tbody.append(tr);
  });
}
function chips(cont, opciones, inicial, alElegir) {   // grupo de botones tipo filtro
  opciones.forEach((o) => {
    const b = el('button', 'btn chip', o);
    b.type = 'button'; b.setAttribute('aria-pressed', o === inicial);
    b.addEventListener('click', () => {
      cont.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b));
      alElegir(o);
    });
    cont.append(b);
  });
}
/* Imagen del producto: foto cargada por el usuario o ilustración de su categoría */
const raiz = document.body.dataset.raiz || '';
const slug = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '-');
function imgProducto(p, clase) {
  const i = el('img', clase || 'prod-img');
  i.src = p.imagen || raiz + 'img/categorias/' + slug(p.categoria) + '.svg';
  i.alt = 'Imagen de ' + p.nombre; i.loading = 'lazy';
  return i;
}
const barra = (pct, color) => { const b = el('div', 'barra ' + color); b.setAttribute('aria-hidden', 'true'); const s = el('span'); s.style.width = Math.min(100, pct) + '%'; b.append(s); return b; };

/* ================= COMUNES: menú, tema, alertas, avisos ================= */
const menuBtn = $('#menuBtn');
menuBtn.addEventListener('click', () => {
  const abierto = document.body.classList.toggle('menu-open');
  menuBtn.setAttribute('aria-expanded', abierto);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { document.body.classList.remove('menu-open'); menuBtn.setAttribute('aria-expanded', false); }
});
const temaBtn = $('#temaBtn');
function aplicarTema(t) {
  document.documentElement.dataset.theme = t;
  temaBtn.textContent = t === 'dark' ? 'Modo claro' : 'Modo oscuro';
}
let tema = 'dark';
try { tema = localStorage.getItem('tema') || 'dark'; } catch {}
aplicarTema(tema);
temaBtn.addEventListener('click', () => {
  tema = tema === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('tema', tema); } catch {}
  aplicarTema(tema);
});
function actualizarAlertas() {
  document.querySelectorAll('.js-alertas').forEach((x) => { x.textContent = productos().filter(bajoMinimo).length; });
}
actualizarAlertas();
let temporizador;
function avisar(msg) {                           // mensaje breve y accesible (role=status)
  const a = $('#aviso'); a.textContent = msg; a.hidden = false;
  clearTimeout(temporizador); temporizador = setTimeout(() => { a.hidden = true; }, 3500);
}
document.querySelectorAll('.js-pronto').forEach((b) =>
  b.addEventListener('click', () => avisar('Esta acción se habilitará en la próxima versión del sistema.')));

/* ================= TICKET (imprimible) ================= */
function mostrarTicket(v) {
  const c = $('#ticket-contenido'); c.replaceChildren();
  const lin = (a, b, cl) => { const d = el('div', 'tk-lin ' + (cl || '')); d.append(el('span', '', a), el('span', '', b)); return d; };
  const t = el('h2', 'tk-centro', 'FerreSys'); t.id = 'ticket-tit';
  c.append(t, el('p', 'tk-centro', 'Gestión ferretera'), el('p', 'tk-centro', 'Ticket ' + v.id), el('p', 'tk-centro', v.fecha), el('div', 'tk-sep'));
  v.items.forEach((i) => c.append(lin(i.cant + ' × ' + i.nombre, pesos(i.cant * i.precio))));
  c.append(el('div', 'tk-sep'));
  const sub = v.items.reduce((s, i) => s + i.cant * i.precio, 0);
  if (v.descuento) c.append(lin('Subtotal', pesos(sub)), lin('Descuento ' + v.descuento + '%', '-' + pesos(sub - v.total)));
  c.append(lin('TOTAL', pesos(v.total), 'tk-total'), lin('Pago', v.pago), lin('Cliente', v.cliente));
  if (v.estado === 'anulada') c.append(el('p', 'tk-centro', '*** VENTA ANULADA ***'));
  c.append(el('div', 'tk-sep'), el('p', 'tk-centro', '¡Gracias por su compra!'));
  $('#ticket').showModal();
}
if ($('#ticket')) {
  $('#imprimir').addEventListener('click', () => window.print());
  $('#cerrar-ticket').addEventListener('click', () => $('#ticket').close());
}

/* ================= PANTALLAS ================= */
function iniciarPanel() {
  const bajos = productos().filter(bajoMinimo);
  const pend = facturas.filter((f) => f.estado === 'pendiente');
  $('#kpi-alertas').textContent = bajos.length;
  $('#kpi-pendiente').textContent = pesos(pend.reduce((s, f) => s + f.total, 0));
  $('#kpi-pendiente-n').textContent = pend.length + ' facturas';
  $('#kpi-fiados').textContent = pesos(fiados.reduce((s, f) => s + f.deuda, 0));
  $('#kpi-fiados-n').textContent = fiados.length + ' clientes';
  const ul = $('#lista-facturas');
  facturas.slice(0, 4).forEach((f) => {
    const li = el('li'), izq = el('div'), der = el('div', 'num');
    izq.append(el('strong', '', f.cliente), el('small', 'num', f.numero));
    der.append(el('strong', '', pesos(f.total)), el('br'), tag(f.estado, f.estado === 'pagada' ? 'ok' : 'warn'));
    li.append(izq, der); ul.append(li);
  });
  bajos.slice(0, 4).forEach((p) => {
    const li = el('li'), izq = el('div'), der = el('div', 'num orange');
    izq.append(el('strong', '', p.nombre), el('small', '', p.codigo + ' · ' + p.categoria));
    der.append(el('strong', '', p.stock + ' u.'), el('small', '', 'mín ' + p.minimo));
    li.append(izq, der); $('#lista-alertas').append(li);
  });
}

function iniciarInventario() {
  const lista = productos(); let cat = 'Todas';
  function dibujar() {
    const q = $('#buscar').value.trim().toLowerCase();
    const vis = lista.filter((p) => (cat === 'Todas' || p.categoria === cat) &&
      (p.nombre.toLowerCase().includes(q) || p.codigo.toLowerCase().includes(q)));
    llenar($('#tabla-body'), vis.map((p) => {
      const nom = el('div'); nom.append(el('strong', '', p.nombre));
      if (bajoMinimo(p)) nom.append(el('br'), tag('⚠ Stock bajo', 'bad'));
      const celda = el('div', 'persona'); celda.append(imgProducto(p, 'thumb'), nom);
      return [[p.codigo, 'num'], celda, p.categoria, [p.stock, 'num ' + (bajoMinimo(p) ? 'orange' : 'teal')],
        [p.minimo, 'num'], [pesos(p.costo), 'num'], [pesos(p.precio), 'num']];
    }));
    $('#vacio').hidden = vis.length > 0;
  }
  $('#resumen').textContent = lista.length + ' productos registrados · ' + lista.filter(bajoMinimo).length + ' con stock bajo';
  chips($('#chips'), ['Todas', ...new Set(lista.map((p) => p.categoria))], cat, (c) => { cat = c; dibujar(); });
  $('#buscar').addEventListener('input', dibujar);
  dibujar();
}

function iniciarPOS() {
  const lista = productos(); const carrito = {}; let desc = 0, pago = 'Efectivo';
  const total = () => Math.round(Object.entries(carrito).reduce((s, [c, n]) => s + n * lista.find((p) => p.codigo === c).precio, 0));
  function dibujarProductos() {
    const q = $('#buscar').value.trim().toLowerCase(), cont = $('#prods'); cont.replaceChildren();
    lista.filter((p) => p.nombre.toLowerCase().includes(q) || p.codigo.toLowerCase().includes(q)).forEach((p) => {
      const b = el('button', 'prod'); b.type = 'button'; b.disabled = p.stock === 0;
      b.append(imgProducto(p), el('small', 'num', p.codigo), el('strong', '', p.nombre), el('span', 'precio', pesos(p.precio)), el('small', '', 'Stock: ' + p.stock + ' u.'));
      b.addEventListener('click', () => {
        if ((carrito[p.codigo] || 0) >= p.stock) { avisar('No hay más stock de ' + p.nombre + '.'); return; }
        carrito[p.codigo] = (carrito[p.codigo] || 0) + 1; dibujarCarrito();
      });
      cont.append(b);
    });
  }
  function dibujarCarrito() {
    const ul = $('#items'); ul.replaceChildren();
    Object.entries(carrito).forEach(([c, n]) => {
      const p = lista.find((x) => x.codigo === c), li = el('li'), izq = el('div'), qty = el('div', 'qty');
      izq.append(el('strong', '', p.nombre), el('small', 'num', pesos(p.precio * n)));
      const menos = el('button', 'btn', '−'), mas = el('button', 'btn', '+');
      menos.type = mas.type = 'button';
      menos.setAttribute('aria-label', 'Quitar una unidad de ' + p.nombre);
      mas.setAttribute('aria-label', 'Sumar una unidad de ' + p.nombre);
      menos.addEventListener('click', () => { if (--carrito[c] === 0) delete carrito[c]; dibujarCarrito(); });
      mas.addEventListener('click', () => { if (carrito[c] < p.stock) { carrito[c]++; dibujarCarrito(); } else avisar('No hay más stock.'); });
      qty.append(menos, el('span', 'num', n), mas); li.append(izq, qty); ul.append(li);
    });
    $('#carrito-vacio').hidden = Object.keys(carrito).length > 0;
    const sub = total(), tot = Math.round(sub * (1 - desc / 100));
    $('#sub').textContent = pesos(sub); $('#total').textContent = pesos(tot);
  }
  chips($('#desc'), ['Sin', '5%', '10%', '15%', '20%'], 'Sin', (o) => { desc = o === 'Sin' ? 0 : parseInt(o, 10); dibujarCarrito(); });
  chips($('#pago'), ['Efectivo', 'Tarjeta débito', 'Tarjeta crédito', 'Transferencia', 'Fiado'], pago, (o) => { pago = o; });
  $('#buscar').addEventListener('input', dibujarProductos);
  $('#cobrar').addEventListener('click', () => {
    const err = $('#err-cobro'); err.textContent = '';
    if (!Object.keys(carrito).length) { err.textContent = 'Agregá al menos un producto antes de cobrar.'; return; }
    if (pago === 'Fiado' && !$('#cliente').value.trim()) { err.textContent = 'Para vender en fiado, escribí el nombre del cliente.'; $('#cliente').focus(); return; }
    const items = Object.entries(carrito).map(([c, n]) => { const p = lista.find((x) => x.codigo === c); return { codigo:c, nombre:p.nombre, precio:p.precio, cant:n, devuelto:0 }; });
    const vs = ls('ferresys_ventas', []);
    const venta = { id:'T-' + String(vs.length + 1).padStart(5, '0'), fecha:new Date().toLocaleString('es-AR'),
      cliente:$('#cliente').value.trim() || 'Consumidor final', pago, descuento:desc, items,
      total:Math.round(total() * (1 - desc / 100)), estado:'completada' };
    vs.push(venta);
    if (!guardarLS('ferresys_ventas', vs)) { err.textContent = 'No se pudo guardar la venta: el navegador no tiene espacio.'; return; }
    items.forEach((i) => { ajustarStock(i.codigo, -i.cant); lista.find((p) => p.codigo === i.codigo).stock -= i.cant; });
    Object.keys(carrito).forEach((c) => delete carrito[c]);
    $('#cliente').value = ''; dibujarCarrito(); dibujarProductos(); actualizarAlertas(); mostrarTicket(venta);
  });
  dibujarProductos(); dibujarCarrito();
}

function iniciarAlertas() {
  const bajos = productos().filter(bajoMinimo), sin = bajos.filter((p) => p.stock === 0);
  $('#resumen').textContent = sin.length + ' sin stock · ' + bajos.length + ' bajo mínimo';
  bajos.forEach((p) => {
    const pct = Math.round((p.stock / p.minimo) * 100), rep = 2 * p.minimo - p.stock, art = el('article', 'card item-alerta');
    const a = el('div', 'fila-sp'), t = el('div'), n = el('div', 'num ' + (pct < 30 ? 'red' : 'orange'));
    t.append(el('strong', '', p.nombre), el('br'), el('small', 'sub', p.codigo + ' · ' + p.categoria));
    n.append(el('strong', '', p.stock + ' u.'), el('br'), el('small', 'sub', 'de ' + p.minimo + ' mín. (' + pct + '%)'));
    const w = el('div', 'persona'); w.append(imgProducto(p, 'thumb'), t); a.append(w, n);
    const c = el('div', 'fila-sp sub');
    c.append(el('small', '', 'Costo unitario: ' + pesos(p.costo)), el('small', '', 'Reponer ' + rep + ' u. ≈ ' + pesos(rep * p.costo)));
    art.append(a, barra(pct, pct < 30 ? 'red' : 'orange'), c); $('#lista').append(art);
  });
}

function iniciarCierre() {
  const u = cierres[0];
  $('#ultimo-fecha').textContent = u.fecha + ' · Turno ' + u.turno;
  $('#responsable').textContent = u.empleado + ' López';
  [['Apertura', pesos(APERTURA), ''], ['Ventas', pesos(u.ventas), 'teal'], ['Egresos', pesos(u.egresos), 'red'],
   ['Cierre esperado', pesos(esperado(u)), ''], ['Diferencia', conSigno(u.dif), u.dif < 0 ? 'orange' : 'teal']].forEach(([l, v, c]) => {
    const m = el('div', 'mini'); m.append(el('small', 'sub', l), el('strong', c, v)); $('#minis').append(m);
  });
  llenar($('#tabla-body'), cierres.map((c) => [c.fecha, tag(c.turno, c.turno === 'Mañana' ? 'ok' : 'warn'), c.empleado,
    [pesos(c.ventas), 'num teal'], [pesos(c.egresos), 'num red'], [pesos(esperado(c)), 'num'], [conSigno(c.dif), 'num ' + (c.dif < 0 ? 'orange' : 'teal')]]));
}

function iniciarFacturacion() {
  let est = 'Todas';
  const suma = (e) => facturas.filter((f) => f.estado === e).reduce((s, f) => s + f.total, 0);
  $('#resumen').textContent = facturas.length + ' comprobantes · agosto 2026';
  $('#k-cobrado').textContent = pesos(suma('pagada')); $('#k-pendiente').textContent = pesos(suma('pendiente')); $('#k-anulado').textContent = pesos(suma('anulada'));
  const color = { pagada:'ok', pendiente:'warn', anulada:'bad' };
  function dibujar() {
    const q = $('#buscar').value.trim().toLowerCase();
    const vis = facturas.filter((f) => (est === 'Todas' || f.estado === est.toLowerCase()) && (f.cliente.toLowerCase().includes(q) || f.numero.includes(q)));
    llenar($('#tabla-body'), vis.map((f) => { const c = el('div'); c.append(el('strong', '', f.cliente), el('br'), el('small', 'sub', f.items + ' ítems'));
      return [[f.numero, 'num'], c, f.fecha, [pesos(f.total), 'num'], tag(f.estado, color[f.estado])]; }));
    $('#vacio').hidden = vis.length > 0;
  }
  chips($('#chips'), ['Todas', 'Pagada', 'Pendiente', 'Anulada'], est, (o) => { est = o; dibujar(); });
  $('#buscar').addEventListener('input', dibujar); dibujar();
}

function iniciarPresupuestos() {
  const ap = presupuestos.filter((p) => p.estado === 'aprobado'), es = presupuestos.filter((p) => p.estado === 'pendiente');
  const sum = (l) => pesos(l.reduce((s, p) => s + p.total, 0));
  $('#k-aprobados').textContent = sum(ap); $('#k-aprobados-n').textContent = ap.length + ' presupuestos';
  $('#k-espera').textContent = sum(es); $('#k-espera-n').textContent = es.length + ' presupuestos';
  $('#k-conv').textContent = Math.round((ap.length / presupuestos.length) * 100) + '%'; $('#k-conv-n').textContent = presupuestos.length + ' presupuestos';
  const color = { pendiente:'warn', aprobado:'ok', rechazado:'bad' };
  llenar($('#tabla-body'), presupuestos.map((p) => [[p.numero, 'num'], el('strong', '', p.cliente), p.fecha,
    [p.estado === 'pendiente' ? p.vence + ' ⚠' : p.vence, p.estado === 'pendiente' ? 'red' : ''], [pesos(p.total), 'num'], tag(p.estado, color[p.estado])]));
}

function iniciarFiados() {
  $('#resumen').textContent = fiados.length + ' clientes con deuda · Total: ' + pesos(fiados.reduce((s, f) => s + f.deuda, 0));
  fiados.forEach((f) => {
    const col = f.deuda >= 25000 ? 'red' : f.deuda >= 10000 ? 'orange' : 'purple', art = el('article', 'card item-alerta');
    const a = el('div', 'fila-sp'), t = el('div'), pie = el('div', 'fila-sp');
    t.append(el('strong', '', f.cliente), el('br'), el('small', 'sub', '📞 ' + f.tel));
    a.append(t, el('strong', 'num ' + col, pesos(f.deuda)));
    pie.append(el('small', 'sub', 'Última compra: ' + f.compra), tag(f.cuotas + (f.cuotas === 1 ? ' cuota' : ' cuotas'), 'pur'));
    art.append(a, barra((f.deuda / 35000) * 100, col), pie);
    if (f.nota) art.append(el('small', 'sub', '📝 ' + f.nota));
    $('#lista').append(art);
  });
}

function iniciarEmpleados() {
  const act = empleados.filter((e) => e.activo), tur = { Mañana:'ok', Tarde:'warn', Noche:'pur' };
  $('#resumen').textContent = act.length + ' activos · ' + (empleados.length - act.length) + ' inactivos';
  llenar($('#tabla-body'), empleados.map((e, i) => {
    const p = el('div', 'persona'), d = el('div');
    d.append(el('strong', '', e.nombre), el('small', 'num', '📞 ' + e.tel));
    p.append(el('span', 'avatar av' + i, e.iniciales), d);
    return [p, e.rol, tag(e.turno, tur[e.turno]), [e.ingreso, 'num'], [pesos(e.salario), 'num'], tag(e.activo ? 'Activo' : 'Inactivo', e.activo ? 'ok' : 'bad')];
  }));
  $('#nom-total').textContent = pesos(act.reduce((s, e) => s + e.salario, 0));
  $('#nom-n').textContent = act.length + ' empleados activos';
}

/* ---- Formulario: validación con mensajes junto a cada campo ---- */
function iniciarFormulario() {
  const form = $('#form-producto');
  let imagen = '';                                   // foto en formato data URL (reducida)
  $('#foto').addEventListener('change', (e) => {
    const f = e.target.files[0], err = $('#err-foto'), vista = $('#preview');
    err.textContent = ''; imagen = ''; vista.hidden = true;
    if (!f) return;
    if (!f.type.startsWith('image/')) { err.textContent = 'El archivo debe ser una imagen (JPG, PNG o WEBP).'; e.target.value = ''; return; }
    if (f.size > 5 * 1024 * 1024) { err.textContent = 'La imagen pesa más de 5 MB. Elegí una más liviana.'; e.target.value = ''; return; }
    const img = new Image(), url = URL.createObjectURL(f);
    img.onload = () => {
      const k = Math.min(1, 400 / Math.max(img.width, img.height)), c = document.createElement('canvas');
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      imagen = c.toDataURL('image/jpeg', 0.8); vista.src = imagen; vista.hidden = false; URL.revokeObjectURL(url);
    };
    img.onerror = () => { err.textContent = 'No se pudo leer la imagen. Probá con otro archivo.'; };
    img.src = url;
  });
  const num0 = (v) => v !== '' && Number(v) >= 0;
  const reglas = {
    codigo: (v) => /^[A-Z]{3}-\d{3}$/.test(v) || 'Usá 3 letras mayúsculas, guion y 3 números. Ej: TOR-001.',
    nombre: (v) => v.trim().length >= 3 || 'Escribí el nombre del artículo (mínimo 3 letras).',
    categoria: (v) => v !== '' || 'Elegí una categoría.',
    stock: (v) => num0(v) || 'Ingresá el stock actual (0 o más).',
    minimo: (v) => num0(v) || 'Ingresá el stock mínimo (0 o más).',
    costo: (v) => Number(v) > 0 || 'El costo debe ser mayor a 0.',
    precio: (v, d) => (Number(v) > 0 && Number(v) >= Number(d.costo)) || 'El precio debe ser mayor a 0 y no menor al costo.',
    ingreso: (v) => v !== '' || 'Elegí la fecha de ingreso.',
    proveedor: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Escribí un email válido. Ej: ventas@proveedor.com.',
  };
  const leer = () => Object.fromEntries(new FormData(form).entries());
  function validar(campo, datos) {
    const r = reglas[campo](datos[campo], datos);
    $('#err-' + campo).textContent = r === true ? '' : r;
    form.elements[campo].setAttribute('aria-invalid', r !== true);
    return r === true;
  }
  form.addEventListener('input', (e) => { if (e.target.name) validar(e.target.name, leer()); });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = leer(), malos = Object.keys(reglas).filter((c) => !validar(c, d));
    $('#ok').hidden = true;
    if (malos.length) { form.elements[malos[0]].focus(); return; }
    const extra = leerExtra();
    extra.push({ codigo:d.codigo, nombre:d.nombre.trim(), categoria:d.categoria, stock:Number(d.stock), minimo:Number(d.minimo), costo:Number(d.costo), precio:Number(d.precio), imagen });
    try { localStorage.setItem('ferresys_extra', JSON.stringify(extra)); }
    catch { $('#err-foto').textContent = 'No hay espacio para guardar. Probá con una imagen más chica o sin foto.'; return; }
    $('#ok').hidden = false; form.reset(); imagen = ''; $('#preview').hidden = true; actualizarAlertas();
  });
}

const boton = (txt, fn, off) => { const b = el('button', 'btn', txt); b.type = 'button'; b.disabled = !!off; b.addEventListener('click', fn); return b; };
function actualizarVenta(id, fn) { const vs = ls('ferresys_ventas', []); fn(vs.find((x) => x.id === id)); guardarLS('ferresys_ventas', vs); }
const factor = (v) => 1 - v.descuento / 100;

function iniciarDevoluciones() {
  const estadoDe = (v) => v.estado === 'anulada' ? ['anulada', 'bad'] : v.items.some((i) => i.devuelto > 0) ? ['devolución parcial', 'warn'] : ['completada', 'ok'];
  function tarjeta(v) {
    const art = el('article', 'card item-alerta'), [txt, cl] = estadoDe(v), disp = v.items.filter((i) => i.cant - i.devuelto > 0);
    const cab = el('div', 'fila-sp'), t = el('div'), d = el('div', 'num');
    t.append(el('strong', '', 'Ticket ' + v.id), el('br'), el('small', 'sub', v.fecha + ' · ' + v.cliente + ' · ' + v.pago));
    d.append(el('strong', '', pesos(v.total)), el('br'), tag(txt, cl)); cab.append(t, d);
    const ul = el('ul', 'lista');
    v.items.forEach((i) => { const li = el('li'); li.append(el('span', '', i.cant + ' × ' + i.nombre), el('small', 'num', i.devuelto ? i.devuelto + ' devuelto(s)' : '')); ul.append(li); });
    const form = el('form'); form.hidden = true; form.noValidate = true;
    const campos = disp.map((i) => {
      const f = el('div', 'field'), l = el('label', '', i.nombre + ' (máx. ' + (i.cant - i.devuelto) + ')'), inp = el('input');
      inp.type = 'number'; inp.id = v.id + '-' + i.codigo; inp.min = 0; inp.max = i.cant - i.devuelto; inp.value = 0; l.htmlFor = inp.id;
      f.append(l, inp); form.append(f); return [i, inp];
    });
    const fm = el('div', 'field'), lm = el('label', '', 'Motivo'), sel = el('select'); lm.htmlFor = sel.id = v.id + '-motivo';
    ['Producto defectuoso', 'Error en la venta', 'El cliente se arrepintió', 'Otro'].forEach((m) => sel.append(new Option(m, m)));
    const err = el('p', 'error'); err.setAttribute('role', 'alert');
    const acc = el('div', 'form-actions'), ok = el('button', 'btn btn-primary', 'Confirmar devolución'); ok.type = 'submit'; acc.append(ok);
    fm.append(lm, sel); form.append(fm, err, acc);
    form.addEventListener('submit', (e) => {
      e.preventDefault(); err.textContent = '';
      const pedidos = campos.map(([i, inp]) => [i, Number(inp.value)]);
      if (pedidos.some(([i, n]) => !Number.isInteger(n) || n < 0 || n > i.cant - i.devuelto)) { err.textContent = 'Revisá las cantidades: deben ser números enteros y no superar lo disponible.'; return; }
      const reint = pedidos.reduce((s, [i, n]) => s + n * i.precio, 0) * factor(v);
      if (!reint) { err.textContent = 'Indicá al menos un artículo a devolver.'; return; }
      actualizarVenta(v.id, (x) => pedidos.forEach(([i, n]) => { x.items.find((y) => y.codigo === i.codigo).devuelto += n; ajustarStock(i.codigo, n); }));
      avisar('Devolución registrada. Reintegro al cliente: ' + pesos(Math.round(reint)) + '.'); actualizarAlertas(); dibujar();
    });
    const anular = () => {
      const reint = Math.round(disp.reduce((s, i) => s + (i.cant - i.devuelto) * i.precio, 0) * factor(v));
      if (!confirm('¿Anular el ticket ' + v.id + '? Se reintegran ' + pesos(reint) + ' y los artículos vuelven al stock.')) return;
      actualizarVenta(v.id, (x) => { x.items.forEach((i) => { ajustarStock(i.codigo, i.cant - i.devuelto); i.devuelto = i.cant; }); x.estado = 'anulada'; });
      avisar('Venta anulada. Reintegro: ' + pesos(reint) + '.'); actualizarAlertas(); dibujar();
    };
    const acc2 = el('div', 'chips');
    acc2.append(boton('🖨 Reimprimir ticket', () => mostrarTicket(v)),
      boton('↩ Devolver artículos', () => { form.hidden = !form.hidden; }, !disp.length || v.estado === 'anulada'),
      boton('✕ Anular venta', anular, v.estado === 'anulada' || !disp.length));
    art.append(cab, ul, acc2, form); return art;
  }
  function dibujar() {
    const todas = ls('ferresys_ventas', []), q = $('#buscar').value.trim().toLowerCase();
    const vis = todas.slice().reverse().filter((v) => v.id.toLowerCase().includes(q) || v.cliente.toLowerCase().includes(q));
    $('#lista').replaceChildren(...vis.map(tarjeta));
    $('#vacio').hidden = vis.length > 0; $('#resumen').textContent = todas.length + ' ventas registradas';
  }
  $('#buscar').addEventListener('input', dibujar); dibujar();
}

function iniciarAumento() {
  let lista = productos();
  const pct = $('#porcentaje'), cat = $('#categoria'), red = $('#redondeo'), err = $('#err-porcentaje');
  cat.append(new Option('Todas las categorías', ''));
  [...new Set(lista.map((p) => p.categoria))].forEach((c) => cat.append(new Option(c, c)));
  const valido = () => Number(pct.value) >= 0.1 && Number(pct.value) <= 100;
  const nuevo = (p) => { const n = p.precio * (1 + Number(pct.value) / 100), m = Number(red.value); return m ? Math.round(n / m) * m : Math.round(n); };
  const afectados = () => lista.filter((p) => !cat.value || p.categoria === cat.value);
  function dibujar() {
    $('#deshacer').disabled = !localStorage.getItem('ferresys_precios_prev');
    if (!valido()) { llenar($('#tabla-body'), []); $('#hint').textContent = 'Escribí un porcentaje entre 0,1 y 100 para ver cómo quedan los precios.'; return; }
    const af = afectados(); $('#hint').textContent = 'Se actualizarán ' + af.length + ' artículos.';
    llenar($('#tabla-body'), af.map((p) => [el('strong', '', p.nombre), p.categoria, [pesos(p.precio), 'num'], [pesos(nuevo(p)), 'num teal'], ['+' + pesos(nuevo(p) - p.precio), 'num']]));
  }
  [pct, cat, red].forEach((x) => x.addEventListener('input', () => { err.textContent = ''; pct.setAttribute('aria-invalid', 'false'); dibujar(); }));
  $('#form-aumento').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!valido()) { err.textContent = 'Ingresá un porcentaje entre 0,1 y 100.'; pct.setAttribute('aria-invalid', 'true'); pct.focus(); return; }
    const af = afectados();
    if (!confirm('¿Aumentar ' + pct.value + '% el precio de ' + af.length + ' artículos?')) return;
    const precios = ls('ferresys_precios', {});
    guardarLS('ferresys_precios_prev', precios);
    af.forEach((p) => { precios[p.codigo] = nuevo(p); });
    guardarLS('ferresys_precios', precios);
    avisar('Aumento aplicado a ' + af.length + ' artículos.'); pct.value = ''; lista = productos(); dibujar();
  });
  $('#deshacer').addEventListener('click', () => {
    const prev = ls('ferresys_precios_prev', null); if (!prev) return;
    guardarLS('ferresys_precios', prev); localStorage.removeItem('ferresys_precios_prev');
    avisar('Se volvió a los precios anteriores.'); lista = productos(); dibujar();
  });
  dibujar();
}

const pantallas = { panel:iniciarPanel, pos:iniciarPOS, inventario:iniciarInventario, alertas:iniciarAlertas, cierre:iniciarCierre,
  facturacion:iniciarFacturacion, presupuestos:iniciarPresupuestos, fiados:iniciarFiados, empleados:iniciarEmpleados, nuevo:iniciarFormulario, devoluciones:iniciarDevoluciones, aumento:iniciarAumento };
pantallas[document.body.dataset.page]();
