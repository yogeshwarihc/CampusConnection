import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PlacementCard from '../components/PlacementCard';
import SuccessStoryCard from '../components/SuccessStoryCard';
import './Placement.css';
import { Link } from 'react-router-dom';

const placementData = [
  { title: "Internship & Job Board", icon: "🧑‍💼", description: "Browse verified listings for internships and jobs." },
  { title: "Coding Challenges", icon: "🧠", description: "Practice coding and get feedback on your solutions." },
  { title: "Project Collaboration", icon: "🤝", description: "Find peers to work with on major projects." },
  { title: "Interview Experiences", icon: "🗣️", description: "Real experiences shared by placed students." },
  { title: "Placement Resources", icon: "📚", description: "Guides, skill lists, and preparation material." },
];

const successStories = [
  { name: "Aijaz Kumar", quote: "The mock interviews helped me land a Microsoft internship!", year: 2023 },
  { name: "Swapz Mehta", quote: "I aced my Google interview thanks to the coding section.", year: 2023 },
  { name: "Rahul Desai", quote: "Real-world project experience made a difference.", year: 2023 },
];

const Placements = () => {
  return (
    <>
      <Navbar />
      <div className="placement-hero">
        <h2>Placement Track</h2>
        <p>Resources, opportunities, and community support to help you excel in your career journey.</p>
      </div>

      <div className="placement-section">
  {placementData.map((item, idx) => {
    let linkTo = null;

    if (item.title === "Interview Experiences") linkTo = "/experience";
    else if(item.title==="Placement Resources") linkTo = "/subjects";

    return linkTo ? (
      <Link key={idx} to={linkTo} style={{ textDecoration: 'none', color: 'inherit' }}>
        <PlacementCard {...item} />
      </Link>
    ) : (
      <PlacementCard key={idx} {...item} />
    );
  })}
</div>

      <h3 className="success-heading">Success Stories</h3>
      <div className="success-section">
        {successStories.map((story, idx) => (
          <SuccessStoryCard key={idx} {...story} />
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Placements;
