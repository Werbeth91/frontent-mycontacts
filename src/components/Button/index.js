import PropTypes from 'prop-types'
import Spinner from '../Spinner'
import { StyledButton } from './style'

function Button({ type, disabled, isLoading, children }) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading}>

      {!isLoading && children}
      {isLoading && <Spinner size={16} />}

    </StyledButton>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false
}



export default Button;
