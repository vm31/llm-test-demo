import * as XLSX from "xlsx";
import * as fs from "fs";

/**
 * Function to read a Markdown file and export its content to a CSV file.
 * @param markdownFilePath - Path to the Markdown file
 * @param outputFilePath - Path to save the generated CSV file
 */
export async function convertMarkdownToCsv(markdownFilePath: string, outputFilePath: string): Promise<void> {
    try {
        // Read Markdown content
        const markdownContent = fs.readFileSync(markdownFilePath, "utf8");

        // Split content into rows (each line as a row)
        const rows = markdownContent.split("\n").map((line) => [line]);

        // Create a worksheet directly from rows
        const worksheet = XLSX.utils.aoa_to_sheet(rows);

        // Convert the worksheet to CSV content
        const csvContent = XLSX.utils.sheet_to_csv(worksheet);

        // Write CSV content to the output file
        fs.writeFileSync(outputFilePath, csvContent, "utf8");

        console.log(`CSV file created successfully at ${outputFilePath}`);
    } catch (error) {
        console.error("Error occurred while converting Markdown to CSV:", error);
    }
}
