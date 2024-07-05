const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://kumarivithanala259:semd7zY8qrBtyFM@cluster0.9i4wwbd.mongodb.net/gofood?retryWrites=true&w=majority';
let food_items=null;
let foodData=null;

const connectDB = async () => {
    try {
      await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB Atlas');
  
      // Get a reference to the collection
      const collection = mongoose.connection.collection('food_items');
  
      // Query the collection to fetch data
      const data = await collection.find({}).toArray();
      global.food_items=data;
      //console.log(global.food_items)



      const category = mongoose.connection.collection('foodCategory');
  
      // Query the collection to fetch data
      const catdata = await category.find({}).toArray();
      global.foodCategory=catdata;
      //console.log(global.food_items)
  
  
      console.log('Retrieved data:');
    } catch (error) {
      console.error('Failed to connect to MongoDB Atlas:', error);
    }
  };

module.exports = connectDB;