import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { reorderIngredients } from '../../services/constructorSlice';
import { ingredientPropType } from '../../utils/types.js';

const BurgerConstructorItem = ({ item, index, handleClose, type, isLocked }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ handlerId }, dropRef] = useDrop({
    accept: 'constructorItem',
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(draggedItem, monitor) {
      if (!ref.current) return;

      const dragIndex = draggedItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(reorderIngredients({ dragIndex, hoverIndex }));

      draggedItem.index = hoverIndex;
    }
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: 'constructorItem',
    item: () => ({ id: item.uniqueId, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (type !== 'top' && type !== 'bottom') {
    dragRef(dropRef(ref));
  }
  
  const opacity = isDragging ? 0 : 1;

  return (
    <article
      ref={ref}
      className={styles.constructorItems}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <div className={`${styles.dragItemSpacer} mr-2`}>
        {type !== 'top' && type !== 'bottom' ? (
          <DragIcon type="primary" />
        ) : null}
      </div>

      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={type === 'top' ? `${item.name} (верх)` : type === 'bottom' ? `${item.name} (низ)` : item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={handleClose}
      />
    </article>
  );
};

BurgerConstructorItem.propTypes = {
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  item:ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
  handleClose: PropTypes.func
};

export default BurgerConstructorItem;