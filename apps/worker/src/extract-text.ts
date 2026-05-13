import { PDFParse } from "pdf-parse";

export async function extractTextFromPdf(buffer: Buffer) {
    const parser = new PDFParse({ data: buffer });

    const result = await parser.getText();

    await parser.destroy();

    return result.text;
}
