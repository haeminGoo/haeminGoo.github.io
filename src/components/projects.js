import React from 'react';

const Projects = ({ data }) => (
  <section>
    <h1 className="section-header">Projects</h1>
    {data.map(item => (
      <article className="my-5" key={item.name}>
        <h2 className="item-header">{item.name}</h2>
        <h3 className="item-sub">{item.company}</h3>
        <p className="py-4">{item.description}</p>
		<div>
        {item.point !== undefined && item.point.map((data, i) => (
			<p className="point" key={i}>{data}</p>
		))}
		</div>
        {item.img !== undefined && 
        <div className="flex justify-start">
          {item.img.map((data, i) => <a key={i} href={data.src} rel="noopener noreferrer" target="_blank" className='projectImg'><img src={data.src} alt={data.desc} width='200' /></a>)}
        </div>
        }
        <div className="flex justify-between">
          <div className="justify-start">
            {item.skills !== undefined &&
              item.skills.map((keyword, i)=>
                <span key={i} className="tag">
                  {keyword}
                </span>
              )
            }
          </div>
        {item.link !== undefined && 
          <div className="justify-end minwidth85">
            <a
              className="btn btn-secondary"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Project
            </a>
          </div>
        }
        </div>
        
      </article>
    ))}
  </section>
);

export default Projects;
