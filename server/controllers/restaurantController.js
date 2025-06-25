import Restaurant from '../models/restaurantModel.js';


export const getAllRestaurants = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const restaurants = await Restaurant.find().limit(limit);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
};


export const getFeaturedRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().limit(4);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching featured restaurants' });
  }
};


export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurant' });
  }
};


export const createRestaurant = async (req, res) => {
  try {
    const { name, image, location } = req.body;
    const restaurant = new Restaurant({ name, image, location, menu: [] });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error creating restaurant' });
  }
};


export const updateRestaurant = async (req, res) => {
  try {
    const { name, image, location } = req.body;
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { name, image, location },
      { new: true }
    );
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error updating restaurant' });
  }
};


export const deleteRestaurant = async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting restaurant' });
  }
};


export const addMenuItem = async (req, res) => {
  try {
    const { name, image, price } = req.body;
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const newItem = { name, image, price };
    restaurant.menu.push(newItem);
    await restaurant.save();

    res.status(201).json(restaurant.menu[restaurant.menu.length - 1]);
  } catch (error) {
    res.status(500).json({ message: 'Error adding menu item' });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { name, image, price } = req.body;
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const item = restaurant.menu.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    item.name = name;
    item.image = image;
    item.price = price;

    await restaurant.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu item' });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const originalLength = restaurant.menu.length;

    restaurant.menu = restaurant.menu.filter(
      (item) => item._id.toString() !== req.params.itemId
    );

    if (restaurant.menu.length === originalLength) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    await restaurant.save();
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting menu item:', error.message);
    res.status(500).json({ message: 'Error deleting menu item' });
  }
};
