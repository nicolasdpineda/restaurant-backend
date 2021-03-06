import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import ROLES from '../constants/role';

const Schema = mongoose.Schema;
const SALT_ROUNDS = 10;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true, default: '' },
  name: { type: String, required: true, trim: true },
  password: { type: String, select: false },
  role: { type: String, required: true, enum: Object.values(ROLES), default: ROLES.USER },
});

userSchema.methods.hashPassword = function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) {
        return reject('Failed to generate hash');
      }
      return resolve(hash);
    });
  });
};

userSchema.methods.authenticate = function authenticate(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password)
      .then((allow) => {
        if (!allow) return reject();
        return resolve();
      })
      .catch(reject);
  });
};

userSchema.pre('save', function preSave(next) {
  if (this.password && this.isModified('password')) {
    this.password = this.hashPassword(this.password)
    .then((password) => {
      this.password = password;
      next();
    })
    .catch(next);
  } else {
    next();
  }
});

export default mongoose.model('User', userSchema);
