/**
 * PlantScan Model
 * Records of plant disease scans submitted by users
 * Links to AI analysis results (to be implemented)
 */
import mongoose from 'mongoose';

const plantScanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Plant image is required'],
    },
    imagePublicId: {
      type: String, // Cloudinary public ID for deletion
    },
    plantName: {
      type: String,
      default: 'Unknown',
      trim: true,
    },
    disease: {
      name: { type: String, default: 'Pending Analysis' },
      confidence: { type: Number, default: 0, min: 0, max: 100 },
      description: { type: String, default: '' },
    },
    recommendations: [
      {
        title: String,
        description: String,
        priority: {
          type: String,
          enum: ['low', 'medium', 'high'],
          default: 'medium',
        },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'analyzing', 'completed', 'failed'],
      default: 'pending',
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
    location: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
plantScanSchema.index({ user: 1, createdAt: -1 });
plantScanSchema.index({ status: 1 });

const PlantScan = mongoose.model('PlantScan', plantScanSchema);
export default PlantScan;
