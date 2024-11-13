import { error, ok, created, notfound } from '../handlers/responseHandler.js';
import reviewModel from '../models/reviewModel.js';

const create = async (req, res) => {
  try {
    const { movieId } = req.params;

    const review = new reviewModel({
      user: req.user.id,
      movieId,
      ...req.body,
    });

    await review.save();

    created(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch {
    error(res);
  }
};

const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user.id,
    });

    if (!review) return notfound(res);

    await review.remove();

    ok(res);
  } catch {
    error(res);
  }
};

const getReviewsOfUser = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({
        user: req.user.id,
      })
      .sort('-createdAt');

    ok(res, reviews);
  } catch {
    error(res);
  }
};

export { create, remove, getReviewsOfUser };
