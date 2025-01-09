import { dirname } from 'path'; 
import ollama from 'ollama';
import { mkdir, readFile, writeFile } from 'fs/promises';

export async function askOllama(requirementPath: string, outputFilePath: string) {
    try {
        // Read the requirement doc
        const content = await readFile(requirementPath, 'utf-8');
        
        const prompt = `You are a software test engineer. Write functional test cases in for requirement document in simple english : ${content} `;
        

        // Send the prompt to Ollama
        const response = await ollama.chat({ model: 'llama3.2', messages: [{ role: 'user', content: prompt }], stream: true });
        console.log('prompt is:',prompt)

        let generatedContent = '';

        // Collect the streamed response
        for await (const part of response) {
            generatedContent += part.message.content;
        }

        // Ensure the directory exists
        const dir = dirname(outputFilePath);
        await mkdir(dir, { recursive: true });

        // Write the generated test cases to the specified file path
        await writeFile(outputFilePath, generatedContent.trim(), 'utf-8');

        console.log(`Cypress test cases generated and saved to ${outputFilePath}`);
    } catch (error) {
        console.error('Error generating test cases:', error);
    }
}
