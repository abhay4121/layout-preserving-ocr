
import {
  FileText,
  X,
  ArrowRight,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";

const FilePreview = ({ file, onRemove, onContinue, documentKind }) => {
  const isScanned = documentKind === "scanned";

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="font-bold text-slate-800">
            Document ready
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Your file has been uploaded successfully.
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
          <CheckCircle2 size={15} />
          Uploaded
        </div>
      </div>

      {/* File Details */}
      <div className="flex items-center justify-between gap-3 p-5 sm:p-6">

        <div className="flex min-w-0 items-center gap-4">

          {/* File Icon */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileText size={29} strokeWidth={1.7} />
          </div>

          {/* File Information */}
          <div className="min-w-0">
            <p className="break-all text-sm font-bold text-slate-800 sm:text-base">
              {file.name}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
              {" · "}
              {isScanned ? "Scanned Document" : "Digital PDF"}
            </p>

            <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700">
              {isScanned ? "PaddleOCR Processing" : "Text Extraction"}
            </span>
          </div>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          title="Remove file"
          aria-label="Remove uploaded file"
        >
          <X size={20} />
        </button>

      </div>

      {/* Processing Information */}
      <div className="mx-5 mb-5 flex items-center gap-2 rounded-xl bg-slate-50 p-3 sm:mx-6">
        <ShieldCheck size={17} className="shrink-0 text-blue-600" />

        <p className="text-xs leading-5 text-slate-600">
          Your document is ready for the next step.
          Continue to view and work with its extracted content.
        </p>
      </div>

      {/* Continue Button */}
      <div className="border-t border-slate-100 bg-slate-50/70 p-5 sm:px-6">
        <button
          type="button"
          onClick={onContinue}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-100 transition hover:bg-blue-700 hover:shadow-lg"
        >
          Continue to Document Editor
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};

export default FilePreview;
