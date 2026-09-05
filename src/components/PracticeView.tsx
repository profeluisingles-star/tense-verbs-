import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Lightbulb, 
  ArrowRight, 
  RotateCcw, 
  Sparkles,
  Award,
  Layers,
  Send,
  GraduationCap
} from 'lucide-react';
import { PracticeExercise, UserProgress } from '../types';
import { PRACTICE_EXERCISES } from '../data/practiceData';
import { playEnglishAudio } from '../utils/audio';

interface PracticeViewProps {
  levelId?: number;
  initialLevelId?: number;
  initialTenseId?: string;
  userProgress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
  onGoToEvaluation?: (levelId: number) => void;
  onStartEvaluation?: (levelId: number) => void;
  onBackToLearn?: () => void;
  onBackToDashboard?: () => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  levelId,
  initialLevelId,
  initialTenseId,
  userProgress,
  onUpdateProgress,
  onGoToEvaluation,
  onStartEvaluation,
  onBackToLearn,
  onBackToDashboard
}) => {
  const activeLevel = initialLevelId || levelId || 1;
  // Filter exercises for this level
  const exercises = PRACTICE_EXERCISES.filter(ex => ex.levelId === activeLevel);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // User input states
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textInput, setTextInput] = useState<string>('');
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  
  // Evaluation & Tutor feedback states
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [practiceCompleted, setPracticeCompleted] = useState<boolean>(false);

  const currentEx = exercises[currentIndex] || exercises[0];

  // Initialize or reset input whenever current exercise changes
  useEffect(() => {
    setSelectedOption(null);
    setTextInput('');
    setHasSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);

    if (currentEx?.wordTiles) {
      // Shuffle tiles
      const shuffled = [...currentEx.wordTiles].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setOrderedWords([]);
    }
  }, [currentIndex, activeLevel]);

  const handlePlayAudio = async (text: string) => {
    setIsPlayingAudio(true);
    await playEnglishAudio(text);
    setIsPlayingAudio(false);
  };

  const handleTileClick = (word: string, fromAvailable: boolean) => {
    if (hasSubmitted) return;
    if (fromAvailable) {
      setOrderedWords(prev => [...prev, word]);
      setAvailableWords(prev => {
        const idx = prev.indexOf(word);
        if (idx > -1) {
          const next = [...prev];
          next.splice(idx, 1);
          return next;
        }
        return prev;
      });
    } else {
      setAvailableWords(prev => [...prev, word]);
      setOrderedWords(prev => {
        const idx = prev.indexOf(word);
        if (idx > -1) {
          const next = [...prev];
          next.splice(idx, 1);
          return next;
        }
        return prev;
      });
    }
  };

  const checkAnswer = () => {
    if (hasSubmitted) return;

    let studentAnswer = '';
    if (currentEx.type === 'structure_order') {
      studentAnswer = orderedWords.join(' ').trim();
    } else if (currentEx.options && currentEx.options.length > 0) {
      studentAnswer = selectedOption || '';
    } else {
      studentAnswer = textInput.trim();
    }

    if (!studentAnswer) return;

    // Validate correctness
    const cleanStudent = studentAnswer.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '').trim();
    const cleanCorrect = currentEx.correctAnswer.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '').trim();

    let matches = cleanStudent === cleanCorrect;

    if (!matches && currentEx.acceptableAnswers) {
      matches = currentEx.acceptableAnswers.some(ans => 
        cleanStudent === ans.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '').trim()
      );
    }

    setIsCorrect(matches);
    setHasSubmitted(true);

    // Update student progress and XP
    const earnedXp = matches ? 15 : 5; // Reward effort even if mistaken
    const currentTenseStats = userProgress.practiceStats[currentEx.tenseId] || { practiced: 0, correct: 0, errors: 0 };
    
    const updatedStats = {
      ...userProgress.practiceStats,
      [currentEx.tenseId]: {
        practiced: currentTenseStats.practiced + 1,
        correct: currentTenseStats.correct + (matches ? 1 : 0),
        errors: currentTenseStats.errors + (matches ? 0 : 1),
      }
    };

    // Calculate level mastery percentage
    const levelExercises = exercises.length;
    const answeredInLevel = Object.keys(updatedStats)
      .filter(k => exercises.some(e => e.tenseId === k))
      .reduce((acc, k) => acc + updatedStats[k].practiced, 0);
    
    const calculatedMastery = Math.min(100, Math.round((answeredInLevel / (levelExercises * 2)) * 100));

    const updatedProgress: UserProgress = {
      ...userProgress,
      xp: userProgress.xp + earnedXp,
      practiceStats: updatedStats,
      levelMasteryPercent: {
        ...userProgress.levelMasteryPercent,
        [levelId]: Math.max(userProgress.levelMasteryPercent[levelId] || 0, calculatedMastery)
      },
      totalQuestionsAnswered: userProgress.totalQuestionsAnswered + 1,
      correctAnswersCount: userProgress.correctAnswersCount + (matches ? 1 : 0),
    };

    onUpdateProgress(updatedProgress);
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setPracticeCompleted(true);
    }
  };

  const handleRetryCurrent = () => {
    setHasSubmitted(false);
    setIsCorrect(false);
    setSelectedOption(null);
    setTextInput('');
    if (currentEx?.wordTiles) {
      setAvailableWords([...currentEx.wordTiles].sort(() => Math.random() - 0.5));
      setOrderedWords([]);
    }
  };

  const getLevelLabel = () => {
    if (levelId === 1) return { title: 'Nivel 1: Tiempos Presentes', color: 'sky' };
    if (levelId === 2) return { title: 'Nivel 2: Tiempos Pasados', color: 'amber' };
    return { title: 'Nivel 3: Tiempos Futuros', color: 'emerald' };
  };

  const levelInfo = getLevelLabel();

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      
      {/* Header bar: Stage 2 indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
              Etapa 2: Práctica Inteligente (Sin Límite de Intentos)
            </span>
            <span className="text-xs text-slate-400 font-bold">
              {levelInfo.title}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {currentEx?.title || 'Ejercicio de Práctica'}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToLearn}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>Ver Explicación Teórica</span>
          </button>

          <button
            onClick={() => onGoToEvaluation(levelId)}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-md"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Ir a Evaluación Oficial</span>
          </button>
        </div>
      </div>

      {/* Exercise Progress Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
        <span>Modalidad {currentIndex + 1} de {exercises.length}</span>
        <span>Tiempo: <strong className="text-white capitalize">{currentEx?.tenseId.replace('-', ' ')}</strong></span>
      </div>
      <div className="w-full h-2 rounded-full bg-slate-800 mb-8 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
        />
      </div>

      {/* Main Practice Interactive Container */}
      {!practiceCompleted ? (
        <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-6">
          
          {/* Prompt Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Tipo: {currentEx?.type.replace('_', ' ').toUpperCase()}
              </span>
              {currentEx?.contextHint && (
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Ocultar Pista' : 'Pedir Pista al Tutor'}</span>
                </button>
              )}
            </div>

            <p className="text-base sm:text-lg text-white font-medium leading-relaxed whitespace-pre-line">
              {currentEx?.prompt}
            </p>

            {/* Hint Box */}
            {showHint && currentEx?.contextHint && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-300 mb-0.5">Pista del Tutor Virtual:</strong>
                  {currentEx.contextHint}
                </div>
              </div>
            )}

            {/* Audio Player if Listening Modality */}
            {currentEx?.audioText && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-sky-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Audio en Inglés Nativo</p>
                    <p className="text-[11px] text-slate-400">Escucha cuántas veces necesites antes de responder</p>
                  </div>
                </div>

                <button
                  onClick={() => handlePlayAudio(currentEx.audioText!)}
                  disabled={isPlayingAudio}
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-sky-950/50"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlayingAudio ? 'Reproduciendo...' : 'Reproducir Audio'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Interactive Input Formats */}
          <div className="pt-2">
            
            {/* Format 1: Structure Order (Word Tiles) */}
            {currentEx?.type === 'structure_order' && (
              <div className="space-y-4">
                <div className="min-h-[56px] p-3 rounded-2xl bg-slate-950 border-2 border-dashed border-slate-700 flex flex-wrap gap-2 items-center">
                  {orderedWords.length === 0 ? (
                    <span className="text-xs text-slate-500 italic pl-2">
                      Toca las palabras abajo en el orden gramatical correcto para construir la oración...
                    </span>
                  ) : (
                    orderedWords.map((word, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTileClick(word, false)}
                        disabled={hasSubmitted}
                        className="px-3.5 py-1.5 rounded-xl bg-sky-500 text-white font-mono text-xs font-bold shadow-md hover:bg-sky-400 transition"
                      >
                        {word}
                      </button>
                    ))
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {availableWords.map((word, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTileClick(word, true)}
                      disabled={hasSubmitted}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs font-bold hover:bg-slate-700 hover:border-slate-600 transition"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Format 2: Options (Multiple choice, translation, listening, reading) */}
            {currentEx?.options && currentEx.options.length > 0 && (
              <div className="space-y-2.5">
                {currentEx.options.map((option, idx) => {
                  const isSelected = selectedOption === option;
                  return (
                    <button
                      key={idx}
                      onClick={() => !hasSubmitted && setSelectedOption(option)}
                      disabled={hasSubmitted}
                      className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-medium transition border flex items-center justify-between ${
                        isSelected
                          ? 'bg-sky-500/20 border-sky-500 text-white font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span>{option}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                        isSelected ? 'border-sky-400 bg-sky-500 text-white' : 'border-slate-700 text-transparent'
                      }`}>
                        ✓
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Format 3: Free text writing, completion, and transformation */}
            {(!currentEx?.options || currentEx.options.length === 0) && currentEx?.type !== 'structure_order' && (
              <div className="space-y-2">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !hasSubmitted && textInput.trim()) {
                      checkAnswer();
                    }
                  }}
                  disabled={hasSubmitted}
                  placeholder="Escribe tu respuesta aquí en inglés..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 font-mono transition"
                />
                <span className="text-[11px] text-slate-400 block pl-1">
                  Presiona Enter o el botón "Comprobar con el Tutor" para recibir corrección instantánea.
                </span>
              </div>
            )}

          </div>

          {/* Action Button: Check Answer */}
          {!hasSubmitted ? (
            <div className="pt-2 flex justify-end">
              <button
                onClick={checkAnswer}
                disabled={
                  (currentEx.type === 'structure_order' && orderedWords.length === 0) ||
                  (currentEx.options && currentEx.options.length > 0 && !selectedOption) ||
                  (!currentEx.options && currentEx.type !== 'structure_order' && !textInput.trim())
                }
                className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold shadow-lg shadow-sky-950/50 flex items-center gap-2 transition"
              >
                <span>Comprobar con el Tutor</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* AI Tutor Detailed Feedback Section */
            <div className="space-y-4 pt-2 border-t border-slate-800 animate-in fade-in duration-300">
              
              {isCorrect ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-emerald-300">
                      ¡Excelente trabajo! Respuesta correcta (+15 XP)
                    </p>
                    <p className="text-xs text-slate-300">
                      <strong className="text-slate-200">Regla aplicada:</strong> {currentEx.relatedGrammarRule}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    <span>Corrección Pedagógica del Tutor de IA</span>
                  </div>

                  {/* 1. What was wrong */}
                  <div className="text-xs text-slate-300">
                    <strong className="text-rose-300 block mb-0.5">1. ¿Qué error se cometió?</strong>
                    {currentEx.explanationWhatWrong}
                  </div>

                  {/* 2. Why it is wrong */}
                  <div className="text-xs text-slate-300">
                    <strong className="text-amber-300 block mb-0.5">2. ¿Por qué está mal según la regla?</strong>
                    {currentEx.explanationWhyWrong}
                  </div>

                  {/* 3. How to correct */}
                  <div className="text-xs text-slate-300">
                    <strong className="text-emerald-300 block mb-0.5">3. ¿Cómo corregirlo?</strong>
                    {currentEx.howToCorrect}
                  </div>

                  {/* Correct answer display */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
                    Respuesta correcta esperada: <strong className="text-white">{currentEx.correctAnswer}</strong>
                  </div>
                </div>
              )}

              {/* Navigation buttons: Next or Retry */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleRetryCurrent}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reintentar este Ejercicio</span>
                </button>

                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-black transition flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
                >
                  <span>{currentIndex < exercises.length - 1 ? 'Siguiente Ejercicio' : 'Finalizar Sesión de Práctica'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      ) : (
        /* End of Practice Summary */
        <div className="bg-[#0f172a] rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">¡Sesión de Práctica Completada!</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
              Has recorrido las modalidades interactivas del {levelInfo.title}. Ahora estás listo para poner a prueba tu conocimiento sin ninguna ayuda en la Evaluación Oficial.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => {
                setPracticeCompleted(false);
                setCurrentIndex(0);
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Volver a Practicar</span>
            </button>

            <button
              onClick={() => {
                if (onStartEvaluation) onStartEvaluation(activeLevel);
                else if (onGoToEvaluation) onGoToEvaluation(activeLevel);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 shadow-xl shadow-amber-950/50"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Ir a la Evaluación Oficial (Quiz)</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
