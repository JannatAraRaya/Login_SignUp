const bcrypt = require("bcrypt");
const path = require("path");
const ejs = require("ejs");
const jsonwebtoken = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");
const transporter = require("../config/emailHandler");
const ejsRenderFile = promisify(ejs.renderFile);
const { default: mongoose } = require("mongoose");
const AuthModel = require("../model/authModel");

class AuthService {
  async existingEmail(email) {
    const auth = await AuthModel.findOne({ email: email });
    return auth;
  }
  async signup(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10).then((hash) => {
      return hash;
    });

    const auth = await AuthModel.findOne({ email: email });

    const verifiedToken = crypto.randomBytes(32).toString("hex");
    const result = await AuthModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      verificationToken: verifiedToken,
    });
    // auth.save();
    const resetURL = path.join(
      process.env.BACKEND_URL,
      "auth",
      "verify-email",
      verifiedToken,
      result._id.toString()
    );

    const htmlBody = await ejsRenderFile(
      path.join(__dirname, "..", "views", "verify-email.ejs"),
      {
        name: username,
        resetURL: resetURL,
      }
    );

    const emailResult = await transporter.sendMail({
      from: "instagram@instragram.com",
      to: `${result.username} ${email}`,
      subject: "Verify Your Email.",
      html: htmlBody,
    });

    return result;
  }
  async verifyemail(token, userId) {
    const user = await AuthModel.findOne({
      _id: userId,
      verificationToken: token,
    });
    if (!user || user.isVerified) {
      throw new Error("Invalid or already verified token");
    }

    user.isVerified = true;
    user.verificationToken = null;

    await user.save();

    return true;
  }
}

module.exports = new AuthService();
