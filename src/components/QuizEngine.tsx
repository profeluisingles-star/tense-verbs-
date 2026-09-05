import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Volume2, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert,
  AlertTriangle,
  Lock,
  Send,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EvaluationModule, QuizQuestion, UserProgress } from '../types';
import { playEnglishAudio, soundFX } from '../utils/audio';

interface QuizEngineProps {
  module: EvaluationModule;
  userProgress: UserProgress;
  onQuizComplete: (results: {
    passed: boolean;
    earnedScore: number;
    maxScore: number;
    percentage: number;
    livesLeft: number;
    perfectHeartRun: boolean;
  }) => void;
  onExit: () => void;
  onReportViolation: () => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  module,
  userProgress,
  onQuizComplete,
  onExit,
  onReportViolation
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [earnedScore, setEarnedScore] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  // Input states
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [writtenAnswer, setWrittenAnswer] = useState<string>('');
  const [orderedTiles, setOrderedTiles] = useState<string[]>([]);
  const [availableTiles, setAvailableTiles] = useState<string[]>([]);
  
  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Failure & Security state
  const [isGameOver, setIsGameOver] = useState(false);
  const [securityWarningOpen, setSecurityWarningOpen] = useState(false);
  const [violationsInSession, setViolationsInSession] = useState(0);

  const currentQuestion = module.questions[currentIndex];
  const maxScore = module.maxScore;

