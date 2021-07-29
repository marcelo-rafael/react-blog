import PropTypes from 'prop-types'

import './styles.css'

export function Button({ text, onClick, disabled = false }) {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  )
}

Button.defaultProps = {
  disabled: false
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}
