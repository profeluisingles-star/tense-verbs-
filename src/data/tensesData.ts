import { VerbTense, Badge } from '../types';

export const ALL_VERB_TENSES: VerbTense[] = [
  // =========================================================================
  // NIVEL 1: PRESENT TENSE (Los 4 tiempos del presente)
  // =========================================================================
  {
    id: 'simple-present',
    nameEn: 'Present Simple',
    nameEs: 'Presente Simple',
    category: 'present',
    level: 'A1',
    usageSummary: 'Se utiliza para expresar rutinas diarias, hábitos, hechos científicos, verdades universales y estados permanentes.',
    whenToUse: [
      'Rutinas y hábitos cotidianos (ej. "I wake up at 6:00 AM every day").',
      'Verdades científicas o universales (ej. "Water boils at 100°C").',
      'Estados y sentimientos permanentes (ej. "She lives in San José", "They love music").',
      'Horarios fijos de transportes o eventos (ej. "The train leaves at 8:00 PM").'
    ],
    rules: [
      'En oraciones afirmativas con tercera persona singular (He, She, It), agregamos "-s" o "-es" al verbo.',
      'Si el verbo termina en -o, -sh, -ch, -ss, -x o -z, se añade "-es" (ej. go -> goes, watch -> watches).',
      'Si el verbo termina en consonante + "y", cambiamos la "y" por "-ies" (ej. study -> studies).',
      'En oraciones negativas e interrogativas, se utiliza el verbo auxiliar "DO" (I, You, We, They) o "DOES" (He, She, It). Al usar el auxiliar, el verbo principal SIEMPRE regresa a su forma base (infinitivo sin "to").'
    ],
    auxiliaryGuide: 'Auxiliares: "DO" para I, You, We, They. "DOES" para He, She, It. En negación: "do not" (don\'t) / "does not" (doesn\'t).',
    commonMistakes: [
      {
        wrong: 'She work in a hospital.',
        right: 'She works in a hospital.',
        reason: 'En tercera persona afirmativa (She/He/It) es obligatorio agregar "-s" al verbo en Presente Simple.'
      },
      {
        wrong: 'He doesn\'t works here.',
        right: 'He doesn\'t work here.',
        reason: 'Cuando el auxiliar "doesn\'t" está presente, el verbo principal debe ir en su forma base ("work", no "works").'
      },
      {
        wrong: 'Do you lives in Costa Rica?',
        right: 'Do you live in Costa Rica?',
        reason: 'Con el pronombre "You", el verbo nunca lleva "-s", y el auxiliar "Do" exige la forma base "live".'
      }
    ],
    structure: {
      affirmative: 'Sujeto + Verbo (con -s/-es en 3ª persona) + Complemento.',
      negative: 'Sujeto + Auxiliar (do not / does not) + Verbo base + Complemento.',
      interrogative: 'Auxiliar (Do / Does) + Sujeto + Verbo base + Complemento + ?'
    },
    examples: {
      affirmative: {
        en: 'I study English.',
        es: 'Yo estudio inglés.'
      },
      negative: {
        en: 'I do not study English.',
        es: 'Yo no estudio inglés.'
      },
      interrogative: {
        en: 'Do you study English?',
        es: '¿Estudias inglés?'
      }
    },
    signalWords: ['always', 'usually', 'often', 'sometimes', 'never', 'every day', 'on Mondays', 'seldom'],
    tips: 'Regla de oro: si ya usaste el auxiliar "DOES" o "DOESN\'T", el verbo principal NUNCA lleva "s".'
  },
  {
    id: 'present-continuous',
    nameEn: 'Present Continuous',
    nameEs: 'Presente Continuo',
    category: 'present',
    level: 'A2',
    usageSummary: 'Se utiliza para describir acciones que están ocurriendo exactamente en este momento o situaciones temporales en desarrollo.',
    whenToUse: [
      'Acciones en progreso en el momento del habla (ej. "I am explaining the lesson now").',
      'Situaciones temporales que no son permanentes (ej. "She is living with her sister this month").',
      'Tendencias o cambios actuales (ej. "English learning is growing rapidly").',
      'Planes futuros cercanos ya confirmados (ej. "We are meeting the teacher tomorrow morning").'
    ],
    rules: [
      'Se compone obligatoriamente de dos elementos: el verbo auxiliar "TO BE" (am/is/are) y el verbo principal con terminación "-ing".',
      'Si el verbo termina en una sola "e" muda, se elimina antes de añadir "-ing" (write -> writing, make -> making).',
      'Si el verbo es monosilábico y termina en Consonante + Vocal + Consonante (CVC), se duplica la última consonante (run -> running, sit -> sitting).'
    ],
    auxiliaryGuide: 'Auxiliar: Verbo TO BE conjugado en presente (am con I; is con He, She, It; are con You, We, They). En negativa se añade "not" directamente al auxiliar: am not, isn\'t, aren\'t.',
    commonMistakes: [
      {
        wrong: 'I studying English right now.',
        right: 'I am studying English right now.',
        reason: 'Falta el verbo auxiliar "to be". El gerundio "-ing" no puede funcionar solo como verbo conjugado.'
      },
      {
        wrong: 'They are listen to the teacher.',
        right: 'They are listening to the teacher.',
        reason: 'Después del auxiliar "are", el verbo principal de acción continua debe llevar la terminación "-ing".'
      }
    ],
    structure: {
      affirmative: 'Sujeto + am/is/are + Verbo-ing + Complemento.',
      negative: 'Sujeto + am/is/are + not + Verbo-ing + Complemento.',
      interrogative: 'Am/Is/Are + Sujeto + Verbo-ing + Complemento + ?'
    },
    examples: {
      affirmative: {
        en: 'I am studying English right now.',
        es: 'Estoy estudiando inglés ahora mismo.'
      },
      negative: {
        en: 'I am not studying English right now.',
        es: 'No estoy estudiando inglés ahora mismo.'
      },
      interrogative: {
        en: 'Are you studying English right now?',
        es: '¿Estás estudiando inglés ahora mismo?'
      }
    },
    signalWords: ['now', 'right now', 'at the moment', 'currently', 'today', 'this week', 'Look!', 'Listen!'],
    tips: 'Los verbos de estado (stative verbs como know, believe, like, want, understand) normalmente NO se usan en continuo.'
  },
  {
    id: 'present-perfect',
    nameEn: 'Present Perfect',
    nameEs: 'Presente Perfecto',
    category: 'present',
    level: 'B1',
    usageSummary: 'Conecta el pasado con el presente. Se utiliza para experiencias de vida, acciones ocurridas en un tiempo no especificado y acciones pasadas con relevancia en el presente.',
    whenToUse: [
      'Experiencias de vida sin especificar fecha exacta (ej. "I have visited Costa Rica twice").',
      'Acciones que comenzaron en el pasado y continúan en el presente con "since" o "for" (ej. "She has worked here for 5 years").',
      'Acciones recién terminadas con "just" (ej. "I have just completed the practice").',
      'Acciones esperadas que aún no han ocurrido con "yet" (ej. "He hasn\'t arrived yet").'
    ],
    rules: [
      'Fórmula obligatoria: Sujeto + auxiliar "HAVE" (I, You, We, They) o "HAS" (He, She, It) + Participio Pasado del verbo principal.',
      'Verbos regulares: el participio termina en "-ed" (visited, worked, played).',
      'Verbos irregulares: se debe memorizar la tercera columna de verbos (go -> went -> gone, see -> saw -> seen, write -> wrote -> written).'
    ],
    auxiliaryGuide: 'Auxiliar: "HAVE" o "HAS". En negativa: "have not" (haven\'t) o "has not" (hasn\'t). En pregunta: Have/Has pasa al inicio.',
    commonMistakes: [
      {
        wrong: 'I have saw that movie yesterday.',
        right: 'I saw that movie yesterday. / I have seen that movie.',
        reason: 'Si mencionas un tiempo específico pasado como "yesterday", debes usar Pasado Simple (saw). Y si usas Present Perfect, el participio de see es "seen", no "saw".'
      },
      {
        wrong: 'She have finished her project.',
        right: 'She has finished her project.',
        reason: 'Con tercera persona singular (He/She/It), el auxiliar correcto es "has", nunca "have".'
      }
    ],
    structure: {
      affirmative: 'Sujeto + have/has + Participio Pasado + Complemento.',
      negative: 'Sujeto + have/has + not + Participio Pasado + Complemento.',
      interrogative: 'Have/Has + Sujeto + Participio Pasado + Complemento + ?'
    },
    examples: {
      affirmative: {
        en: 'I have studied English for two years.',
        es: 'He estudiado inglés durante dos años.'
      },
      negative: {
        en: 'I have not studied English for two years.',
        es: 'No he estudiado inglés durante dos años.'
      },
      interrogative: {
        en: 'Have you studied English before?',
        es: '¿Has estudiado inglés antes?'
      }
    },
    signalWords: ['already', 'yet', 'just', 'ever', 'never', 'since', 'for', 'recently', 'so far'],
    tips: 'Usa "SINCE" para un punto de inicio específico (since 2020) y "FOR" para un periodo o duración (for 3 months).'
  },
  {
    id: 'present-perfect-continuous',
    nameEn: 'Present Perfect Continuous',
    nameEs: 'Presente Perfecto Continuo',
    category: 'present',
    level: 'B1',
    usageSummary: 'Enfatiza la duración ininterrumpida de una acción que comenzó en el pasado y continúa desarrollándose en el presente o acaba de detenerse con un resultado visible.',
    whenToUse: [
      'Enfatizar la duración prolongada de una actividad (ej. "I have been reading this book all afternoon").',
      'Acciones continuas con evidencia física en el presente (ej. "Her eyes are tired because she has been working on the computer").',
      'Preguntar la duración acumulada con "How long" (ej. "How long have you been learning English?").'
    ],
    rules: [
      'Estructura obligatoria: Sujeto + have/has + been + Verbo con "-ing".',
      '"Been" es el participio pasado del verbo to be y se mantiene fijo para todas las personas gramaticales.',
      'El verbo que expresa la acción lleva siempre "-ing".'
    ],
    auxiliaryGuide: 'Auxiliares: have been / has been. En negativa: haven\'t been / hasn\'t been. En pregunta: Have/Has + sujeto + been + verbo-ing.',
    commonMistakes: [
      {
        wrong: 'I have been study English for two hours.',
        right: 'I have been studying English for two hours.',
        reason: 'La estructura continua exige el verbo principal en gerundio ("studying"), no en forma base.'
      },
      {
        wrong: 'He has being waiting here since morning.',
        right: 'He has been waiting here since morning.',
        reason: 'El auxiliar correcto es el participio "been", no el gerundio "being".'
      }
    ],
    structure: {
      affirmative: 'Sujeto + have/has been + Verbo-ing + Complemento.',
      negative: 'Sujeto + have/has + not + been + Verbo-ing + Complemento.',
      interrogative: 'Have/Has + Sujeto + been + Verbo-ing + Complemento + ?'
    },
    examples: {
      affirmative: {
        en: 'I have been studying English all morning.',
        es: 'He estado estudiando inglés toda la mañana.'
      },
      negative: {
        en: 'I have not been studying English all morning.',
        es: 'No he estado estudiando inglés toda la mañana.'
      },
      interrogative: {
        en: 'Have you been studying English all morning?',
        es: '¿Has estado estudiando inglés toda la mañana?'
      }
    },
    signalWords: ['for hours', 'since 8 AM', 'all day', 'all morning', 'lately', 'how long'],
    tips: 'La diferencia clave con Present Perfect Simple es que aquí el foco está en el proceso y la duración continua, no en el resultado final.'
  },

  // =========================================================================
  // NIVEL 2: PAST TENSE (Los 4 tiempos del pasado)
  // =========================================================================
  {
    id: 'simple-past',
    nameEn: 'Past Simple',
    nameEs: 'Pasado Simple',
    category: 'past',
    level: 'A2',
    usageSummary: 'Se utiliza para expresar acciones puntuales que comenzaron y terminaron completamente en un momento determinado del pasado.',
    whenToUse: [
      'Acciones concluidas en un tiempo definido (ej. "I graduated in 2022", "We traveled yesterday").',
      'Una secuencia de eventos o acciones consecutivas en el pasado (ej. "He opened the door, turned on the light, and sat down").',
      'Hábitos pasados que ya no ocurren (ej. "I played soccer when I was a child").'
    ],
    rules: [
      'En oraciones afirmativas:',
      '- Verbos regulares: se añade "-ed" (play -> played, listen -> listened). Si termina en "e", solo se agrega "-d" (live -> lived).',
      '- Verbos irregulares: cambian de forma y deben memorizarse (go -> went, have -> had, buy -> bought, see -> saw).',
      'En oraciones negativas e interrogativas: se utiliza el auxiliar "DID" para TODAS las personas gramaticales. Al usar "did" o "did not", el verbo principal VUELVE A SU FORMA BASE.'
    ],
    auxiliaryGuide: 'Auxiliar: "DID" para todos los sujetos. Negativa: "did not" (didn\'t). En preguntas: Did + sujeto + verbo base.',
    commonMistakes: [
      {
        wrong: 'She did not went to school yesterday.',
        right: 'She did not go to school yesterday.',
        reason: 'El auxiliar "did not" ya indica el pasado; el verbo principal debe ir en forma base ("go", nunca "went").'
      },
      {
        wrong: 'Did you called the teacher?',
        right: 'Did you call the teacher?',
        reason: 'En preguntas con "Did", el verbo principal no lleva "-ed" ("call", no "called").'
      }
    ],
    structure: {
      affirmative: 'Sujeto + Verbo en Pasado + Complemento.',
      negative: 'Sujeto + did not + Verbo base + Complemento.',
      interrogative: 'Did + Sujeto + Verbo base + Complemento + ?'
    },
    examples: {
      affirmative: {
        en: 'I studied English yesterday.',
        es: 'Yo estudié inglés ayer.'
      },
      negative: {
        en: 'I did not study English yesterday.',
        es: 'Yo no estudié inglés ayer.'
      },
      interrogative: {
        en: 'Did you study English yesterday?',
        es: '¿Estudiaste inglés ayer?'
      }
    },
    signalWords: ['yesterday', 'last night', 'last week', 'last year', 'two days ago', 'in 1999', 'then', 'when'],
    tips: 'Para el verbo TO BE no se usa "did"; se usa directamente "was" (I, He, She, It) o "were" (You, We, They).'
  },
  {
    id: 'past-continuous',
    nameEn: 'Past Continuous',
    nameEs: 'Pasado Continuo',
    category: 'past',
    level: 'A2',
    usageSummary: 'Se utiliza para describir acciones que estaban en pleno desarrollo o proceso en un momento específico del pasado, o que fueron interrumpidas por otra acción puntual.',
    whenToUse: [
      'Acción en progreso en un momento exacto del pasado (ej. "At 8:00 PM last night, I was watching a movie").',
      'Acción continua de fondo interrumpida por una acción corta en Pasado Simple (ej. "While I was studying, my phone rang").',
      'Dos acciones simultáneas ocurriendo al mismo tiempo en el pasado con "while" (ej. "She was cooking while he was reading").'
    ],
    rules: [
      'Estructura: Sujeto + was/were + Verbo con "-ing".',
      '"Was" se usa con I, He, She, It.',
      '"Were" se usa con You, We, They.',
      'En negación se agrega "not" al auxiliar: "was not" (wasn\'t) / "were not" (weren\'t).'
    ],
    auxiliaryGuide: 'Auxiliar: WAS / WERE. Interrogativa: Was/Were + sujeto + verbo-ing.',
    commonMistakes: [
      {
        wrong: 'They was walking in the park.',
        right: 'They were walking in the park.',
        reason: 'El pronombre "They" requiere el auxiliar plural "were", nunca "was".'
      },
      {
        wrong: 'I was watch television when you arrived.',
        right: 'I was watching television when you arrived.',
        reason: 'El verbo principal después de "was" debe llevar la terminación "-ing" ("watching").'
      }
    ],
    structure: {
      affirmative: 'Sujeto + was/were + Verbo-ing + Complemento.',
      negative: 'Sujeto + was/were + not + Verbo-ing + Complemento.',
      interrogative: 'Was/Were + Sujeto + Verbo-ing + Complemento + ?'
    },
    examples: {
      affirmative: {
        en: 'I was studying English when you called.',
        es: 'Estaba estudiando inglés cuando llamaste.'
      },
      negative: {
        en: 'I was not studying English when you called.',
        es: 'No estaba estudiando inglés cuando llamaste.'
      },
      interrogative: {
        en: 'Were you studying English when I called?',
        es: '¿Estabas estudiando inglés cuando llamé?'
      }
    },
    signalWords: ['while', 'as', 'when', 'at that moment', 'all evening', 'at 7 o\'clock yesterday'],
    tips: 'La palabra "WHILE" suele introducir Pasado Continuo (la acción larga), mientras que "WHEN" suele introducir Pasado Simple (la interrupción puntual).'
  },
  {
    id: 'past-perfect',
    nameEn: 'Past Perfect',
    nameEs: 'Pasado Perfecto',
    category: 'past',
    level: 'B1',
    usageSummary: 'Representa el "pasado del pasado". Se utiliza para indicar que una acción ocurrió y se completó ANTES de otra acción en el pasado.',
    whenToUse: [
      'Establecer con claridad cuál de dos eventos pasados ocurrió primero (ej. "When we arrived at the cinema, the film had already started").',
      'Expresar causa y efecto en el pasado (ej. "He was tired because he had worked all day").',
      'Con adverbios de anterioridad como "already", "by the time", "before", "after".'
    ],
    rules: [
      'Estructura invariable: Sujeto + auxiliar "HAD" + Participio Pasado del verbo principal.',
      'El auxiliar "HAD" se utiliza para TODAS las personas gramaticales sin excepción.',
      'En oraciones negativas se usa "had not" o su contracción "hadn\'t".'
    ],
    auxiliaryGuide: 'Auxiliar: HAD para todas las personas. Pregunta: Had + sujeto + participio pasado.',
    commonMistakes: [
      {
        wrong: 'By the time she called, I already went to bed.',
        right: 'By the time she called, I had already gone to bed.',
        reason: 'La acción que ocurrió antes de la llamada requiere Past Perfect ("had already gone").'
      },
      {
        wrong: 'They had took the train before noon.',
        right: 'They had taken the train before noon.',
        reason: 'El participio de "take" es "taken", no la forma pasada simple "took".'
      }
    ],
    structure: {
      affirmative: 'Sujeto + had + Participio Pasado + Complemento.',
      negative: 'Sujeto + had + not + Participio Pasado + Complemento.',
      interrogative: 'Had + Sujeto + Participio Pasado + Complemento + ?'
    },
    examples: {
      affirmative: {
        en: 'I had studied English before I moved to London.',
        es: 'Yo había estudiado inglés antes de mudarme a Londres.'
      },
      negative: {
        en: 'I had not studied English before I moved to London.',
        es: 'Yo no había estudiado inglés antes de mudarme a Londres.'
      },
      interrogative: {
        en: 'Had you studied English before you moved to London?',
        es: '¿Habías estudiado inglés antes de mudarte a Londres?'
      }
    },
    signalWords: ['before', 'after', 'already', 'by the time', 'just', 'never... before', 'until that day'],
    tips: 'Piensa en una línea de tiempo: la acción más antigua va en Past Perfect ("had done"), y la acción más reciente va en Past Simple ("did").'
  },
  {
    id: 'past-perfect-continuous',
    nameEn: 'Past Perfect Continuous',
    nameEs: 'Pasado Perfecto Continuo',
    category: 'past',
    level: 'B2',
    usageSummary: 'Expresa una acción continua y prolongada que se estuvo desarrollando en el pasado antes de que ocurriera otro evento puntual en el pasado.',
    whenToUse: [
      'Enfatizar la duración de una actividad previa a un momento pasado (ej. "They had been driving for five hours before they stopped").',
      'Explicar la causa visible de una situación en el pasado (ej. "The ground was wet because it had been raining heavily").'
    ],
    rules: [
      'Estructura invariable: Sujeto + had been + Verbo con "-ing".',
      '"Had been" permanece idéntico para todos los sujetos.',
      'En oraciones negativas se inserta "not" después de had: "had not been" (hadn\'t been).'
    ],
    auxiliaryGuide: 'Auxiliar: HAD BEEN. Interrogativa: Had + sujeto + been + verbo-ing.',
    commonMistakes: [
      {
        wrong: 'She had been work there for ten years when it closed.',
        right: 'She had been working there for ten years when it closed.',
        reason: 'El verbo de acción continua debe llevar "-ing" ("working").'
      },
      {
        wrong: 'They had being studying English before the test.',
        right: 'They had been studying English before the test.',
        reason: 'La fórmula requiere el participio "been", nunca el gerundio "being".'
      }
    ],
    structure: {
      affirmative: 'Sujeto + had been + Verbo-ing + Complemento.',
      negative: 'Sujeto + had + not + been + Verbo-ing + Complemento.',
      interrogative: 'Had + Sujeto + been + Verbo-ing + Complemento + ?'
    },
    examples: {
      affirmative: {
        en: 'I had been studying English for three hours before the power went out.',
        es: 'Había estado estudiando inglés durante tres horas antes de que se fuera la luz.'
      },
      negative: {
        en: 'I had not been studying English for three hours before the power went out.',
        es: 'No había estado estudiando inglés durante tres horas antes de que se fuera la luz.'
      },
      interrogative: {
        en: 'Had you been studying English before the power went out?',
        es: '¿Habías estado estudiando inglés antes de que se fuera la luz?'
      }
    },
    signalWords: ['for hours', 'since morning', 'before', 'until', 'by the time', 'how long had you been'],
    tips: 'Muestra la duración ininterrumpida de una labor previa a un acontecimiento histórico o pasado.'
  },

  // =========================================================================
  // NIVEL 3: FUTURE TENSE (Los 4 tiempos del futuro)
  // =========================================================================
  {
    id: 'simple-future',
    nameEn: 'Future Simple',
    nameEs: 'Futuro Simple',
    category: 'future',
    level: 'A2',
    usageSummary: 'Se utiliza para hacer predicciones sobre el porvenir, tomar decisiones espontáneas en el momento del habla, hacer promesas y ofrecimientos.',
    whenToUse: [
      'Predicciones sin certeza absoluta basadas en opiniones (ej. "I think it will rain tomorrow").',
      'Decisiones espontáneas tomadas en el instante de hablar (ej. "I\'m thirsty, I will buy some water").',
      'Promesas, ofertas y amenazas (ej. "I will help you with your homework", "I will never forget this").',
      'Diferencia con "Be Going To": se usa "be going to" para planes premeditados o predicciones con evidencia física visible.'
    ],
    rules: [
      'Estructura con WILL: Sujeto + will + Verbo en forma base.',
      '"Will" es un verbo modal y nunca cambia con ningún sujeto (no lleva "-s").',
      'En oraciones negativas: "will not" o su contracción oficial "won\'t".',
      'En preguntas: "Will" pasa a la primera posición.'
    ],
    auxiliaryGuide: 'Auxiliar: WILL (negativa: won\'t / will not). Pregunta: Will + sujeto + verbo base.',
    commonMistakes: [
      {
        wrong: 'She will comes to the class tomorrow.',
        right: 'She will come to the class tomorrow.',
        reason: 'Después del modal "will", el verbo SIEMPRE va en su forma base infinitiva ("come", no "comes").'
      },
      {
        wrong: 'I won\'t to do that.',
        right: 'I won\'t do that.',
        reason: 'Nunca se coloca la partícula "to" después de "will" o "won\'t".'
      }
    ],
    structure: {
      affirmative: 'Sujeto + will + Verbo base + Complemento.',
      negative: 'Sujeto + will not (won\'t) + Verbo base + Complemento.',
      interrogative: 'Will + Sujeto + Verbo base + Complemento + ?'
    },
    examples: {
      affirmative: {
        en: 'I will study English tomorrow.',
        es: 'Yo estudiaré inglés mañana.'
      },
      negative: {
        en: 'I will not study English tomorrow.',
        es: 'Yo no estudiaré inglés mañana.'
      },
      interrogative: {
        en: 'Will you study English tomorrow?',
        es: '¿Estudiarás inglés mañana?'
      }
    },
    signalWords: ['tomorrow', 'next week', 'next month', 'in the future', 'probably', 'I think', 'soon'],
    tips: 'La contracción de "will not" es "won\'t", una de las palabras más utilizadas en el inglés hablado.'
  },
  {
    id: 'future-continuous',
    nameEn: 'Future Continuous',
    nameEs: 'Futuro Continuo',
    category: 'future',
    level: 'B1',
    usageSummary: 'Describe una acción que estará en pleno proceso o desarrollo en un momento específico del futuro.',
    whenToUse: [
      'Acción en curso en un momento determinado del futuro (ej. "This time tomorrow, I will be flying to Miami").',
      'Preguntar cortésmente sobre los planes de alguien (ej. "Will you be using your laptop this afternoon?").'
    ],
    rules: [
      'Estructura invariable: Sujeto + will be + Verbo con "-ing".',
      '"Be" permanece en su forma base infinitiva; no se conjuga en is/are.',
      'En oraciones negativas se usa "will not be" (won\'t be).'
    ],
    auxiliaryGuide: 'Auxiliar: WILL BE. Pregunta: Will + sujeto + be + verbo-ing.',
    commonMistakes: [
      {
        wrong: 'Tomorrow at 3 PM, I will being studying.',
        right: 'Tomorrow at 3 PM, I will be studying.',
        reason: 'La forma base del infinitivo es "be", no "being".'
      },
      {
        wrong: 'She will be cook dinner when you get home.',
        right: 'She will be cooking dinner when you get home.',
        reason: 'El verbo principal de acción continua debe llevar la terminación "-ing" ("cooking").'
      }
    ],
    structure: {
      affirmative: 'Sujeto + will be + Verbo-ing + Complemento.',
      negative: 'Sujeto + will not be (won\'t be) + Verbo-ing + Complemento.',
      interrogative: 'Will + Sujeto + be + Verbo-ing + Complemento + ?'
    },
    examples: {
      affirmative: {
        en: 'I will be studying English at 8:00 PM tonight.',
        es: 'Estaré estudiando inglés a las 8:00 PM esta noche.'
      },
      negative: {
        en: 'I will not be studying English at 8:00 PM tonight.',
        es: 'No estaré estudiando inglés a las 8:00 PM esta noche.'
      },
      interrogative: {
        en: 'Will you be studying English at 8:00 PM tonight?',
        es: '¿Estarás estudiando inglés a las 8:00 PM esta noche?'
      }
    },
    signalWords: ['this time tomorrow', 'at 10 o\'clock tomorrow', 'next week at this time', 'in a few days'],
    tips: 'Imagínate mirando una cámara en el futuro: lo que verás sucediendo en vivo en esa fecha y hora se expresa en Future Continuous.'
  },
  {
    id: 'future-perfect',
    nameEn: 'Future Perfect',
    nameEs: 'Futuro Perfecto',
    category: 'future',
    level: 'B2',
    usageSummary: 'Se utiliza para expresar que una acción ya habrá finalizado o se habrá completado ANTES de una fecha, hora o momento específico del futuro.',
    whenToUse: [
      'Metas o hitos que estarán concluidos antes de un límite temporal futuro con "by" (ej. "By 2028, I will have graduated").',
      'Estimar la culminación anticipada de un proyecto (ej. "The builders will have finished the bridge by next month").'
    ],
    rules: [
      'Estructura: Sujeto + will have + Participio Pasado del verbo principal.',
      '"Have" permanece fijo en forma base; nunca se cambia a "has", incluso con He, She, It (porque va precedido del modal will).',
      'En oraciones negativas: "will not have" (won\'t have).'
    ],
    auxiliaryGuide: 'Auxiliar: WILL HAVE para todos los sujetos. Pregunta: Will + sujeto + have + participio pasado.',
    commonMistakes: [
      {
        wrong: 'She will has finished her homework by tomorrow.',
        right: 'She will have finished her homework by tomorrow.',
        reason: 'Después del verbo modal "will", el auxiliar debe permanecer siempre en su forma base "have", nunca "has".'
      },
      {
        wrong: 'By next year, I will have wrote my first book.',
        right: 'By next year, I will have written my first book.',
        reason: 'El verbo después de "will have" debe ser el participio pasado ("written", no "wrote").'
      }
    ],
    structure: {
      affirmative: 'Sujeto + will have + Participio Pasado + Complemento.',
      negative: 'Sujeto + will not have + Participio Pasado + Complemento.',
      interrogative: 'Will + Sujeto + have + Participio Pasado + Complemento + ?'
    },
    examples: {
      affirmative: {
        en: 'I will have studied English for three years by next December.',
        es: 'Habré estudiado inglés durante tres años para el próximo diciembre.'
      },
      negative: {
        en: 'I will not have studied English for three years by next December.',
        es: 'No habré estudiado inglés durante tres años para el próximo diciembre.'
      },
      interrogative: {
        en: 'Will you have studied all units by next Friday?',
        es: '¿Habrás estudiado todas las unidades para el próximo viernes?'
      }
    },
    signalWords: ['by then', 'by tomorrow', 'by next week', 'by the end of the year', 'in five years\' time'],
    tips: 'La palabra clave por excelencia es "BY" (para tal momento). Señala el plazo límite antes del cual la acción ya estará lista.'
  },
  {
    id: 'future-perfect-continuous',
    nameEn: 'Future Perfect Continuous',
    nameEs: 'Futuro Perfecto Continuo',
    category: 'future',
    level: 'C1',
    usageSummary: 'Se utiliza para proyectar la duración continua de una acción que se estará llevando a cabo hasta un punto de referencia específico en el futuro.',
    whenToUse: [
      'Medir la trayectoria acumulada de una labor o estudio en una fecha futura (ej. "By 2030, Mr. Luis will have been teaching ESL for 25 years").',
      'Enfatizar el esfuerzo prolongado e ininterrumpido hasta un hito futuro.'
    ],
    rules: [
      'Estructura invariable: Sujeto + will have been + Verbo con "-ing".',
      '"Will have been" se mantiene idéntico para todos los pronombres.',
      'Suele acompañarse de dos expresiones de tiempo: una con "by" (momento futuro) y otra con "for" (duración acumulada).'
    ],
    auxiliaryGuide: 'Auxiliar: WILL HAVE BEEN. Pregunta: Will + sujeto + have been + verbo-ing.',
    commonMistakes: [
      {
        wrong: 'By midnight, they will have being coding for ten hours.',
        right: 'By midnight, they will have been coding for ten hours.',
        reason: 'La fórmula requiere el participio "been", nunca "being".'
      },
      {
        wrong: 'By next year, she will has been working here for a decade.',
        right: 'By next year, she will have been working here for a decade.',
        reason: 'Con el modal "will", el auxiliar siempre es "have", nunca "has".'
      }
    ],
    structure: {
      affirmative: 'Sujeto + will have been + Verbo-ing + Complemento.',
      negative: 'Sujeto + will not have been + Verbo-ing + Complemento.',
      interrogative: 'Will + Sujeto + have been + Verbo-ing + Complemento + ?'
    },
    examples: {
      affirmative: {
        en: 'By next month, I will have been studying English for one whole year.',
        es: 'Para el próximo mes, habré estado estudiando inglés durante todo un año.'
      },
      negative: {
        en: 'By next month, I will not have been studying English for one whole year.',
        es: 'Para el próximo mes, no habré estado estudiando inglés durante todo un año.'
      },
      interrogative: {
        en: 'Will you have been studying English for two years by next June?',
        es: '¿Habrás estado estudiando inglés durante dos años para el próximo junio?'
      }
    },
    signalWords: ['by next year for...', 'by then for three hours', 'by December for two months'],
    tips: 'Es el tiempo más avanzado y de mayor precisión gramatical (nivel C1). Requiere la triple combinación: will + have + been + verbo-ing.'
  }
];

