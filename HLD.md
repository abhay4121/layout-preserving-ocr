# DocuFlow AI – Layout-Preserving OCR Editor

**Transform documents into editable, searchable formats while preserving their original layout.**

## About the Project

DocuFlow AI is an AI-powered document processing web application designed to extract text from digital PDFs and scanned documents while maintaining their original structure and visual layout.

The application uses PyMuPDF for digital PDF extraction and PaddleOCR for scanned document recognition. It converts extracted content into a structured, editable representation that users can review, modify, and export.

## Key Features

- **Document Upload:** Upload PDF and image files.
- **OCR Processing:** Extract text from scanned documents using PaddleOCR.
- **Digital PDF Extraction:** Extract existing text directly using PyMuPDF.
- **Layout Preservation:** Retain text positions, bounding boxes, font styles, images, and vector elements.
- **Document Editor:** Edit extracted text directly in the browser.
- **Original vs Editable Preview:** Compare the original document with its reconstructed version.
- **Text Formatting:** Modify font size, bold, italic, alignment, and text colour.
- **Multi-page Support:** Process documents containing multiple pages.
- **Document Export:** Export processed documents in PDF, DOCX, HTML, TXT, and JSON formats.
- **Recent Documents:** View and manage previously uploaded documents.

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite, Tailwind CSS |
| Backend | Python, Django, Django REST Framework |
| OCR Engine | PaddleOCR |
| PDF Processing | PyMuPDF |
| Database | SQLite |
| Programming Languages | Python, JavaScript, HTML, CSS |
| API Communication | REST API |

## System Architecture

The application follows a client-server architecture.

1. The React frontend allows users to upload and edit documents.
2. Django REST Framework handles API requests and document management.
3. PyMuPDF extracts text, images, and vector information from digital PDFs.
4. PaddleOCR processes scanned pages and extracts text with bounding boxes.
5. The extracted information is converted into structured layout JSON.
6. The frontend displays an editable reconstruction of the original document.
7. Users can save modifications and export the processed document.

## Project Structure

```text
DocuFlow-AI/
│
├── backend/
│   ├── backend/
│   ├── documents/
│   ├── media/
│   └── manage.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── images/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
│
├── scripts/
├── docs/
├── requirements.txt
├── requirements-ocr-local.txt
├── .env.example
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
cd layout-preserving-ocr-main
```

### 2. Set Up Python Environment

```bash
python -m venv env
```

Activate the environment on Windows PowerShell:

```powershell
.\env\Scripts\Activate.ps1
```

### 3. Install Backend Dependencies

For local PaddleOCR processing:

```bash
pip install -r requirements-ocr-local.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the project root using `.env.example` as a reference.

Configure the following variables:

```env
DJANGO_SECRET_KEY=your-secret-key
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

DJANGO_CSRF_TRUSTED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

CORS_ALLOW_ALL_ORIGINS=False
DJANGO_SERVE_MEDIA=False
DJANGO_UPLOAD_MAX_FILE_SIZE=20971520

OCR_BACKEND=paddle
```

Use a secure random secret key and never commit your `.env` file to GitHub.

### 5. Run Database Migrations

```bash
python backend/manage.py migrate
```

### 6. Start Django Backend

From the project root:

```bash
python backend/manage.py runserver 127.0.0.1:8000
```

Backend URL:

http://127.0.0.1:8000/

### 7. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 8. Start React Frontend

```bash
npm run dev
```

Frontend URL:

http://localhost:5173/

**Note:** Keep both frontend and backend development servers running while using the application.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/documents/` | List uploaded documents |
| POST | `/api/documents/` | Upload a document |
| GET | `/api/documents/<id>/` | Get document details |
| DELETE | `/api/documents/<id>/` | Delete a document |
| GET | `/api/documents/<id>/status/` | Check processing status |
| GET | `/api/documents/<id>/layout/` | Retrieve document layout |
| PATCH | `/api/documents/<id>/layout/` | Save edited layout |
| GET | `/api/documents/<id>/pages/<n>/` | Retrieve rendered page |
| GET | `/api/documents/<id>/export/?export_format=` | Export document |

### Supported Export Formats

- PDF
- DOCX
- HTML
- TXT
- JSON

## OCR Processing Workflow

1. User uploads a PDF or image.
2. Backend validates the file.
3. Digital PDF pages are processed using PyMuPDF.
4. Scanned pages are processed using PaddleOCR.
5. Text, bounding boxes, font information, and other layout elements are extracted.
6. Reading order is applied to extracted text.
7. Structured layout data is stored in the database.
8. The frontend displays the reconstructed document.
9. Users edit, save, and export the document.

## Current Limitations

- Handwriting recognition is not included.
- OCR accuracy depends on document quality and resolution.
- Complex tables are approximated using vector elements.
- Advanced semantic classification is not implemented.
- Multi-column reading-order detection has limitations.
- Authentication and multi-user accounts are outside the current version's scope.

## Future Enhancements

- User authentication and role-based access.
- Improved table and document structure recognition.
- Handwriting recognition.
- Advanced document formatting tools.
- Batch document processing.
- Cloud storage integration.
- Improved OCR accuracy and processing performance.

## Security

- Server-side file validation.
- Maximum upload size configuration.
- Environment-based secret management.
- Explicit CORS origin allowlist.
- Production deployment with secure cookies and HTTPS.

## Project Information

**Project Name:** DocuFlow AI – Layout-Preserving OCR Editor

**Project Type:** AI-Powered Web Application

**Project Domain:** Artificial Intelligence, OCR and Document Processing

**Primary Technologies:** React.js, Django, Python, PyMuPDF and PaddleOCR

---

*DocuFlow AI – Making documents editable without losing their original structure.*