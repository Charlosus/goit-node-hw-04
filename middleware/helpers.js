const fs = require("fs").promises;

const isAccessible = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};

const setupFolder = async (folderPath) => {
  const folderExist = await isAccessible(folderPath);
  if (!folderExist) {
    try {
      await fs.mkdir(folderPath, { recursive: true });
    } catch (e) {
      process.exit(1);
    }
  }
};

module.exports = { setupFolder };
