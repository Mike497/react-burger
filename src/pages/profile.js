import { useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form.module.css';
import { logout, updateUser } from '../services/authSlice';

export const ProfileForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isFormUpdated, setFormUpdated] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email, password: '' });
    }
  }, [user]);

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormUpdated(true);
  };
  
  const handleCancel = (e) => {
    e.preventDefault();
    if (user) {
      setForm({ name: user.name, email: user.email, password: '' });
    }
    setFormUpdated(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToUpdate = {};
    if (form.name !== user.name) dataToUpdate.name = form.name;
    if (form.email !== user.email) dataToUpdate.email = form.email;
    if (form.password) dataToUpdate.password = form.password;

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
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onChange}
        value={form.name}
        name={'name'}
        icon={'EditIcon'}
        extraClass="mb-6"
      />
      <Input
        type={'email'}
        placeholder={'Логин'}
        onChange={onChange}
        value={form.email}
        name={'email'}
        icon={'EditIcon'}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={onChange}
        value={form.password}
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

export const OrdersHistory = () => {
  return (
    <div style={{width: '480px'}}>
      <p className="text text_type_main-medium">Здесь будет история заказов</p>
    </div>
  );
};

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getLinkClass = ({ isActive }) => {
    return isActive ? `${styles.profileLink} ${styles.profileLinkActive}` : styles.profileLink;
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout())
      .unwrap()
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