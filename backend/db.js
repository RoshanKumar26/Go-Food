const mongoose = require('mongoose'); 
const mongoURI= 'mongodb+srv://gofood:Roshankumar@cluster0.njkqbmn.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0';

let food_items=null;
let foodData=null;

const connectDB = async () => {
    try {
      await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB Atlas');
      const fetched_data = await mongoose.connection.collection('food_items');
      const data = await fetched_data.find({}).toArray();
      global.food_items=data;
      console.log(global.food_items)
      const category = mongoose.connection.collection('foodCategory');
      const catdata = await category.find({}).toArray();
      global.foodCategory=catdata;
      console.log(global.foodCategory)
      console.log('Retrieved data:');
    } 
    catch (error) {
      console.error('Failed to connect to MongoDB Atlas:', error);
    }
  };

module.exports = connectDB;