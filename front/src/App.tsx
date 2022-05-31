import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Header from './components/header';
import Main from './components/main';
import AboutPage from './components/about';
import Chart from './components/charts';

import styles from './App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';


function App() {
  
  return (    

    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />   
          <Route path="/about" element={<About />} />         
          <Route path="/charts" element={<Charts />} /> 
        </Routes>
      </div>
    </Router>

    
  );
}

function Home(){
  return (
    <React.Fragment>
      <header className={styles.bcContainer}>        
        <Link className={styles.active} to="/">HOME</Link>/
        <Link to="/about">ABOUT</Link>/
        <Link to="/charts">CHARTS</Link>        
      </header>
      <div className={styles.App}>
        <Header text='TO DO LIST APP ' icon={<FontAwesomeIcon icon={faListCheck}/>    }/>
        <Main />
      </div>
    </React.Fragment>    
  )
}

function About(){
  return (
    <React.Fragment>
      <header className={styles.bcContainer}>        
        <Link to="/">HOME</Link>/
        <Link className={styles.active} to="/about">ABOUT</Link>/
        <Link to="/charts">CHARTS</Link>        
      </header>
      <AboutPage 
        rutaImg='https://play-lh.googleusercontent.com/VPqK75BwKMtTDFF6UQS6E3GYdYqzvZfddDxoKRH-DSlXIcYLN_EeSy5OXKx0bhBTtLUU' 
        textInfo='ToDoList App is a web application which let users make a list of tasks. Each task could be deleted, modified, selected as completed and add to it a priority. '
      />
    </React.Fragment>    
  )
}

function Charts(){
  return (
    <React.Fragment>
      <header className={styles.bcContainer}>
        <Link to="/">HOME</Link>/
        <Link to="/about">ABOUT</Link>/
        <Link className={styles.active} to="/charts">CHARTS</Link>        
      </header>    
      <Chart />
    </React.Fragment>    
  )
}

export default App;
