import { useNavigate } from 'react-router-dom';
import { Button } from '@carbon/react';
import { ArrowLeft } from '@carbon/react/icons';

/**
 * 404 fallback for any route not matched by the router.
 */
export default function CatchAllPage() {
  const navigate = useNavigate();

  return (
    <div className="container-main" style={{ paddingTop: '4rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '1rem' }}>
        404
      </h1>
      <p style={{ color: 'var(--cds-text-secondary)', marginBottom: '2rem' }}>
        Page not found
      </p>
      <Button kind="ghost" renderIcon={ArrowLeft} onClick={() => navigate('/')}>
        Back to home
      </Button>
    </div>
  );
}
