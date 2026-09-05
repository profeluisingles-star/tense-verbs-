import React from 'react';
import { 
  Trophy, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Clock, 
  History, 
  Compass, 
  Headphones, 
  PenTool, 
  Award,
  Lock,
  CheckCircle2,
  TrendingUp,
  Target
} from 'lucide-react';
import { UserProgress, Badge, CEFRLevel } from '../types';
import { BADGES_LIST } from '../data/tensesData';
import { calculateCEFR } from '../utils/progress';

interface BadgesViewProps {
  progress: UserProgress;
  onOpenCertificate: () => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Sparkles,
  ShieldCheck,
  Clock,
  History,
  Compass,
  Headphones,
  PenTool,
  Award
};

export const BadgesView: React.FC<BadgesViewProps> = ({ progress, onOpenCertificate }) => {
  const cefrInfo = calculateCEFR(progress);
  const xpCurrentLevel = progress.xp % 50;
  const xpNextLevel = 50;
  const levelProgress = Math.round((xpCurrentLevel / xpNextLevel) * 100);

  const accuracy = progress.totalQuestionsAnswered > 0
    ? Math.round((progress.correctAnswersCount / progress.totalQuestionsAnswered) * 100)
    : 0;

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      
      {/* Top Banner: Level and Motivation */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-amber-500 to-amber-400 rounded-3xl flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 text-2xl sm:text-3xl">
              <Trophy className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-500/30">
                  Nivel de Jugador {progress.level}
                </span>
                <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  CEFR {cefrInfo.level}
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold mt-1 text-white">
                {progress.fullName}
              </h2>
              <p className="text-xs sm:text-sm text-indigo-200 mt-0.5">
                {cefrInfo.title}
              </p>
            </div>
          </div>

          {/* Level Progress Bar & Streak */}
          <div className="w-full md:w-72 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className="text-slate-300">Progreso a Nivel {progress.level + 1}</span>
              <span className="text-amber-400">{progress.xp} XP Totales</span>
            </div>
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{xpCurrentLevel} / {xpNextLevel} XP para subir</span>
              <span className="text-orange-400 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" /> Racha: {progress.streakDays} días
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        
        <div className="bg-[#0f172a] p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
            <Target className="w-4 h-4 text-sky-400" />
            <span>Precisión</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{accuracy}%</p>
          <span className="text-[11px] text-slate-500">En todas las evaluaciones</span>
        </div>

        <div className="bg-[#0f172a] p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Aciertos</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{progress.correctAnswersCount}</p>
          <span className="text-[11px] text-slate-500">de {progress.totalQuestionsAnswered} preguntas</span>
        </div>

        <div className="bg-[#0f172a] p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Niveles Aprobados</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{(progress.completedQuizzes?.length || 0)} / 3</p>
          <span className="text-[11px] text-slate-500">Present, Past, Future</span>
        </div>

        <div className="bg-[#0f172a] p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
            <Award className="w-4 h-4 text-purple-400" />
            <span>Medallas</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{progress.unlockedBadges.length} / {BADGES_LIST.length}</p>
          <span className="text-[11px] text-slate-500">Insignias obtenidas</span>
        </div>

      </div>

      {/* Badges Collection */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Colección de Insignias y Logros</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BADGES_LIST.map((badge) => {
            const isUnlocked = progress.unlockedBadges.includes(badge.id);
            const IconComponent = ICON_MAP[badge.icon] || Trophy;

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-[#0f172a] border-amber-500/40 shadow-xl ring-1 ring-amber-500/20 shadow-amber-500/5'
                    : 'bg-[#0f172a]/50 border-slate-800/80 opacity-50'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                    isUnlocked
                      ? 'bg-amber-500/15 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}>
                    {isUnlocked ? (
                      <IconComponent className="w-6 h-6" />
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </div>

                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                    isUnlocked
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}>
                    {isUnlocked ? 'Desbloqueada' : 'Bloqueada'}
                  </span>
                </div>

                <h4 className="font-extrabold text-sm text-white mb-1">
                  {badge.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Graduation Banner CTA if completed */}
      {(progress.finalExamScore || (progress.completedQuizzes && progress.completedQuizzes.length >= 3)) && (
        <div className="mt-8 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 p-6 sm:p-8 rounded-3xl text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider bg-slate-950 text-amber-300 px-3 py-1 rounded-full">
              ¡Graduación Completada!
            </span>
            <h4 className="text-xl sm:text-2xl font-black mt-2">
              ¡Has dominado los 12 Tiempos Verbales!
            </h4>
            <p className="text-xs sm:text-sm font-medium mt-0.5 text-slate-900/90">
              Tu certificación oficial con nivel {cefrInfo.level} ({cefrInfo.title}) está lista para descarga.
            </p>
          </div>

          <button
            onClick={onOpenCertificate}
            className="bg-slate-950 hover:bg-slate-900 text-white font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-transform active:scale-95 shadow-lg flex items-center gap-2 shrink-0"
          >
            <Award className="w-5 h-5 text-amber-400" />
            <span>Descargar Mi Título Oficial</span>
          </button>
        </div>
      )}

    </div>
  );
};
