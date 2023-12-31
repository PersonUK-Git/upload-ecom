import express from "express"
import {registerController, testController, loginController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController, UserPhotoController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import formidable from 'express-formidable';
//router object

const router = express.Router()
 //routing
 //REGISTER  || METHOD POST
 router.post('/register',formidable(), registerController )

//LOGIN || POST
router.post('/login', loginController) 

//FORGOT PASSWORD
router.post('/forgot-password', forgotPasswordController)
//test routes
router.get('/test', requireSignIn, isAdmin ,testController)

//protected user-route auth
router.get('/user-auth', requireSignIn, (req,res) => {
    res.status(200).send({ok:true});
})

//protected admin-route auth
router.get('/admin-auth', requireSignIn,isAdmin, (req,res) => {
    res.status(200).send({ok:true});
})

//update profile
router.put("/profile", requireSignIn,formidable(), updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

router.get('/user-photo/:userId', UserPhotoController)

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router