// //without docker
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { v4 as uuid } from 'uuid';
const compiledCache: any = {};
export const executeCode = (language: string, userCode: string, input: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const basePath = path.join(__dirname, "..", "temp");
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath, { recursive: true });
        }

        const inputId = uuid();
        const inputPath = path.join(basePath, `${inputId}.txt`);
        fs.writeFileSync(inputPath, input + "\n");

        let command = "";
        const cacheKey = language + userCode;

        if (language === "C++") {
            let exePath = compiledCache[cacheKey];
            if (!exePath) {
                const jobId = uuid();
                const filePath = path.join(basePath, `${jobId}.cpp`);
                exePath = path.join(basePath, `${jobId}.exe`);
                fs.writeFileSync(filePath, userCode);
                try {
                    execSyncSafe(`g++ "${filePath}" -o "${exePath}"`);
                } catch (err: any) {
                    return resolve(`complile error\n${err.stderr?.toString() || err.message}`);
                }

                compiledCache[cacheKey] = exePath;
            }
            command = `"${exePath}" < "${inputPath}"`;
        } else if (language === 'python') {
            let filePath = compiledCache[cacheKey];
            if (!filePath) {
                const jobId = uuid();
                filePath = path.join(basePath, `${jobId}.py`);
                fs.writeFileSync(filePath, userCode);
                compiledCache[cacheKey] = filePath;
            }
            command = `python "${filePath}" < "${inputPath}"`;
        } else if (language === 'java') {
            let className = compiledCache[cacheKey];
            if (!className) {
                const jobId = uuid().replace(/-/g, "");
                className = `Main${jobId}`;
                const modifiedCode = userCode.replace(
                    /public\s+class\s+Main/,
                    `public class ${className}`
                );
                const filePath = path.join(basePath, `${className}.java`);
                fs.writeFileSync(filePath, modifiedCode);
                execSyncSafe(`javac "${filePath}"`);
                compiledCache[cacheKey] = className;
            }
            command = `java -cp "${basePath}" ${className} < "${inputPath}"`;
        }

        exec(command, { timeout: 2000 }, (error, stdout, stderr) => {
            if (error?.signal === 'SIGTERM') {
                return resolve("time limit exceeded");
            }
            if (stderr) {
                return resolve(`complile error\n${stderr}`);
            }
            if (error) {
                return resolve("runtime error");
            }
            return resolve(stdout.trim());
        });
    });
}

function execSyncSafe(cmd: string) {
    const { execSync } = require('child_process');
    try {
        execSync(cmd);
    } catch (err: any) {
        throw err;
    }
}
