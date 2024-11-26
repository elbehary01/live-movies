import express from 'express';
import { personDetail, personMedias } from '../controllers/personController.js';

const Router = express.Router({ mergeParams: true });

Router.get('/:personId/medias', personMedias);

Router.get('/:personId', personDetail);

export default Router;
