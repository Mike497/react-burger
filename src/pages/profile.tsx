import React, { useState, useEffect, FormEvent, ChangeEvent, SyntheticEvent } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form.module.css';
import { logout, updateUser } from '../services/authSlice';
import { useForm } from '../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../services/hooks';

export const ProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { values, handleChange, setValues } = useForm({ name: '', email: '', password: '' });
  const [isFormUpdated, setFormUpdated] = useState(false);

  useEffect(() => {
    if (user) {
      setValues({ name: user.name, email: user.email, password: '' });
    }
  }, [user, setValues]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setFormUpdated(true);
  };
  
  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setValues({ name: user.name, email: user.email, password: '' });
    }
    setFormUpdated(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const dataToUpdate: {name?: string, email?: string, password?: string} = {};
    if (values.name !== user.name) dataToUpdate.name = values.name;
    if (values.email !== user.email) dataToUpdate.email = values.email;
    if (values.password) dataToUpdate.password = values.password;

    if (Object.keys(dataToUpdate).length > 0) {
      dispatch(updateUser(dataToUpdate))
        .then(() => setFormUpdated(false))
        .catch(err => {
          console.error('Update failed: ', err);
          alert('Не удалось обновить данные пользователя.');
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/*@ts-ignore*/}
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onChange}
        value={values.name}
        name={'name'}
        icon={'EditIcon'}
        extraClass="mb-6"
      />
      {/*@ts-ignore*/}
      <Input
        type={'email'}
        placeholder={'Логин'}
        onChange={onChange}
        value={values.email}
        name={'email'}
        icon={'EditIcon'}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={onChange}
        value={values.password}
        name={'password'}
        icon="EditIcon"
        extraClass="mb-6"
        placeholder="Новый пароль"
      />
      {isFormUpdated && (
        <div>
          <Button htmlType="button" type="secondary" size="medium" onClick={handleCancel} extraClass="mr-4">
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export const OrdersHistory: React.FC = () => {
  return (
    <div style={{width: '480px'}}>
      <p className="text text_type_main-medium">Здесь будет история заказов</p>
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? `${styles.profileLink} ${styles.profileLinkActive}` : styles.profileLink;
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logout())
      .then(() => navigate('/login', { replace: true }))
      .catch(err => console.error('Logout failed:', err));
  };

  return (
    <div className={styles.profileContainer}>
      <nav className={styles.profileNav}>
        <NavLink to="/profile" className={getLinkClass} end>Профиль</NavLink>
        <NavLink to="/profile/orders" className={getLinkClass}>История заказов</NavLink>
        <button className={styles.profileLink} onClick={handleLogout}>Выход</button>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <main className={styles.profileContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default ProfilePage;