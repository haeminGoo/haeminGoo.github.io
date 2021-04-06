/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Haemin Goo | Front-end Developer`,
    author: `Haemin Goo`,
    description: `With 5+ years of experience as front-end develper in various industries. I design and build various projects and I value making satisfactory result on time.`,
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
        background_color: `#f7f0eb`,
        theme_color: `#9979ff`,
        display: `standalone`,
        icon: 'src/assets/site-icon.png'
      },
    },
    'gatsby-plugin-offline',
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
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        tailwind: true, // Enable tailwindcss support
      }
    }
  ],
};
