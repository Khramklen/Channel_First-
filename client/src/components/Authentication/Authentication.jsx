/* eslint-disable default-case */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../store/action/userAC';
import { useNavigate } from 'react-router-dom';
import styles from '../Authentication/Authentication.module.css';


export default function Authentication() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMes, setErrorMes] = useState('');
  const [emailError, setEmailError] = useState('Email не может быть пустым');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailHandler = (e) => {

    setEmail(e.target.value);
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный e-mail');
    } else {
      setEmailError();
    }
  };

  const passwordlHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError('Пароль должен быть от 3 до 8 символов');
      if (!e.target.value) {
        setPasswordError('Пароль не может быть пустым');
      }
    } else {
      setPasswordError();
    }
  };

  const blurHandler = (event) => {
    switch (event.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };

  const loginCheck = async (e) => {
    e.preventDefault();
    try {
      dispatch(getUser(email, password));
      navigate('/main');
    } catch (error) {
      setErrorMes('Что-то пошло не так, попробуйте позже');

    }
  };

  return (
    <div className={styles.group}>
      <h2>Добро пожаловать на наш сайт!</h2>
      <h3>Просим Вас авторизоваться для получения всех функций сайта</h3>
      <div className={styles.formGroup}>
        <form className={styles.emailInputs} onSubmit={loginCheck}>
          {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}
          <input
            value={email} onChange={(e) => emailHandler(e)} onBlur={(event) => blurHandler(event)}
            name="email"
            type="email"
            className={styles.formControlLog}
            id="exampleInput1"
            placeholder="Email"
            autoFocus
          />
          {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}
          <input
            onChange={(e) => passwordlHandler(e)} value={password} onBlur={(event) => blurHandler(event)}
            name="password"
            type="password"
            className={styles.formControlLog}
            id="exampleInput2"
            placeholder="Password"
          />
          <button type="submit" className={styles.btnLog} >
            Войти
          </button>
          {errorMes === '' ? null : (
            <div style={{ color: 'red' }}>{errorMes}</div>
          )}
        </form>
      </div>
    </div>
  );
}
