import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import Crop from './models/Crop.js';

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/agrocare');
  const dummyUserId = new mongoose.Types.ObjectId();
  
  // Test Create
  const healthyCrop = await Crop.create({ owner: dummyUserId, name: 'Healthy Tomato', species: 'Tomato', location: 'Indoor', wateringFrequency: 3, healthStatus: 'Excellent', healthScore: 95 });
  const diseasedCrop = await Crop.create({ owner: dummyUserId, name: 'Sick Basil', species: 'Basil', location: 'Greenhouse', wateringFrequency: 2, healthStatus: 'Critical', healthScore: 35, diseaseDetected: true, currentDisease: 'Blight' });
  
  const count = await Crop.countDocuments({ owner: dummyUserId });
  console.log('CRUD Create: ' + count + ' crops created.');
  
  // Test Stats Aggregation Logic (Simulated)
  const stats = await Crop.aggregate([
    { $match: { owner: dummyUserId, isArchived: false } },
    {
      $group: {
        _id: null,
        totalCrops: { $sum: 1 },
        healthy: { $sum: { $cond: [{ $eq: ['$healthStatus', 'Excellent'] }, 1, 0] } },
        critical: { $sum: { $cond: [{ $eq: ['$healthStatus', 'Critical'] }, 1, 0] } }
      }
    }
  ]);
  console.log('Stats Endpoint Logic: ' + JSON.stringify(stats));
  
  // Test Water Logging (NextWateringAt)
  const waterTest = await Crop.findOne({ _id: healthyCrop._id });
  const initialNextWater = waterTest.nextWateringAt;
  waterTest.lastWateredAt = new Date();
  await waterTest.save();
  const updatedWaterTest = await Crop.findOne({ _id: healthyCrop._id });
  console.log('Next watering after: ' + updatedWaterTest.nextWateringAt);
  
  // Test Delete
  await Crop.deleteMany({ owner: dummyUserId });
  console.log('CRUD Delete successful.');
  process.exit(0);
}
run().catch(console.error);
