import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LandElegibility from './components/landElegibility';
import Landing from './components/landing';
import ZonePicker from './components/zonePicker';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/zone-picker" element={<ZonePicker />} />
      <Route path="/land-elegibility" element={<LandElegibility />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
