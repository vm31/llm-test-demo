import { askOllama } from "../askOllama";

const requirementPath = 'requirements/swagger.ui.md';
const outputFilePath = 'tests/swagger.regression.md';
const customPrompt = `You are a software test engineer. Write functional test cases in table csv format with comma seperated.
S.no,Title, Step description and Expected result for the following requirement document:\n\n{content}.`;


askOllama(requirementPath, outputFilePath,customPrompt)
    .then(() => console.log('Test cases generated successfully!'))
    .catch(error => console.error('Failed to generate test cases:', error));