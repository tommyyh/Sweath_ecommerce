import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import SubmitButton from '../../Buttons/SubmitButton';
import Form from '../../Forms/Form';
import H2 from '../../HtmlTags/H2';
import P from '../../HtmlTags/P';
import { signIn } from '../../../actions/isLogged';
import { openRegister, openLogin, closeLogin } from '../../../actions/menuType';

const UserMenu = ({ menuType, closeMenu }) => {
  const [newUser, setNewUser] = useState({
    registerFirstName: '',
    registerLastName: '',
    registerEmail: '',
    registerPassword: '',
  });
  const [userLogin, setUserLogin] = useState({
    loginEmail: '',
    loginPassword: '',
  });
  const [logginError, setLogginError] = useState({
    loginEmail: 'login_email',
    loginPassword: 'login_password',
  });
  const [registerError, setRegisterError] = useState({
    registerEmail: 'register_email',
    registerPassword: 'register_password',
    registerFirstName: 'register_firstName',
    registerLastName: 'register_lastName',
  });
  const dispatch = useDispatch();
  const { push } = useHistory();

  // Register
  const createUser = async (e) => {
    e.preventDefault();
    const registerResponse = await axios.post('/user/register', {
      registerFirstName: newUser.registerFirstName,
      registerLastName: newUser.registerLastName,
      registerEmail: newUser.registerEmail,
      registerPassword: newUser.registerPassword,
    });

    if (registerResponse.data.status === 201) {
      // Open login menu
      dispatch(openLogin());

      // Clear inputs
      setNewUser({
        registerFirstName: '',
        registerLastName: '',
        registerEmail: '',
        registerPassword: '',
      });
    }

    // Error message - email already in use
    if (registerResponse.data.status === 409) {
      setRegisterError({
        registerEmail: 'register_email_error',
      });
    }

    // Error message - password too short
    if (registerResponse.data.status === 411) {
      setRegisterError({
        registerPassword: 'register_password_error',
      });
    }

    // Error message - name missing
    if (registerResponse.data.status === 406) {
      if (registerResponse.data.errorMsg === 'Missing first name') {
        setRegisterError({
          registerFirstName: 'register_firstName_error',
        });
      }

      if (registerResponse.data.errorMsg === 'Missing last name') {
        setRegisterError({
          registerLastName: 'register_lastName_error',
        });
      }
    }
  };

  // Login
  const loginUser = async (e) => {
    e.preventDefault();
    const loginResponse = await axios.post(
      '/user/login',
      {
        loginEmail: userLogin.loginEmail,
        loginPassword: userLogin.loginPassword,
      },
      { withCredentials: true, credentials: 'include' }
    );

    // Set user name and isLogged in to redux
    if (loginResponse.data.status === 200) {
      if (
        window.location.pathname === '/cart' ||
        window.location.pathname === '/checkout/shipping-information' ||
        window.location.pathname === '/checkout/payment'
      ) {
        push('/');
      }

      if (window.location.pathname === '/favorite') {
        push('/favorite');
      }

      dispatch(signIn());

      // Close menu
      dispatch(closeLogin());

      // Clear inputs
      setUserLogin({
        loginEmail: '',
        loginPassword: '',
      });
    }

    // If logging in fails - error messages
    if (loginResponse.data.status === 401) {
      if (loginResponse.data.errorMsg === 'Incorrect email') {
        setLogginError({ loginEmail: 'login_email_error' });
      }
      if (loginResponse.data.errorMsg === 'Incorrect password') {
        setLogginError({
          loginPassword: 'login_password_error',
        });
      }
    }
  };

  return (
    <>
      {menuType === 'register' && (
        <div className='register_menu_wrapper'>
          <div className='register_menu'>
            <div className='register_title'>
              <H2 title='Register' />
              <svg
                width='2.2rem'
                viewBox='0 0 29 29'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                onClick={closeMenu}
              >
                <rect
                  x='6.59961'
                  y='7.54254'
                  width='1.66667'
                  height='20'
                  rx='0.833333'
                  transform='rotate(-45 6.59961 7.54254)'
                  fill='black'
                />
                <rect
                  x='6.48193'
                  y='20.6241'
                  width='20'
                  height='1.66667'
                  rx='0.833333'
                  transform='rotate(-45 6.48193 20.6241)'
                  fill='black'
                />
              </svg>
            </div>
            <P
              text='Create your Sweath Member profile and get first access to the very best of Sweath products, inspiration and community.'
              tagClass='register_benefits'
            />
            <div className='register_forms'>
              <form onSubmit={createUser}>
                <span>
                  <div className={registerError.registerFirstName}>
                    <Form
                      formType='text'
                      formName='registerFirstName'
                      formPlaceholder='First Name'
                      formId='register_forms_firstName'
                      onChange={(e) => {
                        setNewUser({
                          ...newUser,
                          registerFirstName: e.target.value,
                        });
                        setRegisterError({
                          ...registerError,
                          registerFirstName: 'register_firstName',
                        });
                      }}
                      formValue={newUser.registerFirstName}
                    />
                  </div>
                  <div className={registerError.registerLastName}>
                    <Form
                      formType='text'
                      formName='registerLastName'
                      formPlaceholder='Last Name'
                      onChange={(e) => {
                        setNewUser({
                          ...newUser,
                          registerLastName: e.target.value,
                        });
                        setRegisterError({
                          ...registerError,
                          registerLastName: 'register_lastName',
                        });
                      }}
                      formValue={newUser.registerLastName}
                    />
                  </div>
                </span>
                <div className={registerError.registerEmail}>
                  <Form
                    formType='email'
                    formName='registerEmail'
                    formPlaceholder='Email Address'
                    formId='register_input1'
                    onChange={(e) => {
                      setNewUser({ ...newUser, registerEmail: e.target.value });
                      setRegisterError({
                        ...registerError,
                        registerEmail: 'register_email',
                      });
                    }}
                    formValue={newUser.registerEmail}
                  />
                </div>
                <div className={registerError.registerPassword}>
                  <Form
                    formType='password'
                    formName='registerPassword'
                    formPlaceholder='Password'
                    formId='register_input2'
                    onChange={(e) => {
                      setNewUser({
                        ...newUser,
                        registerPassword: e.target.value,
                      });
                      setRegisterError({
                        ...registerError,
                        registerPassword: 'register_password',
                      });
                    }}
                    formValue={newUser.registerPassword}
                  />
                </div>
                <P
                  text="By creating an account, you agree to Sweath's Privacy Policy and Terms of Use."
                  tagClass='register_policy'
                />
                <SubmitButton buttonTitle='REGISTER' />
              </form>
            </div>
            <p className='loginLink' onClick={() => dispatch(openLogin())}>
              Have an account? <Link to='#'>Login</Link>
            </p>
          </div>
        </div>
      )}
      {menuType === 'login' && (
        <div className='login_menu_wrapper'>
          <div className='login_menu'>
            <div className='login_title'>
              <H2 title='Login' />
              <svg
                width='2.15rem'
                viewBox='0 0 29 29'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                onClick={closeMenu}
              >
                <rect
                  x='6.59961'
                  y='7.54254'
                  width='1.66667'
                  height='20'
                  rx='0.833333'
                  transform='rotate(-45 6.59961 7.54254)'
                  fill='black'
                />
                <rect
                  x='6.48193'
                  y='20.6241'
                  width='20'
                  height='1.66667'
                  rx='0.833333'
                  transform='rotate(-45 6.48193 20.6241)'
                  fill='black'
                />
              </svg>
            </div>
            <div className='login_forms'>
              <form onSubmit={loginUser}>
                <div className={logginError.loginEmail}>
                  <Form
                    formType='email'
                    formName='loginEmail'
                    formPlaceholder='Email Address'
                    onChange={(e) => {
                      setUserLogin({
                        ...userLogin,
                        loginEmail: e.target.value,
                      });
                      setLogginError({
                        ...logginError,
                        loginEmail: 'login_email',
                      });
                    }}
                    formValue={userLogin.loginEmail}
                  />
                </div>
                <div
                  className={logginError.loginPassword}
                  data-error='Your password was entered incorrectly.'
                >
                  <Form
                    formType='password'
                    formName='loginPassword'
                    formPlaceholder='Password'
                    onChange={(e) => {
                      setUserLogin({
                        ...userLogin,
                        loginPassword: e.target.value,
                      });
                      setLogginError({
                        ...logginError,
                        loginPassword: 'login_password',
                      });
                    }}
                    formValue={userLogin.loginPassword}
                  />
                </div>
                <P
                  text="By loggin in, you agree to Sweath's Privacy Policy and Terms of Use."
                  tagClass='login_policy'
                />
                <SubmitButton buttonTitle='SIGN IN' />
              </form>
            </div>
            <p
              className='registerLink'
              onClick={() => dispatch(openRegister())}
            >
              Don't have an account? <Link to='#'>Register</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default UserMenu;
