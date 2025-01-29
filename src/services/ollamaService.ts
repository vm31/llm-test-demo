import { readFileContent, writeFileContent } from './fileService';
import { loadSession, saveSession, updateSession } from './sessionService';
import { askUserToContinue, getUserInput  } from '../cli/userInput';
import ollama from 'ollama';

// Main function to interact with Ollama API
export async function askOllamaCLI(): Promise<void> {
    const args = process.argv.slice(2);

    if (args.length < 3) {
        console.error('Usage: npx ts-node ollamaService.ts <requirementPath> <outputFilePath> <customPrompt>');
        process.exit(1);
    }

    const [requirementPath, outputFilePath, customPrompt] = args;

    try {
        // Load previous session if it exists
        await loadSession();

        // Read content and generate prompt
        const content = await readFileContent(requirementPath);
        const prompt = customPrompt.replace('{content}', content);
        console.log('Generated prompt:', prompt);

        // Get response from Ollama
        const response = await ollama.chat({
            model: 'llama3.2',
            messages: [{ role: 'user', content: prompt }],
            stream: true,
        });

        let generatedContent = '';
        for await (const part of response) {
            generatedContent += part.message.content;
        }

        // Write output and update session
        await writeFileContent(outputFilePath, generatedContent);
        updateSession({ requirementPath, outputFilePath, customPrompt });
        await saveSession();

        // Ask user if they want to continue
        const userInput = await askUserToContinue();
        if (userInput === 'yes') {
            const newRequirementPath = await getUserInput('Enter new requirement path: ');
            const newOutputFilePath = await getUserInput('Enter new output file path: ');
            const newCustomPrompt = await getUserInput('Enter new custom prompt: ');
            await askOllamaCLI();
        } else {
            console.log('Session ended.');
        }
    } catch (error) {
        console.error('Error generating test cases with Ollama:', error);
    }
}

// Trigger the function if the file is executed directly
if (require.main === module) {
    askOllamaCLI();
}
