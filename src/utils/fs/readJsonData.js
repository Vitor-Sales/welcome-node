const fs = require('fs/promises');

const readJsonData = async (path) => {
    const contentFile = await fs.readFile(path, 'utf-8');
    return JSON.parse(contentFile);
};

module.exports = readJsonData;