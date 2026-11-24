
const HomeMiddle = () => {
  return (
    <section className="relative overflow-hidden bg-[#f8faff] px-6 py-20 text-center">
      <div className="mx-auto max-w-4xl">

        {/* Small Label */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-blue-600"></span>
          <span className="text-sm font-semibold tracking-wide text-blue-700">
            AI-POWERED DOCUMENT PROCESSING
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
          Your Documents,
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Ready for Anything.
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          Transform scanned documents and PDFs into editable,
          searchable content. DocuFlow AI extracts your text
          while keeping the original document structure intact.
        </p>

        {/* Feature Highlights */}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            ✓ Smart OCR Extraction
          </span>

          <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            ✓ Layout Preservation
          </span>

          <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            ✓ Editable Documents
          </span>
        </div>

      </div>
    </section>
  );
};

export default HomeMiddle;
