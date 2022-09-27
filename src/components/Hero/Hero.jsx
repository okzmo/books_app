import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../App';
import './hero.scss';
import '../../theme.scss';
import lamp from '../../images/Lamp.png';
import illustration from '../../images/Illustration.png';
import SearchBarPhone from '../SearchBarPhone/SearchBarPhone';
import lampLight from '../../images/Lamp-light.png';
import illuLight from '../../images/Illustration-light.png';

function Hero() {
	const { theme } = useContext(ThemeContext);

	return (
		<div className='hero' id={theme}>
			<h1 className='greeting'>
				<span className='firstWord'>LET'S </span>
				<span className='secondWord'>FIND </span>
				<span className='liaison'>A </span>
				<span className='fourthWord'>BOOK</span>
			</h1>
			<img src={theme === 'light' ? lampLight : lamp} alt='' id='LampPos' />
			<div className='HeroIllustration'>
				<img
					src={theme === 'light' ? illuLight : illustration}
					alt=''
					id='Illustration'
				/>
			</div>
			<SearchBarPhone />
		</div>
	);
}

export default Hero;
