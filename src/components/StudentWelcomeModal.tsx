import React, { useState } from 'react';
import { GraduationCap, ArrowRight, BookOpenCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface StudentWelcomeModalProps {
  initialName?: string;
  onSave: (fullName: string) => void;
  onCancel?: () => void;
}

export const StudentWelcomeModal: React.FC<StudentWelcomeModalProps> = ({
  initialName = '',
  onSave,
  onCancel
}) => {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor ingresa tu nombre completo.');
      return;
    }
    if (name.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres.');
      return;
    }
    onSave(name.trim());
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#020617]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0f172a] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-800 text-center animate-in fade-in zoom-in duration-200">
        
        <div className="w-16 h-16 bg-sky-500/15 text-sky-400 border border-sky-500/30 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(14,165,233,0.25)]">
          <GraduationCap className="w-9 h-9" />
        </div>

        <span className="text-[11px] font-black uppercase tracking-wider bg-sky-500/15 text-sky-400 px-3 py-1 rounded-full border border-sky-500/30">
          Bienvenido al Curso de Inglés
        </span>

        <h2 className="text-2xl font-black text-white mt-2 mb-1">
          ESL Verb Tenses Master
        </h2>
        
        <p className="text-xs text-slate-400 mb-6">
          Curso interactivo oficial con el <strong className="text-white">Profe Luis López Picado</strong> para dominar los 12 tiempos verbales y graduarte con tu título oficial.
        </p>

        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Nombre Completo del Estudiante
            </label>
            <input
              id="input-student-fullname"
              type="text"
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Ejemplo: Duván Muñoz López"
              className="w-full px-4 py-3.5 rounded-2xl bg-[#020617] border-2 border-slate-700 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/20 text-sm font-medium text-white placeholder:text-slate-500 transition-all focus:outline-none"
            />
            {error && <p className="text-xs text-rose-400 mt-1 font-semibold">{error}</p>}
          </div>

          <div className="bg-[#020617] p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>3 Vidas por cada evaluación interactiva.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Ejercicios de escritura y comprensión auditiva nativa.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Título final con certificación de nivel A1 a C1.</span>
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="w-1/3 py-3 rounded-xl border border-slate-700 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                Cancelar
              </button>
            )}
            <button
              id="btn-start-course"
              type="submit"
              className="flex-1 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-sky-950/50 border border-sky-400/30 flex items-center justify-center gap-2"
            >
              <span>Ingresar a la Plataforma</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
