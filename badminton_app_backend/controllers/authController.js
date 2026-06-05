const bcrypt = require("bcryptjs");
const User = require("../models/managementModel");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, role, email, mobile, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    User.createUser(
      {
        name,
        role,
        email,
        mobile,
        password: hashedPassword,
      },
      (err) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        res.status(201).json({
          message: "Registration Successful",
        });
      },
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN (email OR mobile)
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    // identifier = email OR mobile

    User.findUserByEmailOrMobile(identifier, async (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      res.status(200).json({
        message: "Login Successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
