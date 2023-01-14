import './App.css';
import ButtonActorContainer from './ui/ButtonActorContainer';

function App() {
  console.log('App');
  return (
    <div className="App">

      <p>R-APP</p>
      <div>

        <ButtonActorContainer setup={{ properties: { content: 'mon bouton', color: 'red' } }} />

      </div>
    </div>
  );
}

export default App;
