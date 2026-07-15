// VALORES POR DEFECTO PARA EL MODO DESCONECTADO (Sincronizado automáticamente)
const DEFAULT_MATRIX = [
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
    "item": "MALTRATO AL CLIENTE",
    "criterio": "ECUF",
    "peso": 0,
    "detonante_falla": "SI",
    "subitems": [
      "Cuelga la llamada",
      "Uso de palabras ofensivas o despectivas",
      "Tono sarcástico o intolerante"
    ]
  },
  {
    "tipo": "critico",
    "item": "PROCESO",
    "criterio": "ECUF",
    "peso": 0,
    "detonante_falla": "NO",
    "subitems": [
      "Tenencia de línea para migración",
      "Digitación de venta de forma correcta",
      "Gestión a nombre de terceros"
    ]
  },
  {
    "tipo": "critico",
    "item": "OFRECIMIENTO COMERCIAL CORRECTO",
    "criterio": "ECN",
    "peso": 0,
    "detonante_falla": "NO",
    "subitems": [
      "Perfilamiento",
      "Resumen de venta",
      "Cierre comercial",
      "Manejo de objeciones (mínimo 3 con coherencia)"
    ]
  },
  {
    "tipo": "critico",
    "item": "TIPIFICACIÓN Y REGISTRO",
    "criterio": "ECN",
    "peso": 0,
    "detonante_falla": "NO",
    "subitems": [
      "Tipificación correcta de acuerdo con la gestión",
      "Registro / Plantilla de venta completo y correcto"
    ]
  },
  {
    "tipo": "critico",
    "item": "CUMPLIMIENTO LEGAL Y REGULATORIO",
    "criterio": "ECC",
    "peso": 0,
    "detonante_falla": "NO",
    "subitems": [
      "Habeas Data (lectura íntegra antes de solicitar datos)",
      "ATDP Digital (solicitud conforme al procedimiento notificación del medio y aceptación)",
      "Contrato (lectura o envío completo sin modificaciones notificación y aceptación)",
      "Validación de identidad (confirmación del titular notificación)",
      "Gestión a nombre de terceros"
    ]
  },
  {
    "tipo": "blanda",
    "item": "Escucha activa",
    "criterio": "N/A",
    "peso": 10,
    "detonante_falla": "N/A",
    "subitems": []
  },
  {
    "tipo": "blanda",
    "item": "Empatía y personalización",
    "criterio": "N/A",
    "peso": 10,
    "detonante_falla": "N/A",
    "subitems": []
  },
  {
    "tipo": "blanda",
    "item": "Presentación del producto",
    "criterio": "N/A",
    "peso": 10,
    "detonante_falla": "N/A",
    "subitems": []
  },
  {
    "tipo": "blanda",
    "item": "Ortografía y redacción (canal chat)",
    "criterio": "N/A",
    "peso": 15,
    "detonante_falla": "N/A",
    "subitems": []
  },
  {
    "tipo": "blanda",
    "item": "Generación de confianza",
    "criterio": "N/A",
    "peso": 15,
    "detonante_falla": "N/A",
    "subitems": []
  },
  {
    "tipo": "blanda",
    "item": "Pre-cierre comercial",
    "criterio": "N/A",
    "peso": 15,
    "detonante_falla": "N/A",
    "subitems": []
  },
  {
    "tipo": "blanda",
    "item": "Perfilamiento comercial",
    "criterio": "N/A",
    "peso": 15,
    "detonante_falla": "N/A",
    "subitems": []
  },
  {
    "tipo": "blanda",
    "item": "Acompañamiento al cliente en tiempos de espera",
    "criterio": "N/A",
    "peso": 10,
    "detonante_falla": "N/A",
    "subitems": []
  },
  {
    "tipo": "estadistico",
    "item": "Ocupación de canal",
    "criterio": "N/A",
    "peso": 0,
    "detonante_falla": "N/A",
    "subitems": []
  },
  {
    "tipo": "estadistico",
    "item": "PQR procedentes para el cliente",
    "criterio": "N/A",
    "peso": 0,
    "detonante_falla": "N/A",
    "subitems": []
  }
];

