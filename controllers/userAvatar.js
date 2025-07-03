const path = require("path");
const fs = require("fs").promises;
const { Jimp } = require("jimp");
const User = require("../models/User"); //

const avatarsDir = path.join(process.cwd(), "public", "avatars");

const changeAvatar = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const { path: tempPath } = req.file;
    const ext = path.extname(tempPath);
    const fileName = `avatar-${req.user._id}${ext}`;
    const resultPath = path.join(avatarsDir, fileName);

    const image = await Jimp.read(tempPath);
    await image.resize({ w: 250, h: 250 }).write(tempPath);

    await fs.rename(tempPath, resultPath);

    const avatarURL = `/avatars/${fileName}`;
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = { changeAvatar };
