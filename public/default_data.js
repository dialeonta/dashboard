// DEFAULT VALUES FOR OFFLINE MODE (Auto-synchronized on server start)
const DEFAULT_MATRIX = [
  {
    "tipo": "tipo",
    "item": "item",
    "criterio": "criterio",
    "peso": 0,
    "detonante_falla": "detonante_falla",
    "subitems": [
      "subitems"
    ]
  },
  {
    "tipo": "critico",
    "item": "INFORMACIÓN CORRECTA Y COMPLETA",
    "criterio": "ECUF",
    "peso": 0,
    "detonante_falla": "NO",
    "subitems": [
      "Información errada",
      "Información incompleta"
    ]
  },
  {
    "tipo": "critico",
    "item": "MANEJO DE DATOS CONFIDENCIALES",
    "criterio": "SEGURIDAD DE LA INFORMACIÓN",
    "peso": 0,
    "detonante_falla": "SI",
    "subitems": [
      "Solicitar contraseñas",
      "No enmascarar datos de tarjeta",
      "Compartir datos con terceros"
    ]
  },
  {
    "tipo": "critico",
    "item": "VALIDACIÓN DE IDENTIDAD",
    "criterio": "ECUF",
    "peso": 0,
    "detonante_falla": "SI",
    "subitems": [
      "Omitir protocolo de seguridad",
      "Validar con datos incorrectos",
      "Dar información antes de validar"
    ]
  },
  {
    "tipo": "critico",
    "item": "TRATO RESPETUOSO (CERO AGRESIONES)",
    "criterio": "INTEGRIDAD",
    "peso": 0,
    "detonante_falla": "SI",
    "subitems": [
      "Alzar la voz al cliente",
      "Uso de palabras soeces",
      "Colgar llamada de manera intencional"
    ]
  },
  {
    "tipo": "blanda",
    "item": "SALUDO Y BIENVENIDA CORPORATIVA",
    "criterio": "CONEXIÓN",
    "peso": 5,
    "detonante_falla": "NO",
    "subitems": [
      "No mencionar el nombre de la campaña",
      "No saludar",
      "No presentarse con su nombre"
    ]
  },
  {
    "tipo": "blanda",
    "item": "ESCUCHA ACTIVA Y REPETICIÓN",
    "criterio": "CONEXIÓN",
    "peso": 10,
    "detonante_falla": "NO",
    "subitems": [
      "Interrumpir constantemente",
      "No parafrasear la necesidad del cliente",
      "Ignorar solicitudes explícitas"
    ]
  },
  {
    "tipo": "blanda",
    "item": "EMPATÍA Y CALIDEZ",
    "criterio": "CONEXIÓN",
    "peso": 15,
    "detonante_falla": "NO",
    "subitems": [
      "Tono de voz robótico o plano",
      "Falta de cortesía",
      "No usar palabras de agradecimiento"
    ]
  },
  {
    "tipo": "blanda",
    "item": "LENGUAJE PROFESIONAL",
    "criterio": "CONEXIÓN",
    "peso": 10,
    "detonante_falla": "NO",
    "subitems": [
      "Uso de muletillas excesivas",
      "Uso de diminutivos o jergas",
      "Tutear sin autorización"
    ]
  },
  {
    "tipo": "blanda",
    "item": "MANEJO DE OBJECIONES",
    "criterio": "CONEXIÓN",
    "peso": 15,
    "detonante_falla": "NO",
    "subitems": [
      "Discutir con el usuario",
      "No ofrecer alternativas viables",
      "Evadir preguntas difíciles"
    ]
  },
  {
    "tipo": "blanda",
    "item": "CIERRE Y DESPEDIDA",
    "criterio": "CONEXIÓN",
    "peso": 5,
    "detonante_falla": "NO",
    "subitems": [
      "No validar si persisten dudas",
      "No usar despedida corporativa",
      "Omitir agradecimiento"
    ]
  },
  {
    "tipo": "estadistico",
    "item": "TIEMPO EN RETENCIÓN (HOLD)",
    "criterio": "EFICIENCIA/PROCESO",
    "peso": 5,
    "detonante_falla": "NO",
    "subitems": [
      "Exceder tiempo máximo en espera",
      "No pedir autorización para hold",
      "No retomar cada 45 segundos"
    ]
  },
  {
    "tipo": "estadistico",
    "item": "TIEMPO TOTAL DE OPERACIÓN (AHT)",
    "criterio": "EFICIENCIA",
    "peso": 10,
    "detonante_falla": "NO",
    "subitems": [
      "Silencios prolongados en llamada",
      "Conversaciones ajenas a la solicitud",
      "Demora en carga de sistemas"
    ]
  },
  {
    "tipo": "estadistico",
    "item": "REGISTRO Y TIPIFICACIÓN EN CRM",
    "criterio": "PROCESO",
    "peso": 10,
    "detonante_falla": "NO",
    "subitems": [
      "Omitir registro de notas",
      "Tipificar bajo un motivo errado",
      "Dejar comentarios incompletos"
    ]
  },
  {
    "tipo": "estadistico",
    "item": "RESOLUCIÓN EN PRIMER CONTACTO (FCR)",
    "criterio": "EFICIENCIA",
    "peso": 10,
    "detonante_falla": "NO",
    "subitems": [
      "No solucionar de raíz",
      "Derivar al área equivocada",
      "Instar al usuario a volver a llamar"
    ]
  },
  {
    "tipo": "estadistico",
    "item": "TRANSFERENCIA DE LLAMADA (SI APLICA)",
    "criterio": "PROCESO",
    "peso": 5,
    "detonante_falla": "NO",
    "subitems": [
      "No anunciar la transferencia",
      "No resumir el caso al siguiente asesor",
      "Omitir el protocolo de paso"
    ]
  }
];

