import logo from './logo.png';
import './index.css';

function Landing() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Cálculo de captura de carbono
        </h1>
      </header>
    </div>
  );
}

export default Landing;
