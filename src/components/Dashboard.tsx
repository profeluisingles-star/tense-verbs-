import React, { useState } from 'react';
import { 
  BookOpen, 
  Dumbbell, 
  ShieldCheck, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Lock, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  AlertTriangle,
  Play,
  Share2,
  ChevronRight,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { UserProgress, CEFRLevel } from '../types';
import { EVALUATION_MODULES } from '../data/evaluationData';
import { calculateCEFR } from '../utils/progress';

interface DashboardProps {
  progress: UserProgress;
  onStartStage1: (levelId: number) => void;
  onStartStage2: (levelId: number) => void;
  onStartStage3: (moduleId: number) => void;
  onOpenCertificate: () => void;
  onOpenTeacherReport: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  onStartStage1,
  onStartStage2,
  onStartStage3,
  onOpenCertificate,
  onOpenTeacherReport
}) => {
  const [selectedLevelId, setSelectedLevelId] = useState<number>(1);
  const cefrInfo = calculateCEFR(progress);

  const levelsMeta = [
    {
      id: 1,
      title: 'Tiempos Presentes',
      subtitle: 'Simple, Continuous, Perfect, Perfect Continuous',
      description: 'Aprende la base del idioma: hábitos, acciones en curso y experiencias con have/has.',
      tenses: ['Present Simple', 'Present Continuous', 'Present Perfect', 'Present Perfect Continuous'],
      color: 'sky'
    },
    {
      id: 2,
      title: 'Tiempos Pasados',
      subtitle: 'Simple, Continuous, Perfect, Perfect Continuous',
      description: 'Domina los verbos regulares/irregulares, acciones interrumpidas y la anterioridad con had.',
      tenses: ['Past Simple', 'Past Continuous', 'Past Perfect', 'Past Perfect Continuous'],
      color: 'indigo'
    },
    {
      id: 3,
      title: 'Tiempos Futuros',
      subtitle: 'Will, Going To, Future Continuous, Perfect & Perfect Continuous',
      description: 'Proyecta planes, predicciones espontáneas y metas cumplidas en el futuro con precisión.',
      tenses: ['Future Simple', 'Future Continuous', 'Future Perfect', 'Future Perfect Continuous'],
      color: 'purple'
    }
  ];

  const currentLevelMeta = levelsMeta.find(l => l.id === selectedLevelId) || levelsMeta[0];
  const isLevelQuizPassed = progress.completedQuizzes.includes(selectedLevelId);
  const allQuizzesPassed = progress.completedQuizzes.includes(1) && progress.completedQuizzes.includes(2) && progress.completedQuizzes.includes(3);

  const finalExamModule = EVALUATION_MODULES.find(m => m.isFinalExam);
  const isFinalExamPassed = !!progress.finalExamScore;

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      
      {/* Hero Welcome & Method Header */}
      <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-10 text-slate-100 mb-8 sm:mb-10 shadow-2xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-sky-500 via-indigo-500 to-emerald-500 shadow-[0_0_15px_rgba(14,165,233,0.5)]" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-sky-500/15 text-sky-400 border border-sky-500/30 font-bold text-[10px] uppercase px-3 py-1 rounded-full tracking-widest">
                Método Progresivo en 3 Etapas
              </span>
              <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-slate-700">
                Profesor Luis López Picado
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Bienvenido, {progress.fullName} 👋
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Primero <strong className="text-sky-300">aprende y comprende</strong> los temas, luego <strong className="text-amber-300">practica con el tutor IA</strong> hasta dominarlos y finalmente <strong className="text-emerald-300">sé evaluado sin ayudas</strong> para certificar tu nivel de inglés de <strong>A1 a C1</strong>.
            </p>
          </div>

          {/* Quick Stats Card */}
          <div className="w-full lg:w-80 bg-[#020617]/80 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-inner">
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-slate-400">Diagnóstico Holístico CEFR</span>
              <span className="text-emerald-400 font-mono font-extrabold bg-emerald-500/15 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                Nivel {cefrInfo.level}
              </span>
            </div>

            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700/60 my-2">
              <div
                className="bg-gradient-to-r from-sky-500 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${cefrInfo.percentage}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs mt-3 pt-3 border-t border-slate-800/80">
              <span className="text-slate-400">Quizzes Aprobados:</span>
              <span className="font-bold text-white font-mono">{progress.completedQuizzes.length} de 3</span>
            </div>

            <div className="flex justify-between items-center text-xs mt-1">
              <span className="text-slate-400">Examen Final (50 pts):</span>
              <span className="font-bold font-mono">
                {progress.finalExamScore ? (
                  <span className="text-emerald-400">{progress.finalExamScore.percentage} pts (Aprobado)</span>
                ) : allQuizzesPassed ? (
                  <span className="text-amber-400 animate-pulse">¡Listo para rendir!</span>
                ) : (
                  <span className="text-slate-500">Bloqueado</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* LEVEL SELECTOR TABS */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-black text-white">
            Selecciona el Nivel de Estudio
          </h3>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Avanza paso a paso por cada tiempo verbal
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {levelsMeta.map((lvl) => {
            const isSelected = lvl.id === selectedLevelId;
            const isPassed = progress.completedQuizzes.includes(lvl.id);
            const isUnlocked = lvl.id === 1 || progress.completedQuizzes.includes(lvl.id - 1);

            return (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevelId(lvl.id)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900 border-sky-500 shadow-lg shadow-sky-950/40 ring-1 ring-sky-500/50'
                    : 'bg-[#0f172a] border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Nivel {lvl.id}
                  </span>
                  {isPassed ? (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Aprobado</span>
                    </span>
                  ) : isUnlocked ? (
                    <span className="text-[10px] font-bold text-sky-400 bg-sky-500/15 px-2 py-0.5 rounded-full border border-sky-500/30">
                      En Curso
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>Bloqueado</span>
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-white text-sm sm:text-base">
                  {lvl.title}
                </h4>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {lvl.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-STAGE LEARNING PIPELINE CARD FOR SELECTED LEVEL */}
      <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl mb-10 relative">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
              Ruta Formativa Oficial
            </span>
            <span className="text-xs text-slate-400">
              Nivel {currentLevelMeta.id}: {currentLevelMeta.title}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Las 3 Etapas Obligatorias de Aprendizaje
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            {currentLevelMeta.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* ETAPA 1: APRENDIZAJE GUIADO */}
          <div className="bg-[#020617] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-400">
                Etapa 1
              </span>
              <h4 className="text-base font-extrabold text-white mt-0.5 mb-1.5">
                Aprendizaje Guiado
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                El tutor virtual te explica la teoría completa: fórmulas (+, -, ?), auxiliares, pronunciación nativa y errores comunes.
              </p>
              <ul className="text-[11px] text-slate-400 space-y-1 mb-5">
                <li className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>Explicaciones paso a paso</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>Ejemplos contextuales reales</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>Audio nativo integrado</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onStartStage1(selectedLevelId)}
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-sky-950/50"
            >
              <BookOpen className="w-4 h-4" />
              <span>Estudiar Teoría y Fórmulas</span>
            </button>
          </div>

          {/* ETAPA 2: PRÁCTICA INTELIGENTE */}
          <div className="bg-[#020617] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold mb-3">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                Etapa 2
              </span>
              <h4 className="text-base font-extrabold text-white mt-0.5 mb-1.5">
                Práctica Inteligente (10 Modos)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Ejercicios dinámicos con retroalimentación inmediata del tutor. Sin límite de intentos para que domines cada estructura.
              </p>
              <ul className="text-[11px] text-slate-400 space-y-1 mb-5">
                <li className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Completar, ordenar y escribir</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Corrección auditiva y lectura</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Explicación del error en vivo</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onStartStage2(selectedLevelId)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50"
            >
              <Dumbbell className="w-4 h-4" />
              <span>Entrenar Práctica Interactiva</span>
            </button>
          </div>

          {/* ETAPA 3: EVALUACIÓN OFICIAL (QUIZ) */}
          <div className="bg-[#020617] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition relative">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                  Etapa 3
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  20 Preguntas &bull; 3 Vidas
                </span>
              </div>
              <h4 className="text-base font-extrabold text-white mt-0.5 mb-1.5">
                Quiz Oficial de Nivel
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Evaluación estricta y segura sin ayudas ni guías. Mínimo 16/20 puntos (80%) para aprobar y avanzar de nivel.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1 mb-5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Estado:</span>
                  <strong className={isLevelQuizPassed ? 'text-emerald-400' : 'text-amber-400'}>
                    {isLevelQuizPassed ? 'Aprobado' : 'Pendiente'}
                  </strong>
                </div>
                {progress.quizScores[selectedLevelId] && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mejor nota:</span>
                    <strong className="text-white font-mono">
                      {progress.quizScores[selectedLevelId].score} / 20 pts
                    </strong>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => onStartStage3(selectedLevelId)}
              className={`w-full py-3 rounded-xl font-black text-xs transition flex items-center justify-center gap-2 shadow-lg ${
                isLevelQuizPassed
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950/50'
              }`}
            >
              {isLevelQuizPassed ? (
                <>
                  <RotateCcw className="w-4 h-4 text-emerald-400" />
                  <span>Reintentar Quiz para Mejorar Nota</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Rendir Quiz Oficial (20 Preguntas)</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* FINAL EXAM (GRAND MASTER 50 PREGUNTAS) SECTION */}
      <div className={`rounded-3xl p-6 sm:p-8 border transition-all shadow-2xl relative overflow-hidden mb-10 ${
        isFinalExamPassed
          ? 'bg-gradient-to-br from-[#0f172a] to-emerald-950/30 border-emerald-500/50'
          : allQuizzesPassed
          ? 'bg-gradient-to-br from-[#0f172a] to-amber-950/30 border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.15)]'
          : 'bg-[#0a0f1d] border-slate-800 opacity-75'
      }`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                isFinalExamPassed
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : allQuizzesPassed
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                  : 'bg-slate-800 text-slate-500 border-slate-700'
              }`}>
                {isFinalExamPassed ? '¡Examen Final Aprobado!' : allQuizzesPassed ? '¡Desbloqueado para Evaluación!' : 'Bloqueado por Requisitos'}
              </span>
              <span className="text-xs text-slate-400 font-mono font-bold">
                50 Preguntas Holísticas &bull; 3 Vidas
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-amber-400" />
              <span>Examen Final: Grand Master de los 12 Tiempos</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Prueba integral de acreditación lingüística sin ayudas externas. Abarca gramática, listening nativo, lectura crítica y formulación de oraciones.
            </p>

            <div className="flex flex-wrap gap-4 pt-1 text-xs">
              <span className="bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-xl text-slate-300">
                Certificación B2: <strong className="text-amber-400">86 a 90 puntos</strong>
              </span>
              <span className="bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-xl text-slate-300">
                Certificación C1: <strong className="text-emerald-400">91 a 100 puntos</strong>
              </span>
            </div>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            {allQuizzesPassed ? (
              <button
                onClick={() => onStartStage3(4)}
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-5 h-5" />
                <span>{isFinalExamPassed ? 'Volver a Rendir Examen Final' : 'Comenzar Examen Final (50 Preguntas)'}</span>
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Supera los quizzes del Nivel 1, 2 y 3 para desbloquear</span>
              </div>
            )}

            {(isFinalExamPassed || progress.completedModules.length === 4) && (
              <button
                onClick={onOpenCertificate}
                className="px-5 py-4 rounded-2xl bg-white hover:bg-slate-200 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Award className="w-5 h-5 text-amber-600" />
                <span>Ver Mi Certificado Oficial</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TEACHER SUPERVISION & DIRECT CONTACT FOOTNOTE */}
      <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-white">Supervisión y Acreditación del Profesor</p>
            <p className="text-slate-400">
              Profesor Luis López Picado &bull; WhatsApp: +506 8649-0444 &bull; profeluisingles@gmail.com
            </p>
          </div>
        </div>

        <button
          onClick={onOpenTeacherReport}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition flex items-center gap-1.5"
        >
          <span>Abrir Panel y Enviar Reporte</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
