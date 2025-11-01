import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form.module.css';
import { login } from '../services/authSlice';
import { useForm } from '../hooks/useForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(login(values));
      if (res.success) {
        const from = location.state?.from?.pathname || '/';
        navigate(from);
      }
    } catch (error) {
      alert('Ошибка логина. Проверьте email и пароль.');
      console.error('Login failed: ', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">Вход</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
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
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы - новый пользователь? <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
      </p>
    </div>
  );
};

export default LoginPage;