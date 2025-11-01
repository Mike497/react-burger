import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPasswordRequest } from '../utils/burgers-api';
import styles from './form.module.css';
import { useForm } from '../hooks/useForm';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { values, handleChange } = useForm({ password: '', token: '' });

  useEffect(() => {
    if (!location.state?.fromForgotPassword) {
      navigate('/forgot-password', { replace: true });
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPasswordRequest(values);
      if (res.success) {
        navigate('/login');
      } else {
        alert(res.message || 'Произошла ошибка сброса пароля.');
      }
    } catch (error) {
      console.error('Error on password reset: ', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium  mb-6">Восстановление пароля</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          placeholder={'Введите новый пароль'}
          extraClass="mb-6"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
          value={values.token}
          name={'token'}
          size={'default'}
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </div>
  );
};

export default ResetPasswordPage;