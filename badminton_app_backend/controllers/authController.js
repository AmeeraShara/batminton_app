const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const { full_name, mobile, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    User.createUser(
      {
        full_name,
        mobile,
        email,
        password: hashedPassword,
      },
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        res.status(201).json({
          message: "Registration Successful",
        });
      },
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
