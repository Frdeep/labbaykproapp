// ─── Tesseract.js Worker ─────────────────────────────────────
// Lazy-loaded OCR for passport MRZ reading.
// Only initialized when user opens the document upload screen.
// HYPOTHESIS: We lazy-load to avoid 15MB bundle on first load (§7.9)

export async function initTesseractWorker() {
  const { createWorker } = await import('tesseract.js');
  const worker = await createWorker('eng', 1, {
    // Cache model in IndexedDB after first download
    cacheMethod: 'readOnly',
  });
  return worker;
}

export async function recognizePassport(worker: Awaited<ReturnType<typeof initTesseractWorker>>, imageSource: string | File) {
  const result = await worker.recognize(imageSource);
  return result.data.text;
}
