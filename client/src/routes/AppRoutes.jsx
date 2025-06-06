import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Search from '../pages/Search.jsx';
import NotFound from '../pages/NotFound.jsx';
import AllTests from '../pages/AllTests.jsx'


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/index" element={<Home />} />
      <Route path="/search/tests" element={<Search />} />
      <Route path="/search/all-tests" element={<AllTests />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
