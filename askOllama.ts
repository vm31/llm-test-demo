import { dirname } from 'path';
import ollama from 'ollama';
import { mkdir, readFile, writeFile } from 'fs/promises';

async function readFileContent(filePath: string): Promise<string> {
    try {
        return await readFile(filePath, 'utf-8');
    } catch (error) {
        console.error(`Error reading file at ${filePath}:`, error);
        throw error;
    }
}

async function writeFileContent(outputFilePath: string, content: string): Promise<void> {
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

async function askOllama(requirementPath: string, outputFilePath: string, customPrompt: string): Promise<void> {
    try {
        const content = await readFileContent(requirementPath);
        const prompt = customPrompt.replace('{content}', content);
        console.log('Generated prompt:', prompt);

        const response = await ollama.chat({
            model: 'llama3.2',
            messages: [{ role: 'user', content: prompt }],
            stream: true,
        });

        let generatedContent = '';
        for await (const part of response) {
            generatedContent += part.message.content;
        }

        await writeFileContent(outputFilePath, generatedContent);
    } catch (error) {
        console.error('Error generating test cases with Ollama:', error);
    }
}

// Command-line execution logic
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length < 3) {
        console.error('Usage: npx ts-node askOllama.ts <requirementPath> <outputFilePath> <customPrompt>');
        process.exit(1);
    }

    const [requirementPath, outputFilePath, customPrompt] = args;

    (async () => {
        try {
            await askOllama(requirementPath, outputFilePath, customPrompt);
        } catch (error) {
            console.error('Error executing askOllama:', error);
        }
    })();
}
