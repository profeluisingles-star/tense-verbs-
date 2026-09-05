import { EvaluationModule, QuizQuestion } from '../types';

// =========================================================================
// QUIZ 1: PRESENT TENSES (EXACTLY 20 QUESTIONS - 20 POINTS)
// =========================================================================
const QUIZ_PRESENT_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1-1',
    tenseId: 'simple-present',
    type: 'multiple_choice',
    prompt: 'She _______ her grammar notes and exercises every evening.',
    options: ['reviews', 'is reviewing', 'has reviewed', 'review'],
    correctAnswer: 'reviews',
    explanation: 'Excelente. "Every evening" señala un hábito habitual en Presente Simple. Con "she" agregamos "-s" al verbo (reviews).',
    points: 1
  },
  {
    id: 'q1-2',
    tenseId: 'present-continuous',
    type: 'listening',
    prompt: 'Escucha el audio y selecciona la opción exacta:',
    audioText: 'The students are practicing English structures right now.',
    options: [
      'The students are practicing English structures right now.',
      'The students practice English structures right now.',
      'The students practiced English structures right now.',
      'The students will practice English structures right now.'
    ],
    correctAnswer: 'The students are practicing English structures right now.',
    explanation: 'Muy bien. "Right now" exige Present Continuous (are practicing) para una acción en desarrollo.',
    points: 1
  },
  {
    id: 'q1-3',
    tenseId: 'present-perfect',
    type: 'fill_blank',
    prompt: 'Escribe la forma en Present Perfect del verbo "live": "I _______ (live) in Costa Rica since 2018."',
    contextHint: 'Escribe: have lived',
    correctAnswer: 'have lived',
    acceptableAnswers: ['have lived', "I've lived"],
    explanation: '¡Exacto! "Since" conecta el inicio de la acción con el presente. Con "I" corresponde "have lived".',
    points: 1
  },
  {
    id: 'q1-4',
    tenseId: 'present-continuous',
    type: 'structure_order',
    prompt: 'Ordena las fichas para formular una pregunta en Presente Continuo:',
    wordTiles: ['Are', 'you', 'listening', 'to the teacher', 'now?'],
    correctAnswer: 'Are you listening to the teacher now?',
    explanation: 'Fórmula interrogativa: Auxiliar Be (Are) + Sujeto (you) + Verbo-ing (listening) + Complemento.',
    points: 1
  },
  {
    id: 'q1-5',
    tenseId: 'present-perfect-continuous',
    type: 'multiple_choice',
    prompt: 'They look tired because they _______ soccer for three hours straight.',
    options: ['have been playing', 'are playing', 'play', 'had played'],
    correctAnswer: 'have been playing',
    explanation: '"For three hours straight" enfatiza la duración prolongada con impacto en el presente: Present Perfect Continuous (have been playing).',
    points: 1
  },
  {
    id: 'q1-6',
    tenseId: 'simple-present',
    type: 'writing',
    prompt: 'Escribe la forma negativa completa de: "Mark speaks French."',
    contextHint: 'Usa: Mark does not speak French. (o doesn\'t)',
    correctAnswer: 'Mark does not speak French.',
    acceptableAnswers: [
      'Mark does not speak French.',
      'Mark doesn\'t speak French.',
      'Mark does not speak French',
      'Mark doesn\'t speak French'
    ],
    explanation: 'En tercera persona singular, la negación se construye con "does not" y el verbo en forma base ("speak").',
    points: 1
  },
  {
    id: 'q1-7',
    tenseId: 'simple-present',
    type: 'multiple_choice',
    prompt: 'Water _______ at 100 degrees Celsius.',
    options: ['boils', 'is boiling', 'has boiled', 'boil'],
    correctAnswer: 'boils',
    explanation: 'Los hechos científicos y leyes naturales se expresan invariablemente en Presente Simple: boils.',
    points: 1
  },
  {
    id: 'q1-8',
    tenseId: 'present-continuous',
    type: 'multiple_choice',
    prompt: 'Listen! Somebody _______ at the door.',
    options: ['is knocking', 'knocks', 'has knocked', 'knocked'],
    correctAnswer: 'is knocking',
    explanation: 'La llamada de atención "Listen!" señala un suceso en pleno desarrollo en este instante: is knocking.',
    points: 1
  },
  {
    id: 'q1-9',
    tenseId: 'present-perfect',
    type: 'multiple_choice',
    prompt: 'Have you _______ to London before?',
    options: ['ever been', 'already went', 'never gone', 'ever be'],
    correctAnswer: 'ever been',
    explanation: 'En preguntas sobre experiencias de vida en Present Perfect se emplea el adverbio "ever" con el participio "been".',
    points: 1
  },
  {
    id: 'q1-10',
    tenseId: 'present-perfect',
    type: 'fill_blank',
    prompt: 'Completa con "since" o "for": "She has worked as a teacher _______ ten years."',
    contextHint: 'Escribe: for',
    correctAnswer: 'for',
    acceptableAnswers: ['for'],
    explanation: 'Se usa "FOR" para periodos o duraciones de tiempo ("ten years"). Se usa "SINCE" para fechas o momentos puntuales.',
    points: 1
  },
  {
    id: 'q1-11',
    tenseId: 'present-perfect-continuous',
    type: 'listening',
    prompt: 'Escucha la pregunta avanzada del profesor y transcribe o selecciona la frase exacta:',
    audioText: 'How long have you been studying English tenses?',
    options: [
      'How long have you been studying English tenses?',
      'How long are you studying English tenses?',
      'How long had you been studying English tenses?',
      'How long will you study English tenses?'
    ],
    correctAnswer: 'How long have you been studying English tenses?',
    explanation: '"How long have you been studying..." pregunta por la duración acumulada hasta el presente.',
    points: 1
  },
  {
    id: 'q1-12',
    tenseId: 'simple-present',
    type: 'structure_order',
    prompt: 'Ordena la pregunta en Presente Simple:',
    wordTiles: ['Do', 'you', 'speak', 'English', 'fluently?'],
    correctAnswer: 'Do you speak English fluently?',
    explanation: 'Auxiliar Do + Sujeto you + Verbo base speak + Complemento English fluently?',
    points: 1
  },
  {
    id: 'q1-13',
    tenseId: 'simple-present',
    type: 'error_correction',
    prompt: 'Identifica la opción gramaticalmente correcta sin errores:',
    options: [
      'My father doesn\'t work on Sundays.',
      'My father doesn\'t works on Sundays.',
      'My father not work on Sundays.',
      'My father don\'t work on Sundays.'
    ],
    correctAnswer: 'My father doesn\'t work on Sundays.',
    explanation: 'Con tercera persona singular (My father = he), se usa el auxiliar "doesn\'t" y el verbo en forma base "work".',
    points: 1
  },
  {
    id: 'q1-14',
    tenseId: 'present-continuous',
    type: 'fill_blank',
    prompt: 'Completa con la forma continua de "write": "I _______ (write) an essay right now."',
    contextHint: 'Escribe: am writing',
    correctAnswer: 'am writing',
    acceptableAnswers: ['am writing', "I'm writing"],
    explanation: 'Sujeto "I" + am + verbo-ing "writing" (se elimina la -e muda de write).',
    points: 1
  },
  {
    id: 'q1-15',
    tenseId: 'present-perfect',
    type: 'multiple_choice',
    prompt: 'The train _______ already.',
    options: ['has left', 'have left', 'is leaving', 'leave'],
    correctAnswer: 'has left',
    explanation: '"The train" es tercera persona singular (it), por lo que requiere el auxiliar "has" + participio "left".',
    points: 1
  },
  {
    id: 'q1-16',
    tenseId: 'present-perfect-continuous',
    type: 'fill_blank',
    prompt: 'Completa con Present Perfect Continuous: "It _______ (rain) all day and the ground is soaked."',
    contextHint: 'Escribe: has been raining',
    correctAnswer: 'has been raining',
    acceptableAnswers: ['has been raining', "it's been raining"],
    explanation: 'Sujeto "It" + has been + raining para una acción continua con resultado visible en el presente.',
    points: 1
  },
  {
    id: 'q1-17',
    tenseId: 'simple-present',
    type: 'multiple_choice',
    prompt: 'How often _______ to the gym?',
    options: ['do you go', 'are you going', 'have you gone', 'you go'],
    correctAnswer: 'do you go',
    explanation: '"How often" pregunta por frecuencia de hábitos, lo que exige Presente Simple: do you go.',
    points: 1
  },
  {
    id: 'q1-18',
    tenseId: 'present-continuous',
    type: 'error_correction',
    prompt: '¿Cuál de estas oraciones está correctamente construida?',
    options: [
      'They are preparing for the test at the moment.',
      'They is preparing for the test at the moment.',
      'They are prepare for the test at the moment.',
      'They preparing for the test at the moment.'
    ],
    correctAnswer: 'They are preparing for the test at the moment.',
    explanation: 'Sujeto plural "They" + auxiliar "are" + gerundio "preparing".',
    points: 1
  },
  {
    id: 'q1-19',
    tenseId: 'present-perfect',
    type: 'structure_order',
    prompt: 'Ordena la oración en Presente Perfecto:',
    wordTiles: ['We', 'have', 'already', 'visited', 'Costa Rica.'],
    correctAnswer: 'We have already visited Costa Rica.',
    explanation: 'El adverbio "already" se posiciona entre el auxiliar "have" y el participio pasado "visited".',
    points: 1
  },
  {
    id: 'q1-20',
    tenseId: 'present-perfect-continuous',
    type: 'multiple_choice',
    prompt: 'Sarah is out of breath because she _______ for an hour.',
    options: ['has been running', 'is running', 'runs', 'had been running'],
    correctAnswer: 'has been running',
    explanation: 'Efecto visible en el presente ("is out of breath") producto de una acción continua: has been running.',
    points: 1
  }
];

