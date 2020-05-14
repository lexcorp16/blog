import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';

import { rhythm, scale } from '../utils/typography';
import Toggle from './Toggle';
import Footer from './Footer';
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;
  const [theme, setTheme] = useState(window.__theme);

  useEffect(() => {
    window.__onThemeChange = () => {
      setTheme(window.__theme);
    };
  }, [theme]);

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(0.75),
          marginBottom: 0,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <h3
        style={{
          color: 'var(--pink)',
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    );
  }
  return (
    <div
      style={{
        color: 'var(--textNormal)',
        background: 'var(--bg)',
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <Helmet
        meta={[
          {
            name: 'theme-color',
            content: theme === 'light' ? '#ffa8c5' : '#282c35',
          },
        ]}
      />
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.625rem',
        }}
      >
        {header}
        <Toggle
          icons={{
            checked: (
              <img
                src={moon}
                width='16'
                height='16'
                role='presentation'
                style={{ pointerEvents: 'none' }}
                alt='moon'
              />
            ),
            unchecked: (
              <img
                src={sun}
                width='16'
                height='16'
                role='presentation'
                style={{ pointerEvents: 'none' }}
                alt='sun'
              />
            ),
          }}
          checked={theme === 'dark'}
          onChange={e =>
            window.__setPreferredTheme(e.target.checked ? 'dark' : 'light')
          }
        />
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
