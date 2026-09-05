import { UserProgress, CEFRLevel, StudentMistake } from '../types';
import { BADGES_LIST } from '../data/tensesData';

const STORAGE_KEY = 'esl_verb_tenses_master_v2';

export const createDefaultUser = (name: string): UserProgress => {
  return {
    fullName: name,
    avatarSeed: Math.random().toString(36).substring(7),
    xp: 0,
    level: 1,
    streakDays: 1,
    practiceStats: {},
    levelMasteryPercent: { 1: 0, 2: 0, 3: 0 },
    completedQuizzes: [],
    completedModules: [],
    quizScores: {},
    securityViolationsCount: 0,
    mistakesHistory: [],
    unlockedBadges: [],
    totalQuestionsAnswered: 0,
    correctAnswersCount: 0,
  };
};

export const getInitialProgress = (): UserProgress => {
  if (typeof window === 'undefined') {
    return createDefaultUser('Estudiante');
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migration check & defensive guards
      if (!parsed.practiceStats) parsed.practiceStats = {};
      if (!parsed.levelMasteryPercent) parsed.levelMasteryPercent = { 1: 0, 2: 0, 3: 0 };
      if (!Array.isArray(parsed.completedQuizzes)) parsed.completedQuizzes = [];
      if (!Array.isArray(parsed.completedModules)) parsed.completedModules = [...parsed.completedQuizzes];
      if (!Array.isArray(parsed.unlockedBadges)) parsed.unlockedBadges = [];
      if (!Array.isArray(parsed.mistakesHistory)) parsed.mistakesHistory = [];
      if (!parsed.quizScores) parsed.quizScores = {};
      if (typeof parsed.securityViolationsCount !== 'number') parsed.securityViolationsCount = 0;
      if (typeof parsed.totalQuestionsAnswered !== 'number') parsed.totalQuestionsAnswered = 0;
      if (typeof parsed.correctAnswersCount !== 'number') parsed.correctAnswersCount = 0;
      if (typeof parsed.xp !== 'number') parsed.xp = 0;
      if (typeof parsed.level !== 'number') parsed.level = 1;
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
  }

  return createDefaultUser('Estudiante');
};

export const saveProgress = (progress: UserProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
};

/**
 * Calculates CEFR classification based on student evaluation scores and user specifications:
 * B2: 86 a 90 puntos
 * C1: 91 a 100 puntos
 */
export const calculateCEFR = (progress: UserProgress): { 
  level: CEFRLevel; 
  title: string; 
  percentage: number;
  isCertified: boolean;
} => {
  // If final exam has been completed, its percentage defines the certified CEFR level
  if (progress.finalExamScore) {
    const scorePct = progress.finalExamScore.percentage;
    if (scorePct >= 91) {
      return { level: 'C1', title: 'Dominio Avanzado / Eficaz (C1)', percentage: scorePct, isCertified: true };
    }
    if (scorePct >= 86) {
      return { level: 'B2', title: 'Dominio Intermedio Alto (B2)', percentage: scorePct, isCertified: true };
    }
    if (scorePct >= 70) {
      return { level: 'B1', title: 'Intermedio Umbral (B1)', percentage: scorePct, isCertified: false };
    }
    if (scorePct >= 50) {
      return { level: 'A2', title: 'Plataforma Elemental (A2)', percentage: scorePct, isCertified: false };
    }
    return { level: 'A1', title: 'Acceso / Principiante (A1)', percentage: scorePct, isCertified: false };
  }

  // If final exam not taken yet, evaluate through passed quizzes
  const completed = progress.completedQuizzes.filter(id => id <= 3).length;
  if (completed === 3) {
    return { level: 'B2', title: 'Intermedio Alto en Formación (B2)', percentage: 80, isCertified: false };
  }
  if (completed === 2) {
    return { level: 'B1', title: 'Intermedio Umbral (B1)', percentage: 60, isCertified: false };
  }
  if (completed === 1) {
    return { level: 'A2', title: 'Plataforma Elemental (A2)', percentage: 40, isCertified: false };
  }
  return { level: 'A1', title: 'Acceso Inicial (A1)', percentage: 20, isCertified: false };
};

