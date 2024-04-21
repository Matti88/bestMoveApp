import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/settings">Go to About page</Link>
    </div>
  );
}

export default Home;
