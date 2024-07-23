const prisma = require('../config/connectDB')
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');


async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    const checkEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (checkEmail) {
      return res.status(400).json({
        message: "User already exists with this email",
        error: true,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashpassword,
      },
    });

    await sendOTPverification(email);

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

async function sendOTPverification(email) {
  const otp = otpGenerator.generate(4, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await prisma.userVerification.create({
      data: {
        userID: user.id,
        otp,
      },
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "mozakshitij@gmail.com",
        pass: "nlni qcfk mjur qloa",
      },
    });

    await transporter.sendMail({
      from: "kshitijoza20@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP for verification is: ${otp}`,
    });

    return "OTP sent successfully";
  } catch (error) {
    throw error;
  }
}

async function VerifyOTP(req, res) {
  const { email, otp } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otpRecord = await prisma.userVerification.findUnique({
      where: { userID: user.id },
    });

    if (otpRecord && otpRecord.otp === otp) {
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying OTP" });
  }
}

module.exports = { signup, sendOTPverification, VerifyOTP };
