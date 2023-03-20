import { Loader } from '../Loader/Loader';
import { MainWrap } from '../templates/MainWrap/MainWrap';

// eslint-disable-next-line func-names
export const withQuery = (WrappedComponent) => function ({
  isLoading, isFetching, isError, error, refetch, ...rest
}) {
  if (isError) {
    return (
      <MainWrap>
        <div>

          <p>
            Произошла ошибка:
            {' '}
            {error.message}
          </p>

          <button
            onClick={refetch}
            type="button"
          >
            Повторить
          </button>
        </div>
      </MainWrap>
    );
  }

  if (isLoading) {
    return (
      <MainWrap>
        <Loader />
      </MainWrap>
    );
  }

  return (
    <>
      {isFetching && <Loader />}
      <WrappedComponent {...rest} />
    </>
  );
};
