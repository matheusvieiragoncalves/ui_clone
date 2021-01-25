import React, { useState } from 'react';

import { MdNavigateBefore, MdNavigateNext } from '../../styles/icons';

import { ListMovie } from '../../types';

import './styles.css';

interface RowInfo {
  title: string;
  items: ListMovie;
}

const MovieRow = ({ title, items }: RowInfo) => {
  let [scrollX, setScrollX] = useState(-400);

  const handlerLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);

    if (x > 0) {
      x = 0;
    }

    setScrollX(x);
  };

  const handlerRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    const listWidth = items.results.length * 150;

    if (window.innerWidth - listWidth > x) {
      x = window.innerWidth - listWidth - 60;
    }

    setScrollX(x);
  };

  return (
    <div className="movieRow">
      <h2>{title}</h2>

      <div className="movieRow--left" onClick={handlerLeftArrow}>
        <MdNavigateBefore style={{ fontSize: 50 }} />
      </div>

      <div className="movieRow--rigth" onClick={handlerRightArrow}>
        <MdNavigateNext style={{ fontSize: 50 }} />
      </div>

      <div className="movieRow--listarea">
        <div
          className="movieRow--list"
          style={{ marginLeft: scrollX, width: items.results.length * 150 }}
        >
          {items.results.length &&
            items.results.map((item, key) => (
              <div className="movieRow--item" key={key}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.name}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
