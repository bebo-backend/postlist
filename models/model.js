import mongoose from 'mongoose'
const mongoosePaginate = require("mongoose-pagination-wizard")



const Types = mongoose.Schema.Types

const Location = new mongoose.Schema({
    street:String,
    state:String,
    city:String,
    country:String

})

const location = mongoose.models.Location ||  mongoose.model('Location', Location);

const Feature = new mongoose.Schema({
    aircondition:Boolean,
    barbeque:Boolean,
    dryer:Boolean,
    gym:Boolean,
    laundry:Boolean,
    refrigerator:Boolean,
    washer:Boolean,
    lawn:Boolean,
    wifi:Boolean,
    microwave:Boolean,
    swimmingpool:Boolean,
    tvcable:Boolean,  

})



const feature = mongoose.models.Feature ||  mongoose.model('Feature', Feature);

const Detail = new mongoose.Schema({
    color:String,
    weight:String,
    brand:String


})

const detail = mongoose.models.Detail ||  mongoose.model('Detail', Detail);

const Image = new mongoose.Schema({
      image_id:String
       })
   
export const Images = mongoose.models.Image ||  mongoose.model('Image', Image);


const UserSchem = new mongoose.Schema({
    fullname:{type:String,required:true},
    phone:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    image:Image,
    website:{type:String},
    about:{type:String},
    rate:{type:Number,default:1},
    rate_count:{type:Number,default:1},
    whatsappNo:{type:String},

    address:{type:String},
    facebook_url:String,
    twitter_url:String,
    linkedin_url:String,
    instagram_url:String,
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
  
    })

UserSchem.plugin(mongoosePaginate)

// export const User =  mongoose.models.User ||  mongoose.model('User', UserSchem);
export const User =  mongoose.models.User ||  mongoose.model('User', UserSchem);


const MessageSche = new mongoose.Schema({
    text:{type:String,required:true},
    receiver:{type:Types.ObjectId, ref:"User",required:true},
    sender:{type:Types.ObjectId, ref:"User",required:true},
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
  
    })

MessageSche.plugin(mongoosePaginate)


export const MessageModel =  mongoose.models.MessageModel ||  mongoose.model('MessageModel', MessageSche);



const ReviewsSchem = new mongoose.Schema({

    text:{type:String,required:true},
    sender:{type:Types.ObjectId, ref:"User",required:true},
    propertyId:{type:Types.ObjectId, ref:"Product"},
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
  
    })

ReviewsSchem.plugin(mongoosePaginate)

export const Reviews =  mongoose.models.ReviewD ||  mongoose.model('ReviewD', ReviewsSchem);



const ProductSch = new mongoose.Schema({
    title: {type:String,
    required:true},
    status:String,
    type:{type:String,
        required:true},
    description:String,
    location:Location,
    price:{type:Number,
        required:true,default:0},
    duration:String,
    note:String,
    condition:{type:String,default:"Not Specified"},
    features:String,
    agentuser:{type:Types.ObjectId, ref:"User"},
    images:[Image],
    reviews:[ReviewsSchem],
    details:Detail,
    phone:{type:String},
    whatsappNo:{type:String},
    with_delivery :{type:String},
    negotiable :{type:String},
    delivery_company :{type:String},
    with_payment :{type:String},
    payment_type :{type:String},
    exchange_item :{type:String},
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
      views:{type:Number,default:1},
      likes:{type:Number,default:1}
})







ProductSch.plugin(mongoosePaginate)

export default mongoose.models.Product ||  mongoose.model('Product', ProductSch);