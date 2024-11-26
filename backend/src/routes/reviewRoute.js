import express from 'express';
import { body } from 'express-validator';
import {
  create,
  remove,
  getReviewsOfUser,
} from '../controllers/reviewController.js';
import { validate } from '../handlers/requestHandler.js';
import { auth } from '../middlewares/auth.js';

const Router = express.Router({ mergeParams: true });

Router.get('/', auth, getReviewsOfUser);

Router.post(
  '/',
  auth,
  body('mediaId')
    .exists()
    .withMessage('mediaId is required')
    .isLength({ min: 1 })
    .withMessage('mediaId can not be empty'),
  body('content')
    .exists()
    .withMessage('content is required')
    .isLength({ min: 1 })
    .withMessage('content can not be empty'),
  body('mediaType')
    .exists()
    .withMessage('mediaType is required')
    .custom((type) => ['movie', 'tv'].includes(type))
    .withMessage('mediaType invalid'),
  body('mediaTitle').exists().withMessage('mediaTitle is required'),
  body('mediaPoster').exists().withMessage('mediaPoster is required'),
  validate,
  create
);

Router.delete('/:reviewId', auth, remove);

export default Router;
