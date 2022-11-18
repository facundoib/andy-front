import './App.css';
import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';

function App() {
  const [message, setMessage] = useState("");
  const [notif, setNotif] = useState("");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "message": message
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const send = () => {
    setMessage("")
    fetch("https://andy-botardo.netlify.app/.netlify/functions/api/tweet", requestOptions)
      .then(response => response.text())
      .then(result => result === "OK" ? setNotif("Tweet enviado!") : setNotif("Ocurrió un error"))
      .catch(error => console.log('error', error))
  }

  return (
    <div className="App container">
      <div className="tweet col-12">
        <h1>Tweet anónimo en <a href='https://twitter.com/AndyBotardo/'>@AndyBotardo</a></h1>
        <p>Experimento social. Todo lo que diga no puede ser usado en su contra. 🔥</p>
        <div className="d-block d-md-flex justify-content-center col-10 col-md-10">
          <Input
            onChange={e => {setMessage(e.target.value); setNotif("")}}
            value={message}
            aria-label="Large"
            className="col-2"
            id="exampleText"
            name="text"
            type="textarea"
          />
          <Button className="col-12 col-md-2" color="primary" onClick={send}>Twittear!</Button>
        </div>
        {
          280 - message.length >= 0 ?
            <p>{280 - message.length}</p> :
            <p className='text-danger'>{280 - message.length}</p>
        }
        <p>{notif}</p>
      </div>
    </div>
  );
}

export default App;
