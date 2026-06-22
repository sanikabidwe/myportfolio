import React, { useState, useEffect } from 'react';
import { getProjects } from '../../services/api';
import FilterPills from './FilterPills';
import WorkCard from './WorkCard';
import ProjectModal from './ProjectModal';
import './WorkGrid.css';

const CATEGORIES = ['ALL', 'COLLECTIONS', 'GARMENT DESIGN', 'ILLUSTRATION', 'STYLING', 'CRAFT EXPLORATION'];

export default function WorkGrid() {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    getProjects(activeFilter).then(setProjects);
  }, [activeFilter]);

  return (
    <div className="work-safe-area">
      <FilterPills
        categories={CATEGORIES}
        active={activeFilter}
        onChange={setActiveFilter}
      />
      <div className="work-grid" key={activeFilter}>
        {projects.map((p, i) => (
          <WorkCard
            key={p.id}
            project={p}
            index={i}
            onOpenModal={setActiveProject}
          />
        ))}
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}
