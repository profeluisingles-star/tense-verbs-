import React, { useState } from 'react';
import { 
  Volume2, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Clock,
  Layers,
  HelpCircle,
  Play
} from 'lucide-react';
import { ALL_VERB_TENSES } from '../data/tensesData';
import { VerbTense, TenseCategory } from '../types';
import { playEnglishAudio } from '../utils/audio';

interface GuidedLearningViewProps {
  onStartPractice: (levelId: number, tenseId?: string) => void;
  selectedTenseId?: string;
}

export const GuidedLearningView: React.FC<GuidedLearningViewProps> = ({
  onStartPractice,
  selectedTenseId
}) => {
  const [activeCategory, setActiveCategory] = useState<TenseCategory>('present');
  const [activeTenseId, setActiveTenseId] = useState<string>(selectedTenseId || 'simple-present');
  const [playingAudioKey, setPlayingAudioKey] = useState<string | null>(null);

  // Group tenses by category
  const categoryTenses = ALL_VERB_TENSES.filter(t => t.category === activeCategory);
  const currentTense = ALL_VERB_TENSES.find(t => t.id === activeTenseId) || categoryTenses[0];

  const handlePlayAudio = async (text: string, key: string) => {
    setPlayingAudioKey(key);
    await playEnglishAudio(text);
    setPlayingAudioKey(null);
  };

  const getLevelIdByCategory = (category: TenseCategory): number => {
    if (category === 'present') return 1;
    if (category === 'past') return 2;
    return 3;
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      
      {/* Top Banner: Stage 1 Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-sky-500/15 text-sky-400 border border-sky-500/30 uppercase tracking-widest mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Etapa 1: Aprendizaje Guiado con Tutor Virtual</span>
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explicación y Fundamentos Paso a Paso
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
          Antes de practicar o evaluar, la Inteligencia Artificial te enseña qué es cada tiempo verbal, cuándo se utiliza, las reglas gramaticales, los auxiliares y los errores más comunes.
        </p>
      </div>

      {/* Level Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto mb-8">
        <button
          onClick={() => {
            setActiveCategory('present');
            setActiveTenseId('simple-present');
          }}
          className={`p-3 rounded-2xl border font-bold text-xs sm:text-sm transition flex flex-col items-center gap-1 ${
            activeCategory === 'present'
              ? 'bg-sky-500/20 border-sky-500 text-sky-300 shadow-lg shadow-sky-950/50'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
          }`}
        >
          <span className="text-[10px] uppercase font-black tracking-wider text-sky-400">Nivel 1</span>
          <span>Tiempos Presentes</span>
        </button>

        <button
          onClick={() => {
            setActiveCategory('past');
            setActiveTenseId('simple-past');
          }}
          className={`p-3 rounded-2xl border font-bold text-xs sm:text-sm transition flex flex-col items-center gap-1 ${
            activeCategory === 'past'
              ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-950/50'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
          }`}
        >
          <span className="text-[10px] uppercase font-black tracking-wider text-amber-400">Nivel 2</span>
          <span>Tiempos Pasados</span>
        </button>

        <button
          onClick={() => {
            setActiveCategory('future');
            setActiveTenseId('simple-future');
          }}
          className={`p-3 rounded-2xl border font-bold text-xs sm:text-sm transition flex flex-col items-center gap-1 ${
            activeCategory === 'future'
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-950/50'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
          }`}
        >
          <span className="text-[10px] uppercase font-black tracking-wider text-emerald-400">Nivel 3</span>
          <span>Tiempos Futuros</span>
        </button>
      </div>

      {/* Specific Tenses Pills within Active Category */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categoryTenses.map((tense) => (
          <button
            key={tense.id}
            onClick={() => setActiveTenseId(tense.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
              activeTenseId === tense.id
                ? 'bg-white text-slate-900 border-white shadow-md'
                : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span>{tense.nameEn}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
              activeTenseId === tense.id ? 'bg-slate-200 text-slate-900' : 'bg-slate-800 text-slate-400'
            }`}>
              {tense.level}
            </span>
          </button>
        ))}
      </div>

      {/* Detailed Lesson Card */}
      {currentTense && (
        <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8 animate-in fade-in duration-300">
          
          {/* Header of the Tense */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-mono font-bold">
                  Nivel CEFR: {currentTense.level}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {currentTense.nameEs}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {currentTense.nameEn}
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                {currentTense.usageSummary}
              </p>
            </div>

            <button
              onClick={() => onStartPractice(getLevelIdByCategory(currentTense.category), currentTense.id)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-950/50 flex items-center justify-center gap-2 transition self-start sm:self-auto"
            >
              <span>Ir a la Práctica de este Nivel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Section 1: Cuándo se utiliza (When to use) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>1. ¿Cuándo se utiliza?</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentTense.whenToUse.map((item, idx) => (
                <div key={idx} className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/80 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Reglas Gramaticales y Uso de Auxiliares */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>2. Reglas Gramaticales y Uso de Auxiliares</span>
            </h4>
            
            {/* Auxiliary highlight box */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs sm:text-sm text-amber-200">
              <strong className="font-black text-amber-300 block mb-1">Guía del Tutor Virtual sobre Auxiliares:</strong>
              {currentTense.auxiliaryGuide}
            </div>

            <ul className="space-y-2">
              {currentTense.rules.map((rule, idx) => (
                <li key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Estructuras y Fórmulas Exactas (+, -, ?) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>3. Estructuras y Fórmulas con Audio Nativo</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Affirmative */}
              <div className="bg-slate-900/90 rounded-2xl p-5 border border-emerald-500/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Afirmativa (+)
                    </span>
                  </div>
                  <p className="font-mono text-xs text-slate-300 font-semibold mb-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    {currentTense.structure.affirmative}
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">
                      "{currentTense.examples.affirmative.en}"
                    </p>
                    <p className="text-xs text-slate-400 italic">
                      ({currentTense.examples.affirmative.es})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handlePlayAudio(currentTense.examples.affirmative.en, `${currentTense.id}-aff`)}
                  disabled={playingAudioKey === `${currentTense.id}-aff`}
                  className="mt-4 w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{playingAudioKey === `${currentTense.id}-aff` ? 'Reproduciendo...' : 'Escuchar Audio'}</span>
                </button>
              </div>

              {/* Negative */}
              <div className="bg-slate-900/90 rounded-2xl p-5 border border-rose-500/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      Negativa (-)
                    </span>
                  </div>
                  <p className="font-mono text-xs text-slate-300 font-semibold mb-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    {currentTense.structure.negative}
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">
                      "{currentTense.examples.negative.en}"
                    </p>
                    <p className="text-xs text-slate-400 italic">
                      ({currentTense.examples.negative.es})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handlePlayAudio(currentTense.examples.negative.en, `${currentTense.id}-neg`)}
                  disabled={playingAudioKey === `${currentTense.id}-neg`}
                  className="mt-4 w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>{playingAudioKey === `${currentTense.id}-neg` ? 'Reproduciendo...' : 'Escuchar Audio'}</span>
                </button>
              </div>

              {/* Interrogative */}
              <div className="bg-slate-900/90 rounded-2xl p-5 border border-sky-500/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
                      Pregunta (?)
                    </span>
                  </div>
                  <p className="font-mono text-xs text-slate-300 font-semibold mb-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    {currentTense.structure.interrogative}
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">
                      "{currentTense.examples.interrogative.en}"
                    </p>
                    <p className="text-xs text-slate-400 italic">
                      ({currentTense.examples.interrogative.es})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handlePlayAudio(currentTense.examples.interrogative.en, `${currentTense.id}-int`)}
                  disabled={playingAudioKey === `${currentTense.id}-int`}
                  className="mt-4 w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>{playingAudioKey === `${currentTense.id}-int` ? 'Reproduciendo...' : 'Escuchar Audio'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Section 4: Errores Comunes Detectados por la IA */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>4. Errores Comunes Explicados por la IA</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentTense.commonMistakes.map((mistake, idx) => (
                <div key={idx} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-mono line-through">
                    <span>❌ {mistake.wrong}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                    <span>✓ {mistake.right}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800/80">
                    <strong className="text-slate-200">Explicación del profesor:</strong> {mistake.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Palabras Señal (Signal Words) y Tips */}
          <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
                Palabras Clave y Marcadores de Tiempo:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {currentTense.signalWords.map((word, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-sky-300 font-mono text-xs border border-slate-700">
                    {word}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onStartPractice(getLevelIdByCategory(currentTense.category), currentTense.id)}
              className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-black text-xs transition flex items-center gap-2 shadow-lg shadow-sky-950/50 shrink-0 w-full sm:w-auto justify-center"
            >
              <span>¡Entendido! Iniciar Práctica</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
