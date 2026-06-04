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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    User.findUserByEmail(email, async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }

      res.status(200).json({
        message: "Login Successful",
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
