import { askOllama } from "../askOllama";

const regressionSuite ='cypress/e2e/tests/swagger.regression.md';
const outputFilePath = 'cypress/e2e/tests/swagger.spec.cy.ts';
const customPrompt = `You are a software test engineer. Generate functional test cases for swagger applciation using Cypress in typescript based on the following requirement document:\n\n{content} Ensure the test file is formatted correctly, with all necessary braces, parentheses, and syntax. Generate only the file content without any commentary or extra text. Do not include import command "import { cy } from 'cypress';" and the word "TypeScript" in the output. 
    
        Example:
        
        describe('Login Tests', () => {
            beforeEach(() => {
                cy.clearLocalStorage();
                cy.visit('https://swagger.io/');
            });
            
            it('should log in with valid credentials', () => {
            });
            
            it('should show an error for invalid credentials', () => {
            });
        });
`;

askOllama(regressionSuite, outputFilePath,customPrompt)
 .then(() => console.log('Test cases generated cypress test suite successfully!'))
 .catch(error => console.error('Failed to generate test cases:', error));
