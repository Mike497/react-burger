import React from 'react';

import styles from './app-header.module.css';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeaderButton extends React.Component {
  render() {
    return (
      <Button
        extraClass={styles.navBtn + ' mt-4 mb-4 pl-5 pr-5'}
        htmlType="button"
        type="secondary"
        size="large"
      >
        <span className="mr-2">{this.props.children}</span>
        <span>{this.props.title}</span>
      </Button>
    );
  }
}

export default AppHeaderButton;