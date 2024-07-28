import React from "react";
import "../AboutUs.css"; // Import your About Us page CSS

const AboutUs = () => {
  // Define an array of team members
  const teamMembers = [
    { name: "Souvik Karmakar", email: "rajkarmakar892@gmail.com" },
    { name: "Parthib Biswas", email: "parthibbiswas985@gmail.com" },
    { name: "Dipanjan Santra", email: "dipanjansantra2019@gmail.com" },
    { name: "Satyaki Mukhopadhyay", email: "sat.mukh01@gmail.com" },
    { name: "Aishi Mukherjee", email: "aishi.tanu@gmail.com" },
    { name: "Bitan Kundu", email: "bitankundu1@gmail.com" },
    // Add more team members as needed
  ];

  return (
    <div className="about-us-container">
      <h1 className="about-us-heading">About Us</h1>
      <p className="about-us-description">
        Welcome to Phishing Detection, a platform created by Tech Tracers. Our
        mission is to provide reliable and efficient phishing detection
        services.
      </p>
      <p className="about-us-description">
        We are a team of dedicated professionals committed to ensuring your
        online safety. Our goal is to protect users from phishing threats and
        help them browse the internet securely.
      </p>
      <h2 className="team-heading">Meet Our Team</h2>
      <h2 className="team-heading">Tech Tracers</h2>
      <ul className="team-list">
        {teamMembers.map((member, index) => (
          <li key={index} className="team-member">
            <strong>{member.name}</strong> -{" "}
            <a href={`mailto:${member.email}`}>{member.email}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutUs;
