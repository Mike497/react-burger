import React from 'react';

import IngredientCard from './ingredient-card';

import styles from './burger-ingredients.module.css';

class IngredientsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    this.setState({ items: this.props.items });
  }

  render() {
    return (
      <>
        <p className="text text_type_main-medium pt-10">{this.props.title}</p>
        <div className={styles.itemsGrid}>
          {this.state.items.map((it) => (
            <IngredientCard item={it} key={it._id} />
          ))}
        </div>
      </>
    );
  }
}

export default IngredientsList;