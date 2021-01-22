import PropTypes from 'prop-types';

const Message = ({userId, content, color}) => {

  const localUserId = localStorage.getItem('userId');

  return (
    <div className={`Message ${userId === localUserId ? 'right' : 'left'}`} style={{backgroundColor: color}}>
      {content}
    </div>
  )
}

Message.propTypes = {
  userId: PropTypes.string,
  content: PropTypes.string,
  color: PropTypes.string
}

export default Message;