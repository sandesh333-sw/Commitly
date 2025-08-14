import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import Navbar from "../Navbar.jsx";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/repo/user/${userId}`);
        setRepositories(response.data.repositories);
      } catch (err) {
        console.error("Error while fetching repositories:", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/repo/all`);
        setSuggestedRepositories(response.data);
      } catch (err) {
        console.error("Error while fetching suggested repositories:", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <section id="dashboard">
        {/* Suggested Repositories */}
        <aside>
          <h3>Suggested Repositories</h3>
          {suggestedRepositories.map((repo) => (
            <div key={repo._id} className="repo-card">
              <h4>{repo.name}</h4>
              <p>{repo.description}</p>
            </div>
          ))}
        </aside>

        {/* Your Repositories */}
        <main>
          <h2>Your Repositories</h2>
          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchResults.map((repo) => (
            <div key={repo._id} className="repo-card">
              <h4>{repo.name}</h4>
              <p>{repo.description}</p>
            </div>
          ))}
        </main>

        {/* Upcoming Events */}
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            {[
              "Tech Conference - Dec 15",
              "Developer Meetup - Dec 25",
              "React Summit - Jan 5",
              "AI & Machine Learning Expo - Jan 12",
              "JavaScript World Tour - Jan 20",
              "Open Source Contribution Day - Feb 2",
              "Startup Pitch Night - Feb 10",
              "Full-Stack Dev Workshop - Feb 18",
            ].map((event, index) => (
              <li key={index} className="event-item">
                <p>{event}</p>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
