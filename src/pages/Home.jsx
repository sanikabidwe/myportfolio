import React, { useState, useEffect } from 'react';
import { getProfile, getCarouselData, getSkills, getAwards, getJournal, getTestimonials, getExperience, getEducation } from '../services/api';
import Hero from '../components/sections/Hero';
import PortraitCarousel from '../components/sections/PortraitCarousel';
import About from '../components/sections/About';
import Education from '../components/sections/Education';
import Experience from '../components/sections/Experience';
import Skills from '../components/sections/Skills';
import Awards from '../components/sections/Awards';
import Journal from '../components/sections/Journal';
import Testimonials from '../components/sections/Testimonials';

export default function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    Promise.all([
      getProfile(),
      getCarouselData(),
      getSkills(),
      getAwards(),
      getJournal(),
      getTestimonials(),
      getExperience(),
      getEducation(),
    ]).then(([profile, carousel, skills, awards, journal, testimonials, experience, education]) => {
      setData({ profile, carousel, skills, awards, journal, testimonials, experience, education });
    });
  }, []);

  return (
    <>
      <Hero profile={data.profile} />
      <PortraitCarousel slides={data.carousel?.portrait} />
      <About profile={data.profile} />
      <Education education={data.education} />
      <Experience experience={data.experience} />
      <Skills skills={data.skills} />
      <Awards awards={data.awards} />
      <Journal posts={data.journal} />
      <Testimonials testimonials={data.testimonials} />
    </>
  );
}
