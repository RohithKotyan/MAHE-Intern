/**
 * Environment Variable Validation
 * Ensures all required environment variables are set before app starts
 */
const requiredEnvVars = [
  'JWT_SECRET',
];

const optionalEnvVars = [
  'MONGO_URI',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
];

const validateEnv = () => {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
    console.error('   Please check your .env file');
    process.exit(1);
  }

  // Warn about optional missing vars
  const missingOptional = optionalEnvVars.filter((key) => !process.env[key]);
  if (missingOptional.length > 0) {
    console.warn(`⚠️  Optional environment variables not set: ${missingOptional.join(', ')}`);
  }

  // Set defaults
  process.env.PORT = process.env.PORT || '5000';
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  process.env.JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';
  process.env.JWT_COOKIE_EXPIRE = process.env.JWT_COOKIE_EXPIRE || '7';
  process.env.CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

  console.log(`🔧 Environment: ${process.env.NODE_ENV}`);
};

export default validateEnv;
