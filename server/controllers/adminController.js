export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

 
  if (email === "admin@sbfoods.com" && password === "admin123") {
    return res.status(200).json({ success: true, message: "Login successful" });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
};
