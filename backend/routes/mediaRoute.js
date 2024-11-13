import express from 'express';
import {
  getList,
  getGenres,
  search,
  getDetail,
} from '../controllers/mediaController.js';

const mediaRouter = express.Router({ mergeParams: true });

mediaRouter.get('/search', search);

mediaRouter.get('/genres', getGenres);

mediaRouter.get('/detail/:mediaId', getDetail);

mediaRouter.get('/:mediaCategory', getList);

export default mediaRouter;
