const fs = require('fs').promises;
const path = require('path');
const { s3, S3_BUCKET } = require("../config/aws-config");


async function pushRepo() {
    const repoPath = path.resolve(process.cwd(), ".commitly");
    const commitsRoot = path.join(repoPath, "commits");

    try {
        const commitDirs = await fs.readdir(commitsRoot); // List of commit folders

        for (const commitDir of commitDirs) {
            const commitFolderPath = path.join(commitsRoot, commitDir);
            const files = await fs.readdir(commitFolderPath);

            for (const file of files) {
                const filePath = path.join(commitFolderPath, file);
                const fileContent = await fs.readFile(filePath);

                const params = {
                    Bucket: S3_BUCKET,
                    Key: `commits/${commitDir}/${file}`, // S3 path
                    Body: fileContent,
                };

                await s3.upload(params).promise();
            }
        }
    } catch (error) {
        console.error("Error pushing to S3:", error);
    }
}

module.exports = { pushRepo };
