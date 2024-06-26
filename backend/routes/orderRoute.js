import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from '../controllers/orderController.js';

const orderRouter = express.Router();

//--for client frontend
orderRouter.post('/place', authMiddleware, placeOrder);

//--for verify client frontend user
orderRouter.post('/verify', verifyOrder);

//--for client check his orders list
orderRouter.post('/userorders', authMiddleware, userOrders);

//--for admin check all orders list
orderRouter.get('/list', listOrders);

//--for admin update order status
orderRouter.post('/status', updateStatus);

export default orderRouter;