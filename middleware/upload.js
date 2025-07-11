const multer = require("multer");
const path = require("path");
const { v4: uuidV4 } = require("uuid");

const tempDir = path.join(process.cwd(), "tmp");
const storageImageDir = path.join(process.cwd(), "public/avatars");

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

module.exports = { tempDir, storageImageDir, upload };
