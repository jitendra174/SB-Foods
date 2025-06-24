import express from 'express';
import {
  getAllRestaurants,
  getFeaturedRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/restaurantController.js';

const router = express.Router();

// Public
router.get('/', getAllRestaurants);
router.get('/featured', getFeaturedRestaurants);
router.get('/:id', getRestaurantById);

// Admin Routes
router.post('/', createRestaurant);                       // ➕ Add new restaurant
router.put('/:id', updateRestaurant);                     // ✏️ Update restaurant info
router.delete('/:id', deleteRestaurant);                  // ❌ Delete restaurant

// Menu CRUD inside a restaurant
router.post('/:id/menu', addMenuItem);                    // ➕ Add menu item
router.put('/:id/menu/:itemId', updateMenuItem);          // ✏️ Update menu item
router.delete('/:id/menu/:itemId', deleteMenuItem);       // ❌ Delete menu item

export default router;
