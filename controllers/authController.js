const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../controllers/helpers/sendEmail");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);
    const verificationToken = uuidv4();
    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
    });
    await sendEmail({
      to: email,
      subject: "Verification Email",
      html: `<a href="${process.env.BASE_URL}/api/users/verify/${verificationToken}">Click to verify</a>`,
      text: "Link",
    });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not registered yet" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const payload = {
        id: user._id,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });
      user.token = token;
      await user.save();

      res.status(200).json({
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    user.token = null;
    await user.save();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.status(200).json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

const verification = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.verify = true;
    user.verificationToken = null;

    await user.save();
    res.status(200).json({ message: "Verification succeccful" });
  } catch (error) {
    next(error);
  }
};

const reVerification = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No user with matching email" });
    }
    if (user.verify === true) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    const { verificationToken } = user;

    await sendEmail({
      to: email,
      subject: "Verification Email",
      html: `<a href="${process.env.BASE_URL}/api/users/verify/${verificationToken}">Click to verify</a>`,
      text: "Link",
    });
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signup,
  login,
  logout,
  current,
  verification,
  reVerification,
};
