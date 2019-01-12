import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import apps from './apps';

const Wrapper = styled.div`
  display: flex;
  padding: 1rem;
  flex-wrap: wrap;
`;

const AppBox = styled.div`
  overflow: hidden;
  width: 100px;
  height: 100px;
  margin: 0.5em;
  border-radius: 10px;
  border: 1px solid #8c8c8c;
  background: url(${props => props.image});
  background-size: cover;
  box-shadow: inset 0px 50px 100px -50px #fff;
  cursor: pointer;
`;

const AppLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const AppTitle = styled.div`
  text-align: center;
  width: 120px;
  font-weight: bold;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.78);
`;

const Apps = props => {
  return (
    <Wrapper>
      {apps.map(app => (
        <AppLink key={app.title} to={app.url}>
          <AppBox image={app.image} />
          <AppTitle>{app.title}</AppTitle>
        </AppLink>
      ))}
    </Wrapper>
  );
};

Apps.propTypes = {};

export default Apps;
