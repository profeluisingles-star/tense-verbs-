import React from 'react';
import { 
  BookOpenCheck, 
  Heart, 
  Trophy, 
  Award, 
  Shield, 
  BookMarked, 
  MapPin, 
  LogOut,
  Sparkles,
  BookOpen,
  Dumbbell,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { UserProgress, CEFRLevel } from '../types';

interface NavbarProps {
  currentView: 'dashboard' | 'stage1' | 'stage2' | 'stage3' | 'guide' | 'badges' | 'teacher';
  onNavigate: (view: 'dashboard' | 'stage1' | 'stage2' | 'stage3' | 'guide' | 'badges' | 'teacher') => void;
  progress: UserProgress;
  cefrLevel: CEFRLevel;
  activeLives: number | null;
  onOpenCertificate: () => void;
  onChangeStudent: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  progress,
  cefrLevel,
  activeLives,
  onOpenCertificate,
  onChangeStudent
}) => {
  const isCertified = !!progress.finalExamScore || progress.completedModules.length === 4;

  return (
    <header className="bg-[#020617]/95 border-b border-slate-800 text-slate-100 sticky top-0 z-40 shadow-2xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            id="nav-logo"
            onClick={() => onNavigate('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group transition-all"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-tr from-sky-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform border border-sky-400/30">
              <BookOpenCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-xl tracking-tight leading-none text-sky-400">
                  TENSE<span className="text-white">MASTER</span>
                </h1>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  IA TUTOR
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-medium mt-0.5">
                Profesor Luis López Picado
              </p>
            </div>
          </div>

          {/* Navigation links - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all ${
                currentView === 'dashboard'
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </button>

            <button
              onClick={() => onNavigate('stage1')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all ${
                currentView === 'stage1'
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>1. Aprende</span>
            </button>

            <button
              onClick={() => onNavigate('stage2')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all ${
                currentView === 'stage2'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5 text-amber-400" />
              <span>2. Practica</span>
            </button>

            <button
              onClick={() => onNavigate('stage3')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all ${
                currentView === 'stage3'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>3. Evalúa</span>
            </button>

            <button
              onClick={() => onNavigate('badges')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all ${
                currentView === 'badges'
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span>Logros</span>
            </button>

            <button
              onClick={() => onNavigate('teacher')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all ${
                currentView === 'teacher'
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>Docente</span>
            </button>
          </nav>

          {/* Gamification Stats & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Vidas status */}
            <div 
              id="user-lives-indicator"
              className="flex items-center gap-1.5 bg-[#0f172a] border border-slate-800 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs"
              title="Vidas disponibles para la evaluación oficial"
            >
              <Heart 
                className={`w-4 h-4 text-rose-500 fill-rose-500 ${
                  activeLives !== null && activeLives <= 1 ? 'animate-pulse' : ''
                }`} 
              />
              <span className="font-mono font-bold text-slate-200">
                {activeLives !== null ? activeLives : 3}
                <span className="text-slate-500 text-[10px]">/3</span>
              </span>
              <span className="hidden sm:inline text-[9px] uppercase tracking-wider text-slate-500 ml-0.5">Vidas</span>
            </div>

            {/* XP and CEFR Pill */}
            <div 
              id="user-xp-indicator"
              className="flex items-center gap-1.5 bg-[#0f172a] border border-slate-800 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs"
              title="Puntos de experiencia ganados"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span className="font-mono font-bold text-yellow-300">{progress.xp}</span>
              <span className="text-slate-600">|</span>
              <span 
                className="font-extrabold px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                title={`Nivel de dominio CEFR: ${cefrLevel}`}
              >
                {cefrLevel}
              </span>
            </div>

            {/* Certificate Button if achieved */}
            {isCertified && (
              <button
                id="btn-nav-certificate"
                onClick={onOpenCertificate}
                className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black px-3 py-1.5 rounded-xl text-xs transition shadow-lg animate-pulse"
                title="Ver y descargar tu Certificado Oficial de Dominio"
              >
                <Award className="w-4 h-4" />
                <span>Certificado</span>
              </button>
            )}

            {/* Change student / Logout */}
            <button
              id="btn-nav-student-profile"
              onClick={onChangeStudent}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-800 hover:border-slate-700 transition group"
              title={`Estudiante actual: ${progress.fullName}. Haz clic para cambiar de estudiante.`}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                {progress.fullName ? progress.fullName.slice(0, 2).toUpperCase() : 'ES'}
              </div>
              <span className="hidden sm:inline font-medium max-w-[90px] truncate text-slate-200">
                {progress.fullName}
              </span>
              <LogOut className="w-3.5 h-3.5 text-slate-500 group-hover:text-rose-400 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden justify-around items-center py-2.5 border-t border-slate-800 text-xs bg-[#020617]/95 overflow-x-auto gap-1">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex items-center gap-1 py-1 px-2 rounded-lg font-medium whitespace-nowrap ${
              currentView === 'dashboard' ? 'text-sky-400 font-bold bg-sky-500/10' : 'text-slate-400'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Inicio</span>
          </button>

          <button
            onClick={() => onNavigate('stage1')}
            className={`flex items-center gap-1 py-1 px-2 rounded-lg font-medium whitespace-nowrap ${
              currentView === 'stage1' ? 'text-sky-400 font-bold bg-sky-500/10' : 'text-slate-400'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Aprende</span>
          </button>

          <button
            onClick={() => onNavigate('stage2')}
            className={`flex items-center gap-1 py-1 px-2 rounded-lg font-medium whitespace-nowrap ${
              currentView === 'stage2' ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-slate-400'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>2. Practica</span>
          </button>

          <button
            onClick={() => onNavigate('stage3')}
            className={`flex items-center gap-1 py-1 px-2 rounded-lg font-medium whitespace-nowrap ${
              currentView === 'stage3' ? 'text-emerald-400 font-bold bg-emerald-500/10' : 'text-slate-400'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>3. Evalúa</span>
          </button>

          <button
            onClick={() => onNavigate('badges')}
            className={`flex items-center gap-1 py-1 px-2 rounded-lg font-medium whitespace-nowrap ${
              currentView === 'badges' ? 'text-yellow-400 font-bold bg-yellow-500/10' : 'text-slate-400'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Logros</span>
          </button>

          {isCertified && (
            <button
              onClick={onOpenCertificate}
              className="flex items-center gap-1 py-1 px-2 rounded-lg font-bold text-emerald-400 whitespace-nowrap"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Certificado</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
