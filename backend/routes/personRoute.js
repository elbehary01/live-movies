import express from 'express';
import { personDetail, personMedias } from '../controllers/personController.js';

const personRouter = express.Router({ mergeParams: true });

personRouter.get('/:personId/medias', personMedias);

personRouter.get('/:personId', personDetail);

export default personRouter;