// =========================================================================
// QUIZ 2: PAST TENSES (EXACTLY 20 QUESTIONS - 20 POINTS)
// =========================================================================
const QUIZ_PAST_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q2-1',
    tenseId: 'past-continuous',
    type: 'multiple_choice',
    prompt: 'While I _______ my homework, the electricity suddenly went out.',
    options: ['was writing', 'wrote', 'had written', 'have been writing'],
    correctAnswer: 'was writing',
    explanation: 'Usamos Past Continuous (was writing) para la acción de fondo que estaba ocurriendo cuando ocurrió la interrupción.',
    points: 1
  },
  {
    id: 'q2-2',
    tenseId: 'simple-past',
    type: 'listening',
    prompt: 'Escucha con atención y selecciona la oración en pasado que dice el profesor:',
    audioText: 'We completed our English project yesterday afternoon.',
    options: [
      'We completed our English project yesterday afternoon.',
      'We complete our English project yesterday afternoon.',
      'We were completing our English project yesterday afternoon.',
      'We had completed our English project yesterday afternoon.'
    ],
    correctAnswer: 'We completed our English project yesterday afternoon.',
    explanation: '"Yesterday afternoon" sitúa un hecho puntual completamente terminado en Past Simple (completed).',
    points: 1
  },
  {
    id: 'q2-3',
    tenseId: 'past-perfect',
    type: 'fill_blank',
    prompt: 'Completa en Past Perfect con el verbo "leave": "By the time we arrived, the movie _______."',
    contextHint: 'Escribe: had left',
    correctAnswer: 'had left',
    acceptableAnswers: ['had left'],
    explanation: 'La película empezó/salió ANTES de llegar: el pasado del pasado requiere Past Perfect (had left).',
    points: 1
  },
  {
    id: 'q2-4',
    tenseId: 'simple-past',
    type: 'structure_order',
    prompt: 'Ordena las fichas para formular una pregunta en Pasado Simple:',
    wordTiles: ['Did', 'she', 'understand', 'the lesson', 'yesterday?'],
    correctAnswer: 'Did she understand the lesson yesterday?',
    explanation: 'Did + Sujeto (she) + Verbo en forma base (understand) + Complemento + ?',
    points: 1
  },
  {
    id: 'q2-5',
    tenseId: 'past-perfect-continuous',
    type: 'multiple_choice',
    prompt: 'They _______ for over two hours before the bus finally arrived at the station.',
    options: ['had been waiting', 'were waiting', 'have waited', 'had waited'],
    correctAnswer: 'had been waiting',
    explanation: '"Had been waiting" expresa una acción continua previa a otro acontecimiento en el pasado (Past Perfect Continuous).',
    points: 1
  },
  {
    id: 'q2-6',
    tenseId: 'simple-past',
    type: 'fill_blank',
    prompt: 'Escribe el pasado irregular del verbo "buy": "Last week, I _______ a new English dictionary."',
    contextHint: 'Escribe: bought',
    correctAnswer: 'bought',
    acceptableAnswers: ['bought'],
    explanation: 'El pasado irregular de "buy" es "bought".',
    points: 1
  },
  {
    id: 'q2-7',
    tenseId: 'simple-past',
    type: 'multiple_choice',
    prompt: 'Which sentence is grammatically correct in the negative form?',
    options: [
      'She did not go to the meeting yesterday.',
      'She did not went to the meeting yesterday.',
      'She didn\'t goes to the meeting yesterday.',
      'She doesn\'t went to the meeting yesterday.'
    ],
    correctAnswer: 'She did not go to the meeting yesterday.',
    explanation: 'Con el auxiliar "did not", el verbo SIEMPRE debe ir en su forma base infinitiva ("go", no "went").',
    points: 1
  },
  {
    id: 'q2-8',
    tenseId: 'past-continuous',
    type: 'multiple_choice',
    prompt: 'At 10:00 PM last night, what _______ you _______?',
    options: ['were / doing', 'was / doing', 'did / do', 'had / done'],
    correctAnswer: 'were / doing',
    explanation: 'Para una acción en progreso a una hora exacta en el pasado con el pronombre "you", se usa "were you doing".',
    points: 1
  },
  {
    id: 'q2-9',
    tenseId: 'past-continuous',
    type: 'fill_blank',
    prompt: 'Completa con Past Continuous: "While Carlos was sleeping, his sister _______ (study)."',
    contextHint: 'Escribe: was studying',
    correctAnswer: 'was studying',
    acceptableAnswers: ['was studying'],
    explanation: 'Dos acciones continuas y simultáneas en el pasado: was sleeping / was studying.',
    points: 1
  },
  {
    id: 'q2-10',
    tenseId: 'past-perfect',
    type: 'structure_order',
    prompt: 'Ordena la oración para expresar anterioridad en el pasado:',
    wordTiles: ['The train', 'had already left', 'when', 'we reached', 'the platform.'],
    correctAnswer: 'The train had already left when we reached the platform.',
    explanation: 'La salida del tren (had already left) ocurrió antes de la llegada al andén (reached).',
    points: 1
  },
  {
    id: 'q2-11',
    tenseId: 'past-perfect',
    type: 'multiple_choice',
    prompt: 'He felt very confident because he _______ all the verb conjugations beforehand.',
    options: ['had memorized', 'memorized', 'was memorizing', 'has memorized'],
    correctAnswer: 'had memorized',
    explanation: 'La memorización previa al examen exige Past Perfect: had memorized.',
    points: 1
  },
  {
    id: 'q2-12',
    tenseId: 'past-perfect-continuous',
    type: 'listening',
    prompt: 'Escucha el dictado del profesor y selecciona lo que escuchas:',
    audioText: 'They had been driving for five hours before finding a hotel.',
    options: [
      'They had been driving for five hours before finding a hotel.',
      'They were driving for five hours before finding a hotel.',
      'They have been driving for five hours before finding a hotel.',
      'They had driven for five hours before finding a hotel.'
    ],
    correctAnswer: 'They had been driving for five hours before finding a hotel.',
    explanation: '"Had been driving" expresa la duración de una actividad en el pasado previo a otro suceso.',
    points: 1
  },
  {
    id: 'q2-13',
    tenseId: 'simple-past',
    type: 'fill_blank',
    prompt: 'Escribe la forma pasada del verbo "teach": "Mr. Luis _______ us grammar last year."',
    contextHint: 'Escribe: taught',
    correctAnswer: 'taught',
    acceptableAnswers: ['taught'],
    explanation: 'El pasado del verbo irregular "teach" es "taught".',
    points: 1
  },
  {
    id: 'q2-14',
    tenseId: 'simple-past',
    type: 'error_correction',
    prompt: 'Identifica la pregunta formulada correctamente:',
    options: [
      'Where did you learn English?',
      'Where did you learned English?',
      'Where do you learned English yesterday?',
      'Where did you was learning English?'
    ],
    correctAnswer: 'Where did you learn English?',
    explanation: 'Did + sujeto (you) + verbo base (learn).',
    points: 1
  },
  {
    id: 'q2-15',
    tenseId: 'past-continuous',
    type: 'multiple_choice',
    prompt: 'It was a cold winter day. The wind _______ and people _______ through the streets.',
    options: [
      'was blowing / were rushing',
      'blew / rushed',
      'had blown / rushed',
      'was blowing / rushed'
    ],
    correctAnswer: 'was blowing / were rushing',
    explanation: 'Las descripciones del ambiente de una escena narrativa se construyen en Pasado Continuo.',
    points: 1
  },
  {
    id: 'q2-16',
    tenseId: 'past-perfect',
    type: 'fill_blank',
    prompt: 'Completa con Past Perfect: "She didn\'t have cash because she _______ (lose) her wallet."',
    contextHint: 'Escribe: had lost',
    correctAnswer: 'had lost',
    acceptableAnswers: ['had lost'],
    explanation: 'Perder la billetera ocurrió antes de no tener dinero en efectivo: had lost.',
    points: 1
  },
  {
    id: 'q2-17',
    tenseId: 'past-perfect-continuous',
    type: 'multiple_choice',
    prompt: 'His eyes were red because he _______ in front of the screen all night.',
    options: [
      'had been sitting',
      'was sitting',
      'has sat',
      'had sat'
    ],
    correctAnswer: 'had been sitting',
    explanation: 'Duración prolongada que causó un resultado visible en el pasado: had been sitting.',
    points: 1
  },
  {
    id: 'q2-18',
    tenseId: 'simple-past',
    type: 'structure_order',
    prompt: 'Ordena la oración negativa en Pasado Simple:',
    wordTiles: ['We', 'did not', 'see', 'any mistakes', 'in your test.'],
    correctAnswer: 'We did not see any mistakes in your test.',
    explanation: 'Sujeto + did not + verbo base (see) + complemento.',
    points: 1
  },
  {
    id: 'q2-19',
    tenseId: 'past-continuous',
    type: 'multiple_choice',
    prompt: 'When you rang the bell, what _______ ?',
    options: [
      'was she doing',
      'did she do',
      'had she done',
      'does she do'
    ],
    correctAnswer: 'was she doing',
    explanation: 'Interroga sobre la acción en curso interrumpida por el timbre: was she doing.',
    points: 1
  },
  {
    id: 'q2-20',
    tenseId: 'past-perfect',
    type: 'multiple_choice',
    prompt: 'I recognized the teacher immediately because I _______ his video tutorials before.',
    options: ['had watched', 'watched', 'was watching', 'have watched'],
    correctAnswer: 'had watched',
    explanation: 'Haber visto los videos ocurrió antes de reconocerlo: had watched.',
    points: 1
  }
];

