import React from 'react';
import './Journal.css';

export default function Journal({ posts }) {
  if (!posts?.length) return null;
  const featured = posts.find(p => p.featured);
  const side = posts.filter(p => !p.featured);
  return (
    <section id="journal" className="journal-section">
      <p className="section-label" style={{ textAlign: 'center' }}>Journal</p>
      <h2 className="section-title">Creative Journal</h2>
      <div className="gold-rule" />
      <div className="journal-grid">
        {featured && (
          <div className="journal-featured">
            <div
              className="jf-img img-placeholder"
              style={{ background: featured.image ? `url(${featured.image}) center/cover` : featured.gradient }}
            />
            <div className="jf-body">
              <p className="journal-meta">{featured.date} &nbsp;·&nbsp; {featured.readTime}</p>
              <h3 className="journal-title">{featured.title}</h3>
              <p className="journal-excerpt">{featured.excerpt}</p>
            </div>
          </div>
        )}
        <div className="journal-side">
          {side.map(post => (
            <div key={post.id} className="journal-card">
              <div
                className="jc-img img-placeholder"
                style={{ background: post.image ? `url(${post.image}) center/cover` : post.gradient }}
              />
              <div className="jc-body">
                <p className="journal-meta">{post.date} &nbsp;·&nbsp; {post.readTime}</p>
                <p className="jc-title">{post.title}</p>
                <p className="journal-excerpt">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
