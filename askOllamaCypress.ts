import { dirname } from 'path'; 
import ollama from 'ollama';
import { mkdir, readFile, writeFile } from 'fs/promises';

export async function askOllamaConvertMdToCypress(requirementPath: string, outputFilePath: string) {
    try {
        // Read the requirement doc
        const content = await readFile(requirementPath, 'utf-8');
        
        const prompt = `You are a software test engineer. Generate functional test cases for swagger applciation using Cypress in typescript based on the following requirement document: ${content}. Ensure the test file is formatted correctly, with all necessary braces, parentheses, and syntax. Generate only the file content without any commentary or extra text. Do not include import command "import { cy } from 'cypress';" and the word "TypeScript" in the output. 
    
        Example:
        
        describe('Login Tests', () => {
            beforeEach(() => {
                cy.clearLocalStorage();
                cy.visit('https://www.google.com/');
            });
            
            it('should log in with valid credentials', () => {
            });
            
            it('should show an error for invalid credentials', () => {
            });
        });
`;
        

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
