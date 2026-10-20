# FerreSys · Gestión ferretera

Sistema web para administrar una ferretería: ventas, inventario, caja, facturación, presupuestos, clientes con deuda y empleados. Está hecho con **HTML, CSS y JavaScript puros** (sin frameworks ni librerías) a partir de un prototipo diseñado en Figma.

## Datos del proyecto

| | |
|---|---|
| **Integrantes** | Agustín Purino |
| **Sitio publicado** | https://ferresysf.netlify.app/ |
| **Prototipo de Figma** | https://www.figma.com/make/pZT1V9jL7ZSubWLf1kw29h/Prototipo-de-sitio-web |
| **Repositorio** | https://github.com/AgusPurino230306/ferresys |

## Problema que resuelve

Muchas ferreterías chicas llevan ventas, stock, caja y deudas de clientes en cuadernos o planillas sueltas. Eso genera errores de stock, cierres de caja que no cierran y deudas olvidadas. FerreSys reúne todo en un solo lugar, con alertas cuando un artículo baja del mínimo y una venta que se resuelve en pocos toques.

**Usuaria principal:** la encargada o el cajero de una ferretería de barrio, que trabaja con el mostrador lleno y necesita cobrar rápido y no quedarse sin stock.

## Pantallas

| Pantalla | Archivo | Qué permite |
|---|---|---|
| Panel de control | `index.html` | Ver ventas del día, facturas pendientes, fiados y alertas de stock |
| Punto de venta | `pages/punto-de-venta.html` | Armar el carrito, aplicar descuento, elegir medio de pago, cobrar e imprimir el ticket |
| Devoluciones | `pages/devoluciones.html` | Anular ventas, devolver artículos y reimprimir tickets |
| Inventario | `pages/inventario.html` | Listar artículos con imagen, buscar y filtrar por categoría |
| Nuevo producto | `pages/nuevo-producto.html` | Cargar un artículo con validación y foto opcional |
| Aumento de precios | `pages/aumento-precios.html` | Subir precios en forma masiva con vista previa y opción de deshacer |
| Alertas de stock | `pages/alertas-stock.html` | Ver artículos bajo el mínimo y cuánto reponer |
| Cierre de caja | `pages/cierre-caja.html` | Consultar el último cierre y el historial por turno |
| Facturación | `pages/facturacion.html` | Buscar y filtrar comprobantes por estado |
| Presupuestos | `pages/presupuestos.html` | Ver presupuestos, totales y tasa de conversión |
| Libreta de fiados | `pages/fiados.html` | Ver clientes con deuda, cuotas y notas |
| Empleados | `pages/empleados.html` | Ver el personal y el resumen de nómina |

## Funcionalidades de JavaScript

- **Contenido generado desde datos:** inventario, facturas, presupuestos, fiados, empleados y cierres se arman con el DOM a partir de arrays de objetos.
- **Búsqueda y filtros:** inventario, punto de venta, facturación y devoluciones.
- **Validación de formularios:** nuevo producto, devolución y aumento de precios muestran el error junto a cada campo.
- **Carrito de compras** con descuentos, medios de pago y control de stock.
- **Ticket imprimible:** se genera al cobrar y se imprime en formato de 80 mm.
- **Anulaciones y devoluciones:** devuelven los artículos al stock y calculan el reintegro.
- **Aumento masivo de precios:** por porcentaje y categoría, con redondeo y vista previa.
- **Fotos de productos:** se pueden subir desde el formulario y se reducen antes de guardarse.
- **Menú hamburguesa** en celulares y **modo claro u oscuro** con variables CSS.

## Tecnologías

- **HTML5 semántico:** `header`, `nav`, `main`, `section`, `article`, `footer`, un solo `h1` por página y `label` en cada campo.
- **CSS3:** variables en `:root`, Flexbox y Grid, diseño responsive con media queries, estados `:hover` y `:focus`, transiciones y componentes reutilizables (`.btn`, `.card`, `.chip`, `.tag`).
- **JavaScript (ES6+)** sin librerías.
- **Tipografías:** DM Sans y JetBrains Mono (Google Fonts).

## Estructura de carpetas

```
ferresys/
├── index.html
├── pages/
│   ├── punto-de-venta.html
│   ├── devoluciones.html
│   ├── inventario.html
│   ├── nuevo-producto.html
│   ├── aumento-precios.html
│   ├── alertas-stock.html
│   ├── cierre-caja.html
│   ├── facturacion.html
│   ├── presupuestos.html
│   ├── fiados.html
│   └── empleados.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── img/
│   ├── logo.svg
│   └── categorias/    (ilustraciones de cada categoría)
└── README.md
```

## Cómo ejecutarlo

No requiere instalación. Descargá o cloná el repositorio y abrí `index.html` en el navegador.

```bash
git clone https://github.com/TU-USUARIO/ferresys.git
cd ferresys
```

Para verlo con recarga automática, usá la extensión **Live Server** de VS Code.

## Accesibilidad y usabilidad

- Navegación completa con teclado (tecla Tab), con foco visible en enlaces, botones y campos.
- Textos alternativos en todas las imágenes y etiquetas asociadas a cada campo.
- Mensajes de error anunciados con `role="alert"` y avisos con `role="status"`.
- Contraste de colores revisado en modo oscuro y claro.
- Respeta la preferencia del sistema de reducir animaciones.

### Resultados de Lighthouse

| Categoría | Puntaje |
|---|---|
| Accesibilidad | _completar_ |
| Buenas prácticas | _completar_ |

## Cambios respecto al prototipo

| Cambio | Justificación |
|---|---|
| Menú hamburguesa en celulares | La barra lateral ocupa demasiado ancho en pantallas chicas |
| Modo claro además del oscuro | Mejora la lectura en mostradores con mucha luz |
| Miniaturas e imágenes de productos | Ayuda a reconocer el artículo rápido al vender |
| Devoluciones, aumento de precios y ticket | Necesidades reales de una ferretería que el prototipo no cubría |
| _Agregar los cambios que surjan del testeo con usuarios_ | _completar_ |

## Limitaciones conocidas

- Los datos nuevos (ventas, precios modificados, stock, fotos y productos cargados) se guardan en el navegador (`localStorage`), no en un servidor. No se comparten entre dispositivos.
- Los botones "+ Nuevo..." de Cierre de caja, Facturación, Presupuestos, Fiados y Empleados muestran un aviso y todavía no abren un formulario.
- Las ventas anteriores a la primera venta registrada en cada navegador son datos de ejemplo.

## Autores

_Integrantes del equipo y materia._
