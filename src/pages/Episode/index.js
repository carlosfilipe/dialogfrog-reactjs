import React, { useEffect, useState, useRef } from 'react';
import Header from '../../components/Header';
import './styles.scss'

// const dialog = require("../../resources/dialog.json")
const dialog = require("../../resources/dialog2.json")

const AUDIO_URL = "https://audio.buzzsprout.com/nvj4qy4c5yhqefqmpmf1jceyjbhb"
// const AUDIO_URL = "https://www.buzzsprout.com/1192367/4381745-001-coffee-a-short-english-conversation-by-dialogue-frog.mp3"

export default function Episode() {

  const [transcript, setTranscript] = useState(dialog.transcript)
  const [audioCurrentTime, setAudioCurrentTime] = useState(0)

  const audio = useRef();

  useEffect(() => {
    audio.current.addEventListener('timeupdate', (element) => {
      setAudioCurrentTime(element.target.currentTime)
    })
  }, []);


  function checkSelected(startTime, endTime) {
    if (startTime && endTime) {
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
              const phraseEndTime = saying.phrases[index + 1] ? saying.phrases[index + 1].time : (transcript[indexSaying + 1] ? transcript[indexSaying + 1].phrases[0].time : null);


              return <a className={`phrases ${checkSelected(phraseStartTime, phraseEndTime)}`} key={index} onClick={() => {
                console.log(audio.current)
                audio.current.currentTime = phrase.time;
                audio.current.play();
                audio.current.focus();
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
      <div style={{
        position: 'fixed',
        display: 'flex',
        width: '100%',
        background: 'green'
      }}>
        <Header />
      </div>


      <body>
        <div className='episode'>
          <audio id="audio" ref={audio} controls>
            <source src={AUDIO_URL} type="audio/mpeg" />
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