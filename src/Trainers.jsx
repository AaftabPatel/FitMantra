  import React from 'react';
  import trainer1 from './t1.jpg';
  import trainer2 from './t2.jpg';
  import trainer3 from './t3.jpg';

  const Trainers = () => {
    return(
      <>
      <h1 className="trainerHeading"> OUR TRAINERS</h1>
      <p className="trainerBack" id="trainers">our trainers are a professional team of experts and is composed of only trained professionals with backgrounds and proper training and education.</p>
      <div className="trainers">
        <div className="trainerCard">
          <img src={trainer1} className="trainerImg" alt="Trainer dp" />
          <div className="trainerInfo">
            <h2>Mike Tigerson</h2>
            <h3>Trainer</h3>
          </div>
        </div>    
        <div className="trainerCard">
          <img src={trainer2} className="trainerImg" alt="Trainer dp" />
          <div className="trainerInfo">
            <h2>Alexa Rondol</h2>
            <h3>Specialist</h3>
          </div>
        </div>    
        <div className="trainerCard">
          <img src={trainer3} className="trainerImg" alt="Trainer dp" />
          <div className="trainerInfo">
            <h2>Kane Wonderkin</h2>
            <h3>Trainer</h3>
          </div>
        </div>    
      </div>
      
      </>
    );
  }

  export default Trainers;
