import express from 'express';
import { body } from 'express-validator';
import {
  addFavorite,
  removeFavorite,
  getFavoritesOfUser,
} from '../controllers/favoriteController.js';
import {
  signUp,
  signIn,
  getInfo,
  updatePassword,
} from '../controllers/userController.js';
import { validate } from '../handlers/requestHandler.js';
import userModel from '../models/userModel.js';
import { auth } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post(
  '/signup',
  body('username')
    .exists()
    .withMessage('username is required')
    .isLength({ min: 8 })
    .withMessage('username minimum 8 characters')
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject('username already used');
    }),
  body('password')
    .exists()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password minimum 8 characters'),
  body('confirmPassword')
    .exists()
    .withMessage('confirmPassword is required')
    .isLength({ min: 8 })
    .withMessage('confirmPassword minimum 8 characters')
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error('confirmPassword not match');
      return true;
    }),
  body('displayName')
    .exists()
    .withMessage('displayName is required')
    .isLength({ min: 8 })
    .withMessage('displayName minimum 8 characters'),
  validate,
  signUp
);

userRouter.post(
  '/signin',
  body('username')
    .exists()
    .withMessage('username is required')
    .isLength({ min: 8 })
    .withMessage('username minimum 8 characters'),
  body('password')
    .exists()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password minimum 8 characters'),
  validate,
  signIn
);

userRouter.put(
  '/update-password',
  auth,
  body('password')
    .exists()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password minimum 8 characters'),
  body('newPassword')
    .exists()
    .withMessage('newPassword is required')
    .isLength({ min: 8 })
    .withMessage('newPassword minimum 8 characters'),
  body('confirmNewPassword')
    .exists()
    .withMessage('confirmNewPassword is required')
    .isLength({ min: 8 })
    .withMessage('confirmNewPassword minimum 8 characters')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword)
        throw new Error('confirmNewPassword not match');
      return true;
    }),
  validate,
  updatePassword
);

userRouter.get('/info', auth, getInfo);

userRouter.get('/favorites', auth, getFavoritesOfUser);

userRouter.post(
  '/favorites',
  auth,
  body('mediaType')
    .exists()
    .withMessage('mediaType is required')
    .custom((type) => ['movie', 'tv'].includes(type))
    .withMessage('mediaType invalid'),
  body('mediaId')
    .exists()
    .withMessage('mediaId is required')
    .isLength({ min: 1 })
    .withMessage('mediaId can not be empty'),
  body('mediaTitle').exists().withMessage('mediaTitle is required'),
  body('mediaPoster').exists().withMessage('mediaPoster is required'),
  body('mediaRate').exists().withMessage('mediaRate is required'),
  validate,
  addFavorite
);

userRouter.delete('/favorites/:favoriteId', auth, removeFavorite);

export default userRouter;
