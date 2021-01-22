import {useState} from 'react';

const Form = () => {
  const [text, setText] = useState('');

  const sendData = (e) => {
    e.preventDefault();
    if (!text.length) {
      return;
    }
    fetch('http://localhost:7777/messages', {
      method: 'POST',
      body:  JSON.stringify({
        id: 0,
        userId: localStorage.getItem('userId'),
        content: text
      })
    })
    setText('');
  };

  const onChange = ({target: {value}}) => {
    setText(value);
  }

  return (
    <form className="Form" onSubmit={sendData}>
      <textarea className='FormField' value={text} onChange={onChange}/>
      <button className="FormBtn">&#10151;</button>
    </form>
  )
}

export default Form;