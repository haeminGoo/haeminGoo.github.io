/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Haemin Goo | Front-end Developer`,
    author: `Haemin Goo`,
    description: `금융, 에너지, 블록체인 도메인의 프론트엔드를 단독으로 책임져 온 개발자 구혜민의 포트폴리오`,
    siteUrl: `https://haeminGoo.github.io/`,
    social: {
      // twitter: `barancezayirli`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Haemin Goo | Front-end Developer`,
        short_name: `CV`,
        start_url: `/`,
        background_color: `#f3f6fb`,
        theme_color: `#4358ed`,
        display: `standalone`,
        icon: 'src/assets/site-icon.png',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    'gatsby-plugin-netlify-cms',
    `gatsby-plugin-postcss`,
  ],
};
