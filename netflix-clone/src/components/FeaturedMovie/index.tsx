import React from 'react';
import { Movie } from '../../types';

import { BsFillPlayFill, BsPlus } from '../../styles/icons';

import './styles.css';

interface OwnProps {
  item?: Movie;
}

const FeaturedMovie = ({ item }: OwnProps) => {
  const firtDate = item ? new Date(item?.first_air_date) : new Date();

  const genres = item?.genres.map((genre) => genre.name);

  let description = item?.overview;

  if (description && description?.length > 200) {
    description = description?.substring(0, 200) + '...';
  }

  return (
    <section
      className="featured"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `linear-gradient(to top, #111 10%, transparent 90%), linear-gradient(to right, #111 30%, transparent 70%),  url(https://image.tmdb.org/t/p/original${item?.backdrop_path}) `
      }}
    >
      <div className="featured--name">{item?.original_name}</div>
      <div className="featured--info">
        <div className="featured--points">{item?.vote_average} pontos</div>
        <div className="featured--year">{firtDate.getFullYear()}</div>
        <div className="featured--seasons">
          {item?.number_of_seasons} temporada
          {item && item?.number_of_seasons > 1 ? 's' : ''}
        </div>
      </div>
      <div className="featured--description">{description}</div>
      <div className="featured--buttons">
        <a href={`/watch/${item?.id}`} className="featured--watchbutton">
          <BsFillPlayFill />
          Assistir
        </a>
        <a href={`/list/add/${item?.id}`} className="featured--mylistbutton">
          <BsPlus /> Minha Lista
        </a>
      </div>
      <div className="featured--genres">
        <strong>Gêneros: </strong>
        {genres?.join(', ')}
      </div>
    </section>
  );
};

export default FeaturedMovie;
