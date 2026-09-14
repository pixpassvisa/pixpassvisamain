import React from "react";
import { UploadIcon, InfoIcon, LockIcon, CheckIcon } from "./Icons";
import PhotoGuidelinesModal from "../../components/PhotoGuidelinesModal";

interface UploadAreaProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  guidelinesOpen: boolean;
  setGuidelinesOpen: (open: boolean) => void;
  onShowGuide: () => void;
  locale?: "en" | "fr" | "de";
}

const translations = {
  en: {
    showGuide: "See High-Quality Example Photos",
    title: "Upload Photo for Validation",
    subtitle: "Drag and drop or click to browse files",
    buttonText: "Select Image",
    privacy: "Privacy Secure: Images are processed locally and never stored.",
  },
  fr: {
    showGuide: "Voir des exemples de photos haute qualité",
    title: "Télécharger une photo pour validation",
    subtitle: "Glissez-déposez ou cliquez pour parcourir les fichiers",
    buttonText: "Sélectionner une image",
    privacy: "Confidentialité sécurisée : les images sont traitées localement et ne sont jamais stockées.",
  },
  de: {
    showGuide: "Hochwertige Beispielfotos anzeigen",
    title: "Foto zur Überprüfung hochladen",
    subtitle: "Ziehen und ablegen oder klicken, um Dateien zu durchsuchen",
    buttonText: "Bild auswählen",
    privacy: "Datenschutz sicher: Bilder werden lokal verarbeitet und niemals gespeichert.",
  }
};

const UploadArea: React.FC<UploadAreaProps> = ({
  onFileChange,
  guidelinesOpen,
  setGuidelinesOpen,
  onShowGuide,
  locale = "en",
}) => {
  const t = translations[locale];

  return (
    <div className="flex-1 flex flex-col gap-3">
      {/* Photo Guidelines Button */}
      {/* <button
        onClick={() => setGuidelinesOpen(true)}
        className="w-full flex items-center justify-center gap-2 p-4 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm rounded-2xl text-slate-700 font-semibold transition-all hover:scale-[1.01]"
      >
        <InfoIcon className="w-5 h-5 text-blue-600" />
        View Photo Guidelines & Examples
      </button> */}

      {/* Photo Guidelines Modal */}
      {/* <PhotoGuidelinesModal
        isOpen={guidelinesOpen}
        onClose={() => setGuidelinesOpen(false)}
      /> */}

      {/* Manual Guide Trigger */}
      <div className="flex justify-center -mt-2">
        <button
          onClick={onShowGuide}
          className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 transition-colors"
        >
          <CheckIcon className="w-3 h-3" />
          {t.showGuide}
        </button>
      </div>

      {/* Upload area */}
      <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-white/60 hover:bg-white hover:border-blue-400 transition-all duration-300 group cursor-pointer py-6">
        <input
          id="tool-photo-input"
          type="file"
          accept="image/jpeg, image/png, image/heic"
          onChange={onFileChange}
          onClick={(e) => ((e.target as HTMLInputElement).value = "")}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="w-12 h-12 bg-blue-50/70 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
          <UploadIcon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-sm font-bold text-slate-900 mb-0.5">
          {t.title}
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          {t.subtitle}
        </p>
        <div className="flex items-center gap-4">
          <span className="bg-slate-900 text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-lg group-hover:shadow-blue-500/20/10 transition-shadow">
            {t.buttonText}
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-5 flex items-center gap-2 font-medium">
          <LockIcon className="w-3.5 h-3.5" />
          {t.privacy}
        </p>
      </div>
    </div>
  );
};

export default UploadArea;
