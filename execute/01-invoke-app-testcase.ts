import { askOllama } from "../askOllama";

const requirementPath = 'requirements/swagger.ui.md';
const outputFilePath = 'cypress/e2e/tests/swagger.regression.md';
const customPrompt = `You are a software test engineer. Write functional test cases for the following requirement document in simple English:\n\n{content}`;


askOllama(requirementPath, outputFilePath,customPrompt)
    .then(() => console.log('Test cases generated successfully!'))
    .catch(error => console.error('Failed to generate test cases:', error));