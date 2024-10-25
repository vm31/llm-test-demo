import { dirname } from 'path'; 
import ollama from 'ollama';
import { mkdir, readFile, writeFile } from 'fs/promises';


async function askOllama(requirementPath: string, outputFilePath: string) {
    const content = await readFile(requirementPath, 'utf-8');
    
    const prompt = `You are a software test engineer. Based on this requirement document ${requirementPath}, generate only Cypress test cases in a TypeScript format. Ensure the test file is correctly formatted, including all opening and closing braces, parentheses, and necessary syntax. Generate the file content without any additional commentary or text. Format it as login.spec.cy.ts without using backticks or the word "typescript". Example:
    
    describe('Login Tests', () => {
        beforeEach(() => {
      
    });
      it('should log in with valid credentials', () => {
        // test implementation
      });
      
      it('should show an error for invalid credentials', () => {
        // test implementation
      });
    });
    `;

    try {
        const response = await ollama.chat({ model: 'llama3.2', messages: [{ role: 'user', content: prompt }], stream: true });

        let generatedContent = '';

        // Collect the streamed response
        for await (const part of response) {
            generatedContent += part.message.content;
        }

        // Ensure the directory exists, create it if not
        const dir = dirname(outputFilePath);
        await mkdir(dir, { recursive: true });

        // Write the generated test cases to the specified file path
        await writeFile(outputFilePath, generatedContent.trim(), 'utf-8');

        console.log(`Cypress test cases generated and saved to ${outputFilePath}`);
    } catch (error) {
        console.error(error);
    }
}

// Call the function
askOllama('requirement.txt', 'cypress/e2e/tests/login.spec.cy.ts');
