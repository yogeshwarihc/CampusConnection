import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PlacementCard from '../components/PlacementCard';

import SuccessStoryCard from '../components/SuccessStoryCard';
import './Placement.css';

const AcademicData = [
  { title: "Academic Resources", icon: "🧑‍💼", description: "Browse verified listings for internships and jobs." },
  { title: "Previous year papers", icon: "🧠", description: "Practice coding and get feedback on your solutions." },
  { title: "Exams Discussions", icon: "🤝", description: "Find peers to work with on major projects." },
];

const successStories = [
  { name: "Data Structures & Algorithms", quote: "Comprehensive notes covering all basic and advanced topics with examples.", year: 2023 },
  { name: "Computer Networks", quote: "Complete study material with diagrams and real-world examples.", year: 2023 },
  { name: "Machine learning fundamentals", quote: "Notes with Python code samples and practice datasets.", year: 2023 },
];

const Academic = () => {
  return (
    <>
      <Navbar />
      <div className="placement-hero">
        <h2>Academic Track</h2>
        <p>Access study materials, collaborate with peers, and excel in your academic journey.</p>
      </div>

      <div className="placement-section">
  {AcademicData.map((item, idx) => {
    let linkTo = null;

    if (item.title === "Academic Resources") linkTo = "/resources";
    else if (item.title === "Previous year papers") linkTo = "/papers";

    return linkTo ? (
      <Link key={idx} to={linkTo} style={{ textDecoration: 'none', color: 'inherit' }}>
        <PlacementCard {...item} />
      </Link>
    ) : (
      <PlacementCard key={idx} {...item} />
    );
  })}
</div>

      <h3 className="success-heading">Popular Resources</h3>
      <div className="success-section">
        {successStories.map((story, idx) => (
          <SuccessStoryCard key={idx} {...story} />
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Academic;
