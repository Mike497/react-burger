import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form.module.css';
import { register } from '../services/authSlice';
import { useForm } from '../hooks/useForm';
import { useAppDispatch } from '../services/hooks';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { values, handleChange } = useForm({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await dispatch(register(values));
      if (res.success) {
        navigate('/');
      }
    } catch (error) {
      alert('Ошибка регистрации. Попробуйте еще раз.');
      console.error("Registration failed: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium  mb-6">Регистрация</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/*@ts-ignore*/}
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={values.name}
          name={'name'}
          size={'default'}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы? <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </div>
  );
};

export default RegisterPage;