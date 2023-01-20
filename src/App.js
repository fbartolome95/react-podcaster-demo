import {BrowserRouter, Route, Routes} from 'react-router-dom';

import PodcastListPage from './pages/PodcastListPage';
import PodcastDetailPage from './pages/PodcastDetailPage';
import PageNotFound from './pages/PageNotFound';

import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container-lg">
        <Routes>
          <Route path="/" element={<PodcastListPage />} />
          <Route path="/podcast/:id" element={<PodcastDetailPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
