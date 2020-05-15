import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import profilePic from '../assets/headshot.jpg';

import { rhythm } from '../utils/typography';

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <img
        src={profilePic}
        alt={`Baddest`}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          width: rhythm(2),
          height: rhythm(2),
          borderRadius: '50%',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p style={{ marginBottom: 0 }}>
          Personal blog by {` `}
          <a
            href={`https://twitter.com/${social.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {author.name}
          </a>
        </p>
        <p style={{ margin: 'none' }}>{author.summary}</p>
      </div>
    </div>
  );
};

export default Bio;
