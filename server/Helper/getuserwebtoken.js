const jwt = require("jsonwebtoken");
const prisma = require("../config/connectDB")

const getUserDetailstoken = async (token) => {
  if (!token) {
    return {
      message: "session out",
      logout: true,
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        profile_pic: true,
        created_at: true,
      },
    });

    if (!user) {
      return {
        message: "User not found",
        logout: true,
      };
    }

    return user;
  } catch (error) {
    return {
      message: error.message || "Invalid token",
      logout: true,
    };
  }
};

module.exports = getUserDetailstoken;
