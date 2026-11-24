# Benchmark and Evaluation

## Summary

The OCR system was evaluated using different types of documents to understand its text extraction capabilities, reading order, processing behaviour, and layout preservation.

The evaluation focused on clean printed documents, scanned printed pages, table-based documents, and handwritten forms.

The purpose of this benchmark is to identify how the system handles different document formats, understand its limitations, and identify areas that require improvement.

## Test Set

The test dataset contains different types of real-world documents, including:

- Clean printed PDF documents.
- Documents containing tables and structured content.
- Scanned printed documents.
- Handwritten forms.
- Documents containing headings, paragraphs, and bullet points.

The documents were selected to represent different OCR scenarios.

Original documents and their reference transcriptions are maintained separately in the samples folder. Documents containing personal information are not committed to GitHub.

The dataset provides an initial evaluation of the OCR pipeline. Additional document types will be included in future testing.

## Test Environment

- **Python:** 3.12.10
- **Operating System:** Windows 11
- **Processor:** 13th Gen Intel Core i5-13450HX
- **RAM:** 16 GB
- **Processing:** CPU only
- **OCR Engine:** PaddleOCR 3.7.0
- **Model:** PP-OCRv5 Mobile
- **Rendering Resolution:** 150 DPI

## Method

The system is evaluated using the following parameters:

**1. Text Recognition**

Checks whether the extracted text matches the original document content.

**2. Reading Order**

Checks whether text is extracted in the correct sequence, including headings, paragraphs, questions, and answers.

**3. Processing Time**

Observes the time required to process documents and extract their text.

**4. Layout Preservation**

Checks whether the original document structure, including headings, tables, lists, and text positioning, is maintained.

**5. Error Identification**

Identifies common recognition issues such as missing characters, incorrect words, punctuation errors, and incorrectly detected symbols.

## Failures Observed

### 1. Handwriting Recognition

- Similar-looking handwritten characters can be confused.
- Some handwritten words may be incorrectly recognized.
- Short handwritten responses and symbols can be difficult to identify.

### 2. Punctuation and Formatting

- Some punctuation marks and bullet symbols may be missed.
- Words located close to each other may be merged.
- Special characters may not be recognized correctly.

### 3. Reading Order

- Questions and answers appearing on the same line may be extracted incorrectly.
- Text inside tables may not follow the correct reading sequence.
- Complex multi-column layouts may produce incorrect text ordering.

### 4. Layout Preservation

- Table borders and cell relationships may not be reconstructed correctly.
- Original spacing and alignment may change.
- Images, stamps, and signatures may not be preserved during export.

### 5. Export Issues

- Font sizes are estimated using text bounding boxes.
- Small text may appear incorrectly positioned.
- Background images and original formatting may be lost during export.

## What Was Not Tested

The following areas require additional testing:

- Complex two-column and three-column documents.
- Documents containing multiple languages.
- Image-heavy documents containing charts and diagrams.
- Extremely low-resolution and damaged scans.
- Large documents containing hundreds of pages.
- Extensive handwriting samples from different writing styles.
- Simultaneous document processing by multiple users.

## Next Steps

The following improvements are planned for future development:

1. Expand the dataset with additional printed, scanned, and handwritten documents.
2. Improve handwriting recognition and image preprocessing.
3. Implement better reading-order detection for multi-column documents.
4. Improve table detection and structural reconstruction.
5. Preserve images, stamps, signatures, and original formatting during export.
6. Improve handling of low-quality and low-resolution scanned documents.
7. Evaluate the system using more complex real-world documents.
8. Improve overall reliability and document processing capabilities.

## Conclusion

The evaluation helps identify the strengths and limitations of the OCR system across different document types.

The system focuses on extracting text while maintaining the original document structure as much as possible. However, handwriting recognition, complex layouts, table reconstruction, and export formatting require further improvement.

Future development will focus on improving text recognition, reading order, layout preservation, and overall document processing reliability.