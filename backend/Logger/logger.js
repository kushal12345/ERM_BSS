import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const logErrortoFile = (error) => {
        // Get the current file's directory path (equivalent to __dirname in CommonJS)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const logtofile = path.join(__dirname, "error.log");
    const errorMessage = `${new Date().toISOString()} - ${error.message || 'Unknown error'}\n${error.stack || 'No stack trace available'}\n\n`;
    
    fs.appendFile(logtofile, errorMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
};

export default logErrortoFile;