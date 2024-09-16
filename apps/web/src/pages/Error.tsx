import { useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id='error-page'>
      <h1
        style={{ fontSize: '80px', fontWeight: '500', fontFamily: 'Poppins' }}
      >
        Oops!
      </h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
