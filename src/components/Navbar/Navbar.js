import {Link} from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar border-bottom mb-4">
      <div className="container-lg">
        <Link className="text-decoration-none " to="/">
          <h1 className="fs-3 m-2">{process.env.REACT_APP_TITLE}</h1>
        </Link>
      </div>
    </nav>
  );
}
