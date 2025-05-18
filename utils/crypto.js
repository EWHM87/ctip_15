// utils/crypto.js
const crypto = require('crypto');
const ALGO = 'aes-256-gcm';
const IV_LEN = 12; // recommended IV length for GCM

// Load key from env and validate
const keyHex = process.env.AES_KEY;
if (!keyHex || keyHex.length !== 64) {
  throw new Error('❌ Invalid AES_KEY in environment. It must be a 64-character hex string (32 bytes).');
}
const KEY = Buffer.from(keyHex, 'hex');

function encrypt(plainText) {
  const iv = crypto.randomBytes(IV_LEN);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  // Combine IV + tag + ciphertext and return as hex
  return Buffer.concat([iv, tag, encrypted]).toString('hex');
}

function decrypt(dataHex) {
  const data = Buffer.from(dataHex, 'hex');

  if (data.length < IV_LEN + 16) {
    throw new Error('❌ Encrypted data is too short to contain valid IV and Auth Tag');
  }

  const iv = data.slice(0, IV_LEN);
  const tag = data.slice(IV_LEN, IV_LEN + 16);
  const ciphertext = data.slice(IV_LEN + 16);

  const decipher = crypto.createDecipheriv(ALGO, KEY, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString('utf8');
}

module.exports = { encrypt, decrypt };
