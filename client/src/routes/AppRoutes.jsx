import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Search from '../pages/Search.jsx';
import NotFound from '../pages/NotFound.jsx';
import AllTests from '../pages/AllTests.jsx'
import AboutUs from '../pages/AboutUs.jsx';
import GalleryPage from '../pages/Gallery.jsx';
import AllPacks from '../pages/AllPacks.jsx';
import HomeRelevancePage from '../pages/HomeRelevancePage.jsx';
import HomeSample from '../pages/HomeSample.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/index" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/all-tests" element={<AllTests />} />
      <Route path="/all-packages" element={<AllPacks />} />
      <Route path="/relevance/:relevance" element={<HomeRelevancePage />} />
      <Route path="/home-sample-collection" element={<HomeSample />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
