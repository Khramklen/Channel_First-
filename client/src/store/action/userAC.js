
export const setUser = (data) => ({ type: 'AUTH', payload: data.user });


export const getUser = (email, password) => async (dispatch) => {

  const data = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  const res = await data.json();
  if (data.status === 200) {
    dispatch(setUser(res))
  }
};

export const setLogout = () => ({ type: 'LOGOUT' });

export const getLogout = () => async (dispatch) => {
  await fetch('/logout', {
    credentials: 'include',
  })

  dispatch(setLogout());
};