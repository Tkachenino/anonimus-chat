import PropTypes from 'prop-types';

const ScrollDown = ({throwDowm}) => {
  return (
    <button className='ScrollDowm' onClick={throwDowm}>&#709;</button>
  )
}

ScrollDown.propTypes = {
  throwDowm: PropTypes.func
}

export default ScrollDown;