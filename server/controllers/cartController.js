import User from "../models/User.js";

export const saveCart = async (req, res) => {
  const userId = req.user.id;
  const { cart } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { cart });
    res.status(200).json({ message: "Cart saved." });
  } catch (error) {
    res.status(500).json({ message: "Error saving cart", error });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    res.status(200).json({ cart: user.cart || [] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};
