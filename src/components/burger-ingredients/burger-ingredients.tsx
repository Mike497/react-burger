import React, { useState, useRef } from 'react';
import IngredientsList from './ingredients-list';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/hooks';

const BurgerIngredients: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('bun');
  const { items } = useAppSelector(state => state.ingredients);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLParagraphElement>(null);
  const saucesRef = useRef<HTMLParagraphElement>(null);
  const mainsRef = useRef<HTMLParagraphElement>(null);

  const handleIngredientsScroll = () => {
    const containerTop = scrollContainerRef.current?.getBoundingClientRect().top;
    if (!containerTop) return;

    const bunsTop = bunsRef.current?.getBoundingClientRect().top ?? Infinity;
    const saucesTop = saucesRef.current?.getBoundingClientRect().top ?? Infinity;
    const mainsTop = mainsRef.current?.getBoundingClientRect().top ?? Infinity;

    const bunsDistance = Math.abs(containerTop - bunsTop);
    const saucesDistance = Math.abs(containerTop - saucesTop);
    const mainsDistance = Math.abs(containerTop - mainsTop);

    if (bunsDistance < saucesDistance && bunsDistance < mainsDistance) {
      setCurrentTab('bun');
    } else if (saucesDistance < mainsDistance) {
      setCurrentTab('sauce');
    } else {
      setCurrentTab('main');
    }
  };

  const buns = React.useMemo(() => items.filter((item) => item.type === 'bun'), [items]);
  const sauces = React.useMemo(() => items.filter((item) => item.type === 'sauce'), [items]);
  const mains = React.useMemo(() => items.filter((item) => item.type === 'main'), [items]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab);
    let element;
    if (tab === 'bun') element = bunsRef.current;
    else if (tab === 'sauce') element = saucesRef.current;
    else element = mainsRef.current;
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.ingredientsPanel}>
      <p className="text text_type_main-large pt-5 pb-5">Соберите бургер</p>
      <div className={styles.ingredientsTab}>
        <Tab value="bun" active={currentTab === 'bun'} onClick={onTabClick}>Булки</Tab>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={onTabClick}>Соусы</Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={onTabClick}>Начинки</Tab>
      </div>
      <div
        className={styles.ingredientsScrollArea}
        ref={scrollContainerRef}
        onScroll={handleIngredientsScroll}
      >
        <IngredientsList items={buns} title="Булки" innerRef={bunsRef} />
        <IngredientsList items={sauces} title="Соусы" innerRef={saucesRef} />
        <IngredientsList items={mains} title="Начинки" innerRef={mainsRef} />
      </div>
    </section>
  );
};

export default BurgerIngredients;