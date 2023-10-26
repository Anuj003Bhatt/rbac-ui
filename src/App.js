import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AccessControl from './components/access-control/AccessControl';
import Swagger from './components/swagger/Swagger';
import './App.css';
import About from './components/about/About';

const App = () => {
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
      <Navbar expand="lg" className="bg-body-tertiary">
        <Nav className="me-auto">
          <Nav.Link className='navLink' href="#app" onClick={() => setSelectedApp('1')}>Access Control</Nav.Link>
          <Nav.Link className='navLink' href="#link" onClick={() => setSelectedApp('2')}>About</Nav.Link>
          <Nav.Link className='navLink' href="#swagger" onClick={() => setSelectedApp('3')}>Swagger</Nav.Link>
        </Nav>
      </Navbar>
      {renderApp()}
    </div>

  );
};

export default App;
