
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocuments, deleteDocument } from "../services/api";
import {
  FileText,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
  FolderOpen
} from "lucide-react";

const RecentDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchDocs = async () => {
      try {
        const data = await getDocuments();

        if (isMounted) {
          setDocuments(
            Array.isArray(data) ? data : data.results || []
          );
        }
      } catch (err) {
        console.error("Failed to load documents list:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDocs();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      await deleteDocument(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error("Failed to delete document:", err);
    }
  };

  if (loading || documents.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto mt-14 w-full max-w-5xl px-4 pb-16 sm:px-6">

      {/* Section Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FolderOpen size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Your Documents
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Access your previously uploaded files
              </p>
            </div>
          </div>
        </div>

        <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
          {documents.length} {documents.length === 1 ? "Document" : "Documents"}
        </span>

      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        {documents.map((doc) => {
          const isCompleted = doc.status === "completed";

          const isProcessing =
            doc.status === "processing" ||
            doc.status === "pending";

          return (
            <div
              key={doc.id}
              onClick={() => navigate(`/document/${doc.id}`)}
              className="group relative flex min-w-0 cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50"
            >

              {/* File Details */}
              <div className="flex min-w-0 items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
                  <FileText size={25} strokeWidth={1.7} />
                </div>

                <div className="min-w-0">

                  <h3
                    className="truncate text-sm font-bold text-slate-800"
                    title={doc.file_name}
                  >
                    {doc.file_name}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span>
                      {((doc.file_size || 0) / 1024 / 1024).toFixed(2)} MB
                    </span>

                    <span>•</span>

                    <span>
                      {new Date(doc.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="mt-3">

                    {isCompleted && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                        <CheckCircle2 size={13} />
                        Completed
                      </span>
                    )}

                    {isProcessing && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                        <Loader2 size={13} className="animate-spin" />
                        Processing
                      </span>
                    )}

                    {!isCompleted && !isProcessing && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700">
                        <AlertCircle size={13} />
                        Failed
                      </span>
                    )}

                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-1">

                <button
                  type="button"
                  onClick={(e) => handleDelete(e, doc.id)}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                  title="Delete document"
                  aria-label="Delete document"
                >
                  <Trash2 size={17} />
                </button>

                <div className="rounded-lg p-2 text-slate-300 transition group-hover:text-blue-600">
                  <ArrowUpRight size={19} />
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Bottom Note */}
      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
        <Clock size={14} />
        Your recently uploaded documents appear here.
      </div>

    </section>
  );
};

export default RecentDocuments;
