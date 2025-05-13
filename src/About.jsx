import React from 'react';
import aboutImg from './aboutImg.jpg';

const About = () => {
	return(
		<div className = "about" id="about">
			<img src={aboutImg} alt="guard standing strong" />
			<div className="aboutContent">
				<h1>Who Are We?</h1>
				<p>
				At FitMantra, we are dedicated to providing top-tier Fitness services, ensuring your Fitness
				and peace of mind. Our team of highly trained, professional trainers is committed to ensuring your fitness 
				in every situation. Whether you need yoga, gym or personal trainer, FitMantra stands as
				your trusted partner, offering reliability, discretion, and unmatched expertise. Your Fitness is our priority.
				</p>
				
			</div>
		</div>
	);
}

export default About;