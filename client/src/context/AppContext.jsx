import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import axios from 'axios';
export const MoviesContext = createContext();

const AppContextProvider = (props) => {
  const basedUrl = import.meta.env.VITE_BACKEND_URL;
  const [movies, setMovies] = useState([]);

  const getMoviesData = async () => {
    try {
      const response = await axios.create({
        basedUrl,
        paramsSerializer: {
          encode: (params) => queryString.stringify(params),
        },
      });
      if (response.data.success) {
        setMovies(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = { getMoviesData };
  return (
    <MoviesContext.Provider value={value}>
      {props.children}
    </MoviesContext.Provider>
  );
};

export default AppContextProvider;
