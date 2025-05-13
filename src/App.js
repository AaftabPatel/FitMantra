// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Footer from './Footer';
import TrainerBooking from './TrainerBooking';
import Membership from './Membership';
import ChatBot from './ChatBot';
import Chat from './Chat';
import Yoga from './Yoga';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/TrainerBooking" component={TrainerBooking} />
          <Route path="/Membership" component={Membership} />
          <Route path="/ChatBot" component={ChatBot} />
          <Route path="/Yoga" component={Yoga} />
          <Route path="/Chat" component={Chat} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
