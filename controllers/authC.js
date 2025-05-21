import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userM.js';

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();

  const accessToken = generateAccessToken({ id: user._id, username: user.username });
  const refreshToken = generateRefreshToken({ id: user._id, username: user.username });

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false, 
    path: '/api/auth/refresh',
    sameSite: 'strict',
  });

  res.json({ accessToken });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ msg: 'Invalid credentials' });

  const accessToken = generateAccessToken({ id: user._id, username: user.username });
  const refreshToken = generateRefreshToken({ id: user._id, username: user.username });

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false, 
    path: '/api/auth/refresh',
    sameSite: 'strict',
  });

  res.json({ accessToken });
};

export const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ msg: 'No refresh token provided' });

  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET);
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== token)
      return res.status(403).json({ msg: 'Invalid refresh token' });

    const newAccessToken = generateAccessToken({ id: user._id, username: user.username });
    const newRefreshToken = generateRefreshToken({ id: user._id, username: user.username });

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: '/api/auth/refresh',
      sameSite: 'strict',
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ msg: 'Token verification failed' });
  }
};

export const logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    const user = await User.findOne({ refreshToken: token });
    if (user) {
      user.refreshToken = '';
      await user.save();
    }
  }
  res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
  res.json({ msg: 'Logged out' });
};