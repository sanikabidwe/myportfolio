import React, { useState, useEffect } from 'react';
import { getProjects } from '../../services/api';
import FilterPills from './FilterPills';
import WorkCard from './WorkCard';
import './WorkGrid.css';

const CATEGORIES = ['ALL', 'COLLECTIONS', 'GARMENT DESIGN', 'TEXTILE DESIGN', 'ILLUSTRATION', 'STYLING', 'CONCEPT DEVELOPMENT'];

export default function WorkGrid() {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');

  useEffect(() => {
    getProjects(activeFilter).then(setProjects);
  }, [activeFilter]);

  return (
    <>
      <FilterPills
        categories={CATEGORIES}
        active={activeFilter}
        onChange={setActiveFilter}
      />
      <div className="work-grid">
        {projects.map(p => (
          <WorkCard key={p.id} project={p} />
        ))}
      </div>
      <div className="load-more">
        <a href="#top">Load More ›</a>
      </div>
    </>
  );
}
