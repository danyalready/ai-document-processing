import fs from "fs/promises";
import { PDFParse } from "pdf-parse";

export async function extractTextFromPdf(path: string) {
    const buffer = await fs.readFile(path);

    const parser = new PDFParse({ data: buffer });

    const result = await parser.getText();

    await parser.destroy();

    return result.text;
}
