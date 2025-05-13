import React from 'react';

const Services = () => {
	return(
		<>
		<h1 className="serviceHeading">	OUR SERVICES</h1>
		<div className="services" id="services">
			
			<div className="serviceCard">
				<i class="fa fa-home" aria-hidden="true"></i>
				<h2>Personal Training</h2>
				<p>
					At FitMantra, we undertand that your home is your sanctuary, and keeping it secure is of utmost 
					importance. Our home security services are designed to provide you with peace of mind, whether 
					you're at home or away. We offer state-of-the-art security systems, including surveillance cameras,
					 alarm systems, and 24/7 monitoring, to ensure that your home is protected .
				</p>
				
			</div>		
			<div className="serviceCard">
				<i class="fa fa-list-ol" aria-hidden="true"></i>
				<h2>Tailored Routing with AI</h2>
				<p>
					Protecting your business assets and ensuring the safety of your employees is a critical responsibility. 
					FitMantra offers comprehensive office security solutions tailored to meet the unique needs of your business.
					 From access control systems and CCTV surveillance to on-site security personnel, we provide a multi-layered 
					 approach to secure your workplace.
				</p>
				
			</div>		
			<div className="serviceCard">
				<i class="fa fa-users" aria-hidden="true"></i>
				<h2>Memberships </h2>
				<p>
					When it comes to personal protection, FitMantra's bodyguard services are second to none. 
					Our elite team of bodyguards is composed of highly trained professionals with backgrounds
					in law enforcement and military. We provide personalized security solutions, ensuring that 
					our clients are protected in every aspect of their lives.
				</p>
				
			</div>		
		</div>
		</>
	);
}

export default Services;
