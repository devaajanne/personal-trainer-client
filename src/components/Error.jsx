import { useRouteError, Link } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  return (
    <div>
      <h1>Sorry!</h1>
      <p>We could not find the page you are looking for</p>
      <p>
        <em>{error.data}</em>
      </p>
      <nav>
        <Link to={"/"}>Return to home page</Link>
      </nav>
    </div>
  );
}
