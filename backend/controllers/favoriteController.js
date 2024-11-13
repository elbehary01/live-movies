import {
  error,
  badRequest,
  ok,
  created,
  unauthorize,
  notfound,
} from '../handlers/responseHandler.js';
import favoriteModel from '../models/favoriteModel.js';

const addFavorite = async (req, res) => {
  try {
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });

    if (isFavorite) return ok(res, isFavorite);

    const favorite = new favoriteModel({
      ...req.body,
      user: req.user.id,
    });

    await favorite.save();

    created(res, favorite);
  } catch {
    error(res);
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const favorite = await favoriteModel.findOne({
      user: req.user.id,
      _id: favoriteId,
    });

    if (!favorite) return notfound(res);

    await favorite.remove();

    ok(res);
  } catch {
    error(res);
  }
};

const getFavoritesOfUser = async (req, res) => {
  try {
    const favorite = await favoriteModel
      .find({ user: req.user.id })
      .sort('-createdAt');

    ok(res, favorite);
  } catch {
    error(res);
  }
};

export { addFavorite, removeFavorite, getFavoritesOfUser };