export const BADGES_LIST: Badge[] = [
  {
    id: 'first_step',
    title: 'Primer Paso',
    description: 'Completaste tu primera lección guiada con el profesor virtual.',
    icon: 'Sparkles',
    category: 'progress'
  },
  {
    id: 'heart_keeper',
    title: 'Mente Imbatible',
    description: 'Superaste un quiz completo sin perder ni una sola vida.',
    icon: 'ShieldCheck',
    category: 'skill'
  },
  {
    id: 'present_master',
    title: 'Maestro del Presente',
    description: 'Aprobaste el Quiz del Nivel 1 (Los 4 Tiempos Presentes).',
    icon: 'Clock',
    category: 'mastery'
  },
  {
    id: 'past_conqueror',
    title: 'Guerrero del Pasado',
    description: 'Aprobaste el Quiz del Nivel 2 (Los 4 Tiempos Pasados).',
    icon: 'History',
    category: 'mastery'
  },
  {
    id: 'future_visionary',
    title: 'Visionario del Futuro',
    description: 'Aprobaste el Quiz del Nivel 3 (Los 4 Tiempos Futuros).',
    icon: 'Compass',
    category: 'mastery'
  },
  {
    id: 'grand_master_c1',
    title: 'Certificado Grand Master',
    description: 'Aprobaste el Examen Final de 50 preguntas y obtuviste certificación oficial.',
    icon: 'Award',
    category: 'mastery'
  }
];
