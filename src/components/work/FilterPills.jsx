import React from 'react';
import './FilterPills.css';

export default function FilterPills({ categories, active, onChange }) {
  return (
    <div className="filters">
      {categories.map(cat => (
        <button
          key={cat}
          className={`filter-pill${active === cat ? ' active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
