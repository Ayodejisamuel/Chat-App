import bcrypt from 'bcryptjs';
import User from '../model/userModel.js';

export const register = async (req, res, next) => {
  try {
    const { password, email, username } = req.body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: 'Username already used', status: false });
      
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: 'Email already used', status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    user.password = undefined;

    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

export const login = async (req, res, next) => {
  try {
    const { password, username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: 'Incorrect username or password', status: false });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.json({ msg: 'Incorrect username or password', status: false });
    }

    user.password = undefined;

    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }  
    );

    if (!userData) {
      return res.status(404).json({ msg: "User not found", status: false });
    }

    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};



export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      'email',
      'username',
      '_id',
      'avatarImage'
    ]);

    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
