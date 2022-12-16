import './App.css';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from './firebase.init';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';


const auth = getAuth(app);


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  }
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //  validate code 
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    // form validation with regular expression special character
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('Please should contain at least on special character');
      return;
    }
    setError('');
    setValidated(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error)
      })

    console.log('submit');
  }


  return (
    <div className='w-50 mx-auto mt-3'>
      <h2 className="text-primary">Email Password Authentication</h2>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
          {/* validation error message */}
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>

          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
          {/* validation error message  */}
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>
        <p className='text-danger'>{error}</p>
        <Button onSubmit={handleFormSubmit} variant="primary" type="submit">
          Submit
        </Button>
      </Form>

    </div >
  );
}

export default App;