export const generateCertificateCode = (studentName: string): string => {
  const cleanName = studentName.trim().toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) || 'STD';
  const year = new Date().getFullYear();
  const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ESL-LUIS-${year}-${cleanName}-${randomHex}`;
};

export const checkAndUnlockBadges = (
  prevProgress: UserProgress,
  lastQuizPassed: boolean,
  perfectHeartRun: boolean,
  moduleId: number
): { updatedProgress: UserProgress; newlyUnlocked: string[] } => {
  const unlocked = new Set(prevProgress.unlockedBadges);
  const newlyUnlocked: string[] = [];

  if (prevProgress.totalQuestionsAnswered > 0 && !unlocked.has('first_step')) {
    unlocked.add('first_step');
    newlyUnlocked.push('first_step');
  }

  if (perfectHeartRun && lastQuizPassed && !unlocked.has('heart_keeper')) {
    unlocked.add('heart_keeper');
    newlyUnlocked.push('heart_keeper');
  }

  if (lastQuizPassed) {
    if (moduleId === 1 && !unlocked.has('present_master')) {
      unlocked.add('present_master');
      newlyUnlocked.push('present_master');
    } else if (moduleId === 2 && !unlocked.has('past_conqueror')) {
      unlocked.add('past_conqueror');
      newlyUnlocked.push('past_conqueror');
    } else if (moduleId === 3 && !unlocked.has('future_visionary')) {
      unlocked.add('future_visionary');
      newlyUnlocked.push('future_visionary');
    } else if (moduleId === 4 && !unlocked.has('grand_master_c1')) {
      unlocked.add('grand_master_c1');
      newlyUnlocked.push('grand_master_c1');
    }
  }

  const newLevel = Math.max(1, Math.floor(prevProgress.xp / 50) + 1);

  const updatedProgress: UserProgress = {
    ...prevProgress,
    level: newLevel,
    unlockedBadges: Array.from(unlocked),
  };

  return { updatedProgress, newlyUnlocked };
};

// Generates direct WhatsApp share link to Profe Luis (86490444)
export const getWhatsAppShareUrl = (progress: UserProgress): string => {
  const cefr = calculateCEFR(progress);
  const text = 
`*REPORTE Y CERTIFICACIÓN OFICIAL DE INGLÉS* 🎓
*Plataforma de los 12 Tiempos Verbales*
*Profesor a cargo:* Luis López Picado

👤 *Estudiante:* ${progress.fullName}
🏆 *Nivel CEFR Certificado:* ${cefr.level} (${cefr.title})
📊 *Puntaje Examen Final:* ${progress.finalExamScore ? `${progress.finalExamScore.score}/${progress.finalExamScore.maxScore} (${progress.finalExamScore.percentage}%)` : 'No realizado'}
🌟 *Puntos Totales (XP):* ${progress.xp} XP
🔒 *Código de Certificado:* ${progress.certificateCode || 'ESL-PENDIENTE'}
🛡️ *Integridad en Evaluaciones:* ${progress.securityViolationsCount === 0 ? '100% Limpia (Sin incidentes)' : `${progress.securityViolationsCount} advertencias`}
📅 *Fecha:* ${new Date().toLocaleDateString('es-CR')}

Profesor Luis, le comparto mi certificación oficial para registro de notas. ¡Muchas gracias!`;

  return `https://wa.me/50686490444?text=${encodeURIComponent(text)}`;
};

