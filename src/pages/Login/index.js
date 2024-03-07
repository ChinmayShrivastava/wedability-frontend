import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../statefeatures/authentication/authSlice';
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  }

  return (
    <div className='h-full'>
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <div className="mt-2">
                <TextField
                  required
                  id="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  variant="filled"
                  fullWidth
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <TextField
                  required
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="filled"
                  fullWidth
                  size="small"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Log in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
