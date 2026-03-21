import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BuilderComponent, builder } from '@builder.io/react';

/**
 * Catch-all page that renders Builder.io-managed content.
 * Any route not handled by React Router will attempt to load from Builder.
 */
export default function CatchAllPage() {
  const location = useLocation();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    builder
      .get('page', { url: location.pathname })
      .promise()
      .then((data) => {
        if (data) {
          setContent(data);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="container-main" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="container-main" style={{ paddingTop: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '1rem' }}>404</h1>
        <p style={{ color: 'var(--cds-text-secondary)' }}>Page not found</p>
      </div>
    );
  }

  return (
    <div className="container-main" style={{ paddingTop: '2rem' }}>
      <BuilderComponent model="page" content={content} />
    </div>
  );
}
