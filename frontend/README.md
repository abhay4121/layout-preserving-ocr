# Layout-Preserving OCR Editor

An intelligent OCR-based document processing application that extracts text from scanned documents while preserving the original document layout as much as possible.

The application aims to convert scanned images and PDFs into editable digital documents while maintaining their structure, including paragraphs, columns, tables, images, and reading order.

## Overview

Traditional OCR systems mainly focus on extracting text from images. However, they often fail to preserve the original formatting and layout.

The **Layout-Preserving OCR Editor** aims to solve this problem by combining Optical Character Recognition (OCR) with document layout reconstruction.

Users can upload scanned documents, extract text, review and edit the extracted content, and export the processed documents.

## Key Features

- Upload scanned images and PDF documents.
- Extract text using PaddleOCR.
- Detect text positions and bounding boxes.
- Support multi-column document reading order.
- Preserve document structure during reconstruction.
- Handle documents containing tables and images.
- View and edit extracted document content.
- Export processed documents into supported formats.

## Technologies Used

### Frontend
- React.js
- Vite
- Tailwind CSS
- JavaScript

### Backend
- Python
- Django
- Django REST Framework

### OCR and Document Processing
- PaddleOCR
- PaddlePaddle
- PyMuPDF

### Database
- SQLite

## Project Structure

```text
layout-preserving-ocr/
│
├── backend/
│   ├── backend/
│   ├── documents/
│   └── manage.py
│
├── frontend/
│
├── scripts/
├── docs/
│
├── .env.example
├── requirements.txt
├── requirements-ocr-local.txt
├── start.bat
├── HLD.md
└── README.md
```

## Installation and Setup

### Prerequisites

Install the following tools:

- Python 3.12
- Node.js and npm
- Git
- Visual Studio Code

### 1. Clone the Repository

```bash
git clone https://github.com/DhruvNimbalkar04/layout-preserving-ocr.git
```

Navigate to the project directory:

```bash
cd layout-preserving-ocr
```

### 2. Create Python Virtual Environment

```bash
py -3.12 -m venv env
```

Activate the environment on Windows PowerShell:

```powershell
.\env\Scripts\Activate.ps1
```

Upgrade pip:

```bash
python -m pip install --upgrade pip
```

### 3. Install Python Dependencies

```bash
pip install -r requirements-ocr-local.txt
```

### 4. Configure Environment Variables

Create the `.env` file:

```powershell
Copy-Item .env.example .env
```

Generate a Django secret key:

```bash
python -c "import secrets; print(secrets.token_urlsafe(50))"
```

Add the generated key to `.env` and configure:

```env
DJANGO_SECRET_KEY=your-generated-secret-key
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
OCR_BACKEND=paddle
```

Keep your actual `.env` file private. Do not upload secrets to GitHub.

### 5. Setup Database

Run Django migrations:

```bash
python backend/manage.py migrate
```

Check the backend configuration:

```bash
python backend/manage.py check
```

### 6. Start Backend Server

```bash
python backend/manage.py runserver
```

Backend URL:

```text
http://127.0.0.1:8000/
```

### 7. Setup Frontend

Open a second terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173/
```

## Application Workflow

1. Upload a scanned image or PDF.
2. Process the document using OCR.
3. Extract text and its position information.
4. Identify document layout and reading order.
5. Reconstruct the document structure.
6. Review and edit the extracted content.
7. Export the processed document in a supported format.

## Future Enhancements

- Improve table detection and reconstruction.
- Improve multi-column reading order detection.
- Add better heading and paragraph classification.
- Support handwritten document recognition.
- Improve formatting preservation.
- Enhance document editing and export functionality.

## Learning Objectives

This project focuses on understanding and implementing:

- Optical Character Recognition.
- Image and PDF processing.
- Document layout analysis.
- Text extraction and reconstruction.
- Full-stack web application development.
- API integration using Django REST Framework.
- Frontend and backend communication.

## Acknowledgement

This project uses the open-source [Layout-Preserving OCR](https://github.com/DhruvNimbalkar04/layout-preserving-ocr) repository as a reference for learning and development.

---

**Project:** Layout-Preserving OCR Editor  
**Category:** Artificial Intelligence / OCR / Web Development