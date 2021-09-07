import React, { useState, useEffect } from 'react';
import {
  Header,
  Summary,
  Experience,
  Projects,
  Skills,
  List,
  Education,
  Footer,
  SEO
} from '../components';
import resumeKr from '../../data/profile_kr';
import resumeEn from '../../data/profile';
import '../main.css';

const Home = () => {
	const [lang, setLang] = useState('ko')

	useEffect(() => {
		let init = localStorage.getItem('haeminLang')
		if(init){
			setLang(init)
		}else{
			getLang()
		}
	}, [])

	const getLang = () => {
		const language = navigator.language ? navigator.language : navigator.userLanguage
		if(language.substr(0,2) === 'ko'){
			setLang('ko')
		}else{
			setLang('en')
		}
	}

	const changLang = () => {
		if(lang === 'ko'){
			setLang('en')
			localStorage.setItem('haeminLang', 'en')
		}else{
			setLang('ko')
			localStorage.setItem('haeminLang', 'ko')
		}
	}

	const resume = lang === 'ko' ? resumeKr : resumeEn

	return (
		<main className="antialiased text-neutral-900 bg-neutral-100 min-h-screen sm:p-5">
			<SEO title="Resume" />
			<div className="container mx-auto shadow bg-white py-5 px-10">
			<Header
				contacts={resume.contact}
				name={resume.fullname}
				role={resume.role}
				changLang={changLang}
				lang={lang}
			/>
			<Summary data={resume.summary} />
			<div className="border-b border-neutral-300 pb-2 my-5 lg:flex">
				<div className="lg:w-2/3 lg:pr-8">
				{resume.experience && <Experience data={resume.experience} />}
				{resume.projects && <Projects data={resume.projects} />}
				</div>
				<div className="lg:w-1/3 lg:pl-8 lg:border-l lg:border-neutral-300 ">
				{resume.skills && <Skills data={resume.skills} />}
				{resume.education && <Education data={resume.education} />}
				{resume.sidebar &&
					resume.sidebar.map(item => (
					<List key={`${item.title}-side`} data={item} />
					))}
				</div>
			</div>
			<Footer social={resume.social} />
			</div>
		</main>
	)
};

export default Home;
