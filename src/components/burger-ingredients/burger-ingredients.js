import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import IngredientsList from './ingredients-list.js';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState('bun');
  const { items } = useSelector(state => state.ingredients);

  const scrollContainerRef = useRef(null);
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const handleIngredientsScroll = () => {
    const containerTop = scrollContainerRef.current.getBoundingClientRect().top;

    const bunsTop = bunsRef.current.getBoundingClientRect().top;
    const saucesTop = saucesRef.current.getBoundingClientRect().top;
    const mainsTop = mainsRef.current.getBoundingClientRect().top;

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

  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const element = tab === 'bun' ? bunsRef.current : tab === 'sauce' ? saucesRef.current : mainsRef.current;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.ingredientsPanel}>
      <p className="text text_type_main-large pt-5 pb-5">Соберите бургер</p>

      <div className={styles.ingredientsTab}>
        <Tab value="bun" active={currentTab === 'bun'} onClick={() => onTabClick('bun')}>Булки</Tab>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={() => onTabClick('sauce')}>Соусы</Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={() => onTabClick('main')}>Начинки</Tab>
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