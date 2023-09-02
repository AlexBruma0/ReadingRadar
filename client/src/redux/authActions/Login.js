import axios from 'axios';

// Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Action creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Login action that makes an API request to your server using fetch
export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const storedToken = localStorage.getItem('jwtToken');

    if (storedToken) {
      // Attach the JWT token as a bearer token in the headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const user = await response.json(); // Assuming your API returns user data upon successful login
    // Store the JWT token in local storage after a successful login
    console.log(user)
    localStorage.setItem('jwtToken', user.token);    
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
    console.log(error.message)
  }
};
