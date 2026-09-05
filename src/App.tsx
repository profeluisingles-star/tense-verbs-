import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { GuidedLearningView } from './components/GuidedLearningView';
import { PracticeView } from './components/PracticeView';
import { QuizEngine } from './components/QuizEngine';
import { GrammarGuide } from './components/GrammarGuide';
import { BadgesView } from './components/BadgesView';
import { CertificateModal } from './components/CertificateModal';
import { TeacherReportModal } from './components/TeacherReportModal';
import { StudentWelcomeModal } from './components/StudentWelcomeModal';
import { UserProgress, EvaluationModule, CEFRLevel } from './types';
import { EVALUATION_MODULES } from './data/evaluationData';
import { BADGES_LIST } from './data/tensesData';
import { 
  getInitialProgress, 
  saveProgress, 
  createDefaultUser, 
  calculateCEFR, 
  checkAndUnlockBadges,
  generateCertificateCode 
} from './utils/progress';
import { Trophy, ShieldAlert } from 'lucide-react';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress);
  const [currentView, setCurrentView] = useState<
    'dashboard' | 'stage1' | 'stage2' | 'stage3' | 'quiz' | 'guide' | 'badges' | 'teacher'
  >('dashboard');

  const [selectedLevelId, setSelectedLevelId] = useState<number>(1);
  const [activeQuizModule, setActiveQuizModule] = useState<EvaluationModule | null>(null);
  
  // Modals
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedTenseForGuide, setSelectedTenseForGuide] = useState<string | undefined>(undefined);
  
  // Toast notifications for newly unlocked badges or alerts
  const [badgeToast, setBadgeToast] = useState<string | null>(null);

  // Prompt student on first session if name is default
  useEffect(() => {
    if (!progress.fullName || progress.fullName === 'Estudiante') {
      setIsStudentModalOpen(true);
    }
  }, []);

  const handleUpdateProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  const handleSaveStudentName = (fullName: string) => {
    const updated: UserProgress = {
      ...progress,
      fullName,
      certificateCode: progress.completedQuizzes.length === 3 && progress.finalExamScore
        ? generateCertificateCode(fullName)
        : progress.certificateCode
    };
    handleUpdateProgress(updated);
    setIsStudentModalOpen(false);
  };

  const handleStartStage1 = (levelId: number) => {
    setSelectedLevelId(levelId);
    setCurrentView('stage1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartStage2 = (levelId: number) => {
    setSelectedLevelId(levelId);
    setCurrentView('stage2');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartStage3 = (moduleId: number) => {
    const targetModule = EVALUATION_MODULES.find(m => m.id === moduleId) || EVALUATION_MODULES[0];
    setActiveQuizModule(targetModule);
    setCurrentView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReportViolation = () => {
    handleUpdateProgress({
      ...progress,
      securityViolationsCount: progress.securityViolationsCount + 1
    });
  };

  const handleQuizComplete = (results: {
    passed: boolean;
    earnedScore: number;
    maxScore: number;
    percentage: number;
    livesLeft: number;
    perfectHeartRun: boolean;
  }) => {
    if (!activeQuizModule) return;

    const moduleId = activeQuizModule.id;
    const isFinalExam = activeQuizModule.isFinalExam;

    let updatedCompletedQuizzes = [...progress.completedQuizzes];
    if (results.passed && !isFinalExam && !updatedCompletedQuizzes.includes(moduleId)) {
      updatedCompletedQuizzes.push(moduleId);
      updatedCompletedQuizzes.sort((a, b) => a - b);
    }

    let finalExamScoreData = progress.finalExamScore;
    let certCode = progress.certificateCode;
    let certDate = progress.certificateIssuedDate;

    if (isFinalExam && results.passed) {
      const cefrResult: CEFRLevel = results.percentage >= 91 ? 'C1' : 'B2';
      finalExamScoreData = {
        score: results.earnedScore,
        maxScore: results.maxScore,
        percentage: results.percentage,
        passed: results.passed,
        cefr: cefrResult,
        completedAt: new Date().toISOString()
      };

      if (!certCode) {
        certCode = generateCertificateCode(progress.fullName);
        certDate = new Date().toLocaleDateString('es-CR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    }

    const previousQuizScore = progress.quizScores[moduleId]?.score || 0;
    const bestScore = Math.max(previousQuizScore, results.earnedScore);

    const baseUpdatedProgress: UserProgress = {
      ...progress,
      xp: progress.xp + results.earnedScore * 5,
      completedQuizzes: updatedCompletedQuizzes,
      quizScores: {
        ...progress.quizScores,
        [moduleId]: {
          score: bestScore,
          maxScore: results.maxScore,
          passed: results.passed,
          attempts: (progress.quizScores[moduleId]?.attempts || 0) + 1
        }
      },
      finalExamScore: finalExamScoreData,
      totalQuestionsAnswered: progress.totalQuestionsAnswered + activeQuizModule.questions.length,
      correctAnswersCount: progress.correctAnswersCount + results.earnedScore,
      certificateCode: certCode,
      certificateIssuedDate: certDate,
    };

    // Check achievements
    const { updatedProgress, newlyUnlocked } = checkAndUnlockBadges(
      baseUpdatedProgress,
      results.passed,
      results.perfectHeartRun,
      moduleId
    );

    handleUpdateProgress(updatedProgress);

    if (newlyUnlocked.length > 0) {
      const firstBadge = BADGES_LIST.find(b => b.id === newlyUnlocked[0]);
      if (firstBadge) {
        setBadgeToast(`¡Nueva Insignia Desbloqueada: ${firstBadge.title}!`);
        setTimeout(() => setBadgeToast(null), 4500);
      }
    }

    setActiveQuizModule(null);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // If student just passed the Final Exam, celebrate and open Certificate Modal
    if (isFinalExam && results.passed) {
      setTimeout(() => {
        setIsCertificateOpen(true);
      }, 700);
    }
  };

  const handleResetStudentProgress = () => {
    const fresh = createDefaultUser(progress.fullName);
    handleUpdateProgress(fresh);
    setCurrentView('dashboard');
  };

  const cefrInfo = calculateCEFR(progress);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* Toast Notification for Badges */}
      {badgeToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#0f172a] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-sky-500/50 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)]">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-black text-sky-400 uppercase tracking-wider">¡Logro Desbloqueado!</p>
            <p className="text-xs font-bold text-white">{badgeToast}</p>
          </div>
        </div>
      )}

      {/* Main Global Navigation */}
      <Navbar
        currentView={currentView === 'quiz' ? 'stage3' : currentView}
        onNavigate={(view) => {
          setActiveQuizModule(null);
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        progress={progress}
        cefrLevel={cefrInfo.level}
        activeLives={currentView === 'quiz' ? 3 : null}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onChangeStudent={() => setIsStudentModalOpen(true)}
      />

      {/* Primary Application Views */}
      <main className="flex-1">
        
        {/* Active Assessment (Quiz or Final Exam) */}
        {currentView === 'quiz' && activeQuizModule && (
          <QuizEngine
            module={activeQuizModule}
            userProgress={progress}
            onQuizComplete={handleQuizComplete}
            onExit={() => {
              setActiveQuizModule(null);
              setCurrentView('dashboard');
            }}
            onReportViolation={handleReportViolation}
          />
        )}

        {/* Dashboard: Course Hub & Method Overview */}
        {currentView === 'dashboard' && (
          <Dashboard
            progress={progress}
            onStartStage1={handleStartStage1}
            onStartStage2={handleStartStage2}
            onStartStage3={handleStartStage3}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onOpenTeacherReport={() => setCurrentView('teacher')}
          />
        )}

        {/* Stage 1: Guided Learning (Teoría, explicaciones y fórmulas) */}
        {currentView === 'stage1' && (
          <GuidedLearningView
            initialLevelId={selectedLevelId}
            onStartPractice={(lvlId) => handleStartStage2(lvlId)}
            onBackToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {/* Stage 2: Smart Practice (10 modalidades interactivas con IA) */}
        {currentView === 'stage2' && (
          <PracticeView
            initialLevelId={selectedLevelId}
            userProgress={progress}
            onUpdateProgress={handleUpdateProgress}
            onStartEvaluation={(lvlId) => handleStartStage3(lvlId)}
            onBackToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {/* Stage 3: Official Evaluations Hub */}
        {currentView === 'stage3' && (
          <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
            <div className="text-center mb-8">
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full">
                Etapa 3 &bull; Evaluaciones Oficiales
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                Centro Oficial de Evaluaciones y Exámenes
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-1">
                Todas las pruebas son evaluadas bajo estrictos controles de integridad: 3 vidas por intento, sin explicaciones ni traductores durante la prueba.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {EVALUATION_MODULES.map((mod) => {
                const isPassed = mod.isFinalExam 
                  ? !!progress.finalExamScore 
                  : progress.completedQuizzes.includes(mod.id);
                
                // Examen final unlocked only when all 3 quizzes passed
                const isUnlocked = mod.isFinalExam 
                  ? (progress.completedQuizzes.includes(1) && progress.completedQuizzes.includes(2) && progress.completedQuizzes.includes(3))
                  : (mod.id === 1 || progress.completedQuizzes.includes(mod.id - 1));

                return (
                  <div
                    key={mod.id}
                    className={`bg-[#0f172a] rounded-3xl p-6 border flex flex-col justify-between transition ${
                      isPassed
                        ? 'border-emerald-500/50 shadow-lg shadow-emerald-950/20'
                        : isUnlocked
                        ? 'border-sky-500/50 hover:border-sky-400 shadow-lg shadow-sky-950/20'
                        : 'border-slate-800 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {mod.questions.length} preguntas &bull; Máx {mod.maxScore} pts
                        </span>
                        <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                          isPassed
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : isUnlocked
                            ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                            : 'bg-slate-800 text-slate-500 border-slate-700'
                        }`}>
                          {isPassed ? 'Aprobado' : isUnlocked ? 'Disponible' : 'Bloqueado'}
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-white mb-1">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                        {mod.description}
                      </p>

                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1 mb-6">
                        <div className="flex justify-between">
                          <span>Aprobación mínima:</span>
                          <strong className="text-white">{mod.passingScore} pts ({Math.round((mod.passingScore/mod.maxScore)*100)}%)</strong>
                        </div>
                        {progress.quizScores[mod.id] && (
                          <div className="flex justify-between text-sky-400">
                            <span>Mejor resultado:</span>
                            <strong className="font-mono">{progress.quizScores[mod.id].score} / {mod.maxScore} pts</strong>
                          </div>
                        )}
                      </div>
                    </div>

                    {isUnlocked ? (
                      <button
                        onClick={() => handleStartStage3(mod.id)}
                        className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg ${
                          isPassed
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950/40 font-black'
                        }`}
                      >
                        <span>{isPassed ? 'Reintentar Evaluación' : 'Iniciar Prueba Oficial (3 Vidas)'}</span>
                      </button>
                    ) : (
                      <div className="w-full py-3 bg-slate-900 border border-slate-800 text-slate-500 rounded-2xl text-xs font-bold text-center">
                        {mod.isFinalExam ? 'Supera los 3 quizzes previos para desbloquear' : `Supera el Quiz ${mod.id - 1} para desbloquear`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tense Formula Reference Guide */}
        {currentView === 'guide' && (
          <GrammarGuide
            onStartPractice={(levelId) => handleStartStage2(levelId)}
            selectedTenseId={selectedTenseForGuide}
          />
        )}

        {/* Badges and Rewards */}
        {currentView === 'badges' && (
          <BadgesView
            progress={progress}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {/* Teacher Supervision Report */}
        {currentView === 'teacher' && (
          <TeacherReportModal
            progress={progress}
            onResetProgress={handleResetStudentProgress}
            onClose={() => setCurrentView('dashboard')}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 px-4 text-center text-xs mt-12">
        <div className="max-w-5xl mx-auto space-y-2">
          <p className="font-semibold text-slate-300">
            ESL Verb Tenses Master &bull; Plataforma Educativa Inteligente con Tutor Virtual
          </p>
          <p className="text-slate-500 text-[11px]">
            Diseñada bajo la metodología de 3 Etapas (Aprender &bull; Practicar &bull; Evaluar) avalada por el Profesor Luis López Picado.
          </p>
          <p className="text-slate-500 text-[11px] font-mono">
            profeluisingles@gmail.com &bull; WhatsApp: +506 8649-0444
          </p>
        </div>
      </footer>

      {/* Certificate Modal */}
      {isCertificateOpen && (
        <CertificateModal
          progress={progress}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

      {/* Student Welcome / Switch Student Modal */}
      {isStudentModalOpen && (
        <StudentWelcomeModal
          initialName={progress.fullName === 'Estudiante' ? '' : progress.fullName}
          onSave={handleSaveStudentName}
          onCancel={progress.fullName && progress.fullName !== 'Estudiante' ? () => setIsStudentModalOpen(false) : undefined}
        />
      )}

    </div>
  );
}
