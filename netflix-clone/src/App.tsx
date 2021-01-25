import React, { useEffect, useState } from 'react';

import FeaturedMovie from './components/FeaturedMovie';
import MovieRow from './components/MovieRow';
import Header from './components/Header';

import Api from './services/api';

import { MovieCategories } from './types';

import './App.css';

const App = () => {
  const [movieList, setMovieList] = useState([] as MovieCategories[]);
  const [featuredData, setFeaturedData] = useState();
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      const list: MovieCategories[] = await Api.getHomeList();
      setMovieList(list);

      const originals = list.filter((i) => i.slug === 'originals');

      const randomChosen = Math.floor(
        Math.random() * originals[0].items.results.length - 1
      );

      const chosenMovie = originals[0].items.results[randomChosen];

      const chosenMovieInfo = await Api.getMovieInfo(chosenMovie.id, 'tv');

      setFeaturedData(chosenMovieInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header blackHeader={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Direitos de imagem para Netflix <br />
        Dados pegos no site Themoviedb.org
      </footer>

      {!movieList.length && (
        <div className="loading">
          <div className="loading--circle"></div>
        </div>
      )}
    </div>
  );
};

export default App;
