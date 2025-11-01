import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './app-header.module.css';

const AppHeaderButton = ({ children, title, to, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => 
        `${styles.link} text text_type_main-default ${isActive ? styles.linkActive : ''}`
      }
    >
      {children}
      <span>{title}</span>
    </NavLink>
  );
};

AppHeaderButton.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  end: PropTypes.bool
};

export default AppHeaderButton;