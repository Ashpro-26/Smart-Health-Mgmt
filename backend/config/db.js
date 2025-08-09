import mongoose from 'mongoose';

const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/healthcare', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // 5 second timeout
        heartbeatFrequencyMS: 2000, // Check server status every 2 seconds
        retryWrites: true,
        w: 'majority'
      });
      
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      
      // Add connection error handler
      conn.connection.on('error', err => {
        console.error(`MongoDB connection error: ${err}`);
        // Attempt to reconnect
        setTimeout(() => {
          console.log('Attempting to reconnect to MongoDB...');
          mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/healthcare');
        }, 5000);
      });

      // Add disconnection handler
      conn.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
        // Attempt to reconnect
        setTimeout(() => {
          console.log('Attempting to reconnect to MongoDB...');
          mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/healthcare');
        }, 5000);
      });

      // Successfully connected
      return;

    } catch (error) {
      console.error(`Error connecting to MongoDB (Attempt ${retries + 1}/${maxRetries}):`, error.message);
      retries++;
      
      if (retries === maxRetries) {
        console.error('Failed to connect to MongoDB after maximum retries');
        process.exit(1);
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

export default connectDB; 