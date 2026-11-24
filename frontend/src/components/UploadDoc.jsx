
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Globe,
  Upload,
  Loader2,
  ScanLine,
  FileType,
  ShieldCheck,
  XCircle,
  Sparkles
} from "lucide-react";
import { uploadDocument } from "../services/api";
import FilePreview from "./FilePreview";

const UploadDoc = () => {
  const [activeTab, setActiveTab] = useState("convert");
  const [documentKind, setDocumentKind] = useState("normal");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
    if (!file) return;

    const allowedFile = /\.(pdf|jpe?g|png|bmp|tiff?|webp)$/i;

    if (!allowedFile.test(file.name)) {
      setErrorMsg(
        "Unsupported file type. Upload a PDF or an image (JPG, PNG, BMP, TIFF, WEBP)."
      );
      return;
    }

    const maxMb = 20;

    if (file.size > maxMb * 1024 * 1024) {
      setErrorMsg(`File is larger than the ${maxMb} MB limit.`);
      return;
    }

    const isImage = /\.(jpg|jpeg|png|webp|bmp|tif|tiff)$/i.test(file.name);
    const kind = isImage ? "scanned" : documentKind;

    if (isImage) setDocumentKind("scanned");

    setSelectedFile(file);
    setErrorMsg("");
    setUploading(true);

    try {
      const data = await uploadDocument(file, kind);
      console.log("Uploaded successfully:", data);
      setUploadedDocument(data);
    } catch (error) {
      console.error("Upload Failed:", error.response?.data || error.message);

      setSelectedFile(null);
      setUploadedDocument(null);

      if (
        error.code === "ERR_NETWORK" ||
        error.message?.includes("Network Error")
      ) {
        setErrorMsg(
          "Backend server is not running. Please start the Django server."
        );
      } else {
        setErrorMsg(
          `Upload failed: ${
            error.response?.data?.detail ||
            error.message ||
            "Unknown error"
          }`
        );
      }
    } finally {
      setUploading(false);
    }
  };

  const handleTypeChange = (event) => {
    const file = event.target.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleContinue = () => {
    if (!uploadedDocument?.id) {
      console.error("Document ID missing");
      return;
    }

    sessionStorage.setItem(
      "uploadedDocument",
      JSON.stringify(uploadedDocument)
    );

    navigate(`/document/${uploadedDocument.id}`);
  };

  return (
    <section className="min-h-screen bg-[#f8faff] px-4 py-12 sm:px-6 lg:py-16">

      <div className="mx-auto max-w-4xl">

        {/* Section Heading */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2">
            <Sparkles size={15} className="text-blue-600" />
            <span className="text-xs font-semibold tracking-wider text-blue-700">
              DOCUMENT WORKSPACE
            </span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Start with your{" "}
            <span className="text-blue-600">document</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Upload a PDF or image and let DocuFlow AI transform it
            into structured, editable content.
          </p>
        </div>

        {/* Main Upload Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">

          {/* Conversion Tabs */}
          <div className="flex border-b border-slate-100 px-5 sm:px-8">
            <button
              onClick={() => setActiveTab("convert")}
              className={`relative flex flex-1 items-center justify-center gap-2 py-5 text-sm font-semibold transition ${
                activeTab === "convert"
                  ? "text-blue-600"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <FileText size={19} />
              Convert Only

              {activeTab === "convert" && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("translate")}
              className={`relative flex flex-1 items-center justify-center gap-2 py-5 text-sm font-semibold transition ${
                activeTab === "translate"
                  ? "text-blue-600"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <Globe size={19} />
              Convert & Translate

              {activeTab === "translate" && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
              )}
            </button>
          </div>

          <div className="p-5 sm:p-9">

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <XCircle size={19} className="mt-0.5 shrink-0" />
                <p>{errorMsg}</p>
              </div>
            )}

            {/* Document Type Selection */}
            <div>
              <div className="mb-4">
                <h3 className="text-base font-bold text-slate-800">
                  Choose your document type
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Select the format that best describes your document.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Normal PDF */}
                <button
                  type="button"
                  onClick={() => setDocumentKind("normal")}
                  disabled={uploading}
                  className={`group rounded-2xl border p-5 text-left transition-all duration-200 ${
                    documentKind === "normal"
                      ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-100"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      documentKind === "normal"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                    }`}>
                      <FileType size={22} />
                    </div>

                    <span className={`h-5 w-5 rounded-full border-2 ${
                      documentKind === "normal"
                        ? "border-blue-600 bg-blue-600 ring-2 ring-blue-100"
                        : "border-slate-300"
                    }`} />
                  </div>

                  <h4 className="mt-4 font-bold text-slate-800">
                    Digital PDF
                  </h4>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    Text-based PDF with selectable content. Extract document
                    structure without OCR.
                  </p>

                  <span className="mt-3 inline-block text-xs font-semibold text-blue-600">
                    Direct text extraction
                  </span>
                </button>

                {/* Scanned PDF */}
                <button
                  type="button"
                  onClick={() => setDocumentKind("scanned")}
                  disabled={uploading}
                  className={`group rounded-2xl border p-5 text-left transition-all duration-200 ${
                    documentKind === "scanned"
                      ? "border-blue-500 bg-blue-50/70 ring-2 ring-blue-100"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      documentKind === "scanned"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                    }`}>
                      <ScanLine size={22} />
                    </div>

                    <span className={`h-5 w-5 rounded-full border-2 ${
                      documentKind === "scanned"
                        ? "border-blue-600 bg-blue-600 ring-2 ring-blue-100"
                        : "border-slate-300"
                    }`} />
                  </div>

                  <h4 className="mt-4 font-bold text-slate-800">
                    Scanned PDF / Image
                  </h4>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    Image-based documents, photographs and scanned pages.
                    Extract text using PaddleOCR.
                  </p>

                  <span className="mt-3 inline-block text-xs font-semibold text-blue-600">
                    AI-powered OCR
                  </span>
                </button>

              </div>
            </div>

            {/* Upload Area */}
            {!selectedFile ? (
              <div className="mt-8">
                <label
                  htmlFor="file-upload"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="group flex min-h-[270px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-[#f8faff] px-5 py-10 text-center transition duration-200 hover:border-blue-500 hover:bg-blue-50/50"
                >
                  {uploading ? (
                    <>
                      <Loader2
                        size={42}
                        className="mb-4 animate-spin text-blue-600"
                      />

                      <span className="font-semibold text-slate-800">
                        Processing your document...
                      </span>

                      <span className="mt-2 text-sm text-slate-500">
                        Please wait while we upload your file.
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition group-hover:scale-105">
                        <Upload size={30} />
                      </div>

                      <h3 className="text-lg font-bold text-slate-800">
                        Drop your document here
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        or click below to browse your files
                      </p>

                      <span className="mt-6 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">
                        Select Document
                      </span>

                      <p className="mt-5 text-xs text-slate-400">
                        PDF, JPG, JPEG, PNG, BMP, TIFF and WEBP
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        Maximum file size: 20 MB
                      </p>
                    </>
                  )}

                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.webp,.bmp,.tif,.tiff"
                    onChange={handleTypeChange}
                    disabled={uploading}
                  />
                </label>
              </div>
            ) : (
              <div className="mt-8">
                {uploading ? (
                  <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-blue-100 bg-blue-50/50 p-6 text-center">
                    <Loader2
                      size={40}
                      className="mb-4 animate-spin text-blue-600"
                    />

                    <span className="font-bold text-slate-800">
                      Uploading your document...
                    </span>

                    <span className="mt-2 max-w-full break-all text-xs text-slate-500">
                      {selectedFile.name}
                    </span>
                  </div>
                ) : (
                  <FilePreview
                    file={selectedFile}
                    documentKind={documentKind}
                    onRemove={() => {
                      setSelectedFile(null);
                      setUploadedDocument(null);
                    }}
                    onContinue={handleContinue}
                  />
                )}
              </div>
            )}

            {/* Security Note */}
            <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={16} className="text-blue-500" />
              Your document is processed through the connected OCR backend.
            </div>

          </div>
        </div>

        {/* Footer Note */}
        <p className="mx-auto mt-7 max-w-2xl text-center text-xs leading-6 text-slate-400">
          Supported documents include PDF and common image formats.
          Maximum upload size is 20 MB.
        </p>

      </div>
    </section>
  );
};

export default UploadDoc;
