import { convertMarkdownToCsv } from "../converter";

const markdownFilePath = "cypress/e2e/tests/swagger.regression.md";
const outputFilePath = "output.csv";


convertMarkdownToCsv(markdownFilePath, outputFilePath)
    .then(() => console.log("Conversion completed!"))
    .catch((err) => console.error("Error:", err));