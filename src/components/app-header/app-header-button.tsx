import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';

type TAppHeaderButtonProps = {
  children: React.ReactNode;
  title: string;
  to: string;
  end?: boolean;
};

const AppHeaderButton: React.FC<TAppHeaderButtonProps> = ({ children, title, to, end = false }) => {
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

export default AppHeaderButton;