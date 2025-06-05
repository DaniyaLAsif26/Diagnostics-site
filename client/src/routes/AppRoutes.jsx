import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import NotFound from '../pages/NotFound.jsx';
import SearchResults from '../components/Search-results/SearchResults.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/index" element={<Home />} />
       <Route path="/search" element={<SearchResults />} />
     <Route path="*" element={<NotFound />} />  {/* catch-all 404 */}
    </Routes>
  );
}

export default AppRoutes;
