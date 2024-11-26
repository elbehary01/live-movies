import { ok, error } from '../handlers/responseHandler.js';
import tmdbApi from '../config/tmdb.js';

const personDetail = async (req, res) => {
  try {
    const { personId } = req.params;

    const person = await tmdbApi.personDetail({ personId });

    ok(res, person);
  } catch {
    error(res);
  }
};

const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;

    const medias = await tmdbApi.personMedias({ personId });

    ok(res, medias);
  } catch {
    error(res);
  }
};

export { personDetail, personMedias };
