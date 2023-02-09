import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import {
  PATH_FEEDBACK_PAGE,
  PATH_LOGIN_PAGE,
  PATH_PLAY_PAGE,
  PATH_RANKING_PAGE,
  PATH_SETTINGS_PAGE,
} from './services/helpers/constantes';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path={ PATH_LOGIN_PAGE } component={ Login } />
        <Route exact path={ PATH_PLAY_PAGE } component={ Game } />
        <Route exact path={ PATH_SETTINGS_PAGE } component={ Settings } />
        <Route exact path={ PATH_FEEDBACK_PAGE } component={ Feedback } />
        <Route exact path={ PATH_RANKING_PAGE } component={ Ranking } />
      </Switch>
    </div>
  );
}
