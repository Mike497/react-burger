import React from 'react';

import AppHeaderButton from './app-header-button.js';

import styles from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={styles.appHeader}>
      <div className={styles.headerGroup}>
        <AppHeaderButton title="Конструктор">
          <BurgerIcon type="secondary" />
        </AppHeaderButton>
        <AppHeaderButton title="Лента заказов">
          <ListIcon type="secondary" />
        </AppHeaderButton>
      </div>
      <a href="/">
        <Logo />
      </a>
      <div className={`${styles.headerGroup} ${styles.profileGroup}`}>
        <AppHeaderButton title="Личный кабинет">
          <ProfileIcon type="secondary" />
        </AppHeaderButton>
      </div>
    </header>
  );
};

export default AppHeader;