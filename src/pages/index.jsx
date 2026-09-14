import React from 'react';
import featuredProjects from '../../data/featured_projects';
import experience from '../../data/experience_timeline';
import capabilities from '../../data/capabilities';
import '../main.css';

const Arrow = () => <span aria-hidden="true">↗</span>;

const ProjectVisual = ({ project }) => (
  <div className={`project-visual project-visual--${project.theme}`}>
    <div className="visual-chrome" aria-hidden="true">
      <span />
      <span />
      <span />
      <small>{project.visualLabel}</small>
    </div>
    {project.media.srcs ? (
      <div className="visual-gallery">
        {project.media.srcs.map((src, index) => (
          <img key={src} src={src} alt={`${project.media.alt} ${index + 1}`} />
        ))}
      </div>
    ) : project.media.type === 'video' ? (
      <video autoPlay loop muted playsInline aria-label={project.media.alt}>
        <source src={project.media.src} type="video/mp4" />
      </video>
    ) : (
      <img src={project.media.src} alt={project.media.alt} />
    )}
    <div className="visual-index" aria-hidden="true">
      {project.index}
    </div>
  </div>
);

const CaseStudy = ({ data, name }) => (
  <section className="case-study" aria-label={`${name} 상세 사례`}>
    <div className="case-intro">
      <p className="case-label">CASE NOTE / DEEP DIVE</p>
      <h4>{data.title}</h4>
      <p>{data.context}</p>
    </div>
    {data.signals && (
      <div className="market-signals" aria-label={data.signalsLabel}>
        {data.signals.map(signal => (
          <div key={signal.label}>
            <strong>{signal.value}</strong>
            <span>{signal.label}</span>
          </div>
        ))}
      </div>
    )}
    <div className="case-grid">
      {data.steps.map((step, index) => (
        <div key={step.title}>
          <span>
            0{index + 1} · {step.label}
          </span>
          <h5>{step.title}</h5>
          <p>{step.body}</p>
        </div>
      ))}
    </div>
    <div className="retrospective">
      <span>Retrospective</span>
      <p>{data.retrospective}</p>
      {data.source && (
        <a href={data.source.url} target="_blank" rel="noopener noreferrer">
          {data.source.label} <Arrow />
        </a>
      )}
    </div>
  </section>
);

