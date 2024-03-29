const API_KEY = '300840a8d237c4ab7c57637059e8d29e';
const API_BASE = 'https://api.themoviedb.org/3';

/**
 * Originais da netflix
 * Recomendados
 * Em alta
 * Ação
 * Comédia
 * Terror
 * Romance
 * Documentários
 */

const basicFetch = async (endpoint: string) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
};

const Api = {
  getHomeList: async (): Promise<any[]> => {
    return [
      {
        slug: 'originals',
        title: 'Originais do Netflix',
        items: await basicFetch(
          `/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`
        )
      },
      {
        slug: 'trendings',
        title: 'Recomendados para Você',
        items: await basicFetch(
          `/trending/all/week?language=pt-BR&api_key=${API_KEY}`
        )
      },
      {
        slug: 'toprated',
        title: 'Em Alta',
        items: await basicFetch(
          `/movie/top_rated?language=pt-BR&api_key=${API_KEY}`
        )
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch(
          `/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`
        )
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch(
          `/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`
        )
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch(
          `/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`
        )
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(
          `/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`
        )
      },
      {
        slug: 'documentary',
        title: 'Documentários',
        items: await basicFetch(
          `/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`
        )
      }
    ];
  },

  getMovieInfo: async (movieId: number, type: string): Promise<any> => {
    let info = {};

    if (!movieId) return;

    switch (type) {
      case 'movie':
        info = await basicFetch(
          `/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`
        );

        break;

      case 'tv':
        info = await basicFetch(
          `/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`
        );

        break;

      default:
        return;
    }

    return info;
  }
};

export default Api;
