import React from 'react';

const Summary = ({ data }) => (
  <section className="py-5 border-b border-neutral-300 lg:flex items-center">
    <div className="my-5">
      <img
        className="rounded-full mx-auto w-32 lg:w-64 xl:w-64"
        src="./profile.jpg"
        alt="profile"
      />
    </div>
    <div className="text-center tracking-wide leading-relaxed lg:text-left lg:mx-8 text-sm">
      {typeof data === 'string' ? <p>{data}</p> : data.map((el, i) => <p key={i}>{el}</p>)}
    </div>
  </section>
);

export default Summary;
