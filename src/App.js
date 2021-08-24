import { useState } from 'react';


function App() {
  var randomWords = require('random-words');
  

  const[text, setText] = useState('');


  const handleSubmit = (e) =>{
    e.preventDefault();
    const number = parseInt(e.target[0].value);
    const type = e.target[1].value;

    //Generate random number of words
    if(type === "Words"){
      var temp = randomWords(number).join(' ');
      setText(temp);
    }
   
    //Generate random number of sentences
    if(type === "Sentences"){
    var temp2 = [];

    for(let i = 0; i < number; i++){
      var sentence = randomWords(Math.floor(Math.random() * (20 - 6 + 1)) + 6).join(' ');
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";

      temp2.push(sentence);

    }

    temp2 = temp2.join(" ");

    setText(temp2);
  }

  //Generate random number of paragraphs
  if(type === "Paragraphs"){
    var temp3 = [];

    for(let i = 0; i < number; i++){
      var sentences = [];
      var random = Math.floor(Math.random() * (10 - 6 + 1)) + 6;

      for(let j = 0; j < random; j++){
        var sentence = randomWords(Math.floor(Math.random() * (20 - 6 + 1)) + 6).join(' ');
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
        sentences.push(sentence);
      }
      sentences = sentences.join(" ");
      temp3.push(sentences);

    }

    for(let i = 0; i < temp3.length; i++){
      temp3[i] = <p>{temp3[i]}</p>;
    }

    setText(temp3);
    
  }

  }


  const handleCopy = () =>{

    var copy = text;
    
    
    if(typeof text === 'object'){
    
      var temper = [];
     
      text.forEach((text) => {
        temper.push(text.props.children);
        temper.push('\n\n');
      })

      copy = temper.join('');
     
      



    }

    navigator.clipboard.writeText(copy);

    
  }

  return (
    <div className="App">
      <div className="gen">
        <h2>Random Text Generator</h2>
        <div className="display">
          <div className="controls">
            <div className="form">
              <form onSubmit={handleSubmit}>
                <input type="number" placeholder="0" required />
                <select name="types">
                  <option value="Paragraphs">PARAGRAPHS</option>
                  <option value="Sentences">SENTENCES</option>
                  <option value="Words">WORDS</option>
                </select>
                <button type="submit">GENERATE!</button>
              </form>
            </div>
            <button id="btn" onClick={handleCopy}>COPY<i class="fas fa-copy"></i></button>
          </div>
          <div className="text" id="txt">{text}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
