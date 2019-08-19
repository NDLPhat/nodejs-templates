var mongoose = require("mongoose");
var slugify = require("slugify");
var validator = require("validator");

const tourSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "A tour must have a name"],
        unique: true,
        trim: true,
        validate: [validator.isAlpha, 'Tour name must only contain character']
    },
    duration: {
        type: Number,
        required: [true, "A tour must have a duration"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have maxGroupSize"]
    },
    difficulty: {
        type: String,
        required: [true, "A tour must have difficulty"]
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"]
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, "A tour must have summary"]
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, "A tour must have a cover image"]
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    slug: String,
    secretTour: {
        type: Boolean,
        default: false
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function(value){
                return value < this.price
            },
            message: `Discout price (${this.price}) should be below regular price`
        }
        
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

tourSchema.virtual("durationWeeks").get(function(){
    return this.duration / 7;
})

// tourSchema.pre("save", function(next){
//     this.slug = slugify(this.name, { lower: true });
//     next();
// })

// tourSchema.pre("save", function(next){
//     console.log("will save document...");
//     next();
// })

// tourSchema.post("save", function(doc, next){
//     console.log(doc);
//     next();
// })
tourSchema.pre("find", function(next){
    this.find({secretTour: {$ne: true}})
    next();
})

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;