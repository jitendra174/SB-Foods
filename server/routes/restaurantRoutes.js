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

router.get('/', getAllRestaurants);
router.get('/featured', getFeaturedRestaurants);
router.get('/:id', getRestaurantById);


router.post('/', createRestaurant);                       
router.put('/:id', updateRestaurant);                     
router.delete('/:id', deleteRestaurant);                  


router.post('/:id/menu', addMenuItem);                   
router.put('/:id/menu/:itemId', updateMenuItem);          
router.delete('/:id/menu/:itemId', deleteMenuItem);       

export default router;
