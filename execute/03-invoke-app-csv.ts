import { convertMarkdownToCsv } from "../converter";

const markdownFilePath = "tests/swagger.regression.md";
const outputFilePath = "regression.tests.csv";


convertMarkdownToCsv(markdownFilePath, outputFilePath)
    .then(() => console.log("Conversion completed!"))
    .catch((err) => console.error("Error:", err));