const DEFAULT_ASESORES = {
  "DIGITAL": [
    "ANA MARIA MUSUSU CHAPARRO",
    "ANDRES FELIPE JIMENEZ CONTRERAS",
    "BRAYAN FERNANDO MORALES ZARAZA",
    "BRIAN STIVEN CORTES ESPEJO",
    "CAMILO JOSE MARTINEZ BARROS",
    "DANIEL SANTIAGO CESPEDES RAIGOZA",
    "DARLY MARCELA GARZON ATEHORTUA",
    "DAUCY MARISOL MIRANDA RIVERA",
    "DIEGO ALEJANDRO NARVAEZ FLOREZ",
    "EDUAR JOSE GARCIA CONDE",
    "FABIAN CAMILO ALVAREZ RODRIGUEZ",
    "FRANCY YOMAIRA PATALAGUA LOPEZ",
    "HARRY SANTIAGO HERRERA CASTA�O",
    "HEIDY DALLANA HERRERA RUIZ",
    "INGRID ASTRID CRUZ RODRIGUEZ",
    "IVANNA VALENTINA GARZON PORRAS",
    "JANNIS VALENTINA LEON RIA�O",
    "JAVIER FELIPE SERRANO FLOREZ",
    "JEISON ALEJANDRO CHAVES GARCIA",
    "JHON EMERSON ZARATE BARBOSA",
    "JIMMY ALEJANDRO BUITRAGO FERNANDEZ",
    "JONATHAN ANDRES CIFUENTES CHAPARRO",
    "JOSE ABRAHAN ESTRADA MARTINEZ",
    "JOSE LUIS CUMACO CABRERA",
    "JUAN CARLOS MARTINEZ RUMBO",
    "KAREN YULIETH LOPEZ MORA",
    "KEINYN ALEXANDER NOGUERA NOGUERA",
    "KEVIN DAVID CLAVIJO GUALTEROS",
    "KEVIN LEANDRO MARTINEZ PEDROZA",
    "KEVIN SANTIAGO SERRATO ANDRADE",
    "LAURA CORREDOR ROJAS",
    "LAURA ESTEFANY RODRIGUEZ RODRIGUEZ",
    "MAIDY MAELY MUCHICON MUCHICON",
    "MARIA FERNANDA SALINAS SALINAS",
    "MICHAEL ALEXANDER DIAZ PAMPLONA",
    "NELBERSON MONTILLA VARGAS",
    "OSIRIS MARIA BARBA SMALBACH",
    "PABLO ANDRES RAMIREZ RUBIO",
    "RICARDO ROBERTO HUAYTALLA SORIANO",
    "VICTOR JULIO PIERNAGORDA VALBUENA",
    "YIN ARLEY HERNANDEZ ALONSO"
  ],
  "OUTBOUND HOGAR": [
    "ADRIANA VELASQUEZ ROMERO",
    "ANDRES FELIPE DIAZ CARDENAS",
    "ANGELA PATRICIA GAMBOA HERNANDEZ",
    "CARLOS MANUEL RIVAS GUERRERO",
    "DANA ISABELLA GARCIA ZAMORA",
    "DANIEL FERNANDO BARRERA URIAN",
    "GUSTAVO FELIPE BELTRAN CAMPO",
    "JERSON ESTIBEN RICO MONTIEL",
    "JOHAN LEONARDO RODRIGUEZ ROZO",
    "JOHANA CAROLINA PERILLA MARTINEZ",
    "JOHN DAVID PINZON ARTUNDUAGA",
    "JONATHAN JAFET GARCIA BERNAL",
    "JUAN SEBASTIAN OSPINA JIMENEZ",
    "JULIAN ALBERTO RUIZ SARMIENTO",
    "JULIO ROBERTO DUARTE CHAMUCERO",
    "JULY ANDREA GAMBOA",
    "KAREN VALENTINA MURILLO TORRES",
    "LAURA ALEJANDRA RAMOS DIAZ",
    "LAURA CAMILA MORA CONTRERAS",
    "LUIS EDUARDO VILLAFA�E GUZMAN",
    "MONICA BRILLID TIRIA HIGUERA",
    "ZULMA CONSTANZA LOPEZ GOMEZ"
  ],
  "OUTBOUND MOVIL": [
    "ANDRES FERNANDO QUINTERO CAVADIA",
    "BRAYAN ESTIVEN BRAVO DIAZ",
    "DANIEL STIVEN URQUIJO PORRAS",
    "DAVID SANTIAGO ZEA CASTIBLANCO",
    "DIANA PAOLA RUIZ CISNEROS",
    "EVELYN JOHANNA NU�EZ ROZO",
    "GERALDINNE VEGA OROZCO",
    "INGRID MARISOL BARRETO REYES",
    "JADID ANDREA ARIZA BARRETO",
    "JEISON ANDRES SUAREZ PEREZ",
    "JHOAN DAVID RAIGOZA FORERO",
    "JOSE YOVANI RIVERA BURGOS",
    "JUVIETH LEAL MANRIQUE",
    "KAREN LIZETH ALVARADO LEAL",
    "KEVIN HERNAN MURCIA DAMIAN",
    "KIMBERLY TATIANA CASTELLANOS ROZO",
    "LAURA VALENTINA ASCENCIO VILLANUEVA",
    "LUZ ESTELA CALDERON COBA",
    "MARIA ALEJANDRA SALDA�A MENDOZA",
    "SEBASTIAN GUILLERMO MONTA�O RODRIGUEZ",
    "SHARIT DAYANNA AVILA CALDERON",
    "YENIFFER YULIANA ROJAS LOPEZ",
    "YURI MILENA SANABRIA ROZO"
  ],
  "WHATSAPP": [
    "ANDRES FELIPE CUELLAR SANABRIA",
    "ANGEL DAVID SANCHEZ BARRERA",
    "CAMILO ANDRES BRIEVA ARTEAGA",
    "CESAR STEVEN DIAZ BOLIVAR",
    "DANIELA CHIMBI AMAYA",
    "DARLY MICHELL ARANDA ESCOBAR",
    "EDGAR SANTIAGO RIVEROS BAQUERO",
    "GERMAN ALONSO SANCHEZ AYALA",
    "JESUS DAVID SAAVEDRA MARTINEZ",
    "JHOAN SEBASTIAN MAYORGA CORREDOR",
    "LEYDA LILIANA RAMIREZ HENAO",
    "LUISA FERNANDA MAYOR CASTILLO",
    "LUZ ANGELICA HERNANDEZ RICARDO",
    "NICOLAS ALEJANDRO ALVAREZ RODRIGUEZ",
    "SANDRA MILENA RONCANCIO RUIZ",
    "SERGIO DAVID MEDINA HERNANDEZ"
  ],
  "WCB HOGAR": [
    "ANDRES LAMUS PINEDO",
    "BRANDON STEVEN BELLO URREGO",
    "CRISTIAN ANDRES NEIRA DUE�AS",
    "CRISTIAN JAVIER ORTEGA DURAN",
    "EMILY ALEXANDRA HURTADO PARRA",
    "FABIAN ANCIZAR SALAZAR HUERTAS",
    "JOSE LUIS ROA MARTINEZ",
    "LAURA VANESSA MISNAZA CARRILLO",
    "LUISA FERNANDA DUARTE DUITAMA",
    "MARIA CAMILA RAMOS MARTINEZ"
  ],
  "WCB MOVIL": [
    "AMY YULIETH FIGUEREDO MONTERO",
    "BRANDON STEVEN CHARRIA VILORIA",
    "DANIEL ESTEBAN SALAMANCA MEDINA",
    "DIANA CAROLINA DIAZ ZAMBRANO",
    "DIANA VALENTINA RODRIGUEZ SILVA",
    "EUYANIN ESTEPA RIA�O",
    "JORGE MAGLIONE CERON CARO",
    "JUAN FERNANDO ROJAS TORRES",
    "JUAN SEBASTIAN JIMENEZ RAMIREZ",
    "JUAN SEBASTIAN RAMOS MEDINA",
    "KAROL NATALIA RODRIGUEZ REYES",
    "LUISA FERNANDA BARACALDO SANCHEZ",
    "PAULA NICOLLE ROJAS RODRIGUEZ",
    "SAMANTA AGUDELO SUSA",
    "SAMUEL TOMAS QUI�ONES CORTES",
    "SANTIAGO CASTRO MARCUCCI",
    "SANTIAGO ROMERO TAMARA"
  ],
  "TECNOLOGIA": [
    "ANDERSON CAMILO GODOY HERRERA",
    "ANDRES CAMILO BEJARANO RODRIGUEZ",
    "ANGIE KATERINE SUA GUAYAMBUCO",
    "ARLEY DANIEL HARBEY VARGAS CASTA�EDA",
    "CHRISTIAN CAMILO ESCOBAR ROA",
    "CRISTIAN CAMILO FORERO ALAPE",
    "CRISTIAN DAVID NAVAS CARO",
    "DANIEL RICARDO GAMEZ GARCIA",
    "DIEGO ALEJANDRO ALVAREZ MARIN",
    "DONY BRAYAN MENESES QUINTERO",
    "JOSE DANIEL NAVAS CARO",
    "JUAN SEBASTIAN PINEDA MORENO",
    "KAREN LISETH MARTINEZ HUERTAS",
    "KEVIN ALFONSO NEIRA ARCINIEGAS",
    "LUIS CARLOS MORENO ESPINOSA",
    "MAIRA YINETD HOSSMA CABALLERO",
    "MELANIE PAOLA CASTRO ROJAS",
    "SHERIM NICOL GUTIERREZ CUENCA",
    "STEFANY ESPITIA YEPES"
  ]
};
