import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../statefeatures/authentication/authSlice';

export default function Signup() {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const dispatch = useDispatch()

  const handleSignup = (e) => {
    e.preventDefault()
    // if password and confirm_password are not the same, return
    if (password !== confirm_password) {
      return
    }
    dispatch(createUser({ email, password, confirm_password, first_name, last_name }))
  }

  return (
    <div className='h-full'>
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register an account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <div className="mt-2">
                <TextField
                  required
                  id="first_name"
                  label="First Name"
                  type="text"
                  autoComplete="first_name"
                  variant="filled"
                  fullWidth
                  size="small"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <TextField
                  required
                  id="last_name"
                  label="Last Name"
                  type="text"
                  autoComplete="last_name"
                  variant="filled"
                  fullWidth
                  size="small"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
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
              <div className="mt-2">
                <TextField
                  required
                  id="confirm_password"
                  label="Confirm Password"
                  type="password"
                  autoComplete="confirm-password"
                  variant="filled"
                  fullWidth
                  size="small"
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
