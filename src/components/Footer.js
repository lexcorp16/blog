import React from 'react';

import { rhythm } from '../utils/typography';

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: rhythm(2),
        paddingTop: rhythm(1),
      }}
    >
      <a
        href='https://twitter.com/fasoroalexander'
        target='_blank'
        rel='noopener noreferrer'
      >
        twitter
      </a>{' '}
      &bull;{' '}
      <a
        href='https://github.com/lexcorp16'
        target='_blank'
        rel='noopener noreferrer'
      >
        github
      </a>{' '}
      &bull;{' '}
      <a
        href='https://linkedin.com/in/alexander-fasoro-joseph'
        target='_blank'
        rel='noopener noreferrer'
      >
        linkedin
      </a>{' '}
    </footer>
  );
};

export default Footer;
