const multer = require("multer");
const path = require("path");
const { v4: uuidV4 } = require("uuid");
const fs = require('fs').promises

const tempDir = path.join(process.cwd(), "../tmp");
const storageImageDir = path.join(process.cwd(), "../public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidV4()}${file.originalname}`);
  },
});

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const upload = multer({
  storage,
  fileFilter: async (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const mimetype = file.mimetype;

    if (
      !extensionWhiteList.includes(extension) ||
      !mimetypeWhiteList.includes(mimetype)
    ) {
      return cb(null, false);
    }
    return cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const changeAvatar = async (req, res, next) => {
    if (!req.file) {
        console.log("No file recevied");
        return res.status(400).json({ message: 'File isnt a photo' })
    }

    const temporaryPath = req.file.path
    const extension = path.extname(temporaryPath)
    const fileName = `${uuidV4()}${extension}`
    const filePath = path.join(storageImageDir, fileName);

    try {
        await fs.rename(temporaryPath, filePath)
    } catch (e) {
        await fs.unlink(temporaryPath);
        return next(e)
    }

}