const ProjectCase = ({ project }) => (
  <article className="project-case">
    <ProjectVisual project={project} />
    <div className="project-copy">
      <div className="project-heading">
        <div>
          <p className="project-meta">
            {project.company} · {project.period}
          </p>
          <h3>{project.name}</h3>
        </div>
        <span className="ownership-mark">FRONTEND · SOLO</span>
      </div>
      <p className="project-lead">{project.summary}</p>
      <dl className="project-facts">
        {project.facts.map(fact => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <div className="project-bottom">
        <ul className="tech-list" aria-label="사용 기술">
          {project.skills.map(skill => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            공개 자료 보기 <Arrow />
          </a>
        )}
      </div>
    </div>
    {project.caseStudy && (
      <CaseStudy data={project.caseStudy} name={project.name} />
    )}
  </article>
);

const Experience = () => (
  <section className="experience" id="experience">
    <div className="section-title experience-title">
      <div>
        <p className="eyebrow">Experience</p>
        <h2>한 자리에서 이어온 경력</h2>
      </div>
      <p>
        회사와 도메인은 달라졌지만, 제품의 프론트엔드를 온전히 이해하고 책임하는
        역할은 이어졌습니다.
      </p>
    </div>
    <div className="timeline">
      {experience.map((item, index) => (
        <article
          className={`timeline-item ${
            index === 0 ? 'timeline-item--current' : ''
          }`}
          key={`${item.company}-${item.period}`}
        >
          <time>{item.period}</time>
          <div className="timeline-main">
            <p>{item.role}</p>
            <h3>{item.company}</h3>
            <span>{item.description}</span>
            {item.projects && (
              <div className="freelance-projects">
                {item.projects.map(project => (
                  <a
                    key={project.name}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>{project.name}</strong>
                    <small>{project.type}</small>
                    <Arrow />
                  </a>
                ))}
              </div>
            )}
          </div>
          <p className="timeline-highlight">{item.highlight}</p>
        </article>
      ))}
    </div>
  </section>
);

const Capabilities = () => (
  <section className="capabilities" aria-labelledby="capabilities-title">
    <div className="capabilities-heading">
      <p className="eyebrow">Capabilities</p>
      <h2 id="capabilities-title">
        퍼센트 대신,
        <br />
        해온 일로 말합니다.
      </h2>
    </div>
    <div className="capability-list">
      {capabilities.map((item, index) => (
        <article key={item.title}>
          <span>0{index + 1}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
          <ul>
            {item.tools.map(tool => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
);

const About = () => (
  <section className="about" id="about">
    <div className="about-heading">
      <p className="eyebrow">About · Availability</p>
      <h2>
        다시, 팀 안에서
        <br />
        일할 준비를 하고 있습니다.
      </h2>
    </div>
    <div className="about-copy">
      <p>
        프론트엔드를 혼자 책임지는 환경에서 오래 일하며, 화면만 만드는 것보다
        먼저 제품과 도메인을 이해하는 법을 배웠습니다. 최근에는 세 개의 독립
        프로젝트에서 기획과 디자인, 구현까지 한 흐름으로 경험했습니다.
      </p>
      <p>
        현재 새로운 프론트엔드 역할을 찾고 있으며,{' '}
        <strong>원격 근무가 가능한 팀</strong>과의 만남을 기다립니다.
      </p>
      <div className="availability">
        <span className="status-dot" aria-hidden="true" />
        <div>
          <small>CURRENT AVAILABILITY</small>
          <strong>Open to remote opportunities</strong>
        </div>
      </div>
    </div>
  </section>
);

const Home = () => (
  <main>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="첫 화면으로 이동">
        Haemin <span>G</span>oo
      </a>
      <nav aria-label="주요 메뉴">
        <a href="#work">Work</a>
        <a href="#experience">Experience</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <section className="hero" id="top">
      <div className="hero-intro">
        <p className="eyebrow">Frontend developer · Seoul</p>
        <h1>
          복잡한 도메인을
          <br />
          <span>사용할 수 있는 화면</span>으로.
        </h1>
        <p className="hero-description">
          금융부터 에너지, 블록체인까지. 제품의 시작과 변화, 운영과 종료를
          지나며 프론트엔드의 한 자리를 온전히 책임져 온 개발자 구혜민입니다.
        </p>
        <div className="hero-actions">
          <a className="primary-link" href="#work">
            대표 작업 보기 <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <aside className="ownership-panel" aria-label="경력의 책임 범위">
        <div className="panel-topline">
          <span>FIELD NOTE / 2015—NOW</span>
          <span>SEOUL, KR</span>
        </div>
        <p className="panel-kicker">THE FRONTEND SEAT</p>
        <p className="panel-statement">
          2015년부터,
          <br />
          프론트엔드는 늘 <strong>한 자리.</strong>
        </p>
        <div className="ownership-route" aria-hidden="true">
          <span className="route-line" />
          <span className="route-node node-1" />
          <span className="route-node node-2" />
          <span className="route-node node-3" />
          <span className="route-node node-4" />
        </div>
        <div className="domain-row">
          <span>Education</span>
          <span>Commerce</span>
          <span>Finance</span>
          <span>Energy</span>
          <span>Web3</span>
        </div>
      </aside>
    </section>

    <section className="principles" aria-label="핵심 역량">
      <p>혼자 만든다는 건, 혼자 일한다는 뜻이 아니었습니다.</p>
      <div>
        <span>제품 전체를 이해하고</span>
        <span>직군 사이의 결정을 연결하며</span>
        <span>운영의 마지막까지 책임집니다</span>
      </div>
    </section>

    <section className="selected-work" id="work">
      <div className="section-title">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2>책임의 범위로 고른 작업</h2>
        </div>
        <p>
          화면의 개수보다, 제품을 이해하고 변화에 대응한 과정을 보여주는 세 가지
          사례입니다.
        </p>
      </div>
      <div className="project-list">
        {featuredProjects.map(project => (
          <ProjectCase key={project.name} project={project} />
        ))}
      </div>
    </section>

    <Capabilities />

    <Experience />

    <About />

    <footer id="contact">
      <p className="eyebrow">Next chapter</p>
      <h2>함께 풀 문제에 대해 이야기해요.</h2>
      <div>
        <a href="mailto:oooohyemin@gmail.com">
          oooohyemin@gmail.com <Arrow />
        </a>
      </div>
      <small>© {new Date().getFullYear()} Haemin Goo</small>
    </footer>
  </main>
);

export default Home;
