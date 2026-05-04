require("dotenv/config");

const API_FILE_PATH = "./src/shared/api/base-api.ts";
const OUTPUT_FILE_PATH = "./src/shared/api/generated-api.ts";
const API_IMPORT_NAME = "baseApi";
const EXPORT_NAME = "patternLabsApi";

const schemaFile = process.env.API_DOCS_URL;

if (!schemaFile) {
    throw new Error("API_DOCS_URL is not defined");
}

module.exports = {
    schemaFile,
    apiFile: API_FILE_PATH,
    apiImport: API_IMPORT_NAME,
    outputFile: OUTPUT_FILE_PATH,
    exportName: EXPORT_NAME,
    hooks: true,
};
