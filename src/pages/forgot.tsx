import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPasswordRequest } from '../utils/burgers-api';
import styles from './form.module.css';
import { useForm } from '../hooks/useForm';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { values, handleChange } = useForm({ email: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await forgotPasswordRequest(values.email);
      if (res.success) {
        navigate('/reset-password', { state: { fromForgotPassword: true } });
      } else {
        alert(res.message || 'Произошла ошибка при восстановлении пароля');
      }
    } catch (error) {
      console.error('Error on password recovery: ', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium  mb-6">Восстановление пароля</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          placeholder="Укажите e-mail"
          isIcon={false}
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль? <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;