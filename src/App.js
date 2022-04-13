import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import React from 'react';

function App() {
  return (
    <>
    <Header>Jose Lucas</Header>
    <Body></Body>
    </>
  );
}

export default App;

//Some considerations:
//I believe this implementation is far from perfect, as I had some problems with mainly two things:

//First of all, I didn't quite get the timestamps. 
//In the challenge specification the begin and
//end timestamps were the same, but the chart showed a 1 ms difference between then.
//This wasn't the main problem, however, as I found it difficult dealing with them in general.

//Then, I had some problems with the css aspect of things.

//That being said, I'd love to hear about the things I could do to improve on the code,
//So I can learn (like how to make my textarea look like the one in the original image) 
//and gain more experience.

//I still consider this project to be in a good state and that it was a good learning experience.