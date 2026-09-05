import React, { useState } from 'react';
import { 
  Volume2, 
  Search, 
  Filter, 
  BookOpen, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Info,
  Clock,
  Play
} from 'lucide-react';
import { ALL_VERB_TENSES } from '../data/tensesData';
import { VerbTense, TenseCategory } from '../types';
import { playEnglishAudio } from '../utils/audio';

interface GrammarGuideProps {
  onStartPractice: (levelId: number) => void;
  selectedTenseId?: string;
}

export const GrammarGuide: React.FC<GrammarGuideProps> = ({
  onStartPractice,
  selectedTenseId
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | TenseCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTenseId, setExpandedTenseId] = useState<string | null>(selectedTenseId || null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const handlePlayAudio = async (text: string, id: string) => {
    setPlayingAudioId(id);
    await playEnglishAudio(text);
    setPlayingAudioId(null);
  };

  const filteredTenses = ALL_VERB_TENSES.filter((t) => {
    const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
    const matchesSearch =
      t.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.nameEs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.signalWords.some(w => w.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'A1': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'A2': return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
      case 'B1': return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      case 'B2': return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'C1': return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getModuleForTense = (category: TenseCategory) => {
    if (category === 'present') return 1;
    if (category === 'past') return 2;
    return 3;
  };

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Manual de Fórmulas y Estructuras</span>
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Guía Completa de los 12 Tiempos Verbales
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
          Consulta las fórmulas exactas para oraciones afirmativas (+), negativas (-) e interrogativas (?), marcadores temporales clave y escucha la pronunciación en audio con un solo clic.
        </p>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#0f172a] p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-800 mb-8">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterCategory === 'all'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-[0_0_10px_rgba(14,165,233,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Todos (12)
          </button>
          <button
            onClick={() => setFilterCategory('present')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterCategory === 'present'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-[0_0_10px_rgba(14,165,233,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Presentes (4)
          </button>
          <button
            onClick={() => setFilterCategory('past')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterCategory === 'past'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-[0_0_10px_rgba(14,165,233,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Pasados (4)
          </button>
          <button
            onClick={() => setFilterCategory('future')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterCategory === 'future'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-[0_0_10px_rgba(14,165,233,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Futuros (4)
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar tiempo o señal (ej: since, while)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#020617] border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
          />
        </div>
      </div>

      {/* Grid of Tense Cards */}
      <div className="space-y-4">
        {filteredTenses.map((tense) => {
          const isExpanded = expandedTenseId === tense.id;

          return (
            <div
              key={tense.id}
              className={`bg-[#0f172a] rounded-3xl transition-all border relative overflow-hidden shadow-xl ${
                isExpanded ? 'border-sky-500/50 shadow-[0_0_20px_rgba(14,165,233,0.15)]' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {isExpanded && (
                <div className="absolute top-0 left-0 w-1 h-full bg-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.6)]" />
              )}

              {/* Header Bar of the card */}
              <div 
                onClick={() => setExpandedTenseId(isExpanded ? null : tense.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0f172a] hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold uppercase border ${getLevelColor(tense.level)}`}>
                    {tense.level}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-white leading-tight">
                      {tense.nameEn}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">{tense.nameEs}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 hidden md:inline">
                    {tense.usageSummary.slice(0, 50)}...
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-sky-400" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="p-5 sm:p-6 border-t border-slate-800 bg-[#020617]/50 space-y-6 animate-in fade-in duration-200">
                  
                  {/* Summary */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Uso Principal y Contexto:
                    </h4>
                    <p className="text-sm text-slate-200 leading-relaxed bg-[#0f172a] p-3.5 rounded-2xl border border-slate-800">
                      {tense.usageSummary}
                    </p>
                  </div>

                  {/* Structural Formulas (+, -, ?) */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Fórmulas Estructurales de Dominio:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      
                      {/* Affirmative */}
                      <div className="bg-emerald-950/30 border border-emerald-500/40 p-3.5 rounded-2xl">
                        <span className="font-extrabold text-emerald-400 block mb-1">
                          (+) Afirmativa
                        </span>
                        <code className="text-emerald-200 font-mono text-[11px] block leading-normal">
                          {tense.structure.affirmative}
                        </code>
                      </div>

                      {/* Negative */}
                      <div className="bg-rose-950/30 border border-rose-500/40 p-3.5 rounded-2xl">
                        <span className="font-extrabold text-rose-400 block mb-1">
                          (-) Negativa
                        </span>
                        <code className="text-rose-200 font-mono text-[11px] block leading-normal">
                          {tense.structure.negative}
                        </code>
                      </div>

                      {/* Interrogative */}
                      <div className="bg-sky-950/30 border border-sky-500/40 p-3.5 rounded-2xl">
                        <span className="font-extrabold text-sky-400 block mb-1">
                          (?) Interrogativa
                        </span>
                        <code className="text-sky-200 font-mono text-[11px] block leading-normal">
                          {tense.structure.interrogative}
                        </code>
                      </div>

                    </div>
                  </div>

                  {/* Signal Words */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Marcadores Temporales (Signal Words):
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {tense.signalWords.map((word, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-800 text-sky-300 border border-slate-700 px-2.5 py-1 rounded-xl text-xs font-semibold"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Audio Examples */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Ejemplos Reales con Pronunciación en Audio:
                    </h4>
                    <div className="space-y-2">
                      {[
                        { type: 'Afirmativo (+)', data: tense.examples.affirmative },
                        { type: 'Negativo (-)', data: tense.examples.negative },
                        { type: 'Interrogativo (?)', data: tense.examples.interrogative }
                      ].map((item, idx) => {
                        const audioKey = `${tense.id}-${idx}`;
                        const isPlaying = playingAudioId === audioKey;

                        return (
                          <div
                            key={idx}
                            className="bg-[#0f172a] p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 shadow-sm"
                          >
                            <div>
                              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-0.5">
                                {item.type}
                              </span>
                              <p className="text-xs sm:text-sm font-bold text-slate-100">
                                "{item.data.en}"
                              </p>
                              <p className="text-xs text-slate-400 mt-0.5">
                                {item.data.es}
                              </p>
                            </div>

                            <button
                              onClick={() => handlePlayAudio(item.data.en, audioKey)}
                              disabled={isPlaying}
                              className="w-9 h-9 rounded-xl bg-sky-500/15 hover:bg-sky-600 text-sky-400 hover:text-white border border-sky-500/30 flex items-center justify-center transition-all shrink-0 active:scale-95"
                              title="Escuchar pronunciación"
                            >
                              <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Profe Luis' Tips */}
                  <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-xs text-amber-300 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="block text-amber-300 mb-0.5 font-bold">Consejo Clave del Profe Luis:</strong>
                      <p className="text-slate-300">{tense.tips}</p>
                    </div>
                  </div>

                  {/* Quick Action Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => onStartPractice(getModuleForTense(tense.category))}
                      className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-sky-900/30 border border-sky-400/30"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Practicar en Quiz del Nivel</span>
                    </button>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
