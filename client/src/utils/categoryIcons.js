export const categoryIcons = {
  Biryani: "/assets/icons/biryani.png",
  Pizza: "/assets/icons/pizza.png",
  Burger: "/assets/icons/burger.png",
  Snacks: "/assets/icons/bajji.png",
  Juices: "/assets/icons/juices.png",
  Milkshakes: "/assets/icons/milkshake.png",
  Sweets: "/assets/icons/sweets.png",
  FastFood: "/assets/icons/fastfood.png",
  Tiffins: "/assets/icons/tiffin.png",
  IceCream: "/assets/icons/icecream.png",
};
export const getCategoryIcon = (category) => {
  return categoryIcons[category] || "/assets/icons/default.png";
};