// =========================================================================
// QUIZ 3: FUTURE TENSES (EXACTLY 20 QUESTIONS - 20 POINTS)
// =========================================================================
const QUIZ_FUTURE_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q3-1',
    tenseId: 'simple-future',
    type: 'multiple_choice',
    prompt: 'Look at those dark clouds! It _______ rain very soon.',
    options: ['is going to', 'will', 'was going to', 'is raining'],
    correctAnswer: 'is going to',
    explanation: 'Cuando hay evidencia física inmediata y visible (nubes oscuras), la regla exige "be going to".',
    points: 1
  },
  {
    id: 'q3-2',
    tenseId: 'future-perfect',
    type: 'fill_blank',
    prompt: 'Escribe en Future Perfect con "finish": "By next December, I _______ all my modules."',
    contextHint: 'Escribe: will have finished',
    correctAnswer: 'will have finished',
    acceptableAnswers: ['will have finished'],
    explanation: '"By next December" marca un límite temporal futuro antes del cual la acción habrá terminado: will have finished.',
    points: 1
  },
  {
    id: 'q3-3',
    tenseId: 'future-continuous',
    type: 'listening',
    prompt: 'Escucha la proyección del locutor y selecciona lo que dice:',
    audioText: 'This time tomorrow, I will be flying over the Atlantic.',
    options: [
      'This time tomorrow, I will be flying over the Atlantic.',
      'This time tomorrow, I will fly over the Atlantic.',
      'This time tomorrow, I am flying over the Atlantic.',
      'This time tomorrow, I had flown over the Atlantic.'
    ],
    correctAnswer: 'This time tomorrow, I will be flying over the Atlantic.',
    explanation: '"This time tomorrow" sitúa una acción que estará en proceso en un momento específico: Future Continuous (will be flying).',
    points: 1
  },
  {
    id: 'q3-4',
    tenseId: 'future-perfect',
    type: 'structure_order',
    prompt: 'Ordena la estructura afirmativa del Future Perfect:',
    wordTiles: ['She', 'will have', 'graduated', 'from university', 'by 2027.'],
    correctAnswer: 'She will have graduated from university by 2027.',
    explanation: 'Sujeto + will have + Participio Pasado (graduated) + Complemento con "by".',
    points: 1
  },
  {
    id: 'q3-5',
    tenseId: 'future-perfect-continuous',
    type: 'multiple_choice',
    prompt: 'By next year, Mr. Luis _______ English for twenty consecutive years.',
    options: [
      'will have been teaching',
      'will be teaching',
      'will teach',
      'is teaching'
    ],
    correctAnswer: 'will have been teaching',
    explanation: 'Future Perfect Continuous (will have been teaching) mide la duración ininterrumpida acumulada hacia una fecha futura.',
    points: 1
  },
  {
    id: 'q3-6',
    tenseId: 'simple-future',
    type: 'fill_blank',
    prompt: 'Escribe la contracción de "will not" (una sola palabra):',
    contextHint: 'Escribe: won\'t',
    correctAnswer: "won't",
    acceptableAnswers: ["won't", "wont"],
    explanation: 'La contracción de "will not" es "won\'t".',
    points: 1
  },
  {
    id: 'q3-7',
    tenseId: 'simple-future',
    type: 'multiple_choice',
    prompt: 'I\'m really tired. I think I _______ to sleep early tonight.',
    options: ['will go', 'go', 'went', 'have gone'],
    correctAnswer: 'will go',
    explanation: 'Decisión espontánea tomada en el momento del habla con "I think": will go.',
    points: 1
  },
  {
    id: 'q3-8',
    tenseId: 'future-continuous',
    type: 'multiple_choice',
    prompt: 'Don\'t phone me at 8:00 PM because we _______ dinner with the family.',
    options: ['will be having', 'will have had', 'have', 'had'],
    correctAnswer: 'will be having',
    explanation: 'A las 8:00 PM la acción estará en pleno progreso: will be having.',
    points: 1
  },
  {
    id: 'q3-9',
    tenseId: 'future-perfect',
    type: 'multiple_choice',
    prompt: 'By the time you wake up tomorrow, the sun _______ .',
    options: ['will have risen', 'will rise', 'will be rising', 'rises'],
    correctAnswer: 'will have risen',
    explanation: 'Acción que habrá concluido antes de otra acción futura: will have risen.',
    points: 1
  },
  {
    id: 'q3-10',
    tenseId: 'future-perfect-continuous',
    type: 'fill_blank',
    prompt: 'Completa la fórmula (3 palabras auxiliares): "Subject + _______ + Verb-ing"',
    contextHint: 'Escribe: will have been',
    correctAnswer: 'will have been',
    acceptableAnswers: ['will have been'],
    explanation: 'La fórmula auxiliar del Futuro Perfecto Continuo es: will have been.',
    points: 1
  },
  {
    id: 'q3-11',
    tenseId: 'simple-future',
    type: 'structure_order',
    prompt: 'Ordena la pregunta en Futuro Simple con WILL:',
    wordTiles: ['Will', 'you', 'help me', 'with this exercise', 'please?'],
    correctAnswer: 'Will you help me with this exercise please?',
    explanation: 'Will + Sujeto (you) + Verbo base (help) + Complemento + please?',
    points: 1
  },
  {
    id: 'q3-12',
    tenseId: 'future-continuous',
    type: 'fill_blank',
    prompt: 'Completa con Future Continuous: "Tomorrow at noon, she _______ (work) at her office."',
    contextHint: 'Escribe: will be working',
    correctAnswer: 'will be working',
    acceptableAnswers: ['will be working'],
    explanation: 'Sujeto + will be + verbo con -ing (working).',
    points: 1
  },
  {
    id: 'q3-13',
    tenseId: 'future-perfect',
    type: 'multiple_choice',
    prompt: 'By 2030, scientists _______ cures for many complex diseases.',
    options: ['will have discovered', 'will discover', 'will be discovering', 'discover'],
    correctAnswer: 'will have discovered',
    explanation: '"By 2030" señala un plazo límite antes del cual se habrá alcanzado la meta: will have discovered.',
    points: 1
  },
  {
    id: 'q3-14',
    tenseId: 'simple-future',
    type: 'error_correction',
    prompt: 'Identifica la oración que contiene un error gramatical con "will":',
    options: [
      'She will comes to the meeting tomorrow.',
      'She will come to the meeting tomorrow.',
      'She won\'t come to the meeting tomorrow.',
      'Will she come to the meeting tomorrow?'
    ],
    correctAnswer: 'She will comes to the meeting tomorrow.',
    explanation: 'Después de "will", el verbo nunca debe llevar "-s". La forma correcta es "will come".',
    points: 1
  },
  {
    id: 'q3-15',
    tenseId: 'future-continuous',
    type: 'structure_order',
    prompt: 'Ordena la frase en Futuro Continuo:',
    wordTiles: ['They', 'will be celebrating', 'their anniversary', 'all weekend.'],
    correctAnswer: 'They will be celebrating their anniversary all weekend.',
    explanation: 'Sujeto + will be celebrating + complemento.',
    points: 1
  },
  {
    id: 'q3-16',
    tenseId: 'future-perfect',
    type: 'fill_blank',
    prompt: 'Escribe en Future Perfect con "read": "By Friday, I _______ (read) the entire grammar book."',
    contextHint: 'Escribe: will have read',
    correctAnswer: 'will have read',
    acceptableAnswers: ['will have read'],
    explanation: 'Will have + participio pasado de read (se escribe igual "read", se pronuncia /red/).',
    points: 1
  },
  {
    id: 'q3-17',
    tenseId: 'future-perfect-continuous',
    type: 'multiple_choice',
    prompt: 'In two months, we _______ here for exactly five years.',
    options: [
      'will have been living',
      'will be living',
      'will live',
      'have lived'
    ],
    correctAnswer: 'will have been living',
    explanation: 'Duración acumulada proyectada hacia un momento futuro: will have been living.',
    points: 1
  },
  {
    id: 'q3-18',
    tenseId: 'simple-future',
    type: 'listening',
    prompt: 'Escucha la promesa del docente y selecciona la frase exacta:',
    audioText: 'I will guide you step by step until you master every tense.',
    options: [
      'I will guide you step by step until you master every tense.',
      'I guide you step by step until you master every tense.',
      'I am guiding you step by step until you master every tense.',
      'I have guided you step by step until you master every tense.'
    ],
    correctAnswer: 'I will guide you step by step until you master every tense.',
    explanation: 'Promesa formal en Futuro Simple: will guide you.',
    points: 1
  },
  {
    id: 'q3-19',
    tenseId: 'future-continuous',
    type: 'multiple_choice',
    prompt: 'Will you _______ your car this evening? If not, could I borrow it?',
    options: ['be using', 'use', 'have used', 'used'],
    correctAnswer: 'be using',
    explanation: 'Pregunta cortés sobre los planes de alguien en el futuro: Will you be using...?',
    points: 1
  },
  {
    id: 'q3-20',
    tenseId: 'future-perfect',
    type: 'multiple_choice',
    prompt: 'Do you think humans _______ on Mars by 2050?',
    options: ['will have landed', 'will land', 'will be landing', 'land'],
    correctAnswer: 'will have landed',
    explanation: 'Meta proyectada y concluida para el 2050: will have landed.',
    points: 1
  }
];

