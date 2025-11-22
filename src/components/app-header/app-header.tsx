import React from 'react';
import { NavLink } from 'react-router-dom';
import AppHeaderButton from './app-header-button';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader: React.FC = () => {
  return (
    <header className={styles.appHeader}>
      <div className={styles.headerWrapper}>
        <div className={styles.headerGroup}>
          <AppHeaderButton title="Конструктор" to="/" end>
            <BurgerIcon type="secondary" />
          </AppHeaderButton>
          <AppHeaderButton title="Лента заказов" to="/profile/orders">
            <ListIcon type="secondary" />
          </AppHeaderButton>
        </div>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <div className={`${styles.headerGroup} ${styles.profileGroup}`}>
          <AppHeaderButton title="Личный кабинет" to="/profile" end>
            <ProfileIcon type="secondary" />
          </AppHeaderButton>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;