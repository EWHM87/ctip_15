// utils/crypto.js
const crypto = require('crypto');
const ALGO   = 'aes-256-gcm';
const KEY    = Buffer.from(process.env.AES_KEY, 'hex'); // 32 bytes
const IV_LEN = 12;                                     // recommended

function encrypt(plainText) {
  const iv     = crypto.randomBytes(IV_LEN);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);
  const enc    = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
  const tag    = cipher.getAuthTag();
  // return hex of iv + tag + ciphertext
  return Buffer.concat([iv, tag, enc]).toString('hex');
}

function decrypt(dataHex) {
  const data      = Buffer.from(dataHex, 'hex');
  const iv        = data.slice(0, IV_LEN);
  const tag       = data.slice(IV_LEN, IV_LEN + 16);
  const ciphertext = data.slice(IV_LEN + 16);
  const decipher  = crypto.createDecipheriv(ALGO, KEY, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString('utf8');
}

module.exports = { encrypt, decrypt };