// =========================================================================
// EXAMEN FINAL: GRAND MASTER (EXACTLY 50 QUESTIONS - 50 POINTS)
// Evalúa: Gramática, Listening, Reading, Writing, Aplicación en los 12 tiempos
// =========================================================================
const FINAL_EXAM_QUESTIONS: QuizQuestion[] = [
  // 1-10: Present Tenses Mastery
  {
    id: 'fe-1',
    tenseId: 'simple-present',
    type: 'multiple_choice',
    prompt: '[Grammar] In Present Simple, which sentence correctly conjugates third-person singular?',
    options: [
      'He always finishes his assignments on time.',
      'He always finish his assignments on time.',
      'He always finishs his assignments on time.',
      'He always finishing his assignments on time.'
    ],
    correctAnswer: 'He always finishes his assignments on time.',
    explanation: 'Los verbos que terminan en -sh agregan "-es" en tercera persona: finishes.',
    points: 1
  },
  {
    id: 'fe-2',
    tenseId: 'present-continuous',
    type: 'multiple_choice',
    prompt: '[Grammar] Which verb is a stative verb and is NOT normally used in Present Continuous?',
    options: ['know', 'run', 'eat', 'write'],
    correctAnswer: 'know',
    explanation: '"Know" es un verbo de estado mental; no se dice "I am knowing", sino "I know".',
    points: 1
  },
  {
    id: 'fe-3',
    tenseId: 'present-perfect',
    type: 'fill_blank',
    prompt: '[Writing] Write the correct form in Present Perfect: "She _______ (see) that documentary twice."',
    contextHint: 'Escribe: has seen',
    correctAnswer: 'has seen',
    acceptableAnswers: ['has seen'],
    explanation: 'Tercera persona singular: has + participio irregular de see (seen).',
    points: 1
  },
  {
    id: 'fe-4',
    tenseId: 'present-perfect-continuous',
    type: 'multiple_choice',
    prompt: '[Grammar] "He is tired because he _______ since 5 AM."',
    options: ['has been working', 'works', 'is working', 'worked'],
    correctAnswer: 'has been working',
    explanation: 'Conexión de duración continua con efecto presente: has been working.',
    points: 1
  },
  {
    id: 'fe-5',
    tenseId: 'present-continuous',
    type: 'listening',
    prompt: '[Listening] Escucha la afirmación en desarrollo y selecciona la opción exacta:',
    audioText: 'The researchers are analyzing the survey data right now.',
    options: [
      'The researchers are analyzing the survey data right now.',
      'The researchers analyze the survey data right now.',
      'The researchers analyzed the survey data right now.',
      'The researchers will analyze the survey data right now.'
    ],
    correctAnswer: 'The researchers are analyzing the survey data right now.',
    explanation: 'Present Continuous con "are analyzing".',
    points: 1
  },
  {
    id: 'fe-6',
    tenseId: 'simple-present',
    type: 'writing',
    prompt: '[Writing] Transforma a negativa: "She works on Saturdays."',
    contextHint: 'Escribe: She does not work on Saturdays. (o doesn\'t)',
    correctAnswer: 'She does not work on Saturdays.',
    acceptableAnswers: [
      'She does not work on Saturdays.',
      'She doesn\'t work on Saturdays.',
      'She does not work on Saturdays',
      'She doesn\'t work on Saturdays'
    ],
    explanation: 'Auxiliar does not + verbo base work.',
    points: 1
  },
  {
    id: 'fe-7',
    tenseId: 'present-perfect',
    type: 'structure_order',
    prompt: '[Structure] Ordena la pregunta en Presente Perfecto:',
    wordTiles: ['Have', 'you', 'ever', 'traveled', 'abroad?'],
    correctAnswer: 'Have you ever traveled abroad?',
    explanation: 'Have + Sujeto + ever + Participio + Complemento?',
    points: 1
  },
  {
    id: 'fe-8',
    tenseId: 'present-perfect',
    type: 'multiple_choice',
    prompt: '[Grammar] Choose the correct sentence with "yet":',
    options: [
      'I haven\'t received the email yet.',
      'I have received yet the email.',
      'I yet haven\'t received the email.',
      'Haven\'t I received the email yet?'
    ],
    correctAnswer: 'I haven\'t received the email yet.',
    explanation: '"Yet" se coloca comúnmente al final de oraciones negativas e interrogativas en Present Perfect.',
    points: 1
  },
  {
    id: 'fe-9',
    tenseId: 'present-perfect-continuous',
    type: 'fill_blank',
    prompt: '[Writing] Completa con Present Perfect Continuous: "How long _______ you _______ (wait) here?"',
    contextHint: 'Escribe: have been waiting',
    correctAnswer: 'have been waiting',
    acceptableAnswers: ['have been waiting'],
    explanation: 'How long + have you been waiting?',
    points: 1
  },
  {
    id: 'fe-10',
    tenseId: 'simple-present',
    type: 'multiple_choice',
    prompt: '[Grammar] Which sentence expresses a permanent state?',
    options: [
      'The Pacific Ocean borders Costa Rica to the west.',
      'The Pacific Ocean is bordering Costa Rica.',
      'The Pacific Ocean has bordered Costa Rica.',
      'The Pacific Ocean will border Costa Rica.'
    ],
    correctAnswer: 'The Pacific Ocean borders Costa Rica to the west.',
    explanation: 'Los hechos geográficos permanentes se expresan en Presente Simple.',
    points: 1
  },

  // 11-20: Past Tenses Mastery
  {
    id: 'fe-11',
    tenseId: 'simple-past',
    type: 'multiple_choice',
    prompt: '[Grammar] What is the past form of the irregular verb "write"?',
    options: ['wrote', 'written', 'writed', 'write'],
    correctAnswer: 'wrote',
    explanation: 'El Pasado Simple de write es "wrote" (el participio es written).',
    points: 1
  },
  {
    id: 'fe-12',
    tenseId: 'past-continuous',
    type: 'multiple_choice',
    prompt: '[Grammar] "They _______ tennis when it started to rain heavily."',
    options: ['were playing', 'was playing', 'played', 'had played'],
    correctAnswer: 'were playing',
    explanation: 'Sujeto plural They + were playing para la acción en desarrollo interrumpida por la lluvia.',
    points: 1
  },
  {
    id: 'fe-13',
    tenseId: 'past-perfect',
    type: 'fill_blank',
    prompt: '[Writing] Completa en Past Perfect con "finish": "When the boss called, I _______ (already/finish) the report."',
    contextHint: 'Escribe: had already finished',
    correctAnswer: 'had already finished',
    acceptableAnswers: ['had already finished'],
    explanation: 'La acción anterior al llamado del jefe va en Past Perfect: had already finished.',
    points: 1
  },
  {
    id: 'fe-14',
    tenseId: 'past-perfect-continuous',
    type: 'multiple_choice',
    prompt: '[Grammar] Identify the tense: "She had been studying for six hours before taking a break."',
    options: [
      'Past Perfect Continuous',
      'Present Perfect Continuous',
      'Past Continuous',
      'Future Perfect Continuous'
    ],
    correctAnswer: 'Past Perfect Continuous',
    explanation: 'La combinación had + been + V-ing es exclusiva del Past Perfect Continuous.',
    points: 1
  },
  {
    id: 'fe-15',
    tenseId: 'simple-past',
    type: 'listening',
    prompt: '[Listening] Escucha la oración en pasado y selecciona la transcripción:',
    audioText: 'We flew to New York last summer to attend a conference.',
    options: [
      'We flew to New York last summer to attend a conference.',
      'We fly to New York last summer to attend a conference.',
      'We were flying to New York last summer to attend a conference.',
      'We have flown to New York last summer to attend a conference.'
    ],
    correctAnswer: 'We flew to New York last summer to attend a conference.',
    explanation: 'El pasado de fly es "flew".',
    points: 1
  },
  {
    id: 'fe-16',
    tenseId: 'simple-past',
    type: 'writing',
    prompt: '[Writing] Escribe la pregunta en pasado: "You saw the movie."',
    contextHint: 'Escribe: Did you see the movie?',
    correctAnswer: 'Did you see the movie?',
    acceptableAnswers: ['Did you see the movie?', 'Did you see the movie'],
    explanation: 'Did + sujeto you + verbo base see + ?',
    points: 1
  },
  {
    id: 'fe-17',
    tenseId: 'past-continuous',
    type: 'structure_order',
    prompt: '[Structure] Ordena la oración en Pasado Continuo:',
    wordTiles: ['While', 'he was cooking,', 'his phone', 'started ringing.'],
    correctAnswer: 'While he was cooking, his phone started ringing.',
    explanation: 'While introduce la acción prolongada en Pasado Continuo.',
    points: 1
  },
  {
    id: 'fe-18',
    tenseId: 'past-perfect',
    type: 'multiple_choice',
    prompt: '[Grammar] "By the time we got to the airport, the flight _______ ."',
    options: ['had already departed', 'departed', 'was departing', 'has departed'],
    correctAnswer: 'had already departed',
    explanation: 'El avión despegó antes de llegar al aeropuerto: had already departed.',
    points: 1
  },
  {
    id: 'fe-19',
    tenseId: 'past-perfect-continuous',
    type: 'fill_blank',
    prompt: '[Writing] Completa en Past Perfect Continuous: "They _______ (walk) for miles before finding shelter."',
    contextHint: 'Escribe: had been walking',
    correctAnswer: 'had been walking',
    acceptableAnswers: ['had been walking'],
    explanation: 'Had been + walking.',
    points: 1
  },
  {
    id: 'fe-20',
    tenseId: 'simple-past',
    type: 'error_correction',
    prompt: '[Error Spotting] Which sentence is correct?',
    options: [
      'He didn\'t understand the instructions.',
      'He didn\'t understood the instructions.',
      'He not understood the instructions.',
      'He don\'t understood the instructions.'
    ],
    correctAnswer: 'He didn\'t understand the instructions.',
    explanation: 'Con el auxiliar didn\'t, el verbo debe ir en forma base: understand.',
    points: 1
  },

  // 21-30: Future Tenses Mastery
  {
    id: 'fe-21',
    tenseId: 'simple-future',
    type: 'multiple_choice',
    prompt: '[Grammar] "I don\'t know the answer right now, but I _______ it up for you."',
    options: ['will look', 'am looking', 'looked', 'have looked'],
    correctAnswer: 'will look',
    explanation: 'Decisión espontánea y ofrecimiento: will look.',
    points: 1
  },
  {
    id: 'fe-22',
    tenseId: 'future-continuous',
    type: 'multiple_choice',
    prompt: '[Grammar] "This time next week, we _______ on the beach in Guanacaste."',
    options: ['will be relaxing', 'will relax', 'relax', 'are relaxing'],
    correctAnswer: 'will be relaxing',
    explanation: 'Acción en progreso en un momento específico del futuro: will be relaxing.',
    points: 1
  },
  {
    id: 'fe-23',
    tenseId: 'future-perfect',
    type: 'fill_blank',
    prompt: '[Writing] Completa con Future Perfect: "By 5:00 PM, I _______ (complete) the final examination."',
    contextHint: 'Escribe: will have completed',
    correctAnswer: 'will have completed',
    acceptableAnswers: ['will have completed'],
    explanation: 'Will have + completed.',
    points: 1
  },
  {
    id: 'fe-24',
    tenseId: 'future-perfect-continuous',
    type: 'multiple_choice',
    prompt: '[Grammar] "In June, she _______ at the university for a decade."',
    options: [
      'will have been teaching',
      'will be teaching',
      'will teach',
      'is teaching'
    ],
    correctAnswer: 'will have been teaching',
    explanation: 'Medición de la trayectoria continua hasta una fecha futura: will have been teaching.',
    points: 1
  },
  {
    id: 'fe-25',
    tenseId: 'simple-future',
    type: 'listening',
    prompt: '[Listening] Escucha con atención y selecciona la frase emitida:',
    audioText: 'Artificial intelligence will transform language education worldwide.',
    options: [
      'Artificial intelligence will transform language education worldwide.',
      'Artificial intelligence transformed language education worldwide.',
      'Artificial intelligence transforms language education worldwide.',
      'Artificial intelligence is transforming language education worldwide.'
    ],
    correctAnswer: 'Artificial intelligence will transform language education worldwide.',
    explanation: 'Predicción en Futuro Simple: will transform.',
    points: 1
  },
  {
    id: 'fe-26',
    tenseId: 'future-perfect',
    type: 'structure_order',
    prompt: '[Structure] Ordena la oración en Futuro Perfecto:',
    wordTiles: ['By next year,', 'I will have', 'mastered', 'all English verb tenses.'],
    correctAnswer: 'By next year, I will have mastered all English verb tenses.',
    explanation: 'By next year introduce el plazo límite antes del cual se habrá dominado la materia.',
    points: 1
  },
  {
    id: 'fe-27',
    tenseId: 'simple-future',
    type: 'writing',
    prompt: '[Writing] Escribe la forma negativa con contracción de "will speak":',
    contextHint: 'Escribe: won\'t speak',
    correctAnswer: "won't speak",
    acceptableAnswers: ["won't speak", "wont speak", "will not speak"],
    explanation: 'La contracción negativa de will es won\'t: won\'t speak.',
    points: 1
  },
  {
    id: 'fe-28',
    tenseId: 'future-continuous',
    type: 'multiple_choice',
    prompt: '[Grammar] "Will you _______ your dictionary today, or may I use it?"',
    options: ['be using', 'use', 'have used', 'used'],
    correctAnswer: 'be using',
    explanation: 'Pregunta cortés sobre planes en Futuro Continuo.',
    points: 1
  },
  {
    id: 'fe-29',
    tenseId: 'future-perfect-continuous',
    type: 'fill_blank',
    prompt: '[Writing] Completa la tríada auxiliar antes de "working" en Future Perfect Continuous: "She _______ working."',
    contextHint: 'Escribe: will have been',
    correctAnswer: 'will have been',
    acceptableAnswers: ['will have been'],
    explanation: 'La tríada invariable es: will have been.',
    points: 1
  },
  {
    id: 'fe-30',
    tenseId: 'simple-future',
    type: 'multiple_choice',
    prompt: '[Grammar] When making an instant decision at the moment of speaking, we use:',
    options: ['Will', 'Present Simple', 'Past Simple', 'Past Perfect'],
    correctAnswer: 'Will',
    explanation: 'Las decisiones espontáneas instantáneas se formulan con "Will".',
    points: 1
  },

  // 31-40: Reading Comprehension & Mixed Contexts
  {
    id: 'fe-31',
    tenseId: 'simple-present',
    type: 'reading',
    prompt: '[Reading & Analysis] Read the excerpt:\n\n"Professor Luis has dedicated thirty years to ESL pedagogy. Currently, he is training teachers on progressive AI integration. Before founding his online academy, he had taught in five international schools. Next year, he will have been lecturing for three decades."\n\n¿Qué tiempo verbal se utiliza en la oración: "Currently, he is training teachers on progressive AI integration"?',
    options: [
      'Present Continuous',
      'Present Simple',
      'Present Perfect',
      'Future Continuous'
    ],
    correctAnswer: 'Present Continuous',
    explanation: '"He is training" con el marcador "Currently" es Present Continuous.',
    points: 1
  },
  {
    id: 'fe-32',
    tenseId: 'past-perfect',
    type: 'reading',
    prompt: '[Reading & Analysis] Basado en el mismo texto anterior, ¿cuál fue la acción que el profesor completó ANTES de fundar su academia online?',
    options: [
      'He had taught in five international schools.',
      'He is training teachers.',
      'He will lecture for three decades.',
      'He has dedicated thirty years.'
    ],
    correctAnswer: 'He had taught in five international schools.',
    explanation: 'Past Perfect ("had taught") expresa la acción previa a la fundación de su academia.',
    points: 1
  },
  {
    id: 'fe-33',
    tenseId: 'future-perfect-continuous',
    type: 'reading',
    prompt: '[Reading & Analysis] ¿Qué tiempo verbal se emplea en "Next year, he will have been lecturing for three decades"?',
    options: [
      'Future Perfect Continuous',
      'Future Continuous',
      'Future Perfect',
      'Present Perfect Continuous'
    ],
    correctAnswer: 'Future Perfect Continuous',
    explanation: 'Will have been + lecturing representa Future Perfect Continuous.',
    points: 1
  },
  {
    id: 'fe-34',
    tenseId: 'present-perfect',
    type: 'multiple_choice',
    prompt: '[Grammar] "I _______ my keys! Can you help me look for them?"',
    options: ['have lost', 'lost', 'had lost', 'am losing'],
    correctAnswer: 'have lost',
    explanation: 'Acción pasada con impacto directo e inmediato en el presente: have lost.',
    points: 1
  },
  {
    id: 'fe-35',
    tenseId: 'simple-past',
    type: 'multiple_choice',
    prompt: '[Grammar] "I _______ my keys yesterday, but I found them this morning."',
    options: ['lost', 'have lost', 'had lost', 'was losing'],
    correctAnswer: 'lost',
    explanation: 'Al haber una fecha pasada explícita ("yesterday"), se utiliza Pasado Simple: lost.',
    points: 1
  },
  {
    id: 'fe-36',
    tenseId: 'past-continuous',
    type: 'fill_blank',
    prompt: '[Writing] Completa en Pasado Continuo: "What _______ (you/do) at 9:00 PM last night?"',
    contextHint: 'Escribe: were you doing',
    correctAnswer: 'were you doing',
    acceptableAnswers: ['were you doing'],
    explanation: 'Were + you + doing.',
    points: 1
  },
  {
    id: 'fe-37',
    tenseId: 'future-perfect',
    type: 'multiple_choice',
    prompt: '[Grammar] "By the end of the year, we _______ five different English novels."',
    options: ['will have read', 'will read', 'read', 'are reading'],
    correctAnswer: 'will have read',
    explanation: 'Meta concluida antes de que termine el año: will have read.',
    points: 1
  },
  {
    id: 'fe-38',
    tenseId: 'present-perfect-continuous',
    type: 'multiple_choice',
    prompt: '[Grammar] "How long _______ English?" - "For about two years."',
    options: [
      'have you been studying',
      'do you study',
      'did you study',
      'are you studying'
    ],
    correctAnswer: 'have you been studying',
    explanation: 'Pregunta de duración continua acumulada: have you been studying.',
    points: 1
  },
  {
    id: 'fe-39',
    tenseId: 'past-perfect',
    type: 'structure_order',
    prompt: '[Structure] Ordena la cláusula de anterioridad pasada:',
    wordTiles: ['She realized', 'that', 'she had forgotten', 'her passport at home.'],
    correctAnswer: 'She realized that she had forgotten her passport at home.',
    explanation: 'Olvidar el pasaporte (had forgotten) ocurrió antes de percatarse (realized).',
    points: 1
  },
  {
    id: 'fe-40',
    tenseId: 'simple-present',
    type: 'fill_blank',
    prompt: '[Writing] Completa la 3ª persona del verbo "study": "He _______ every night."',
    contextHint: 'Escribe: studies',
    correctAnswer: 'studies',
    acceptableAnswers: ['studies'],
    explanation: 'Consonante + y cambia a -ies: studies.',
    points: 1
  },

  // 41-50: Advanced Synthesis, Listening & Practical Application
  {
    id: 'fe-41',
    tenseId: 'future-continuous',
    type: 'listening',
    prompt: '[Listening] Escucha la afirmación avanzada y selecciona lo que escuchas:',
    audioText: 'Tomorrow at eight, we will be discussing the final certification results.',
    options: [
      'Tomorrow at eight, we will be discussing the final certification results.',
      'Tomorrow at eight, we will discuss the final certification results.',
      'Tomorrow at eight, we are discussing the final certification results.',
      'Tomorrow at eight, we had discussed the final certification results.'
    ],
    correctAnswer: 'Tomorrow at eight, we will be discussing the final certification results.',
    explanation: 'Future Continuous: will be discussing.',
    points: 1
  },
  {
    id: 'fe-42',
    tenseId: 'past-perfect-continuous',
    type: 'fill_blank',
    prompt: '[Writing] Completa con Past Perfect Continuous: "The road was blocked because it _______ (snow) heavily all night."',
    contextHint: 'Escribe: had been snowing',
    correctAnswer: 'had been snowing',
    acceptableAnswers: ['had been snowing'],
    explanation: 'Causa continua en el pasado: had been snowing.',
    points: 1
  },
  {
    id: 'fe-43',
    tenseId: 'simple-future',
    type: 'multiple_choice',
    prompt: '[Grammar] "I promise I _______ anyone your secret."',
    options: ['won\'t tell', 'don\'t tell', 'didn\'t tell', 'haven\'t told'],
    correctAnswer: 'won\'t tell',
    explanation: 'Las promesas se construyen con will / won\'t.',
    points: 1
  },
  {
    id: 'fe-44',
    tenseId: 'present-perfect',
    type: 'multiple_choice',
    prompt: '[Grammar] Which sentence correctly uses "since"?',
    options: [
      'I have lived here since 2015.',
      'I have lived here since five years.',
      'I lived here since 2015.',
      'I am living here since 2015.'
    ],
    correctAnswer: 'I have lived here since 2015.',
    explanation: '"Since" se usa con fechas exactas en Present Perfect ("since 2015"). Para duraciones se usa "for".',
    points: 1
  },
  {
    id: 'fe-45',
    tenseId: 'past-continuous',
    type: 'multiple_choice',
    prompt: '[Grammar] While Maria was preparing coffee, David _______ the morning newspaper.',
    options: ['was reading', 'read', 'had read', 'has read'],
    correctAnswer: 'was reading',
    explanation: 'Dos acciones simultáneas en progreso en el pasado: was preparing / was reading.',
    points: 1
  },
  {
    id: 'fe-46',
    tenseId: 'future-perfect',
    type: 'fill_blank',
    prompt: '[Writing] Completa en Future Perfect con "retire": "By 2040, my parents _______ (retire)."',
    contextHint: 'Escribe: will have retired',
    correctAnswer: 'will have retired',
    acceptableAnswers: ['will have retired'],
    explanation: 'Will have + retired.',
    points: 1
  },
  {
    id: 'fe-47',
    tenseId: 'simple-past',
    type: 'multiple_choice',
    prompt: '[Grammar] What is the negative form of: "He was happy"?',
    options: [
      'He was not happy.',
      'He did not was happy.',
      'He did not be happy.',
      'He not was happy.'
    ],
    correctAnswer: 'He was not happy.',
    explanation: 'El verbo To Be en pasado forma su negación directamente agregando "not" (was not / wasn\'t), sin auxiliar did.',
    points: 1
  },
  {
    id: 'fe-48',
    tenseId: 'present-perfect-continuous',
    type: 'structure_order',
    prompt: '[Structure] Ordena la estructura del Presente Perfecto Continuo:',
    wordTiles: ['The mechanic', 'has been repairing', 'the engine', 'since morning.'],
    correctAnswer: 'The mechanic has been repairing the engine since morning.',
    explanation: 'Sujeto + has been repairing + complemento.',
    points: 1
  },
  {
    id: 'fe-49',
    tenseId: 'simple-present',
    type: 'multiple_choice',
    prompt: '[Grammar] The sun _______ in the east and _______ in the west.',
    options: [
      'rises / sets',
      'is rising / is setting',
      'rose / set',
      'has risen / has set'
    ],
    correctAnswer: 'rises / sets',
    explanation: 'Leyes astronómicas y verdades universales se expresan en Presente Simple: rises / sets.',
    points: 1
  },
  {
    id: 'fe-50',
    tenseId: 'future-perfect-continuous',
    type: 'writing',
    prompt: '[Writing] Escribe la conjugación en Future Perfect Continuous de "work" para "I": "By midnight, I _______ (work) for twelve hours."',
    contextHint: 'Escribe: will have been working',
    correctAnswer: 'will have been working',
    acceptableAnswers: ['will have been working'],
    explanation: '¡Pináculo de la precisión gramatical C1! Will have been working.',
    points: 1
  }
];

