import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Crop owner is required'],
      index: true,
    },
    // Core Fields
    name: {
      type: String,
      required: [true, 'Crop name is required'],
      trim: true,
      maxlength: [100, 'Crop name cannot exceed 100 characters'],
    },
    species: {
      type: String,
      required: [true, 'Crop species is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Crop location is required'],
      enum: {
        values: ['Indoor', 'Outdoor', 'Greenhouse', 'Hydroponic'],
        message: '{VALUE} is not a valid location',
      },
    },
    plantedAt: {
      type: Date,
      default: Date.now,
    },
    
    // Health & Lifecycle
    healthScore: {
      type: Number,
      min: [0, 'Health score cannot be less than 0'],
      max: [100, 'Health score cannot exceed 100'],
      default: 100,
    },
    status: {
      type: String,
      enum: ['Healthy', 'Warning', 'Diseased', 'Harvested'],
      default: 'Healthy',
    },
    healthStatus: {
      type: String,
      enum: ['Excellent', 'Good', 'Warning', 'Critical'],
      default: 'Excellent',
    },
    growthStage: {
      type: String,
      enum: ['Seed', 'Germination', 'Vegetative', 'Flowering', 'Fruiting', 'Harvest'],
      default: 'Seed',
    },

    // Disease Metadata
    diseaseDetected: {
      type: Boolean,
      default: false,
    },
    currentDisease: {
      type: String,
      default: null,
    },
    diseaseSeverity: {
      type: String,
      enum: ['Low', 'Medium', 'High', null],
      default: null,
    },

    // Watering & Activity
    wateringFrequency: {
      type: Number,
      required: [true, 'Watering frequency (in days) is required'],
      min: [1, 'Watering frequency must be at least 1 day'],
    },
    lastWateredAt: {
      type: Date,
      default: Date.now,
    },
    nextWateringAt: {
      type: Date,
    },
    lastActivityAt: {
      type: Date,
      default: Date.now,
    },

    // Professional Fields
    imageUrl: {
      type: String,
      default: '', // Using simple string for now, Cloudinary later
    },
    notes: {
      type: String,
      default: '',
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    },
    lastScanAt: {
      type: Date,
      default: null,
    },
    scanCount: {
      type: Number,
      default: 0,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compound Indexes for fast queries
cropSchema.index({ owner: 1, status: 1 });
cropSchema.index({ owner: 1, createdAt: -1 });

// Pre-save hook: calculate nextWateringAt and update lastActivityAt
cropSchema.pre('save', function () {
  // Auto-calculate next watering date
  if (this.isModified('lastWateredAt') || this.isModified('wateringFrequency')) {
    const nextWatering = new Date(this.lastWateredAt);
    nextWatering.setDate(nextWatering.getDate() + this.wateringFrequency);
    this.nextWateringAt = nextWatering;
  }

  // Update lastActivityAt automatically when significant fields change
  if (
    this.isModified('healthScore') ||
    this.isModified('status') ||
    this.isModified('healthStatus') ||
    this.isModified('diseaseDetected') ||
    this.isModified('growthStage') ||
    this.isModified('lastWateredAt') ||
    this.isModified('notes')
  ) {
    this.lastActivityAt = Date.now();
  }
});

const Crop = mongoose.model('Crop', cropSchema);

export default Crop;
