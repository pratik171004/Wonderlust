const Review = require("../models/reviews.js");
const Listing=require("../models/listings.js");


module.exports.createReview=async(req,res)=>{

    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
   
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created");
    res.redirect(`/listings/${listing.id}`);
   }

module.exports.deleteReview=async (req, res) => {
    try {
      let { id, reviewId } = req.params;
      await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
      await Review.findByIdAndDelete(reviewId);
      const listing = await Listing.findById(id);
      if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
      }
  
      req.flash("success", "Review Deleted");
      res.redirect(`/listings/${id}`);
    } catch (error) {
      console.error(error);
      req.flash("error", "Something went wrong!");
      res.redirect("/listings");
    }
  };