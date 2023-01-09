// Create a react component that inputs two textarea messages and one drop down menu with two options first Facebook second Taboola then performs a fetch request to localhost:3000 gets back a response as a data.message and data.message1 and displays that message in a box below

import React, { useState } from 'react';
import './App.css';
import * as ReactBootstrap from 'react-bootstrap';

function App() {
  const [message, setMessage] = useState('');
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('http://15.229.15.104:3080', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, message1, message2 }),
    });
    const data = await response.json();
    setResponse(data.message);
    setLoading(false);
  };

  return (
    <div className="App">
      <section className='chatbox'>
      <div className='chatbox-output'>
      {loading ? <ReactBootstrap.Spinner animation="border" variant="warning" /> : <p>{response}</p>}
      </div>
      <label>
          <h2>Selecione a Mídia</h2>
          <select
            value={message2}
            onChange={(e) => setMessage2(e.target.value)}
            type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <option value="Selecione">Selecione</option>
            <option value="Blog Post">Blog Post</option>
            <option value="Facebook">Facebook Ad</option>
            <option value="Advertorial">Advertorial</option>
          </select>
        </label>
      <div className='chatbox-input'>
      <form onSubmit={handleSubmit}>
          <textarea className='input-textarea' rows="2" placeholder="Persona, defina com detalhes o seu cliente..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <textarea className='input-textarea' rows="2" placeholder="Produto, descreva com detalhes o seu produto..."
            value={message1}
            onChange={(e) => setMessage1(e.target.value)}
          />
       <p><button type="submit" class="btn btn-primary">Enviar</button></p>
      </form>
      </div>
      </section>
    </div>
  );
}

export default App;