// Generates direct Email mailto link to Profe Luis (profeluisingles@gmail.com)
export const getEmailShareUrl = (progress: UserProgress): string => {
  const cefr = calculateCEFR(progress);
  const subject = `Certificación Oficial de Inglés - ${progress.fullName} [Nivel ${cefr.level}]`;
  const body = 
`Estimado Profesor Luis López Picado,

Por medio del presente correo le remito mi reporte y acreditación oficial obtenida en la Plataforma Educativa de Inteligencia Artificial para el Dominio de los 12 Tiempos Verbales:

DATOS DEL ESTUDIANTE:
- Nombre Completo: ${progress.fullName}
- Nivel CEFR Acreditado: ${cefr.level} (${cefr.title})
- Puntaje Examen Final: ${progress.finalExamScore ? `${progress.finalExamScore.score}/${progress.finalExamScore.maxScore} (${progress.finalExamScore.percentage} puntos)` : 'En proceso'}
- Puntos de Experiencia (XP): ${progress.xp} XP
- Código Oficial de Registro: ${progress.certificateCode || 'ESL-PENDIENTE'}
- Fecha de Graduación: ${progress.certificateIssuedDate || new Date().toLocaleDateString('es-CR')}
- Registro de Integridad: ${progress.securityViolationsCount === 0 ? 'Excelente (0 advertencias de seguridad)' : `${progress.securityViolationsCount} advertencias de cambio de ventana`}

DETALLE DE EVALUACIONES SUPERADAS:
- Quiz Nivel 1 (Present Tenses): ${progress.quizScores[1] ? `${progress.quizScores[1].score}/20 pts - APROBADO` : 'Pendiente'}
- Quiz Nivel 2 (Past Tenses): ${progress.quizScores[2] ? `${progress.quizScores[2].score}/20 pts - APROBADO` : 'Pendiente'}
- Quiz Nivel 3 (Future Tenses): ${progress.quizScores[3] ? `${progress.quizScores[3].score}/20 pts - APROBADO` : 'Pendiente'}
- Examen Final (Grand Master 12 Tiempos): ${progress.finalExamScore ? `${progress.finalExamScore.score}/50 pts (${progress.finalExamScore.percentage}%) - CERTIFICADO` : 'Pendiente'}

Agradezco su retroalimentación y tutoría.

Atentamente,
${progress.fullName}`;

  return `mailto:profeluisingles@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

// Export to CSV
export const exportStudentReportCSV = (progress: UserProgress) => {
  const cefr = calculateCEFR(progress);
  const rows = [
    ['REPORTE OFICIAL DE DOMINIO DE TIEMPOS VERBALES - PROFE LUIS'],
    ['Profesor a Cargo', 'Luis López Picado (profeluisingles@gmail.com - WhatsApp: 86490444)'],
    ['Estudiante', progress.fullName],
    ['Fecha de Reporte', new Date().toLocaleDateString('es-CR') + ' ' + new Date().toLocaleTimeString('es-CR')],
    ['Nivel CEFR Certificado', `${cefr.level} - ${cefr.title}`],
    ['Puntos de Experiencia (XP)', `${progress.xp} XP`],
    ['Código de Certificado', progress.certificateCode || 'En proceso'],
    ['Total de Preguntas Respondidas', `${progress.totalQuestionsAnswered}`],
    ['Respuestas Correctas', `${progress.correctAnswersCount}`],
    ['Incidentes de Seguridad / Cambio de Ventana', `${progress.securityViolationsCount}`],
    [''],
    ['DETALLE POR EVALUACIÓN'],
    ['Evaluación', 'Total Preguntas', 'Puntaje Obtenido', 'Estado'],
    ['Quiz Nivel 1 (Present Tenses)', '20 preguntas', `${progress.quizScores[1]?.score || 0}/20 pts`, progress.completedQuizzes.includes(1) ? 'APROBADO' : 'PENDIENTE'],
    ['Quiz Nivel 2 (Past Tenses)', '20 preguntas', `${progress.quizScores[2]?.score || 0}/20 pts`, progress.completedQuizzes.includes(2) ? 'APROBADO' : 'PENDIENTE'],
    ['Quiz Nivel 3 (Future Tenses)', '20 preguntas', `${progress.quizScores[3]?.score || 0}/20 pts`, progress.completedQuizzes.includes(3) ? 'APROBADO' : 'PENDIENTE'],
    ['Examen Final (12 Tiempos)', '50 preguntas', `${progress.finalExamScore?.score || 0}/50 pts (${progress.finalExamScore?.percentage || 0}%)`, progress.finalExamScore?.percentage && progress.finalExamScore.percentage >= 86 ? 'CERTIFICADO' : 'PENDIENTE']
  ];

  const csvContent = '\uFEFF' + rows.map(e => e.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Reporte_Tiempos_Verbales_${progress.fullName.replace(/\s+/g, '_')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
