import React from 'react';

import styles from './app-header.module.css';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeaderButton = ({ children, title }) => {
  return (
    <Button
      extraClass={styles.navBtn + ' mt-4 mb-4 pl-5 pr-5'}
      htmlType="button"
      type="secondary"
      size="large"
    >
      <span className="mr-2">{children}</span>
      <span>{title}</span>
    </Button>
  );
};

export default AppHeaderButton;