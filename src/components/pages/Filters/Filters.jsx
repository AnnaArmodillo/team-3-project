import { useSearchParams } from 'react-router-dom';
// import { ButtonGrey } from '../../atoms/ButtonGrey/ButtonGrey';
import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import { ButtonWhite } from '../../atoms/ButtonWhite/ButtonWhite';
import { FILTERS_BY_TYPE, FILTER_QUERY_NAME } from './constants';

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const clickFilterHandler = (filterType, isActive) => {
    if (!isActive) searchParams.delete(FILTER_QUERY_NAME);
    else searchParams.set(FILTER_QUERY_NAME, filterType);
    setSearchParams(searchParams);
  };

  return (
    <>
      {FILTERS_BY_TYPE.map((filter) => (
        <FilterItem
          key={filter.type}
          clickFilterHandler={clickFilterHandler}
          filterName={filter.name}
          filterType={filter.type}
        />
      ))}
    </>
  );
}

export function FilterItem({ filterName, filterType, clickFilterHandler }) {
  const [searchParams] = useSearchParams();

  const currentFilterNameFromQuery = searchParams.get(FILTER_QUERY_NAME);
  const isActive = currentFilterNameFromQuery === filterType;

  if (isActive) {
    return (
      <ButtonPurple
        onClick={() => clickFilterHandler(filterType, !isActive)}
      >
        <i className="fa-solid fa-list-ul" />
        {filterName}
      </ButtonPurple>
    );
  }
  return (
    <ButtonWhite onClick={() => clickFilterHandler(filterType, !isActive)}>
      <i className="fa-solid fa-list-ul" />
      {filterName}
    </ButtonWhite>
  );
}
