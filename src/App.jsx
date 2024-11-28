import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './components/PaymentForm';
import Login from './components/Login';

// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_51PJeRVSDpXykAAqRHhPogog9HkCkSKMtfYRn2Lc7E52jOUDo0Wd273w49S1rwTOzk0PnXM6OF0YUZuX1wTZt7Orn00Tfg4bkOj');

const App = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Application Fee Payment</h1>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
      <Login/>
    </div>
  );
};

export default App;
