const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'project_tracker',
        useNewUrlParser: false,
        useUnifiedTopology: false
        
      });
      console.log('MongoDB Connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); 
    }
  };
   
  connectDB();
  
  module.exports = mongoose.connection;

  //ORM - object relation mapping
  //Hibernate