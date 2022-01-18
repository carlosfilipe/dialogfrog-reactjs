import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import './styles.scss'

const dialog = require("../../resources/dialog.json")


export default function Episode() {

  const [transcript, setTranscript] = useState(dialog.transcript)
  const [audioCurrentTime, setAudioCurrentTime] = useState(0)

  const audioURL = "https://www.buzzsprout.com/1192367/4381745-001-coffee-a-short-english-conversation-by-dialogue-frog.mp3"

  useEffect(() => {
    const audio = document.getElementById('audio');
    // console.log(audio)
    audio.addEventListener('timeupdate', (element) => {
      // console.log(element.target.currentTime)
      setAudioCurrentTime(element.target.currentTime)
    })
    // console.log("rodei")
  }, []);


  function checkSelected(startTime, endTime) {
    if(startTime && endTime) {
      return (endTime > audioCurrentTime && audioCurrentTime > startTime) ? "playing" : ""
    }
    return '';
  }


  function renderText() {

    const renderedTranscript = [];

    transcript.forEach((saying, indexSaying) => {

      const code = <div key={indexSaying} className='saying' >
        <p>

          <b>{saying.person}:  </b>
          {
            saying.phrases.map((phrase, index) => {

              const phraseStartTime = phrase.time;
              const phraseEndTime = saying.phrases[index+1] ? saying.phrases[index +1].time : ( transcript[indexSaying+1] ? transcript[indexSaying+1].phrases[0].time : null);


              return <a className={`phrases ${checkSelected(phraseStartTime, phraseEndTime)}`} key={index} onClick={() => {
                const audio = document.getElementById('audio');
                audio.currentTime = phrase.time;
                audio.play();
                audio.focus();
              }
            }> {phrase.text}</a>
          })
        }
        </p>

      </div>

      renderedTranscript.push(code)


    });


    return renderedTranscript;
  }

  return (
    <>
    <div style={{ position: 'fixed', 
    display: 'flex',
    width: '100%',
    background: 'green'
    }}>
      <Header />
    </div>
      

      <body>
        <div className='episode'>
          <audio id="audio" controls>
            <source src={audioURL} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>


          <div className='content'>
            <div className='side-options'>
              <div className='option'>
                <a href=''>Read the transcript:</a>
              </div>

            </div>
            <div className='side-content'>
              <div>
                {renderText()}
              </div>

            </div>

          </div>


        </div>
      </body>
    </>
  )
}