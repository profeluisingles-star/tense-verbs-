import { PracticeExercise } from '../types';

export const PRACTICE_EXERCISES: PracticeExercise[] = [
  // =========================================================================
  // NIVEL 1: PRESENT TENSE PRACTICES (10 modalidades)
  // =========================================================================
  {
    id: 'p1-1',
    levelId: 1,
    tenseId: 'simple-present',
    type: 'fill_blank',
    title: 'Completar Oración (Present Simple)',
    prompt: 'Completa la oración con el verbo correcto en Presente Simple: "My brother _______ (work) at a technology company in San José."',
    contextHint: 'Atención al sujeto "My brother" (tercera persona singular: he).',
    correctAnswer: 'works',
    acceptableAnswers: ['works'],
    relatedGrammarRule: 'En oraciones afirmativas en Presente Simple con tercera persona singular (He, She, It), se añade "-s" al verbo.',
    explanationWhatWrong: 'La respuesta no tiene la conjugación de tercera persona requerida.',
    explanationWhyWrong: '"My brother" equivale al pronombre "He". En Presente Simple afirmativo, los verbos con He/She/It deben llevar la desinencia "-s".',
    howToCorrect: 'Toma el verbo base "work" y añade una "-s" final: "works".'
  },
  {
    id: 'p1-2',
    levelId: 1,
    tenseId: 'simple-present',
    type: 'aff_to_neg',
    title: 'Transformar a Negativa (Present Simple)',
    prompt: 'Transforma la siguiente oración afirmativa a su forma negativa: "Carlos speaks English and French."',
    contextHint: 'Utiliza el auxiliar "does not" o "doesn\'t" y recuerda qué pasa con el verbo "speaks".',
    correctAnswer: 'Carlos does not speak English and French.',
    acceptableAnswers: [
      'Carlos does not speak English and French.',
      'Carlos doesn\'t speak English and French.',
      'Carlos does not speak English and French',
      'Carlos doesn\'t speak English and French'
    ],
    relatedGrammarRule: 'Para oraciones negativas en Presente Simple con tercera persona: Sujeto + does not / doesn\'t + Verbo en forma base (sin -s).',
    explanationWhatWrong: 'No se utilizó correctamente el auxiliar "does not" o se conservó la "-s" en el verbo principal.',
    explanationWhyWrong: 'Al intervenir el auxiliar negativo "does not", la carga gramatical de tercera persona la asume el auxiliar; por ende, el verbo principal debe volver a su forma base "speak".',
    howToCorrect: 'Escribe: "Carlos does not speak English and French." o "Carlos doesn\'t speak English and French."'
  },
  {
    id: 'p1-3',
    levelId: 1,
    tenseId: 'simple-present',
    type: 'aff_to_question',
    title: 'Transformar a Pregunta (Present Simple)',
    prompt: 'Convierte esta oración afirmativa en una pregunta en Presente Simple: "You study English every day."',
    contextHint: 'Inicia con el auxiliar "Do" y coloca el signo de interrogación "?" al final.',
    correctAnswer: 'Do you study English every day?',
    acceptableAnswers: [
      'Do you study English every day?',
      'Do you study English every day'
    ],
    relatedGrammarRule: 'Fórmula interrogativa en Presente Simple: Auxiliar (Do / Does) + Sujeto + Verbo en forma base + Complemento + ?',
    explanationWhatWrong: 'El orden de la pregunta o el auxiliar utilizado es incorrecto.',
    explanationWhyWrong: 'En inglés, las preguntas directas en Presente Simple no se forman invirtiendo el verbo principal, sino anteponiendo el auxiliar "Do" para el sujeto "you".',
    howToCorrect: 'Comienza con "Do", mantén el sujeto "you", el verbo base "study" y cierra con signo de interrogación: "Do you study English every day?"'
  },
  {
    id: 'p1-4',
    levelId: 1,
    tenseId: 'present-continuous',
    type: 'structure_order',
    title: 'Ordenar Palabras Sintácticas (Present Continuous)',
    prompt: 'Ordena las fichas para construir una oración continua correcta:',
    wordTiles: ['The students', 'are', 'practicing', 'grammar', 'right now.'],
    correctAnswer: 'The students are practicing grammar right now.',
    acceptableAnswers: ['The students are practicing grammar right now.'],
    relatedGrammarRule: 'Estructura afirmativa del Present Continuous: Sujeto + am/is/are + Verbo con -ing + Complemento.',
    explanationWhatWrong: 'Los componentes de la oración no siguen el orden sintáctico inglés.',
    explanationWhyWrong: 'El sujeto "The students" debe ser seguido inmediatamente por el auxiliar to be "are", luego el gerundio "practicing" y finalmente el complemento temporal.',
    howToCorrect: 'Coloca: The students -> are -> practicing -> grammar -> right now.'
  },
  {
    id: 'p1-5',
    levelId: 1,
    tenseId: 'present-continuous',
    type: 'listening',
    title: 'Comprensión Auditiva (Present Continuous)',
    prompt: 'Escucha atentamente el audio del profesor y selecciona la transcripción exacta:',
    audioText: 'She is explaining the English structures at the moment.',
    options: [
      'She is explaining the English structures at the moment.',
      'She explains the English structures at the moment.',
      'She has explained the English structures at the moment.',
      'She was explaining the English structures at the moment.'
    ],
    correctAnswer: 'She is explaining the English structures at the moment.',
    relatedGrammarRule: 'La expresión "at the moment" denota una acción temporal en desarrollo en el presente (is explaining).',
    explanationWhatWrong: 'Seleccionaste un tiempo verbal diferente al reproducido por la voz nativa.',
    explanationWhyWrong: 'El audio pronuncia claramente "She is explaining...", lo cual corresponde al Present Continuous con el auxiliar "is" y el gerundio "-ing".',
    howToCorrect: 'Vuelve a escuchar el audio prestando atención a la forma auxiliar "is" y la terminación "-ing".'
  },
  {
    id: 'p1-6',
    levelId: 1,
    tenseId: 'present-perfect',
    type: 'translate_en_es',
    title: 'Traducción Inglés a Español (Present Perfect)',
    prompt: '¿Cuál es la traducción correcta y precisa de: "I have lived in Costa Rica since 2020"?',
    options: [
      'He vivido en Costa Rica desde el 2020.',
      'Viví en Costa Rica en el 2020.',
      'Estoy viviendo en Costa Rica desde el 2020.',
      'Había vivido en Costa Rica en el 2020.'
    ],
    correctAnswer: 'He vivido en Costa Rica desde el 2020.',
    relatedGrammarRule: 'Present Perfect (have lived) se traduce al español como pretérito perfecto compuesto ("he vivido"). "Since" significa "desde".',
    explanationWhatWrong: 'La traducción elegida confunde el Present Perfect con Pasado Simple o Presente Continuo.',
    explanationWhyWrong: '"Have lived" expresa una experiencia iniciada en el pasado que se mantiene hasta hoy: "He vivido".',
    howToCorrect: 'Selecciona "He vivido en Costa Rica desde el 2020."'
  },
  {
    id: 'p1-7',
    levelId: 1,
    tenseId: 'present-perfect',
    type: 'translate_es_en',
    title: 'Traducción Español a Inglés (Present Perfect)',
    prompt: 'Traduce al inglés: "¿Has terminado tu tarea ya?"',
    contextHint: 'Pregunta en Present Perfect con el adverbio "yet" al final.',
    options: [
      'Have you finished your homework yet?',
      'Did you finished your homework yet?',
      'Are you finishing your homework yet?',
      'Do you finish your homework yet?'
    ],
    correctAnswer: 'Have you finished your homework yet?',
    relatedGrammarRule: 'Para preguntas de acciones esperadas en Present Perfect usamos: Have + Sujeto + Participio Pasado (finished) + Complemento + yet?',
    explanationWhatWrong: 'El auxiliar o la estructura interrogativa no corresponde a Present Perfect.',
    explanationWhyWrong: 'En preguntas sobre si una acción ya fue completada hasta el momento presente, el inglés usa "Have you finished... yet?".',
    howToCorrect: 'Elige la opción que utiliza el auxiliar "Have" con el participio "finished".'
  },
  {
    id: 'p1-8',
    levelId: 1,
    tenseId: 'present-perfect-continuous',
    type: 'fill_blank',
    title: 'Completar Duración (Present Perfect Continuous)',
    prompt: 'Completa con la forma correcta de "study" en Present Perfect Continuous: "We _______ (study) for three hours."',
    contextHint: 'Escribe las dos palabras auxiliares y el verbo con -ing: have been studying',
    correctAnswer: 'have been studying',
    acceptableAnswers: ['have been studying', "we've been studying"],
    relatedGrammarRule: 'Fórmula del Present Perfect Continuous: Sujeto + have/has been + Verbo-ing.',
    explanationWhatWrong: 'Falta uno de los componentes de la triple estructura (have + been + verbo-ing).',
    explanationWhyWrong: 'Para el sujeto "We", se requiere el auxiliar "have", seguido del participio "been", y el verbo con sufijo "-ing" ("studying").',
    howToCorrect: 'Escribe exactamente: "have been studying".'
  },
  {
    id: 'p1-9',
    levelId: 1,
    tenseId: 'simple-present',
    type: 'reading',
    title: 'Comprensión Lectora (Present Tense)',
    prompt: 'Lee el texto y responde a la pregunta:\n\n"Sofia is an English teacher. She wakes up at 6:00 AM every morning and drinks coffee while reading her curriculum. Right now, she is preparing interactive exercises for her students because they have been preparing for the final exam all week."\n\n¿Qué está haciendo Sofía en este instante exacto (right now)?',
    options: [
      'She is preparing interactive exercises for her students.',
      'She wakes up at 6:00 AM.',
      'She is drinking coffee and sleeping.',
      'She prepares a grammar test for next year.'
    ],
    correctAnswer: 'She is preparing interactive exercises for her students.',
    relatedGrammarRule: 'La frase "Right now" en el texto señala la acción en desarrollo descrita en Present Continuous ("is preparing interactive exercises").',
    explanationWhatWrong: 'Confundiste su rutina habitual con la acción que está realizando en este instante.',
    explanationWhyWrong: 'El texto aclara: "Right now, she is preparing interactive exercises for her students".',
    howToCorrect: 'Busca en el párrafo la frase que acompaña al conector temporal "Right now".'
  },
  {
    id: 'p1-10',
    levelId: 1,
    tenseId: 'simple-present',
    type: 'create_sentence',
    title: 'Crear Oración Propia (Present Tense)',
    prompt: 'Escribe una oración completa en inglés usando el verbo "study" en Presente Simple (afirmativa o negativa). Asegúrate de incluir sujeto, verbo y complemento.',
    contextHint: 'Ejemplo modelo: "I study English every day." o "She studies English at night."',
    correctAnswer: 'I study English every day.',
    acceptableAnswers: [
      'I study English every day.',
      'I study English every day',
      'I study English at university.',
      'She studies English every day.',
      'He studies English every day.',
      'They study English at school.',
      'We study English with teacher Luis.',
      'I study English with Profe Luis.',
      'I study English.',
      'I do not study French.'
    ],
    relatedGrammarRule: 'Una oración completa en Presente Simple debe tener un sujeto explícito, el verbo conjugado coherentemente (estudiar = study / studies) y un predicado.',
    explanationWhatWrong: 'La oración escrita carece de la estructura sintáctica básica de Presente Simple o contiene un error de concordancia sujeto-verbo.',
    explanationWhyWrong: 'El tutor virtual verifica que tu oración contenga un sujeto reconocible (I, You, She, He, etc.) y la forma verbal adecuada ("study" o "studies").',
    howToCorrect: 'Puedes escribir: "I study English every day." asegurándote de conjugar correctamente.'
  },

  // =========================================================================
  // NIVEL 2: PAST TENSE PRACTICES (10 modalidades)
  // =========================================================================
  {
    id: 'p2-1',
    levelId: 2,
    tenseId: 'simple-past',
    type: 'fill_blank',
    title: 'Completar con Verbo Irregular (Past Simple)',
    prompt: 'Escribe la forma en Pasado Simple del verbo irregular "go": "Yesterday, we _______ to the English workshop."',
    contextHint: 'Forma pasada de go: went',
    correctAnswer: 'went',
    acceptableAnswers: ['went'],
    relatedGrammarRule: '"Go" es un verbo irregular. Su pasado simple es "went" y su participio es "gone".',
    explanationWhatWrong: 'No se utilizó la forma pasada irregular correspondiente.',
    explanationWhyWrong: 'Los verbos irregulares no añaden "-ed". El pasado simple de "go" es "went".',
    howToCorrect: 'Escribe: "went".'
  },
  {
    id: 'p2-2',
    levelId: 2,
    tenseId: 'simple-past',
    type: 'aff_to_neg',
    title: 'Transformar a Negativa en Pasado (Past Simple)',
    prompt: 'Transforma a negativo la siguiente oración: "Maria bought a new grammar book yesterday."',
    contextHint: 'Usa el auxiliar "did not" o "didn\'t" y recuerda qué pasa con "bought".',
    correctAnswer: 'Maria did not buy a new grammar book yesterday.',
    acceptableAnswers: [
      'Maria did not buy a new grammar book yesterday.',
      'Maria didn\'t buy a new grammar book yesterday.',
      'Maria did not buy a new grammar book yesterday',
      'Maria didn\'t buy a new grammar book yesterday'
    ],
    relatedGrammarRule: 'Fórmula negativa en Pasado Simple: Sujeto + did not / didn\'t + Verbo en forma base ("buy", no "bought").',
    explanationWhatWrong: 'Se utilizó el verbo irregular en pasado "bought" junto con el auxiliar, o se omitió "did not".',
    explanationWhyWrong: 'En inglés es una regla inquebrantable: con el auxiliar de pasado "did not", el verbo principal NUNCA va en pasado, debe ir en forma base ("buy").',
    howToCorrect: 'Escribe: "Maria did not buy a new grammar book yesterday."'
  },
  {
    id: 'p2-3',
    levelId: 2,
    tenseId: 'simple-past',
    type: 'aff_to_question',
    title: 'Transformar a Pregunta en Pasado (Past Simple)',
    prompt: 'Convierte a pregunta en Pasado Simple: "They understood the lesson yesterday."',
    contextHint: 'Empieza con "Did", cambia "understood" a "understand" y añade signo de interrogación al final.',
    correctAnswer: 'Did they understand the lesson yesterday?',
    acceptableAnswers: [
      'Did they understand the lesson yesterday?',
      'Did they understand the lesson yesterday'
    ],
    relatedGrammarRule: 'Fórmula interrogativa en Pasado Simple: Did + Sujeto + Verbo en forma base + Complemento + ?',
    explanationWhatWrong: 'El auxiliar "Did" o la forma base del verbo "understand" no fue aplicada correctamente.',
    explanationWhyWrong: '"Did" ya marca el tiempo pasado; por lo tanto, "understood" debe regresar a "understand".',
    howToCorrect: 'Escribe: "Did they understand the lesson yesterday?"'
  },
  {
    id: 'p2-4',
    levelId: 2,
    tenseId: 'past-continuous',
    type: 'structure_order',
    title: 'Ordenar Estructura de Interrupción (Past Continuous)',
    prompt: 'Ordena las fichas para expresar una acción continua interrumpida por otra:',
    wordTiles: ['I was studying', 'when', 'the telephone', 'suddenly rang.'],
    correctAnswer: 'I was studying when the telephone suddenly rang.',
    acceptableAnswers: ['I was studying when the telephone suddenly rang.'],
    relatedGrammarRule: 'Acción larga en Past Continuous (was studying) conectada por "when" con la acción puntual en Simple Past (rang).',
    explanationWhatWrong: 'El orden lógico de la acción de fondo y la interrupción está desordenado.',
    explanationWhyWrong: 'Primero se establece la acción que estaba en desarrollo ("I was studying"), luego el conector "when" y finalmente la acción repentina ("the telephone suddenly rang").',
    howToCorrect: 'Coloca: I was studying -> when -> the telephone -> suddenly rang.'
  },
  {
    id: 'p2-5',
    levelId: 2,
    tenseId: 'past-continuous',
    type: 'listening',
    title: 'Comprensión Auditiva (Past Continuous)',
    prompt: 'Escucha la narración en audio y selecciona la opción que dice el locutor:',
    audioText: 'We were listening to teacher Luis when the electricity went out.',
    options: [
      'We were listening to teacher Luis when the electricity went out.',
      'We listened to teacher Luis when the electricity went out.',
      'We had listened to teacher Luis when the electricity went out.',
      'We will be listening to teacher Luis when the electricity went out.'
    ],
    correctAnswer: 'We were listening to teacher Luis when the electricity went out.',
    relatedGrammarRule: 'La combinación "were listening" describe la acción simultánea que estaba ocurriendo en el pasado.',
    explanationWhatWrong: 'La opción elegida no concuerda con la pronunciación del audio.',
    explanationWhyWrong: 'El audio pronuncia con claridad: "We were listening to teacher Luis...", utilizando el auxiliar en plural "were" y el gerundio "listening".',
    howToCorrect: 'Escucha nuevamente y fíjate en el auxiliar "were".'
  },
  {
    id: 'p2-6',
    levelId: 2,
    tenseId: 'past-perfect',
    type: 'translate_en_es',
    title: 'Traducción Inglés a Español (Past Perfect)',
    prompt: '¿Cuál es la traducción correcta de: "When the teacher arrived, the students had already done the exercises"?',
    options: [
      'Cuando el profesor llegó, los estudiantes ya habían hecho los ejercicios.',
      'Cuando el profesor llegó, los estudiantes hicieron los ejercicios.',
      'Cuando el profesor llega, los estudiantes han hecho los ejercicios.',
      'Cuando el profesor llegue, los estudiantes habrán hecho los ejercicios.'
    ],
    correctAnswer: 'Cuando el profesor llegó, los estudiantes ya habían hecho los ejercicios.',
    relatedGrammarRule: 'Past Perfect (had done) expresa anterioridad en el pasado ("habían hecho"), mientras que "arrived" es pasado simple ("llegó").',
    explanationWhatWrong: 'La traducción seleccionada no refleja la anterioridad del Past Perfect ("habían hecho").',
    explanationWhyWrong: '"Had done" se traduce como "habían hecho", denotando que la acción terminó antes de que llegara el docente.',
    howToCorrect: 'Elige la opción que contiene "ya habían hecho".'
  },
  {
    id: 'p2-7',
    levelId: 2,
    tenseId: 'past-perfect',
    type: 'fill_blank',
    title: 'Completar Pasado del Pasado (Past Perfect)',
    prompt: 'Completa en Past Perfect con el verbo "leave": "By the time we reached the station, the bus _______."',
    contextHint: 'Fórmula: had + participio pasado de leave (left)',
    correctAnswer: 'had left',
    acceptableAnswers: ['had left', 'had already left'],
    relatedGrammarRule: 'Fórmula del Past Perfect: Sujeto + had + Participio Pasado.',
    explanationWhatWrong: 'Falta el auxiliar "had" o se empleó una forma verbal errónea.',
    explanationWhyWrong: 'La salida del autobús ocurrió antes de llegar a la estación; por ende, requiere Past Perfect: "had left".',
    howToCorrect: 'Escribe: "had left".'
  },
  {
    id: 'p2-8',
    levelId: 2,
    tenseId: 'past-perfect-continuous',
    type: 'fill_blank',
    title: 'Completar Duración en el Pasado (Past Perfect Continuous)',
    prompt: 'Completa con la forma de "wait" en Past Perfect Continuous: "She was angry because she _______ (wait) for two hours."',
    contextHint: 'Escribe: had been waiting',
    correctAnswer: 'had been waiting',
    acceptableAnswers: ['had been waiting'],
    relatedGrammarRule: 'Fórmula del Past Perfect Continuous: Sujeto + had been + Verbo-ing.',
    explanationWhatWrong: 'La respuesta no contiene los tres elementos auxiliares (had + been + waiting).',
    explanationWhyWrong: 'Para expresar la causa de una molestia basada en la duración de una acción previa en el pasado, se utiliza "had been waiting".',
    howToCorrect: 'Escribe: "had been waiting".'
  },
  {
    id: 'p2-9',
    levelId: 2,
    tenseId: 'simple-past',
    type: 'reading',
    title: 'Lectura Histórica (Past Tenses)',
    prompt: 'Lee el siguiente pasaje y responde:\n\n"Yesterday was an eventful day for Luis. At 7:00 AM, he had already prepared all the class materials before the first student arrived. While he was teaching the irregular verbs, the students asked many questions. In the end, everyone passed the evaluation successfully."\n\n¿Qué había hecho Luis ANTES de que llegara el primer estudiante?',
    options: [
      'He had prepared all the class materials.',
      'He was teaching the irregular verbs.',
      'He was asking questions to the students.',
      'He went home to rest.'
    ],
    correctAnswer: 'He had prepared all the class materials.',
    relatedGrammarRule: 'El texto utiliza Past Perfect ("he had already prepared all the class materials before...") para especificar la acción previa.',
    explanationWhatWrong: 'Seleccionaste una acción posterior que ocurrió durante la clase.',
    explanationWhyWrong: 'El texto dice explícitamente: "he had already prepared all the class materials before the first student arrived".',
    howToCorrect: 'Identifica la cláusula con "had prepared" en el texto.'
  },
  {
    id: 'p2-10',
    levelId: 2,
    tenseId: 'simple-past',
    type: 'create_sentence',
    title: 'Crear Oración Propia en Pasado (Past Simple)',
    prompt: 'Escribe una oración afirmativa en inglés en Pasado Simple usando el verbo irregular "went" o el verbo regular "studied".',
    contextHint: 'Ejemplo modelo: "I went to the cinema yesterday." o "I studied English last night."',
    correctAnswer: 'I went to the cinema yesterday.',
    acceptableAnswers: [
      'I went to the cinema yesterday.',
      'I went to school yesterday.',
      'I went to the store yesterday.',
      'I went home yesterday.',
      'I studied English last night.',
      'I studied English yesterday.',
      'She studied English last week.',
      'We studied English with teacher Luis yesterday.'
    ],
    relatedGrammarRule: 'Una oración en Pasado Simple requiere un sujeto explícito, un verbo en forma pasada y un contexto temporal definido.',
    explanationWhatWrong: 'La oración no contiene un verbo en pasado válido o carece de complementos.',
    explanationWhyWrong: 'El sistema valida que utilices un sujeto y una forma en pasado como "went" o "studied".',
    howToCorrect: 'Escribe por ejemplo: "I studied English yesterday."'
  },

  // =========================================================================
  // NIVEL 3: FUTURE TENSE PRACTICES (10 modalidades)
  // =========================================================================
  {
    id: 'p3-1',
    levelId: 3,
    tenseId: 'simple-future',
    type: 'fill_blank',
    title: 'Completar con Futuro Simple (Future Simple)',
    prompt: 'Completa la promesa con el verbo "help" en Futuro Simple con WILL: "Don\'t worry, I _______ (help) you with your English project tomorrow."',
    contextHint: 'Escribe: will help',
    correctAnswer: 'will help',
    acceptableAnswers: ['will help', "I'll help"],
    relatedGrammarRule: 'Para promesas u ofertas espontáneas usamos el modal "will" + Verbo en forma base.',
    explanationWhatWrong: 'Falta el modal "will" o se alteró la forma base del verbo.',
    explanationWhyWrong: 'Con el modal "will", el verbo nunca lleva "to" ni terminación "-s": "will help".',
    howToCorrect: 'Escribe: "will help".'
  },
  {
    id: 'p3-2',
    levelId: 3,
    tenseId: 'simple-future',
    type: 'aff_to_neg',
    title: 'Transformar a Negativa Futura (Future Simple)',
    prompt: 'Transforma a negativo la siguiente oración afirmativa: "We will cancel the English class tomorrow."',
    contextHint: 'Usa "will not" o la contracción "won\'t".',
    correctAnswer: 'We will not cancel the English class tomorrow.',
    acceptableAnswers: [
      'We will not cancel the English class tomorrow.',
      'We won\'t cancel the English class tomorrow.',
      'We will not cancel the English class tomorrow',
      'We won\'t cancel the English class tomorrow'
    ],
    relatedGrammarRule: 'La negación en Futuro Simple se forma con: Sujeto + will not (won\'t) + Verbo base + Complemento.',
    explanationWhatWrong: 'La negación del modal "will" es incorrecta.',
    explanationWhyWrong: 'La forma negativa estándar es "will not" o la contracción "won\'t", seguida del verbo en forma base "cancel".',
    howToCorrect: 'Escribe: "We will not cancel the English class tomorrow." o "We won\'t cancel the English class tomorrow."'
  },
  {
    id: 'p3-3',
    levelId: 3,
    tenseId: 'simple-future',
    type: 'aff_to_question',
    title: 'Transformar a Pregunta en Futuro (Future Simple)',
    prompt: 'Convierte esta oración afirmativa en una pregunta con WILL: "You will practice speaking tomorrow."',
    contextHint: 'Coloca "Will" al inicio de la oración y termina con "?".',
    correctAnswer: 'Will you practice speaking tomorrow?',
    acceptableAnswers: [
      'Will you practice speaking tomorrow?',
      'Will you practice speaking tomorrow'
    ],
    relatedGrammarRule: 'Fórmula interrogativa con Will: Will + Sujeto + Verbo base + Complemento + ?',
    explanationWhatWrong: 'El orden de las palabras en la pregunta no es el correcto.',
    explanationWhyWrong: 'En preguntas con "will", el modal se antepone al sujeto: "Will you practice...?"',
    howToCorrect: 'Escribe: "Will you practice speaking tomorrow?"'
  },
  {
    id: 'p3-4',
    levelId: 3,
    tenseId: 'future-continuous',
    type: 'structure_order',
    title: 'Ordenar Oración en Futuro Continuo (Future Continuous)',
    prompt: 'Ordena las fichas para estructurar una acción en desarrollo a una hora futura:',
    wordTiles: ['This time tomorrow,', 'I will be flying', 'to London', 'for the conference.'],
    correctAnswer: 'This time tomorrow, I will be flying to London for the conference.',
    acceptableAnswers: ['This time tomorrow, I will be flying to London for the conference.'],
    relatedGrammarRule: 'Estructura afirmativa del Future Continuous: Sujeto + will be + Verbo-ing.',
    explanationWhatWrong: 'Los componentes de la oración futura están desordenados.',
    explanationWhyWrong: 'La expresión temporal "This time tomorrow," introduce la proyección: "I will be flying to London for the conference."',
    howToCorrect: 'Coloca: This time tomorrow, -> I will be flying -> to London -> for the conference.'
  },
  {
    id: 'p3-5',
    levelId: 3,
    tenseId: 'future-continuous',
    type: 'listening',
    title: 'Comprensión Auditiva (Future Continuous)',
    prompt: 'Escucha la proyección del profesor y selecciona la transcripción exacta:',
    audioText: 'Tomorrow morning at nine, we will be discussing the final exam.',
    options: [
      'Tomorrow morning at nine, we will be discussing the final exam.',
      'Tomorrow morning at nine, we will discuss the final exam.',
      'Tomorrow morning at nine, we are discussing the final exam.',
      'Tomorrow morning at nine, we have discussed the final exam.'
    ],
    correctAnswer: 'Tomorrow morning at nine, we will be discussing the final exam.',
    relatedGrammarRule: 'La estructura "will be discussing" denota una acción que estará en pleno proceso en un momento específico del porvenir.',
    explanationWhatWrong: 'La alternativa elegida no coincide con la locución en audio.',
    explanationWhyWrong: 'El profesor dice: "...we will be discussing...", empleando el modal "will", el infinitivo "be" y el gerundio "discussing".',
    howToCorrect: 'Vuelve a escuchar prestando atención a las palabras "will be discussing".'
  },
  {
    id: 'p3-6',
    levelId: 3,
    tenseId: 'future-perfect',
    type: 'translate_en_es',
    title: 'Traducción Inglés a Español (Future Perfect)',
    prompt: '¿Cuál es la traducción correcta de: "By next December, I will have finished all twelve verb tenses"?',
    options: [
      'Para el próximo diciembre, habré terminado todos los doce tiempos verbales.',
      'Para el próximo diciembre, terminaré todos los doce tiempos verbales.',
      'Para el próximo diciembre, estaré terminando todos los doce tiempos verbales.',
      'Para el próximo diciembre, había terminado todos los doce tiempos verbales.'
    ],
    correctAnswer: 'Para el próximo diciembre, habré terminado todos los doce tiempos verbales.',
    relatedGrammarRule: 'Future Perfect (will have finished) se traduce en español como "habré terminado". "By" se traduce como "Para (tal momento)".',
    explanationWhatWrong: 'La traducción confunde Future Perfect ("habré terminado") con Futuro Simple o Futuro Continuo.',
    explanationWhyWrong: '"Will have finished" indica que la acción ya estará concluida antes de esa fecha: "habré terminado".',
    howToCorrect: 'Elige la opción que dice: "Para el próximo diciembre, habré terminado..."'
  },
  {
    id: 'p3-7',
    levelId: 3,
    tenseId: 'future-perfect',
    type: 'fill_blank',
    title: 'Completar Meta Futura (Future Perfect)',
    prompt: 'Completa con la forma en Future Perfect del verbo "graduate": "By 2028, she _______ (graduate) from university with honors."',
    contextHint: 'Escribe: will have graduated',
    correctAnswer: 'will have graduated',
    acceptableAnswers: ['will have graduated'],
    relatedGrammarRule: 'Estructura del Future Perfect: Sujeto + will have + Participio Pasado (graduated). Recuerda que con "will", nunca se usa "has".',
    explanationWhatWrong: 'Se utilizó una estructura incompleta o se usó erróneamente "has".',
    explanationWhyWrong: 'Después del modal "will", el auxiliar obligatorio es siempre "have" (nunca "has", incluso para she), seguido del participio "graduated".',
    howToCorrect: 'Escribe: "will have graduated".'
  },
  {
    id: 'p3-8',
    levelId: 3,
    tenseId: 'future-perfect-continuous',
    type: 'fill_blank',
    title: 'Completar Duración Acumulada Futura (Future Perfect Continuous)',
    prompt: 'Escribe los 3 auxiliares necesarios antes de "teaching" en Future Perfect Continuous: "By next year, Mr. Luis _______ (teach) English for twenty years."',
    contextHint: 'Escribe la fórmula completa: will have been teaching',
    correctAnswer: 'will have been teaching',
    acceptableAnswers: ['will have been teaching'],
    relatedGrammarRule: 'Fórmula invariable del Future Perfect Continuous: Sujeto + will have been + Verbo-ing.',
    explanationWhatWrong: 'La cadena de auxiliares está incompleta.',
    explanationWhyWrong: 'El nivel C1 exige la concatenación exacta: will (modal) + have (base) + been (participio de be) + teaching (verbo en -ing).',
    howToCorrect: 'Escribe exactamente: "will have been teaching".'
  },
  {
    id: 'p3-9',
    levelId: 3,
    tenseId: 'simple-future',
    type: 'conversational',
    title: 'Ejercicio Conversacional (Future Tense)',
    prompt: 'Completa el diálogo de forma natural y gramaticalmente correcta:\n\nProfesor: "Are you ready for your English certification exam tomorrow?"\nEstudiante: "Yes, teacher! I _______ (study) hard tonight, so I _______ (pass) without any doubts!"',
    options: [
      'will study / will pass',
      'am studying / passed',
      'have studied / pass',
      'had studied / would pass'
    ],
    correctAnswer: 'will study / will pass',
    relatedGrammarRule: 'Ambas cláusulas expresan una intención decidida y una predicción con convicción para el futuro cercano (will study / will pass).',
    explanationWhatWrong: 'La combinación de tiempos verbales no concuerda con el contexto conversacional del diálogo.',
    explanationWhyWrong: 'Para expresar una resolución y una predicción confiada se utiliza el modal futuro: "I will study hard tonight, so I will pass without any doubts!".',
    howToCorrect: 'Selecciona la opción con "will study / will pass".'
  },
  {
    id: 'p3-10',
    levelId: 3,
    tenseId: 'simple-future',
    type: 'create_sentence',
    title: 'Crear Oración Propia en Futuro (Future Simple)',
    prompt: 'Escribe una oración completa afirmativa en inglés expresando una predicción o meta futura usando "will" y un verbo en forma base.',
    contextHint: 'Ejemplo: "I will pass my English test tomorrow." o "I will speak fluent English soon."',
    correctAnswer: 'I will pass my English test tomorrow.',
    acceptableAnswers: [
      'I will pass my English test tomorrow.',
      'I will pass my English test.',
      'I will speak fluent English soon.',
      'I will speak English fluently.',
      'I will learn English with teacher Luis.',
      'I will travel to the United States next year.',
      'I will graduate next year.'
    ],
    relatedGrammarRule: 'Una oración en Futuro Simple afirmativo requiere: Sujeto + will + Verbo base + Complemento.',
    explanationWhatWrong: 'La oración no contiene el modal "will" seguido de un verbo base o le falta un sujeto explícito.',
    explanationWhyWrong: 'El tutor virtual verifica que tu oración comience con un sujeto válido, seguido del auxiliar "will" y la acción deseada.',
    howToCorrect: 'Escribe por ejemplo: "I will speak English fluently."'
  }
];
