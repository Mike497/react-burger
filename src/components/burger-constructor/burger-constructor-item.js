import React from 'react';

import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerConstructorItem extends React.Component {
  render() {
    return (
      <article>
        <span className="pr-1">
          {this.props.type !== 'top' && this.props.type !== 'bottom' ? (
            <DragIcon type="primary" />
          ) : (
            <span className="pr-6" />
          )}
        </span>
        <ConstructorElement
          type={this.props.type}
          isLocked={this.props.isLocked}
          text={this.props.text}
          price={this.props.price}
          thumbnail={this.props.thumbnail}
        />
      </article>
    );
  }
}

export default BurgerConstructorItem;