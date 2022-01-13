import logo from './logo.svg';
import './App.css';

const dialog = require("./dialog.json")

function App() {

  const audioURL = "https://www.buzzsprout.com/1192367/4381745-001-coffee-a-short-english-conversation-by-dialogue-frog.mp3"


  function renderText() {

    const renderedTranscript = [];

    dialog.transcript.forEach((saying, index) => {

      const code = <div key={index}>
        <b>{saying.person}</b>
        {
          saying.phrases.map((phrase, index) => {
            return <p key={index} onClick={ () => {
              const audio = document.getElementById('audio');
              audio.currentTime = phrase.time;
              audio.play();
              audio.focus();
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
      <audio id="audio" controls>
        <source src={audioURL} type="audio/mpeg"/>
      Your browser does not support the audio element.
      </audio>


      {renderText()}

    </div>
  );
}

export default App;
