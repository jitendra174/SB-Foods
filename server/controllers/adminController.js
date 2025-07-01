import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@sbfoods.com" && password === "admin123") {
    const token = jwt.sign(
      {
        userId: "Admin1", 
        role: "admin"
      },
      SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token  
    });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
};
