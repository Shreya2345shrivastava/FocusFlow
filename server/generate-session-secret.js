const crypto = require('crypto');

// Generate a secure random session secret
const sessionSecret = crypto.randomBytes(64).toString('hex');

console.log('='.repeat(50));
console.log('🔑 GENERATED SESSION SECRET');
console.log('='.repeat(50));
console.log('Copy this value to your .env file:');
console.log('');
console.log(`SESSION_SECRET=${sessionSecret}`);
console.log('');
console.log('='.repeat(50));