const DEFAULT_ADVISORS = {
  "Telecomunicaciones": [
    "Alejandro Torres",
    "Daniel Castro",
    "Mariana Herrera",
    "Mateo Gómez",
    "Valentina Peña"
  ],
  "Banca": [
    "Gabriela Vargas",
    "Isabella Duarte",
    "Nicolás Ortiz",
    "Samuel Pinilla",
    "Sofía Méndez"
  ],
  "Seguros": [
    "Camila Restrepo",
    "Jerónimo Salazar",
    "Juliana Ríos",
    "Santiago Medina",
    "Sebastián Muñoz"
  ],
  "Fidelización": [
    "Emanuel Giraldo",
    "Juan Pablo Cardona",
    "Luciana Bernal",
    "Paula Ospina",
    "Valeria Franco"
  ]
};
const DEFAULT_ASESORES = DEFAULT_ADVISORS;

const DEFAULT_EVALUATIONS = [
  {
    "asesor": "FABIAN ANCIZAR SALAZAR HUERTAS",
    "campana": "WCB HOGAR",
    "supervisor": "RONALDO TORDECILLA",
    "auditor": "Jenniffer Arangure Bejarano",
    "celular": "3006481107",
    "fechaLlamada": "2026-07-11",
    "fecha": "2026-07-13",
    "observacionesGenerales": "Cliente interesado en internet para santa marta, solicitas nombre del cliente Luis Vaquero, lees el guion de habeas, cliente acepta, dirección calle 28 # 13-114 edificio en santa marta, solicitas nombre del barrio, nombre del edificio babaro in, no se encuentra ftth, informas solo internet de 500 Mg, 1 plataforma 89.900 y descuento del 50% en la primera factura. Cliente interesado, pero desea pagar primero el servicio actual y luego llamar, dice que lo llames mas tarde, le informas que se puede programar la instalación, cliente pide que lo llames en la tarde, confirmas contacto a la 1 pm.",
    "ecufScore": 100,
    "ecnScore": 100,
    "eccScore": 100,
    "softSkillsScore": 75,
    "globalScore": 92.5,
    "detalles": [
      {
        "item": "INFORMACIÓN CORRECTA Y COMPLETA",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "MALTRATO AL CLIENTE",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "PROCESO",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "NO_CUMPLE",
        "fallas": []
      },
      {
        "item": "OFRECIMIENTO COMERCIAL CORRECTO",
        "tipo": "critico",
        "criterio": "ECN",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "TIPIFICACIÓN Y REGISTRO",
        "tipo": "critico",
        "criterio": "ECN",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "CUMPLIMIENTO LEGAL Y REGULATORIO",
        "tipo": "critico",
        "criterio": "ECC",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "Escucha activa",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10,
        "observacion": ""
      },
      {
        "item": "Empatía y personalización",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10,
        "observacion": ""
      },
      {
        "item": "Presentación del producto",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10,
        "observacion": ""
      },
      {
        "item": "Ortografía y redacción (canal chat)",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15,
        "observacion": ""
      },
      {
        "item": "Generación de confianza",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15,
        "observacion": ""
      },
      {
        "item": "Pre-cierre comercial",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "NO",
        "puntaje": 0,
        "observacion": "Recomendación brindar el valor del cargo básico con el descuento en el primer mes, en este caso solo informas 89.900 pagaría la mitad. Aunque le dijiste que no se cobra hasta que no se instale, te recomiendo tener cierres un poco mas agresivos para lograr el cierre en línea y evitar que le cliente se arrepienta o que tome servicio con otro operador."
      },
      {
        "item": "Perfilamiento comercial",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15,
        "observacion": ""
      },
      {
        "item": "Acompañamiento al cliente en tiempos de espera",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "NO",
        "puntaje": 0,
        "observacion": "Como recomendación informa al cliente que lo vas a dejar en línea para realizar las consultas y agradece el tiempo en espera al retomar la llamada."
      },
      {
        "item": "Ocupación de canal",
        "tipo": "estadistico",
        "valor": "No"
      },
      {
        "item": "PQR procedentes para el cliente",
        "tipo": "estadistico",
        "valor": "No"
      }
    ],
    "id": "local_eval_1783984656960_2aih",
    "createdAt": "2026-07-13T23:17:36.960Z"
  },
  {
    "asesor": "FABIAN ANCIZAR SALAZAR HUERTAS",
    "campana": "WCB HOGAR",
    "supervisor": "RONALDO TORDECILLA",
    "auditor": "Jenniffer Arangure Bejarano",
    "celular": "3103243664",
    "fechaLlamada": "2026-07-11",
    "fecha": "2026-07-13",
    "observacionesGenerales": "Cliente desea internet, solo, ciudad Tuluá, se ofrece plan de 500 Mg full + una plataforma Netflix, Amazon o Win 89900, si es con Amazon 79.900, cliente desea de 900 Mg, informas que es el mismo valor solo que depende la dirección, cliente  informa que le ofrecieron plan de 900Mg como en 70, pides dirección  calle 39c # 18-94 casa, pides tiempo en línea (se realiza retro con supervisor encargado Mateo, para reforzar lectura de habeas), retomas y solicitas nombre del cliente e informas guion de habeas, cliente pregunta si es necesario  aceptar, explicas que para poder brindarle la información si, cliente acepta, confirmas casa y solicitas nombre del barrio arboledas del Darien, retomas e informas que no hay cobertura. Cliente solicita que lo retiren de la base, agradeces por atender la llamada.",
    "ecufScore": 100,
    "ecnScore": 100,
    "eccScore": 0,
    "softSkillsScore": 90,
    "globalScore": 77,
    "detalles": [
      {
        "item": "INFORMACIÓN CORRECTA Y COMPLETA",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "MALTRATO AL CLIENTE",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "PROCESO",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "NO_CUMPLE",
        "fallas": []
      },
      {
        "item": "OFRECIMIENTO COMERCIAL CORRECTO",
        "tipo": "critico",
        "criterio": "ECN",
        "resultado": "NO_CUMPLE",
        "fallas": []
      },
      {
        "item": "TIPIFICACIÓN Y REGISTRO",
        "tipo": "critico",
        "criterio": "ECN",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "CUMPLIMIENTO LEGAL Y REGULATORIO",
        "tipo": "critico",
        "criterio": "ECC",
        "resultado": "NO_CUMPLE",
        "fallas": [
          {
            "subitem": "Habeas Data (lectura íntegra antes de solicitar datos)",
            "fallo": true,
            "observacion": "Recuerda que la lectura del guion de habeas se realiza con el fin de garantizar el derecho legal del usuario a decidir que se hace con su información antes de iniciar cualquier proceso comercial, por lo cual el cliente debe dar su aprobación antes de solicitarle los datos personales, en este caso la dirección, en este caso, pediste la dirección y posterior lees el guion."
          }
        ]
      },
      {
        "item": "Escucha activa",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10,
        "observacion": ""
      },
      {
        "item": "Empatía y personalización",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10,
        "observacion": ""
      },
      {
        "item": "Presentación del producto",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10,
        "observacion": ""
      },
      {
        "item": "Ortografía y redacción (canal chat)",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15,
        "observacion": ""
      },
      {
        "item": "Generación de confianza",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15,
        "observacion": ""
      },
      {
        "item": "Pre-cierre comercial",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15,
        "observacion": ""
      },
      {
        "item": "Perfilamiento comercial",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15,
        "observacion": ""
      },
      {
        "item": "Acompañamiento al cliente en tiempos de espera",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "NO",
        "puntaje": 0,
        "observacion": "Como recomendación informa al cliente que lo vas a dejar en línea para realizar las consultas y agradece el tiempo en espera al retomar la llamada."
      },
      {
        "item": "Ocupación de canal",
        "tipo": "estadistico",
        "valor": "No"
      },
      {
        "item": "PQR procedentes para el cliente",
        "tipo": "estadistico",
        "valor": "Sí"
      }
    ],
    "id": "local_eval_1783984269531_o1im",
    "createdAt": "2026-07-13T23:11:09.531Z"
  },
  {
    "asesor": "MARIA CAMILA RAMOS MARTINEZ",
    "campana": "WCB HOGAR",
    "supervisor": "RONALDO TORDECILLA",
    "auditor": "Jenniffer Arangure Bejarano",
    "celular": "3222114745",
    "fechaLlamada": "2026-07-11",
    "fecha": "2026-07-13",
    "observacionesGenerales": "Cliente Edwuardo Forero,  solicita internet, solicita validar cobertura y lee guion, cliente interrumpe y pregunta por ftth, explicas que debes validar cobertura y procedes con el guio de habeas desde el principio, cliente acepta, dirección Ciudad Bogotá calle 78b#116-80 conjunto residencial altos de granada torre y apto 4  601\nTiempo en línea ok \nAgradeces \n900 mega simétricas con más de 98 canales, más plataformas a elección del cliente, descuento del 50% por dos primeros meses. Se escucha robotizado, procedes a informar al cliente la situación y devuelves la llamada para mejorar la comunicación. Cliente solicita paquete con 4 plataformas Win, Netflix, Disney y Amazon, explicas paquete de 2 plataformas plan de 121.900, cliente insiste en querer las 4, solicitas espera en línea, realizas acompañamiento, agradeces espera, explicas plan con dos plataformas Win + Netflix y adicional las plataformas Amazon y Disney, por un valor de 24.900 + 36.900 o 54.900 Disney premium, cliente interesado en el estándar de 36.900. cliente desea 3 decos, empaquetas el producto para una factura final de 197.700, con 3 decos, 4 plataformas (oferta triple digital internet plus).",
    "ecufScore": 100,
    "ecnScore": 100,
    "eccScore": 100,
    "softSkillsScore": 85,
    "globalScore": 95.5,
    "detalles": [
      {
        "item": "INFORMACIÓN CORRECTA Y COMPLETA",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "MALTRATO AL CLIENTE",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "PROCESO",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "OFRECIMIENTO COMERCIAL CORRECTO",
        "tipo": "critico",
        "criterio": "ECN",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "TIPIFICACIÓN Y REGISTRO",
        "tipo": "critico",
        "criterio": "ECN",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "CUMPLIMIENTO LEGAL Y REGULATORIO",
        "tipo": "critico",
        "criterio": "ECC",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "Escucha activa",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10,
        "observacion": ""
      },
      {
        "item": "Empatía y personalización",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10,
        "observacion": ""
      },
      {
        "item": "Presentación del producto",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10,
        "observacion": ""
      },
      {
        "item": "Ortografía y redacción (canal chat)",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15,
        "observacion": ""
      },
      {
        "item": "Generación de confianza",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15,
        "observacion": ""
      },
      {
        "item": "Pre-cierre comercial",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "NO",
        "puntaje": 0,
        "observacion": "Muy buena gestión, manejo comercial y de tiempos. Felicitaciones por el manejo que le diste a la lectura del habeas. Como recomendación para darle valor agregado a tu gestión, puedes buscar la forma de disminuir la factura haciendo más llamativa la oferta, en este caso empaquetar con Amazon y Win, y dejar como adicional Netflix y Disney, dejando el valor final del plan en 191.700 y resaltar el beneficio McAfee Premium 3 Equipos."
      },
      {
        "item": "Perfilamiento comercial",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15,
        "observacion": ""
      },
      {
        "item": "Acompañamiento al cliente en tiempos de espera",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10,
        "observacion": ""
      },
      {
        "item": "Ocupación de canal",
        "tipo": "estadistico",
        "valor": "No"
      },
      {
        "item": "PQR procedentes para el cliente",
        "tipo": "estadistico",
        "valor": "No"
      }
    ],
    "id": "local_eval_1783983440679_4mvp",
    "createdAt": "2026-07-13T22:57:20.679Z"
  },
  {
    "id": "eval_demo_003",
    "asesor": "Laura Beltrán",
    "auditor": "Juan Pérez",
    "celular": "3151234567",
    "fechaLlamada": "2026-07-11",
    "fecha": "2026-07-12",
    "campana": "Retenciones",
    "ecufScore": 100,
    "ecnScore": 100,
    "eccScore": 100,
    "softSkillsScore": 90,
    "globalScore": 97,
    "observacionesGenerales": "Excelente gestión de retención, manejo de objeciones coherente y buen trato. Se aplica protocolo completo.",
    "detalles": [
      {
        "item": "INFORMACIÓN CORRECTA Y COMPLETA",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "MALTRATO AL CLIENTE",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "PROCESO",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "OFRECIMIENTO COMERCIAL CORRECTO",
        "tipo": "critico",
        "criterio": "ECN",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "TIPIFICACIÓN Y REGISTRO",
        "tipo": "critico",
        "criterio": "ECN",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "CUMPLIMIENTO LEGAL Y REGULATORIO",
        "tipo": "critico",
        "criterio": "ECC",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "Escucha activa",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10
      },
      {
        "item": "Empatía y personalización",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10
      },
      {
        "item": "Presentación del producto",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10
      },
      {
        "item": "Ortografía y redacción (canal chat)",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15
      },
      {
        "item": "Generación de confianza",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15
      },
      {
        "item": "Pre-cierre comercial",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15
      },
      {
        "item": "Perfilamiento comercial",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "NO",
        "puntaje": 0
      },
      {
        "item": "Acompañamiento al cliente en tiempos de espera",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10
      },
      {
        "item": "Ocupación de canal",
        "tipo": "estadistico",
        "valor": "N/A"
      },
      {
        "item": "PQR procedentes para el cliente",
        "tipo": "estadistico",
        "valor": "No"
      }
    ],
    "createdAt": "2026-07-13T23:45:29.582Z"
  },
  {
    "id": "eval_demo_002",
    "asesor": "Carlos Gómez",
    "auditor": "Ana Belén",
    "celular": "3009876543",
    "fechaLlamada": "2026-07-10",
    "fecha": "2026-07-11",
    "campana": "Atención al Cliente",
    "ecufScore": 0,
    "ecnScore": 100,
    "eccScore": 100,
    "softSkillsScore": 80,
    "globalScore": 54,
    "observacionesGenerales": "Lamentablemente se detecta maltrato al cliente. El asesor cuelga la llamada de manera abrupta en medio del reclamo del cliente.",
    "detalles": [
      {
        "item": "INFORMACIÓN CORRECTA Y COMPLETA",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "MALTRATO AL CLIENTE",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "NO_CUMPLE",
        "fallas": [
          {
            "subitem": "Cuelga la llamada",
            "fallo": true,
            "observacion": "Llamada finalizada intencionalmente por el asesor durante la queja."
          }
        ]
      },
      {
        "item": "PROCESO",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "OFRECIMIENTO COMERCIAL CORRECTO",
        "tipo": "critico",
        "criterio": "ECN",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "TIPIFICACIÓN Y REGISTRO",
        "tipo": "critico",
        "criterio": "ECN",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "CUMPLIMIENTO LEGAL Y REGULATORIO",
        "tipo": "critico",
        "criterio": "ECC",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "Escucha activa",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10
      },
      {
        "item": "Empatía y personalización",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "NO",
        "puntaje": 0
      },
      {
        "item": "Presentación del producto",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10
      },
      {
        "item": "Ortografía y redacción (canal chat)",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15
      },
      {
        "item": "Generación de confianza",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "NO",
        "puntaje": 0
      },
      {
        "item": "Pre-cierre comercial",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15
      },
      {
        "item": "Perfilamiento comercial",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15
      },
      {
        "item": "Acompañamiento al cliente en tiempos de espera",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10
      },
      {
        "item": "Ocupación de canal",
        "tipo": "estadistico",
        "valor": "No"
      },
      {
        "item": "PQR procedentes para el cliente",
        "tipo": "estadistico",
        "valor": "Sí"
      }
    ],
    "createdAt": "2026-07-13T23:45:29.575Z"
  },
  {
    "id": "eval_demo_001",
    "asesor": "Jenniffer Arangure",
    "auditor": "Juan Pérez",
    "celular": "3104567890",
    "fechaLlamada": "2026-07-09",
    "fecha": "2026-07-10",
    "campana": "Ventas Masivas",
    "ecufScore": 100,
    "ecnScore": 100,
    "eccScore": 100,
    "softSkillsScore": 90,
    "globalScore": 97,
    "observacionesGenerales": "El asesor demuestra excelente empatía y perfilamiento comercial. Cierre exitoso de la venta masiva de telefonía celular.",
    "detalles": [
      {
        "item": "INFORMACIÓN CORRECTA Y COMPLETA",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "MALTRATO AL CLIENTE",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "PROCESO",
        "tipo": "critico",
        "criterio": "ECUF",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "OFRECIMIENTO COMERCIAL CORRECTO",
        "tipo": "critico",
        "criterio": "ECN",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "TIPIFICACIÓN Y REGISTRO",
        "tipo": "critico",
        "criterio": "ECN",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "CUMPLIMIENTO LEGAL Y REGULATORIO",
        "tipo": "critico",
        "criterio": "ECC",
        "resultado": "CUMPLE",
        "fallas": []
      },
      {
        "item": "Escucha activa",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10
      },
      {
        "item": "Empatía y personalización",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10
      },
      {
        "item": "Presentación del producto",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10
      },
      {
        "item": "Ortografía y redacción (canal chat)",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15
      },
      {
        "item": "Generación de confianza",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15
      },
      {
        "item": "Pre-cierre comercial",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "NO",
        "puntaje": 0
      },
      {
        "item": "Perfilamiento comercial",
        "tipo": "blanda",
        "peso_max": 15,
        "resultado": "SI",
        "puntaje": 15
      },
      {
        "item": "Acompañamiento al cliente en tiempos de espera",
        "tipo": "blanda",
        "peso_max": 10,
        "resultado": "SI",
        "puntaje": 10
      },
      {
        "item": "Ocupación de canal",
        "tipo": "estadistico",
        "valor": "Sí"
      },
      {
        "item": "PQR procedentes para el cliente",
        "tipo": "estadistico",
        "valor": "No"
      }
    ],
    "createdAt": "2026-07-13T23:45:29.570Z"
  }
];
