/**
 * api.js — Central data access layer
 *
 * TODAY:  reads from local JSON files (mock API responses)
 * FUTURE: replace each function body with a fetch() call to the real backend
 *         e.g.  export const getProjects = () => fetch(`${BASE_URL}/projects`).then(r => r.json());
 *
 * Components should NEVER import JSON directly — always go through this file.
 */

import profile      from '../data/profile.json';
import carousel     from '../data/carousel.json';
import projects     from '../data/projects.json';
import skills       from '../data/skills.json';
import awards       from '../data/awards.json';
import journal      from '../data/journal.json';
import testimonials from '../data/testimonials.json';
import experience   from '../data/experience.json';
import education    from '../data/education.json';

export const getProfile      = () => Promise.resolve(profile);
export const getCarouselData = () => Promise.resolve(carousel);
export const getSkills       = () => Promise.resolve(skills);
export const getAwards       = () => Promise.resolve(awards);
export const getJournal      = () => Promise.resolve(journal);
export const getTestimonials = () => Promise.resolve(testimonials);
export const getExperience   = () => Promise.resolve(experience);
export const getEducation    = () => Promise.resolve(education);

/**
 * @param {string|null} category - filter by category string, or null/'ALL' for all projects
 */
export const getProjects = (category = null) =>
  Promise.resolve(
    !category || category === 'ALL'
      ? projects
      : projects.filter(p => p.category === category)
  );
