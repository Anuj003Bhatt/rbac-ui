import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AccessControl from '../access-control/AccessControl';
import Swagger from '../swagger/Swagger';
import './Home.css';
import About from '../about/About';

const Home = () => {
  const [selectedApp, setSelectedApp] = useState('1')

  const renderApp = () => {
    switch (selectedApp) {
      case '2':
        return <About />;
      case '3':
        return <Swagger />
      case '1':
      default: return <AccessControl />
    }
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary bar">
        <Navbar.Brand className='barItemBrand' href="#app" onClick={() => setSelectedApp('1')}>Access Control</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link className='navLink barItem' href="#app" onClick={() => setSelectedApp('1')}>App</Nav.Link>
          <Nav.Link className='navLink barItem' href="#link" onClick={() => setSelectedApp('2')}>About</Nav.Link>
          <Nav.Link className='navLink barItem' href="#swagger" onClick={() => setSelectedApp('3')}>Swagger</Nav.Link>
        </Nav>
      </Navbar>
      {renderApp()}
    </div>

  );
};

export default Home;
