export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type TenseCategory = 'present' | 'past' | 'future';

export type QuestionType = 
  | 'multiple_choice' 
  | 'writing' 
  | 'listening' 
  | 'structure_order' 
  | 'fill_blank' 
  | 'aff_to_neg' 
  | 'aff_to_question' 
  | 'translate_en_es' 
  | 'translate_es_en' 
  | 'reading' 
  | 'create_sentence' 
  | 'conversational'
  | 'error_correction';

export type LearningStage = 'guided_learning' | 'practice' | 'evaluation';

export interface VerbTense {
  id: string;
  nameEn: string;
  nameEs: string;
  category: TenseCategory;
  level: CEFRLevel;
  usageSummary: string;
  whenToUse: string[];
  rules: string[];
  auxiliaryGuide: string;
  commonMistakes: {
    wrong: string;
    right: string;
    reason: string;
  }[];
  structure: {
    affirmative: string;
    negative: string;
    interrogative: string;
  };
  examples: {
    affirmative: { en: string; es: string };
    negative: { en: string; es: string };
    interrogative: { en: string; es: string };
  };
  signalWords: string[];
  tips: string;
}

export interface PracticeExercise {
  id: string;
  tenseId: string;
  levelId: number; // 1: Present, 2: Past, 3: Future
  type: QuestionType;
  title: string;
  prompt: string;
  contextHint?: string;
  audioText?: string;
  readingPassage?: string;
  options?: string[];
  correctAnswer: string;
  acceptableAnswers?: string[];
  wordTiles?: string[];
  targetStructure?: string;
  explanationWhatWrong?: string;
  explanationWhyWrong?: string;
  howToCorrect?: string;
  relatedGrammarRule: string;
}

export interface QuizQuestion {
  id: string;
  tenseId: string;
  type: QuestionType;
  prompt: string;
  contextHint?: string;
  audioText?: string;
  readingPassage?: string;
  options?: string[];
  correctAnswer: string;
  acceptableAnswers?: string[];
  wordTiles?: string[];
  explanation: string;
  points: number; // 1 pt each for 20-pt quiz or 50-pt final exam
}

export interface EvaluationModule {
  id: number; // 1: Present Quiz, 2: Past Quiz, 3: Future Quiz, 4: Final Exam
  title: string;
  subtitle: string;
  category: string;
  isFinalExam?: boolean;
  coveredTenses: string[];
  description: string;
  totalQuestions: number; // 20 for quizzes 1-3, 50 for Final Exam
  passingScore: number; // e.g., 16/20 (80%) for quizzes, 43/50 (86% = B2) for Final Exam
  maxScore: number; // 20 or 50
  questions: QuizQuestion[];
}

export interface StudentMistake {
  id: string;
  tenseId: string;
  mistakeType: string;
  questionText: string;
  studentAnswer: string;
  correctAnswer: string;
  timestamp: string;
}

export interface UserProgress {
  fullName: string;
  studentId?: string;
  avatarSeed: string;
  xp: number;
  level: number;
  streakDays: number;
  
  // Practice & Mastery tracking
  practiceStats: Record<string, { practiced: number; correct: number; errors: number }>;
  levelMasteryPercent: Record<number, number>; // 1, 2, 3: percentage (0-100)
  
  // Quizzes & Final Exam
  completedQuizzes: number[]; // [1, 2, 3, 4]
  quizScores: Record<number, { 
    score: number; 
    maxScore: number; 
    passed: boolean; 
    attempts: number; 
    date: string 
  }>;
  
  // Final Exam
  finalExamScore?: {
    score: number;
    maxScore: number;
    percentage: number;
    cefr: CEFRLevel;
    date: string;
  };

  // Anti-cheat / Security
  securityViolationsCount: number;
  
  // Error log
  mistakesHistory: StudentMistake[];

  // Badges & Certification
  unlockedBadges: string[];
  totalQuestionsAnswered: number;
  correctAnswersCount: number;
  certificateIssuedDate?: string;
  certificateCode?: string;
  verifiedCEFR?: CEFRLevel;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'progress' | 'mastery' | 'skill';
}
