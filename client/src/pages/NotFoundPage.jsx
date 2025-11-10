import NotFound from '../components/NotFound/NotFound.jsx';

import { Helmet } from 'react-helmet-async';


export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 - Vision Diagnostic Centre</title>
        <meta name="description" content="Browse our comprehensive laboratory tests" />
      </Helmet>
      <NotFound />
    </>
  );
}
