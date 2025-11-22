import React, { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { reorderIngredients } from '../../services/constructorSlice';
import { TIngredient, TConstructorIngredient } from '../../utils/types';
import { useAppDispatch } from '../../services/hooks';

type TBurgerConstructorItemProps = {
  item: TIngredient | TConstructorIngredient;
  index: number;
  handleClose?: () => void;
  type?: "top" | "bottom";
  isLocked?: boolean;
};

type TDragItem = {
  id: string;
  index: number;
};

const BurgerConstructorItem: React.FC<TBurgerConstructorItemProps> = ({ item, index, handleClose, type, isLocked }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null); 

  const [{ handlerId }, drop] = useDrop<TDragItem, void, { handlerId: any }>({
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
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      dispatch(reorderIngredients({ dragIndex, hoverIndex }));
      draggedItem.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'constructorItem',
    item: () => ({ id: (item as TConstructorIngredient).uniqueId, index }),
    canDrag: () => !isLocked,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  if (!isLocked) {
    drag(drop(ref));
  } else {
    drop(ref);
  }

  return (
    <div
      ref={ref}
      className={styles.constructorItems}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <div className={`${styles.dragItemSpacer} mr-2`}>
        {!isLocked ? <DragIcon type="primary" /> : null}
      </div>
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={type === 'top' ? `${item.name} (верх)` : type === 'bottom' ? `${item.name} (низ)` : item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={handleClose}
      />
    </div>
  );
};

export default BurgerConstructorItem;