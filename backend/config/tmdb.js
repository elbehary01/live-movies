import axios from 'axios';

const getURL = (endpoint, params) => {
  const qs = new URLSearchParams(params);
  return `${process.env.TMDB_BASE_URL}${endpoint}?api_key=${process.env.TMDB_SECRET_KEY}&${qs}`;
};

const tmdbEndpoints = {
  mediaList: ({ mediaType, mediaCategory, page }) =>
    getURL(`${mediaType}/${mediaCategory}`, page),
  mediaDetail: ({ mediaType, mediaId }) => getURL(`${mediaType}/${mediaId}`),
  mediaGenres: ({ mediaType }) => getURL(`genre/${mediaType}/list`),
  mediaCredits: ({ mediaType, mediaId }) =>
    getURL(`${mediaType}/${mediaId}/credits`),
  mediaVideos: ({ mediaType, mediaId }) =>
    getURL(`${mediaType}/${mediaId}/videos`),
  mediaImages: ({ mediaType, mediaId }) =>
    getURL(`${mediaType}/${mediaId}/images`),
  mediaRecommend: ({ mediaType, mediaId }) =>
    getURL(`${mediaType}/${mediaId}/recommendations`),
  mediaSearch: ({ mediaType, query, page }) =>
    getURL(`search/${mediaType}`, { query, page }),
  personDetail: ({ personId }) => getURL(`person/${personId}`),
  personMedias: ({ personId }) => getURL(`person/${personId}/combined_credits`),
};

const getAxios = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }) =>
    await getAxios(tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })),
  mediaDetail: async ({ mediaType, page }) =>
    await getAxios(tmdbEndpoints.mediaDetail({ mediaType, page })),
  mediaGenres: async ({ mediaType }) =>
    await getAxios(tmdbEndpoints.mediaGenres({ mediaType })),
  mediaCredits: async ({ mediaType, mediaId }) =>
    await getAxios(tmdbEndpoints.mediaCredits({ mediaType, mediaId })),
  mediaVideos: async ({ mediaType, mediaId }) =>
    await getAxios(tmdbEndpoints.mediaVideos({ mediaType, mediaId })),
  mediaImages: async ({ mediaType, mediaId }) =>
    await getAxios(tmdbEndpoints.mediaImages({ mediaType, mediaId })),
  mediaRecommend: async ({ mediaType, mediaId }) =>
    await getAxios(tmdbEndpoints.mediaRecommend({ mediaType, mediaId })),
  mediaSearch: async ({ mediaType, query, page }) =>
    await getAxios(tmdbEndpoints.mediaSearch({ mediaType, query, page })),
  personDetail: async ({ personId }) =>
    await getAxios(tmdbEndpoints.mediaPerson({ personId })),
  personMedias: async ({ personId }) =>
    await getAxios(tmdbEndpoints.personMedias({ personId })),
};

export default tmdbApi;
