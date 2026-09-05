import React, { useRef, useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Award, 
  CheckCircle, 
  ShieldCheck,
  Share2,
  Mail,
  MessageCircle,
  FileSpreadsheet
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UserProgress } from '../types';
import { calculateCEFR, getWhatsAppShareUrl, getEmailShareUrl, exportStudentReportCSV } from '../utils/progress';

interface CertificateModalProps {
  progress: UserProgress;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ progress, onClose }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const cefrInfo = calculateCEFR(progress);

  const issueDate = progress.certificateIssuedDate || new Date().toLocaleDateString('es-CR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const certCode = progress.certificateCode || 'ESL-LUIS-2026-X8F91A';

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    setIsGeneratingPDF(true);

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFFFF',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: 'letter'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'JPEG', 0.25, 0.25, pdfWidth - 0.5, pdfHeight - 0.5);
      pdf.save(`Certificado_ESL_${progress.fullName.replace(/\s+/g, '_')}_Nivel_${cefrInfo.level}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#020617]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0f172a] rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col my-auto animate-in fade-in zoom-in duration-200">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0f172a]">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-extrabold text-white text-sm sm:text-base">
                Acreditación y Certificación Oficial de Dominio de Inglés
              </h3>
              <p className="text-[11px] text-slate-400">
                12 Tiempos Verbales • Profesor Luis López Picado
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Share Quick Action Ribbon */}
        <div className="bg-slate-900 px-6 py-3 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-300 font-medium">
            Compartir certificado con el profesor:
          </span>

          <div className="flex items-center gap-2">
            <a
              href={getWhatsAppShareUrl(progress)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 font-bold transition flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp (86490444)</span>
            </a>

            <a
              href={getEmailShareUrl(progress)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-500/30 font-bold transition flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Correo (profeluisingles@gmail.com)</span>
            </a>

            <button
              onClick={() => exportStudentReportCSV(progress)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 font-bold transition flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
              <span>Reporte CSV</span>
            </button>
          </div>
        </div>

        {/* Certificate Container (Render area for PDF) */}
        <div className="p-4 sm:p-8 overflow-x-auto flex justify-center bg-[#020617]/70 border-y border-slate-800/60">
          
          <div
            id="certificate-render-target"
            ref={certificateRef}
            className="w-[850px] min-h-[580px] bg-[#fdfcf7] text-slate-900 border-12 border-indigo-950 rounded-2xl p-6 sm:p-8 relative shadow-2xl font-serif select-none"
            style={{
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.4)'
            }}
          >
            {/* Ornate Inner Double Border */}
            <div className="border-4 border-amber-600/70 rounded-xl p-6 sm:p-8 h-full flex flex-col justify-between relative bg-gradient-to-b from-[#fffef9] via-[#fbf8ed] to-[#fffef9]">
              
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-700" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-700" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-700" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-700" />

              {/* Certificate Header */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-tr from-amber-500 to-amber-300 rounded-full flex items-center justify-center text-indigo-950 shadow-md border-2 border-white">
                  <Award className="w-10 h-10" />
                </div>

                <p className="text-[11px] font-sans font-black uppercase tracking-[0.25em] text-amber-800 mb-1">
                  Certificación Oficial de Competencia Lingüística
                </p>

                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-indigo-950 font-serif-title">
                  Certificado de Dominio de Inglés
                </h1>
                
                <p className="text-xs sm:text-sm text-slate-600 font-sans italic mt-0.5">
                  Marco Común Europeo de Referencia (MCER / CEFR) • 12 Tiempos Verbales
                </p>

                <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto my-3" />
                
                <p className="text-xs text-slate-600 font-sans uppercase tracking-wider">
                  Se confiere el presente certificado con honores a:
                </p>

                {/* Student Full Name */}
                <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 font-sans tracking-tight mt-1 mb-2 underline decoration-amber-500 underline-offset-8">
                  {progress.fullName}
                </h2>

                <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-700 font-sans leading-relaxed mt-4">
                  Por haber completado exitosamente las tres etapas formativas (Aprendizaje Guiado, Práctica Inteligente y Evaluación Oficial Holística), demostrando competencia en gramática, comprensión auditiva (Listening), lectura (Reading) y escritura (Writing) en los 12 tiempos verbales de la lengua inglesa.
                </p>

                {/* CEFR Level Banner with Exact Score Criteria */}
                <div className="inline-flex items-center gap-4 bg-amber-50 border-2 border-amber-500/60 px-6 py-2.5 rounded-2xl my-4 font-sans">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                      Nivel CEFR Acreditado
                    </span>
                    <span className="text-xl font-black text-indigo-950">
                      Nivel {cefrInfo.level} ({cefrInfo.level === 'C1' ? 'Avanzado 91-100 pts' : cefrInfo.level === 'B2' ? 'Intermedio Alto 86-90 pts' : cefrInfo.title})
                    </span>
                  </div>
                  <div className="h-9 w-px bg-amber-300" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                      Puntaje Examen Final
                    </span>
                    <span className="text-xl font-black text-amber-700">
                      {progress.finalExamScore ? `${progress.finalExamScore.percentage} pts` : `${progress.xp} XP`}
                    </span>
                  </div>
                </div>

              </div>

              {/* Certificate Signatures & Security Footer */}
              <div className="grid grid-cols-3 items-end pt-4 border-t border-slate-300/80 font-sans text-xs">
                
                {/* Teacher Signature & Contact */}
                <div className="text-left">
                  <div className="w-40 border-b-2 border-slate-800 pb-1 mb-1">
                    <span className="font-serif italic text-base text-indigo-950 font-bold block">
                      Luis López Picado
                    </span>
                  </div>
                  <p className="font-extrabold text-slate-900 text-[11px]">Prof. Luis López Picado</p>
                  <p className="text-[10px] text-slate-600">profeluisingles@gmail.com</p>
                  <p className="text-[10px] text-slate-600">WhatsApp: +506 8649-0444</p>
                </div>

                {/* Security Seal & Code */}
                <div className="text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-amber-600 flex items-center justify-center text-amber-700 mb-1">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Código de Registro</p>
                  <p className="font-mono font-bold text-indigo-950 text-[11px] tracking-wider">
                    {certCode}
                  </p>
                  <p className="text-[8px] text-slate-500">Integridad: Verificada</p>
                </div>

                {/* Issue Date */}
                <div className="text-right">
                  <p className="font-bold text-slate-900 text-[11px]">{issueDate}</p>
                  <p className="text-[10px] text-slate-500">Fecha de Expedición</p>
                  <p className="text-[9px] text-emerald-700 font-bold mt-0.5 flex items-center justify-end gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Aprobación Oficial Registrada</span>
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-6 bg-[#0f172a] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            Tu certificado oficial emitido por el Profesor Luis López Picado es válido para acreditación académica.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 font-bold text-xs text-slate-300 hover:text-white transition flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 disabled:opacity-50 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-sky-950/50"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPDF ? 'Generando PDF...' : 'Descargar en PDF'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
