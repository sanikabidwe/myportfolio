import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCollection } from '../services/api';
import CollectionDetail from '../components/sections/CollectionDetail';

/**
 * CollectionPage
 * --------------
 * Route: /collection/:slug
 *
 * Fetches the collection data for the given slug and passes it to
 * CollectionDetail for rendering. Shows a minimal loading / not-found state.
 */
export default function CollectionPage() {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const [collection, setCollection] = useState(null);
  const [notFound,   setNotFound]   = useState(false);

  useEffect(() => {
    setCollection(null);
    setNotFound(false);
    getCollection(slug).then((data) => {
      if (data) setCollection(data);
      else      setNotFound(true);
    });
  }, [slug]);

  if (notFound) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        fontFamily: 'var(--font-label)',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        fontSize: 12,
        color: 'var(--muted)',
      }}>
        <p>Collection not found.</p>
        <button
          onClick={() => navigate('/work')}
          style={{
            background: 'none',
            border: '1px solid var(--beige-dark)',
            padding: '10px 24px',
            fontFamily: 'var(--font-label)',
            fontSize: 11,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            color: 'var(--charcoal)',
          }}
        >
          Back to Work
        </button>
      </div>
    );
  }

  if (!collection) {
    /* minimal loading state — could be a spinner in future */
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-label)',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        fontSize: 11,
        color: 'var(--muted)',
      }}>
        Loading…
      </div>
    );
  }

  return <CollectionDetail collection={collection} />;
}
