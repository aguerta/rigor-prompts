/**
 * Generates a valid standard PDF 1.4 byte stream in Base64
 * for testing and pre-filling archetype manuscripts.
 */
export function generateSamplePdfBase64(title: string, author: string, excerpt: string): string {
  const cleanTitle = title.replace(/[()\\]/g, '');
  const cleanAuthor = author.replace(/[()\\]/g, '');
  const cleanExcerpt = excerpt.replace(/[()\\]/g, '').replace(/\n/g, ' ');

  const pdfBody = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${cleanExcerpt.length + 300} >>
stream
BT
/F1 14 Tf
50 720 Td
(${cleanTitle}) Tj
/F1 10 Tf
0 -20 Td
(${cleanAuthor}) Tj
/F1 9 Tf
0 -30 Td
(${cleanExcerpt.slice(0, 350)}) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000059 00000 n 
0000000116 00000 n 
0000000263 00000 n 
0000000620 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
700
%%EOF`;

  // Encode to Base64 (standard in both browser and modern Node.js)
  if (typeof btoa === 'function') {
    return btoa(unescape(encodeURIComponent(pdfBody)));
  }
  return '';
}
