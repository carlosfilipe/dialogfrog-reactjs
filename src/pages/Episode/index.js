import React from 'react';
import Header from '../../components/Header';
import './styles.scss'

const dialog = require("../../resources/dialog.json")


export default function Episode() {


  const audioURL = "https://www.buzzsprout.com/1192367/4381745-001-coffee-a-short-english-conversation-by-dialogue-frog.mp3"


  function renderText() {

    const renderedTranscript = [];

    dialog.transcript.forEach((saying, index) => {

      const code = <div key={index} className='saying' >
        <p>

          <b>{saying.person}:  </b>
          {
            saying.phrases.map((phrase, index) => {
              return <a className='phrases' key={index} onClick={() => {
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
      <Header />

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