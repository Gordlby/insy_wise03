const redis = require('redis');
require('dotenv').config();

const client = redis.createClient({ url: process.env.DATABASE_URL });

client.on('connect', () => {
  console.log('Connected to Redis!');
});

client.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

(async () => {
  await client.connect();

  await client.set('user:1', 'John Doe');
  console.log('Stored user:1:', await client.get('user:1'));

  await client.setEx('session:12345', 3600, 'active');
  console.log('Stored session:12345:', await client.get('session:12345'));

  await client.disconnect();
})();