import {useState, useEffect, useRef} from 'react';
import {nanoid} from 'nanoid';
import Message from './components/Message';
import Form from './components/Form';
import ScrollDown from './components/ScrollDown';
import './App.css';


function App() {
  const color = ['#da6262', '#2196f3', '#ff9800'];
  const [messages, setMessages] = useState([]);
  const chat = useRef(null);

//Effect for bind local indificator
  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', nanoid())
    };
  },[])

//Effect for update info
  useEffect(() => {
    const getData = async() => {
      const response = await fetch('http://localhost:7777/messages?from=0');
      const result = await response.json();
      const onlyUser = result.map(i => i.userId);
      const onlyUniq = new Set(onlyUser);
      const onlyUniqArr = Array.from(onlyUniq);
      const onlyUniqWithColor = onlyUniqArr.map((i,idx) => ({[i]: color[idx]}));
      const userColorDictionary = Object.assign({}, ...onlyUniqWithColor)
      const newResult = result.map(i => ({...i, color: userColorDictionary[i.userId]}))
      setMessages(newResult);
    }
    getData();
    const interval = setInterval(() => {
      getData();
    }, 500)
    return () => {clearInterval(interval)}
  }, [])

  const throwChatDown  = () => {
    chat.current.scrollTo(0, chat.current.scrollHeight)
  }

  return (
    <div className="App">
      <h1 className='Header'>Anonimus chat</h1>
      <div className='ChatWrapper'>
        <ScrollDown throwDowm={throwChatDown}/>
        <div className='Chat' ref={chat}>
          <div className='MessagesWrapper'>
          {messages.map(message => (
            <Message key={message.id} userId={message.userId} content={message.content} color={message.color}/>
          ))}
          </div>
        </div>          
      </div>
      <Form />
    </div>
  );
}

export default App;