export const EVALUATION_MODULES: EvaluationModule[] = [
  {
    id: 1,
    title: 'Quiz Nivel 1: Tiempos Presentes',
    subtitle: 'Present Simple, Continuous, Perfect & Perfect Continuous',
    category: 'present',
    coveredTenses: ['simple-present', 'present-continuous', 'present-perfect', 'present-perfect-continuous'],
    description: 'Evaluación de 20 preguntas (20 puntos) con sistema de 3 vidas. Demuestra tu dominio en identificación, conjugación y escucha de los 4 tiempos del presente.',
    totalQuestions: 20,
    passingScore: 16, // 80% (16/20)
    maxScore: 20,
    questions: QUIZ_PRESENT_QUESTIONS
  },
  {
    id: 2,
    title: 'Quiz Nivel 2: Tiempos Pasados',
    subtitle: 'Past Simple, Continuous, Perfect & Perfect Continuous',
    category: 'past',
    coveredTenses: ['simple-past', 'past-continuous', 'past-perfect', 'past-perfect-continuous'],
    description: 'Evaluación de 20 preguntas (20 puntos) con sistema de 3 vidas. Evalúa acciones concluidas, eventos en desarrollo en el pasado y la anterioridad temporal.',
    totalQuestions: 20,
    passingScore: 16, // 80% (16/20)
    maxScore: 20,
    questions: QUIZ_PAST_QUESTIONS
  },
  {
    id: 3,
    title: 'Quiz Nivel 3: Tiempos Futuros',
    subtitle: 'Future Simple, Continuous, Perfect & Perfect Continuous',
    category: 'future',
    coveredTenses: ['simple-future', 'future-continuous', 'future-perfect', 'future-perfect-continuous'],
    description: 'Evaluación de 20 preguntas (20 puntos) con sistema de 3 vidas. Proyecciones, intenciones, decisiones y precisión temporal en el porvenir.',
    totalQuestions: 20,
    passingScore: 16, // 80% (16/20)
    maxScore: 20,
    questions: QUIZ_FUTURE_QUESTIONS
  },
  {
    id: 4,
    title: 'Examen Final: Grand Master 12 Tiempos',
    subtitle: 'Evaluación Oficial Holística de Certificación (50 Preguntas - 50 Puntos)',
    category: 'mastery',
    isFinalExam: true,
    coveredTenses: [
      'simple-present', 'present-continuous', 'present-perfect', 'present-perfect-continuous',
      'simple-past', 'past-continuous', 'past-perfect', 'past-perfect-continuous',
      'simple-future', 'future-continuous', 'future-perfect', 'future-perfect-continuous'
    ],
    description: 'La prueba suprema. 50 preguntas exhaustivas que evalúan Gramática, Listening, Reading, Writing y Aplicación Práctica en los 12 tiempos verbales. Determina tu certificación oficial de A1 a C1.',
    totalQuestions: 50,
    passingScore: 43, // 86% = Nivel B2 certificado (86 a 90 pts), C1 (91 a 100 pts)
    maxScore: 50,
    questions: FINAL_EXAM_QUESTIONS
  }
];
