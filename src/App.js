import logo from './logo.svg';
import './App.css';

const dialog = require("./dialog.json")

function App() {

  const audioURL = "https://www.buzzsprout.com/1192367/4381745-001-coffee-a-short-english-conversation-by-dialogue-frog.mp3"


  function renderText() {

    const renderedTranscript = [];

    dialog.transcript.forEach(saying => {

      const code = <div>
        <p>{saying.person}</p>
        {
          saying.phrases.map(phrase => {
            return <p onClick={ () => {
              const audio = document.getElementById('audio');
              audio.currentTime = phrase.time;
              audio.play();
            }
            }>{phrase.text}</p>
          })

        }

      </div>

      renderedTranscript.push(code)


    });


    return renderedTranscript;
  }


  return (
    <div>
      <audio id="audio" controls autoplay >
        <source src={audioURL} type="audio/mpeg"/>
      Your browser does not support the audio element.
      </audio>


      {renderText()}

    </div>
  );
}

export default App;
