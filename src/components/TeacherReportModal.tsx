import React, { useState } from 'react';
import { 
  Shield, 
  Download, 
  Mail, 
  CheckCircle2, 
  User, 
  Award, 
  RotateCcw, 
  FileSpreadsheet,
  AlertCircle,
  MessageCircle,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';
import { UserProgress } from '../types';
import { calculateCEFR, exportStudentReportCSV, getWhatsAppShareUrl, getEmailShareUrl } from '../utils/progress';

interface TeacherReportModalProps {
  progress: UserProgress;
  onResetProgress: () => void;
  onClose: () => void;
}

export const TeacherReportModal: React.FC<TeacherReportModalProps> = ({
  progress,
  onResetProgress,
  onClose
}) => {
  const cefrInfo = calculateCEFR(progress);

  const handleExportCSV = () => {
    exportStudentReportCSV(progress);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      
      {/* Top Banner */}
      <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-8 text-white mb-8 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center font-bold shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                Vista Docente y de Supervisión
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-1 text-white">
                Profesor Luis López Picado
              </h2>
              <p className="text-xs text-slate-400">
                Correo: <span className="text-sky-300 font-mono">profeluisingles@gmail.com</span> • WhatsApp: <span className="text-emerald-400 font-mono">+506 8649-0444</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              onClick={handleExportCSV}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-950/40 border border-emerald-400/30"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Exportar Reporte a Excel (CSV)</span>
            </button>

            <a
              href={getWhatsAppShareUrl(progress)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Reportar por WhatsApp</span>
            </a>

            <a
              href={getEmailShareUrl(progress)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-sky-950/40 border border-sky-400/30"
            >
              <Mail className="w-4 h-4" />
              <span>Enviar al Correo Oficial</span>
            </a>
          </div>
        </div>
      </div>

      {/* Student Academic Record */}
      <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl mb-8 space-y-6">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-sky-400" />
          <span>Ficha Técnica y Métricas del Estudiante</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-[#020617] p-4 rounded-2xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Estudiante</span>
            <p className="text-base font-extrabold text-white">{progress.fullName}</p>
          </div>

          <div className="bg-[#020617] p-4 rounded-2xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Nivel CEFR Actual</span>
            <p className="text-base font-extrabold text-sky-400">
              Nivel {cefrInfo.level} ({cefrInfo.percentage}%)
            </p>
          </div>

          <div className="bg-[#020617] p-4 rounded-2xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Integridad Anti-Fraude</span>
            <div className="flex items-center gap-1.5 mt-1">
              {progress.securityViolationsCount === 0 ? (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>0 incidentes (100% limpia)</span>
                </span>
              ) : (
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1 font-mono">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{progress.securityViolationsCount} cambios de pestaña</span>
                </span>
              )}
            </div>
          </div>

          <div className="bg-[#020617] p-4 rounded-2xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Código de Registro</span>
            <p className="text-xs font-mono font-bold text-slate-300 break-all">
              {progress.certificateCode || 'Pendiente de Examen Final'}
            </p>
          </div>
        </div>

        {/* Evaluations Detail Table */}
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Desglose Oficial de Evaluaciones y Quizzes
        </h4>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#020617] text-slate-400 font-extrabold uppercase border-b border-slate-800">
              <tr>
                <th className="p-3.5">Evaluación</th>
                <th className="p-3.5">Contenido</th>
                <th className="p-3.5">Requisito Mínimo</th>
                <th className="p-3.5">Puntaje Obtenido</th>
                <th className="p-3.5">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {/* Quiz 1 */}
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3.5 font-bold text-white">Quiz Nivel 1</td>
                <td className="p-3.5">Tiempos Presentes (20 preguntas)</td>
                <td className="p-3.5 text-slate-400">16 / 20 pts (80%)</td>
                <td className="p-3.5 font-bold text-sky-400">
                  {progress.quizScores[1] ? `${progress.quizScores[1].score} / 20 pts` : 'No realizado'}
                </td>
                <td className="p-3.5">
                  {progress.completedQuizzes.includes(1) ? (
                    <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">Aprobado</span>
                  ) : (
                    <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold">Pendiente</span>
                  )}
                </td>
              </tr>

              {/* Quiz 2 */}
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3.5 font-bold text-white">Quiz Nivel 2</td>
                <td className="p-3.5">Tiempos Pasados (20 preguntas)</td>
                <td className="p-3.5 text-slate-400">16 / 20 pts (80%)</td>
                <td className="p-3.5 font-bold text-sky-400">
                  {progress.quizScores[2] ? `${progress.quizScores[2].score} / 20 pts` : 'No realizado'}
                </td>
                <td className="p-3.5">
                  {progress.completedQuizzes.includes(2) ? (
                    <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">Aprobado</span>
                  ) : (
                    <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold">Pendiente</span>
                  )}
                </td>
              </tr>

              {/* Quiz 3 */}
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3.5 font-bold text-white">Quiz Nivel 3</td>
                <td className="p-3.5">Tiempos Futuros (20 preguntas)</td>
                <td className="p-3.5 text-slate-400">16 / 20 pts (80%)</td>
                <td className="p-3.5 font-bold text-sky-400">
                  {progress.quizScores[3] ? `${progress.quizScores[3].score} / 20 pts` : 'No realizado'}
                </td>
                <td className="p-3.5">
                  {progress.completedQuizzes.includes(3) ? (
                    <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">Aprobado</span>
                  ) : (
                    <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold">Pendiente</span>
                  )}
                </td>
              </tr>

              {/* Final Exam */}
              <tr className="hover:bg-slate-800/30 transition-colors bg-sky-950/20">
                <td className="p-3.5 font-bold text-amber-300 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>Examen Final</span>
                </td>
                <td className="p-3.5">Grand Master 12 Tiempos (50 preguntas)</td>
                <td className="p-3.5 text-slate-400">
                  B2: 86-90 pts &bull; C1: 91-100 pts
                </td>
                <td className="p-3.5 font-bold text-emerald-400">
                  {progress.finalExamScore ? `${progress.finalExamScore.score} / 50 pts (${progress.finalExamScore.percentage}%)` : 'No realizado'}
                </td>
                <td className="p-3.5">
                  {progress.finalExamScore ? (
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-bold">
                      Certificado {progress.finalExamScore.cefr} ({progress.finalExamScore.percentage}%)
                    </span>
                  ) : (
                    <span className="bg-slate-800 text-slate-500 border border-slate-700 px-2.5 py-0.5 rounded-full font-bold">
                      Bloqueado / Pendiente
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Administration Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
            <span>El reinicio de datos borra el historial local para realizar una nueva prueba limpia.</span>
          </div>

          <button
            onClick={() => {
              if (window.confirm("¿Seguro que deseas reiniciar el progreso del estudiante?")) {
                onResetProgress();
              }
            }}
            className="text-rose-400 hover:text-rose-300 font-bold text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-rose-500/10 border border-rose-500/20 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Avance</span>
          </button>
        </div>

      </div>

    </div>
  );
};