  // Anti-cheat: Listen for tab switching / window blur
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isGameOver) {
        setViolationsInSession(prev => {
          const next = prev + 1;
          setSecurityWarningOpen(true);
          onReportViolation();
          return next;
        });
      }
    };

    const handleWindowBlur = () => {
      if (!isGameOver) {
        setViolationsInSession(prev => {
          const next = prev + 1;
          setSecurityWarningOpen(true);
          onReportViolation();
          return next;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [isGameOver, onReportViolation]);

  // Reset inputs per question
  useEffect(() => {
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
    setSelectedOption(null);
    setWrittenAnswer('');
    
    if (currentQuestion?.type === 'structure_order' && currentQuestion.wordTiles) {
      const shuffled = [...currentQuestion.wordTiles].sort(() => Math.random() - 0.5);
      setAvailableTiles(shuffled);
      setOrderedTiles([]);
    }

    if (currentQuestion?.type === 'listening' && currentQuestion.audioText) {
      const timer = setTimeout(() => {
        handlePlayAudio(currentQuestion.audioText!);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentQuestion]);

  const handlePlayAudio = async (text: string) => {
    setIsPlayingAudio(true);
    await playEnglishAudio(text);
    setIsPlayingAudio(false);
  };

  const handleSelectOption = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(option);
  };

  const handleTileClick = (tile: string, indexInAvailable: number) => {
    if (isAnswerSubmitted) return;
    setOrderedTiles(prev => [...prev, tile]);
    setAvailableTiles(prev => prev.filter((_, idx) => idx !== indexInAvailable));
  };

  const handleRemoveOrderedTile = (tile: string, indexInOrdered: number) => {
    if (isAnswerSubmitted) return;
    setAvailableTiles(prev => [...prev, tile]);
    setOrderedTiles(prev => prev.filter((_, idx) => idx !== indexInOrdered));
  };

  const handleSubmitAnswer = () => {
    if (isAnswerSubmitted) return;

    let userAns = '';
    let correct = false;

    if (
      currentQuestion.type === 'multiple_choice' || 
      currentQuestion.type === 'listening' || 
      currentQuestion.type === 'reading' || 
      currentQuestion.type === 'error_correction'
    ) {
      if (!selectedOption) return;
      userAns = selectedOption;
      correct = userAns.trim() === currentQuestion.correctAnswer.trim();
    } else if (currentQuestion.type === 'writing' || currentQuestion.type === 'fill_blank') {
      if (!writtenAnswer.trim()) return;
      userAns = writtenAnswer.trim();
      const normalize = (str: string) => 
        str.toLowerCase()
          .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '')
          .replace(/’/g, "'")
          .replace(/\s+/g, ' ')
          .trim();

      const normalizedUser = normalize(userAns);
      const normalizedCorrect = normalize(currentQuestion.correctAnswer);
      const normalizedAcceptable = (currentQuestion.acceptableAnswers || []).map(normalize);
      
      correct = (normalizedUser === normalizedCorrect) || normalizedAcceptable.includes(normalizedUser);
    } else if (currentQuestion.type === 'structure_order') {
      if (orderedTiles.length === 0) return;
      userAns = orderedTiles.join(' ').trim();
      const normalize = (str: string) => str.replace(/\s+/g, ' ').trim();
      correct = normalize(userAns) === normalize(currentQuestion.correctAnswer);
    }

    setIsCorrect(correct);
    setIsAnswerSubmitted(true);

    if (correct) {
      soundFX.playCorrect();
      setEarnedScore(prev => prev + currentQuestion.points);
      confetti({
        particleCount: 24,
        spread: 45,
        origin: { y: 0.75 }
      });
    } else {
      soundFX.playWrong();
      soundFX.playHeartLost();
      
      // In quizzes and exams, losing all 3 lives stops the attempt
      const nextLives = lives - 1;
      setLives(nextLives);

      if (nextLives <= 0) {
        setIsGameOver(true);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < module.questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Evaluation finished
      const percentage = Math.round((earnedScore / maxScore) * 100);
      const passed = earnedScore >= module.passingScore && lives > 0;
      if (passed) {
        soundFX.playVictory();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      onQuizComplete({
        passed,
        earnedScore,
        maxScore,
        percentage,
        livesLeft: lives,
        perfectHeartRun: lives === 3
      });
    }
  };

  const handleRestart = () => {
    setLives(3);
    setEarnedScore(0);
    setCurrentIndex(0);
    setIsGameOver(false);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
    setSelectedOption(null);
    setWrittenAnswer('');
  };

  const progressPercent = Math.round(((currentIndex + 1) / module.questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 px-3 sm:px-4">
      
      {/* Security Status Shield Banner (Anti-Cheat Active) */}
      <div className="mb-4 bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold flex items-center gap-1 text-slate-200">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Modo Evaluación Oficial Bloqueado</span>
          </span>
          <span className="text-slate-500 hidden sm:inline">| Sin ayudas externas ni guías</span>
        </div>

        {violationsInSession > 0 && (
          <span className="text-rose-400 font-mono font-bold flex items-center gap-1 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{violationsInSession} {violationsInSession === 1 ? 'advertencia' : 'advertencias'}</span>
          </span>
        )}
      </div>

      {/* Main Assessment Card */}
      <div className="bg-[#0f172a] rounded-3xl p-5 sm:p-8 shadow-2xl border border-slate-800 mb-6 relative overflow-hidden">
        
        {/* Glow indicator line */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-sky-500 via-amber-500 to-emerald-500" />

        {/* Header Bar */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                module.isFinalExam 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-sky-500/20 text-sky-300 border-sky-500/40'
              }`}>
                {module.title}
              </span>
              <span className="text-xs text-slate-400 font-bold">
                Pregunta {currentIndex + 1} de {module.questions.length}
              </span>
            </div>
          </div>

          {/* 3 Lives indicator */}
          <div className="flex items-center gap-1.5 bg-[#020617] border border-slate-800 px-3 py-1.5 rounded-2xl">
            {[1, 2, 3].map((heartIndex) => (
              <Heart
                key={heartIndex}
                className={`w-5 h-5 transition-all duration-300 ${
                  heartIndex <= lives
                    ? 'text-rose-500 fill-rose-500 scale-100'
                    : 'text-slate-700 fill-slate-800 scale-90 opacity-40'
                }`}
              />
            ))}
            <span className="text-xs font-mono font-bold text-rose-400 ml-1">
              {lives} {lives === 1 ? 'vida' : 'vidas'}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700/60 mb-6">
          <div 
            className="h-full bg-gradient-to-r from-sky-500 via-amber-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Score tracker */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
          <span>Puntaje acumulado: <strong className="text-white font-mono">{earnedScore} / {maxScore} pts</strong></span>
          <span>Para aprobar: <strong className="text-amber-400 font-mono">{module.passingScore} pts ({Math.round((module.passingScore / maxScore) * 100)}%)</strong></span>
        </div>

        {/* Listening audio trigger */}
        {currentQuestion.type === 'listening' && currentQuestion.audioText && (
          <div className="p-4 rounded-2xl bg-slate-900 border border-sky-500/30 flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Audio de Evaluación Auditiva</p>
                <p className="text-[11px] text-slate-400">Escucha con atención y selecciona la opción exacta</p>
              </div>
            </div>

            <button
              onClick={() => handlePlayAudio(currentQuestion.audioText!)}
              disabled={isPlayingAudio}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlayingAudio ? 'Reproduciendo...' : 'Reproducir'}</span>
            </button>
          </div>
        )}

        {/* Question Prompt */}
        <div className="mb-6">
          <p className="text-base sm:text-lg text-white font-semibold leading-relaxed whitespace-pre-line">
            {currentQuestion.prompt}
          </p>
          {currentQuestion.contextHint && !isAnswerSubmitted && (
            <p className="text-xs text-slate-400 mt-2 italic">
              Indicación: {currentQuestion.contextHint}
            </p>
          )}
        </div>

        {/* INPUT FORMATS */}

        {/* 1. Multiple Choice / Reading / Error Correction / Listening */}
        {currentQuestion.options && currentQuestion.options.length > 0 && (
          <div className="space-y-2.5 mb-6">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              let btnClass = 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700';

              if (isAnswerSubmitted) {
                if (option === currentQuestion.correctAnswer) {
                  btnClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnClass = 'bg-rose-500/20 border-rose-500 text-rose-200 font-bold';
                } else {
                  btnClass = 'bg-slate-900/50 border-slate-800 text-slate-500';
                }
              } else if (isSelected) {
                btnClass = 'bg-sky-500/20 border-sky-500 text-white font-bold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm transition border flex items-center justify-between ${btnClass}`}
                >
                  <span>{option}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                    isAnswerSubmitted && option === currentQuestion.correctAnswer
                      ? 'border-emerald-400 bg-emerald-500 text-white'
                      : isSelected && isAnswerSubmitted && !isCorrect
                      ? 'border-rose-400 bg-rose-500 text-white'
                      : isSelected
                      ? 'border-sky-400 bg-sky-500 text-white'
                      : 'border-slate-700 text-transparent'
                  }`}>
                    {isAnswerSubmitted && option === currentQuestion.correctAnswer ? '✓' : isSelected && isAnswerSubmitted && !isCorrect ? '×' : '✓'}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* 2. Free Writing / Fill Blank */}
        {(currentQuestion.type === 'writing' || currentQuestion.type === 'fill_blank') && (
          <div className="mb-6 space-y-2">
            <input
              type="text"
              value={writtenAnswer}
              onChange={(e) => setWrittenAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isAnswerSubmitted && writtenAnswer.trim()) {
                  handleSubmitAnswer();
                }
              }}
              disabled={isAnswerSubmitted}
              placeholder="Escribe aquí tu respuesta exacta en inglés..."
              className={`w-full px-4 py-3.5 rounded-2xl bg-slate-950 border text-sm font-mono focus:outline-none transition ${
                isAnswerSubmitted
                  ? isCorrect
                    ? 'border-emerald-500 text-emerald-300'
                    : 'border-rose-500 text-rose-300'
                  : 'border-slate-700 text-white focus:border-sky-500'
              }`}
            />
            {isAnswerSubmitted && !isCorrect && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-mono">
                Respuesta esperada: <strong className="text-white">{currentQuestion.correctAnswer}</strong>
              </div>
            )}
          </div>
        )}

        {/* 3. Structure Order (Word Tiles) */}
        {currentQuestion.type === 'structure_order' && (
          <div className="mb-6 space-y-4">
            <div className={`min-h-[64px] p-3 rounded-2xl border-2 border-dashed flex flex-wrap gap-2 items-center ${
              isAnswerSubmitted
                ? isCorrect
                  ? 'border-emerald-500/50 bg-emerald-500/10'
                  : 'border-rose-500/50 bg-rose-500/10'
                : 'border-sky-500/40 bg-slate-950'
            }`}>
              {orderedTiles.length === 0 ? (
                <span className="text-xs text-slate-500 italic pl-2">
                  Toca las fichas de abajo para ordenar la oración...
                </span>
              ) : (
                orderedTiles.map((tile, idx) => (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleRemoveOrderedTile(tile, idx)}
                    className="bg-sky-500 hover:bg-sky-400 text-white font-mono text-xs font-bold px-3 py-1.5 rounded-xl shadow transition"
                  >
                    {tile}
                  </button>
                ))
              )}
            </div>

            {!isAnswerSubmitted && availableTiles.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {availableTiles.map((tile, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTileClick(tile, idx)}
                    className="bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition"
                  >
                    {tile}
                  </button>
                ))}
              </div>
            )}

            {isAnswerSubmitted && !isCorrect && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-mono">
                Estructura esperada: <strong className="text-white">{currentQuestion.correctAnswer}</strong>
              </div>
            )}
          </div>
        )}

        {/* Feedback Display (Locked: only grammar explanation after submission) */}
        {isAnswerSubmitted && (
          <div className={`p-4 rounded-2xl mb-6 text-xs sm:text-sm border ${
            isCorrect
              ? 'bg-emerald-500/10 text-emerald-200 border-emerald-500/30'
              : 'bg-rose-500/10 text-rose-200 border-rose-500/30'
          }`}>
            <div className="flex items-start gap-2.5">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-bold mb-1">
                  {isCorrect ? '¡Correcto! (+1 pt)' : '¡Incorrecto! Pierdes 1 vida'}
                </h4>
                <p className="opacity-90">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={onExit}
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 px-3 py-2 rounded-xl transition"
          >
            Salir de la Evaluación
          </button>

          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={
                (currentQuestion.options && currentQuestion.options.length > 0 && !selectedOption) ||
                ((currentQuestion.type === 'writing' || currentQuestion.type === 'fill_blank') && !writtenAnswer.trim()) ||
                (currentQuestion.type === 'structure_order' && orderedTiles.length === 0)
              }
              className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold shadow-lg shadow-sky-950/50 flex items-center gap-2 transition"
            >
              <span>Confirmar Respuesta</span>
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-black shadow-lg shadow-emerald-950/50 flex items-center gap-2 transition"
            >
              <span>{currentIndex + 1 < module.questions.length ? 'Siguiente Pregunta' : 'Finalizar y Calificar'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* GAME OVER (SIN VIDAS) MODAL */}
      {isGameOver && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-800 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-rose-500/15 border border-rose-500/30 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 fill-current" />
            </div>

            <h3 className="text-xl font-black text-white mb-2">
              ¡Has agotado tus 3 vidas!
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              En las evaluaciones oficiales de la plataforma dispones de 3 vidas. No te desanimes: repasa los temas en la Etapa 1 o practica en la Etapa 2 antes de reintentar.
            </p>

            <div className="space-y-2">
              <button
                onClick={handleRestart}
                className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-sky-950/50"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reintentar Evaluación (3 Vidas Nuevas)</span>
              </button>

              <button
                onClick={onExit}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl text-xs transition"
              >
                Regresar al Menú Principal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECURITY / ANTI-CHEAT WARNING MODAL */}
      {securityWarningOpen && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-amber-500/40 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black text-white mb-2">
              ¡Advertencia de Integridad y Seguridad!
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Has cambiado de pestaña o ventana durante la evaluación oficial. De acuerdo a las directrices de evaluación del <strong>Profesor Luis López Picado</strong>, las pruebas deben ser resueltas únicamente con tus conocimientos, sin traductores, buscadores ni IA externa.
            </p>

            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 font-mono mb-6">
              Incidentes registrados en esta sesión: <strong>{violationsInSession}</strong>
            </div>

            <button
              onClick={() => setSecurityWarningOpen(false)}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs sm:text-sm transition shadow-lg shadow-amber-950/50"
            >
              Comprendo y Continuar con la Prueba
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
