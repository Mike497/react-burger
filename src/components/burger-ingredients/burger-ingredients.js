import React from 'react';
import PropTypes from 'prop-types';

import IngredientsList from './ingredients-list.js';

import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTab: 'bun' };
  }

  setCurrentTab = (value) => {
    this.setState({
      currentTab: value,
    });
  };

  render() {
    return (
      <main className={styles.ingredientsPanel}>
        <p className="text text_type_main-large pt-5">Соберите бургер</p>

        <div style={{ display: 'flex' }}>
          <Tab
            value="bun"
            active={this.state.currentTab === 'bun'}
            onClick={this.setCurrentTab}
          >
            Булки
          </Tab>
          <Tab
            value="sause"
            active={this.state.currentTab === 'sause'}
            onClick={this.setCurrentTab}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={this.state.currentTab === 'main'}
            onClick={this.setCurrentTab}
          >
            Начинки
          </Tab>
        </div>

        <div className={styles.ingredientsScrollArea}>
          <IngredientsList
            items={this.props.items.filter((item) => item.type === 'bun')}
            title="Булки"
          />
          <IngredientsList
            items={this.props.items.filter((item) => item.type === 'sauce')}
            title="Соусы"
          />
          <IngredientsList
            items={this.props.items.filter((item) => item.type === 'main')}
            title="Начинки"
          />
        </div>
      </main>
    );
  }
}

BurgerIngredients.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BurgerIngredients;