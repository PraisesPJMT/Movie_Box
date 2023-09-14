import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_STATUS } from '../../utilities/enums';
import { BurgerIcon, SearchIcon } from '../../assets/icons/Icons';

import debounce from 'lodash.debounce';
import Logo from '../../assets/tv.svg';
import useMovieStore from '../../store/store';
import Loader from '../../components/loader/Loader';
import SearchCard from '../../components/search-card/SearchCard';

import './Header.scss';

const Header = () => {
  const [search, setSearch] = useState('');
  const [activeScroll, setActiveScroll] = useState(false);

  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchMovies = useMovieStore((state) => state.searchMovies);
  const searchedMovies = useMovieStore((state) => state.search.data);
  const status = useMovieStore((state) => state.search.status);

  const debouncedSearch = debounce((query) => {
    searchMovies(query);
  }, 300);

  useEffect(() => {
    debouncedSearch(search);

    return () => {
      debouncedSearch.cancel();
    };
  }, [search]);

  useEffect(() => {
    if (searchedMovies) {
      setSearchResult(searchedMovies);
    } else {
      setSearchResult([]);
    }
  }, [searchedMovies]);

  useEffect(() => {
    if (status === API_STATUS.LOADING) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [status]);

  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setActiveScroll(true);
    } else {
      setActiveScroll(false);
    }
  };

  window.addEventListener('scroll', changeBackground);

  return (
    <header className={activeScroll ? 'active' : ''}>
      <Link to="#" aria-label="home">
        <img src={Logo} alt="logo" />
        <span>MovieBox</span>
      </Link>

      <div className="search">
        <label aria-label="search">
          <input
            type="text"
            value={search}
            placeholder="What do you want to watch?"
            onChange={(event) => setSearch(event.target.value)}
          />

          <SearchIcon />
        </label>

        {search.length > 1 ? (
          <>
            <div className="search-content">
              {isSearching ? (
                <Loader />
              ) : (
                <>
                  {searchResult.map((result) => (
                    <SearchCard key={result.id} movie={result} />
                  ))}
                  {!isSearching && searchResult.length < 1 ? (
                    <>
                      <div className="no-result">
                        <p>No results found</p>
                      </div>
                    </>
                  ) : null}
                </>
              )}
            </div>
          </>
        ) : null}
      </div>

      <div className="menu">
        <Link to="#">Sign in</Link>

        <button aria-label="Menu" type="button">
          <BurgerIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
