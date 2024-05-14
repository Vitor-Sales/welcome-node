const fs = require('fs/promises');

const writeJsonData = async (path, content) => {
    await fs.writeFile(path, JSON.stringify(content));
};

module.exports = writeJsonData;