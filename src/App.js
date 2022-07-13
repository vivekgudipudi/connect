import "./App.css";
import {NavBar} from './components/navBar';
import {Footer} from './components/footer';
import {Navigation} from './routes/routes'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Navigation/>
      <Footer />
    </div>
  );
}

export default App;
