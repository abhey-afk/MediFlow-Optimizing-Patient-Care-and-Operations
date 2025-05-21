import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Information About Medical Institute</h3>
          <p>
            Zee Care Medical Institute is established in 1956 , is one of the 
            most prestigious medical institutions in india. located in new delhi
            Zee care medical Institute is recognised for its excellence in medical
            education, patient care, and advanced research. It offers undergraduate 
            postgraduation and doctoral programs in various medical fields, 
            attracting students from all over the world.
            Be Safe and Be Healthy!
          </p>
          <p>We are all in 2025!</p>
          <p>We are aiming the all people are live disease free.</p>
          <p>
            Zee care medical Institute of medical science provides comprehensive
            and affordable healthcare services, including specialized treatment
            and surgeries. It houses state of the art facilities a highly skilled
            team of medical professionals and is at the forefront of medical research facilities
            and innovation. zee care also serves as referral center for complications
            and rare medical cases.
          </p>
          <p>Care Rooted in Science, Driven by Humanity</p>
          <p>Your health , Our mission</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
