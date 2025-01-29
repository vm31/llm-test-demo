import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname } from 'path';

export async function readFileContent(filePath: string): Promise<string> {
    try {
        return await readFile(filePath, 'utf-8');
    } catch (error) {
        console.error(`Error reading file at ${filePath}:`, error);
        throw error;
    }
}

export async function writeFileContent(outputFilePath: string, content: string): Promise<void> {
    try {
        const dir = dirname(outputFilePath);
        await mkdir(dir, { recursive: true });

        // Replace problematic substrings
        content = content.replaceAll('toContain()', 'toContainText()').replaceAll('type()', 'fill()');

        await writeFile(outputFilePath, content, 'utf-8');
        console.log(`Content successfully written to ${outputFilePath}`);
    } catch (error) {
        console.error(`Error writing file at ${outputFilePath}:`, error);
        throw error;
    }
}
