// Artículos del blog. Estos son los valores por defecto (respaldo si
// content/blog.json no carga). Una vez editado desde /admin, el contenido
// real vive en content/blog.json.
//
// Cada post tiene un `body`: una lista de bloques simples —
//   { type: 'p', text }      párrafo
//   { type: 'h3', text }     subtítulo dentro del artículo
//   { type: 'ul', items }    lista con viñetas
//   { type: 'template', title, text }  plantilla de correo (caja aparte)
//
// Nota: algunos datos (franquicias, tarifas de almacenaje) cambian y varían
// por aduana o naviera — están redactados en términos generales a propósito.
// Conviene que el equipo revise cifras y vigencias antes de publicar.
export const BLOG_POSTS = [
  {
    "slug": "como-leer-tu-pedimento",
    "title": "Cómo leer tu pedimento sin ser experto",
    "excerpt": "El pedimento es la prueba de que tu mercancía entró a México en regla. Te explicamos qué dice cada sección, sin tecnicismos.",
    "body": [
      {
        "type": "p",
        "text": "Es normal recibir tu primer pedimento y no entender la mitad: está lleno de claves, siglas y casillas. Aun así, vale la pena saber leerlo. Es la prueba de que tu mercancía entró (o salió) de México cumpliendo la ley, y es el documento que tendrás que mostrar si el SAT te revisa más adelante. No hace falta ser experto; basta con saber dónde mirar."
      },
      {
        "type": "h3",
        "text": "El encabezado"
      },
      {
        "type": "p",
        "text": "En la parte superior están los datos generales: el número de pedimento (su folio único), la aduana por donde pasó la mercancía, la clave del pedimento (indica el tipo de operación; por ejemplo, A1 es una importación o exportación definitiva), el tipo de cambio que se usó y los datos del importador y del agente aduanal que lo tramitó. El importador puedes ser tú o la comercializadora, según cómo se haya hecho la operación."
      },
      {
        "type": "h3",
        "text": "Las partidas"
      },
      {
        "type": "p",
        "text": "Cada producto distinto aparece como una partida. En ella verás la descripción de la mercancía, su fracción arancelaria (el código que la clasifica), la cantidad, el país de origen y el valor en aduana. Si importaste tres productos diferentes, habrá tres partidas."
      },
      {
        "type": "h3",
        "text": "Las contribuciones"
      },
      {
        "type": "p",
        "text": "Aquí se desglosa lo que se pagó: el IGI (el arancel), el DTA (el derecho de trámite aduanero) y el IVA. Si tu producto lo requiere, también pueden aparecer otros conceptos, como IEPS o cuotas compensatorias. Te recomendamos comparar estas cifras con la cotización que te dimos al inicio: deben coincidir."
      },
      {
        "type": "h3",
        "text": "El semáforo"
      },
      {
        "type": "p",
        "text": "Al presentar la mercancía en la aduana, el sistema hace una selección automatizada, conocida como semáforo. Verde significa que la mercancía se libera sin revisión física. Rojo significa que pasa a reconocimiento aduanero, es decir, que la autoridad la revisa antes de liberarla. Un rojo no quiere decir que algo esté mal; solo que el proceso tarda un poco más, y mientras tanto nosotros damos seguimiento por ti."
      },
      {
        "type": "h3",
        "text": "Qué revisar cuando lo recibas"
      },
      {
        "type": "p",
        "text": "Lo más importante es confirmar que la descripción de la mercancía, las cantidades y el valor coincidan con lo que realmente compraste. Si algo no cuadra, es mucho más fácil corregirlo en ese momento que meses después. Y si hay algo que no entiendes, pregúntanos: te lo explicamos línea por línea."
      }
    ]
  },
  {
    "slug": "incoterms-explicados",
    "title": "Incoterms explicados con ejemplos reales",
    "excerpt": "EXW, FOB, CIF, DDP… Te explicamos qué significa cada uno y qué implica para ti, con ejemplos de compras reales.",
    "body": [
      {
        "type": "p",
        "text": "Un Incoterm no es un tipo de flete. Es una regla internacional, publicada por la Cámara de Comercio Internacional, que se pacta en cada compra para definir tres cosas: quién paga el transporte, quién contrata el seguro y en qué punto exacto el riesgo pasa del proveedor a ti. Una vez que entiendes eso, lo demás son combinaciones de letras. Estos son los cuatro que más vas a encontrar:"
      },
      {
        "type": "h3",
        "text": "EXW (Ex Works, en fábrica)"
      },
      {
        "type": "p",
        "text": "El proveedor solo tiene la mercancía lista en su fábrica o bodega. Desde ahí todo corre por tu cuenta: cargarla, llevarla al puerto, hacer el trámite de exportación en el país de origen y pagar el flete internacional. Ejemplo: compras piezas a un taller en Guangzhou en EXW; nosotros coordinamos la recolección en su puerta y todo lo que sigue. Un detalle: en algunos países es complicado hacer el despacho de exportación si no eres el vendedor, así que conviene revisarlo antes de aceptar este término."
      },
      {
        "type": "h3",
        "text": "FOB (Free On Board, libre a bordo)"
      },
      {
        "type": "p",
        "text": "El proveedor lleva la mercancía al puerto de origen, hace el trámite de exportación y la sube al barco. A partir de ese momento, el flete marítimo, el seguro y la importación en México son tuyos. Ejemplo: \"FOB Shanghái\" significa que el proveedor responde hasta que la carga está a bordo en Shanghái; de ahí en adelante, nosotros nos encargamos del flete y del despacho en México. FOB solo se usa en transporte marítimo."
      },
      {
        "type": "h3",
        "text": "CIF (Cost, Insurance and Freight, costo, seguro y flete)"
      },
      {
        "type": "p",
        "text": "Además de lo que cubre en FOB, el proveedor paga el flete marítimo y un seguro básico hasta el puerto de destino en México. Tú te encargas del despacho aduanal y del transporte desde el puerto. Algo que poca gente sabe: aunque el proveedor pague el flete, el riesgo pasa a ti desde que la mercancía sube al barco en origen, igual que en FOB, y el seguro que contrata suele ser la cobertura mínima. Puede convenirte si el proveedor consigue un buen flete, pero revisa bien qué cubre ese seguro."
      },
      {
        "type": "h3",
        "text": "DDP (Delivered Duty Paid, entregado con derechos pagados)"
      },
      {
        "type": "p",
        "text": "El proveedor se hace cargo de casi todo, incluidos los impuestos de importación en México, y te entrega en tu bodega. Suena muy cómodo, pero tiene una complicación: alguien tiene que figurar como importador ante la aduana mexicana, con RFC y padrón de importadores, y un proveedor extranjero normalmente no los tiene. Antes de aceptar un DDP, revisemos juntos quién va a importar y cómo se va a facturar."
      },
      {
        "type": "h3",
        "text": "¿Cuál te conviene?"
      },
      {
        "type": "p",
        "text": "Para envíos marítimos, a la mayoría de nuestros clientes les recomendamos FOB. Es un buen equilibrio: el proveedor se encarga de lo que mejor controla (sacar la mercancía de su país) y nosotros tomamos el control desde ahí, que es justo lo que mejor conocemos. Si tu envío es aéreo o el contenedor se entrega en una terminal, el término equivalente suele ser FCA. Pregúntanos antes de cerrar la compra y te decimos cuál pedir."
      }
    ]
  },
  {
    "slug": "documentos-para-tu-proveedor",
    "title": "Qué documentos pedirle a tu proveedor",
    "excerpt": "Cinco documentos que necesitas antes de que tu proveedor embarque, y por qué pedirlos a tiempo te ahorra días de retraso y cargos inesperados.",
    "body": [
      {
        "type": "p",
        "text": "Muchos retrasos en una importación no ocurren en la aduana, sino antes: un documento llega incompleto, con errores o tarde. Esto se evita fácilmente si desde el principio sabes qué pedirle a tu proveedor. Estos son los cinco básicos:"
      },
      {
        "type": "ul",
        "items": [
          "Factura comercial (commercial invoice): con los datos del vendedor y del comprador, la descripción de cada producto, cantidades, precio unitario, valor total, moneda e Incoterm.",
          "Lista de empaque (packing list): cómo viene acomodada la mercancía: número de bultos, contenido de cada uno, pesos y medidas.",
          "Documento de transporte: el conocimiento de embarque o Bill of Lading (B/L) si viaja por mar, o la guía aérea (Air Waybill) si viaja por avión.",
          "Certificado de origen: demuestra dónde se fabricó el producto. Si ese país tiene un tratado comercial con México, puede reducir o eliminar el arancel.",
          "Ficha técnica: describe los materiales, la composición y el uso del producto. Nos sirve para confirmar la fracción arancelaria y saber si necesita algún permiso o NOM."
        ]
      },
      {
        "type": "h3",
        "text": "Por qué pedirlos a tiempo"
      },
      {
        "type": "p",
        "text": "La aduana no libera mercancía con documentación incompleta. Si al llegar el embarque a puerto falta la factura o el certificado de origen, la operación se detiene hasta conseguirlos, y cada día de espera puede generar cargos de almacenaje y demoras que se acumulan rápido."
      },
      {
        "type": "p",
        "text": "Además, cada documento cumple una función: la factura y la lista de empaque son la base para calcular bien tus impuestos, el certificado de origen puede ahorrarte arancel y la ficha técnica nos permite detectar a tiempo si necesitas un permiso especial, antes de que la mercancía ya venga en camino."
      },
      {
        "type": "p",
        "text": "Lo ideal es pedir borradores de estos documentos antes de que el proveedor embarque. Así podemos revisarlos y corregir cualquier error mientras todavía es fácil hacerlo."
      },
      {
        "type": "p",
        "text": "¿Tu proveedor no tiene alguno? Escríbenos y te decimos cómo pedírselo o qué alternativa hay."
      }
    ]
  },
  {
    "slug": "importar-sin-pagar-iva",
    "title": "Qué productos puedes importar sin pagar IVA",
    "excerpt": "La regla general es que toda importación paga IVA. Pero hay excepciones reales, y aquí te explicamos cuáles son para que sepas si alguna aplica a tu caso.",
    "body": [
      {
        "type": "p",
        "text": "En México, casi toda importación paga IVA, además del arancel que le corresponda. Sin embargo, hay excepciones legítimas que conviene conocer. Una aclaración antes de empezar: los montos y requisitos cambian con frecuencia, así que siempre confirma tu caso con nosotros antes de darlo por hecho."
      },
      {
        "type": "h3",
        "text": "Productos con tasa 0% o exentos"
      },
      {
        "type": "p",
        "text": "La Ley del IVA establece que no se paga IVA al importar bienes que tampoco lo pagan cuando se venden dentro del país. Aquí entran, por ejemplo, la mayoría de los alimentos sin procesar, las medicinas de patente, los libros, periódicos y revistas, y ciertos insumos y maquinaria agrícola. La clave está en los detalles: no todos los alimentos tienen tasa 0% (las bebidas saborizadas y algunos productos procesados sí pagan), así que conviene revisar tu producto en específico."
      },
      {
        "type": "h3",
        "text": "Envíos de bajo valor por mensajería"
      },
      {
        "type": "p",
        "text": "Los paquetes que llegan por mensajería internacional (DHL, FedEx, UPS, etc.) tienen un tratamiento simplificado y, hasta cierto valor, pueden entrar sin pagar impuestos. Los montos y las tasas dependen del país de origen y se han modificado varias veces en los últimos años, así que pregúntanos cuáles están vigentes antes de calcular tu costo."
      },
      {
        "type": "h3",
        "text": "Importación temporal para exportar (IMMEX)"
      },
      {
        "type": "p",
        "text": "Si importas materia prima, partes o maquinaria para transformarlas y luego exportarlas, el programa IMMEX te permite traerlas de forma temporal. Ojo: desde 2015 estas importaciones sí causan IVA, pero las empresas con certificación en materia de IVA e IEPS reciben un crédito fiscal por el mismo monto, de modo que en la práctica no desembolsan el impuesto. Es un esquema pensado para la manufactura de exportación, no para importar y vender en México."
      },
      {
        "type": "h3",
        "text": "Donaciones y otros casos especiales"
      },
      {
        "type": "p",
        "text": "La ley también contempla exenciones para ciertas donaciones a instituciones autorizadas y otros supuestos muy específicos. Si crees que tu importación entra en alguno, cuéntanos los detalles y lo revisamos."
      },
      {
        "type": "p",
        "text": "Fuera de estos casos, lo más seguro es asumir que tu importación pagará IVA y pedir que lo incluyamos en la cotización, para que conozcas el costo completo desde el principio. Recuerda también que, si tienes actividad empresarial, el IVA que pagas al importar normalmente lo puedes acreditar después."
      }
    ]
  },
  {
    "slug": "almacenajes-y-demoras",
    "title": "Almacenajes y demoras: qué son y cómo evitarlos",
    "excerpt": "Son de los cargos que más sorprenden a quien importa por primera vez. Te explicamos qué son, quién los cobra y cómo evitarlos.",
    "body": [
      {
        "type": "p",
        "text": "Almacenaje y demoras son dos cargos distintos que a menudo se confunden. Tienen algo en común: casi siempre se pueden evitar si sabes a tiempo qué los provoca."
      },
      {
        "type": "h3",
        "text": "Almacenaje"
      },
      {
        "type": "p",
        "text": "Lo cobra la terminal portuaria o el recinto fiscalizado por guardar tu mercancía mientras se completa el despacho. Normalmente hay algunos días libres, que varían según la terminal. Después empieza a correr el cargo, y suele aumentar entre más días pasan."
      },
      {
        "type": "h3",
        "text": "Demoras (demurrage)"
      },
      {
        "type": "p",
        "text": "Las cobra la naviera cuando el contenedor no se devuelve a tiempo. La naviera te da un número de días libres para retirar la mercancía y regresar el contenedor vacío; si te pasas de ese plazo, cobra un cargo por cada día de retraso."
      },
      {
        "type": "p",
        "text": "Las tarifas de almacenaje y de demoras las fija cada terminal y cada naviera, y cambian con frecuencia. Por eso no te damos aquí una cifra fija: la confirmamos en tu cotización, para tu operación en particular."
      },
      {
        "type": "h3",
        "text": "Cómo evitarlos"
      },
      {
        "type": "ul",
        "items": [
          "Ten todos los documentos listos antes de que la mercancía llegue a puerto, no cuando ya está ahí.",
          "Responde lo antes posible si la aduana pide una aclaración o un documento adicional.",
          "Organiza con anticipación quién va a recoger la mercancía y cómo, para no gastar días libres en logística.",
          "Si tu operación es compleja (permisos especiales o una revisión probable), avísanos desde el inicio para planear con más margen.",
          "Si mueves volumen, pregunta si se pueden negociar más días libres con la naviera desde la reserva del embarque."
        ]
      },
      {
        "type": "p",
        "text": "En pocas palabras: entre más rápido avance el papeleo, menos días se acumulan. Por eso insistimos en tener todo listo antes de que llegue el embarque, y por eso te avisamos en cada paso."
      }
    ]
  },
  {
    "slug": "productos-que-no-se-pueden-importar",
    "title": "Qué productos no se pueden importar a México",
    "excerpt": "Casi todo se puede importar a México. La lista de lo prohibido o muy restringido es más corta de lo que crees; aquí te la explicamos.",
    "body": [
      {
        "type": "p",
        "text": "Es una de las dudas que más nervios genera, y casi siempre sin necesidad. La gran mayoría de los productos se pueden importar a México si cumplen los requisitos que les corresponden. Lo que sí existe son categorías prohibidas o sujetas a permisos tan estrictos que, en la práctica, quedan fuera de una importación comercial normal:"
      },
      {
        "type": "ul",
        "items": [
          "Armas de fuego, municiones y explosivos sin el permiso de la Secretaría de la Defensa Nacional (SEDENA).",
          "Estupefacientes, psicotrópicos y precursores químicos controlados.",
          "Residuos peligrosos y materiales considerados un riesgo ambiental.",
          "Especies protegidas de flora y fauna, y sus derivados, sin el permiso CITES o de SEMARNAT.",
          "Productos falsificados o que infrinjan marcas o patentes registradas.",
          "Medicamentos y otros productos para la salud sin la autorización sanitaria de COFEPRIS.",
          "Vehículos usados que no cumplan las reglas de importación vigentes."
        ]
      },
      {
        "type": "p",
        "text": "Fuera de estas categorías, la pregunta casi nunca es \"¿se puede importar?\", sino \"¿qué permiso o norma le aplica?\". La mayoría de los productos no están prohibidos; solo tienen que cumplir con las regulaciones correctas, como NOMs, avisos o permisos sanitarios. Si tu producto no aparece en esta lista, lo más probable es que sí se pueda importar, siempre que se haga bien."
      },
      {
        "type": "p",
        "text": "Si no estás seguro de dónde cae el tuyo, mándanos la ficha técnica o el enlace del producto y te decimos qué necesita, antes de que lo compres."
      }
    ]
  }
];

// Reemplaza BLOG_POSTS con lo que venga de content/blog.json.
export async function hydrateBlog() {
  try {
    const res = await fetch('/content/blog.json');
    if (!res.ok) return;
    const data = await res.json();
    if (Array.isArray(data.posts) && data.posts.length) {
      BLOG_POSTS.length = 0;
      BLOG_POSTS.push(...data.posts);
    }
  } catch (e) {
    // Sin conexión o sin content/blog.json todavía: se mantienen los artículos por defecto.
  }
}
