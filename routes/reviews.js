const express = require("express");
const { reviewSchema } = require("../schema.js");
const router=express.Router({mergeParams:true});  
const wrapAsync = require("../utils/wrapAsync.js"); 
const Review = require("../models/reviews.js");
const Listing=require("../models/listings.js");  

const ExpressError=require("../utils/ExpressError.js");
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js")
const reviewController=require("../controllers/reviews.js")
//Reviews
//Post Route
router.post("/",
   isLoggedIn,validateReview , wrapAsync(reviewController.createReview));
   
   //Delete Review Route
   
router.delete("/:reviewId",isLoggedIn, isReviewAuthor,wrapAsync(reviewController.deleteReview))

module.exports=router;