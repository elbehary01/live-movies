import express from 'express';
import {
  getList,
  getGenres,
  search,
  getDetail,
} from '../controllers/mediaController.js';

const Router = express.Router({ mergeParams: true });

Router.get('/search', search);

Router.get('/genres', getGenres);

Router.get('/detail/:mediaId', getDetail);

Router.get('/:mediaCategory', getList);

export default Router;
