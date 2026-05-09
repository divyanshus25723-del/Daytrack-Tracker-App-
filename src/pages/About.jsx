import React from "react";

function About() {
  return (
    <section className="page about-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">About DayTrack</p>
          <h1>Designed to help you finish what matters.</h1>
          <p className="hero-copy">DayTrack blends clarity, speed, and focus so every day feels intentional.</p>
        </div>
      </div>

      <div className="info-grid">
        <article className="info-card" aria-labelledby="simple-heading">
          <h3 id="simple-heading">Simple flow</h3>
          <p>Add tasks quickly, sort them by category, and keep your list clean with one click.</p>
        </article>
        <article className="info-card" aria-labelledby="fast-heading">
          <h3 id="fast-heading">Fast focus</h3>
          <p>Use filters, priorities, and due dates to build a workflow that helps you stay in the zone.</p>
        </article>
        <article className="info-card" aria-labelledby="built-heading">
          <h3 id="built-heading">Built to last</h3>
          <p>Your list is saved locally, so your progress stays with you every time you return.</p>
        </article>
      </div>

      <div className="about-footer">
        <p>Ready to take control of your day? Move to Tracker and add your next task.</p>
      </div>
    </section>
  );
}

export default About;
