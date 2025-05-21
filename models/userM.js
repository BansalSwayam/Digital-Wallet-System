import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  softDeleted: { type: Boolean, default: false },
  refreshToken: { type: String }
});

const User = mongoose.model('User', userSchema);
export default User;
