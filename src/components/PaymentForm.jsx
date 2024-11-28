import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [amount] = useState(10000); // Amount in cents (e.g., $100.00)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!stripe || !elements) {
      setError('Stripe is not loaded.');
      setLoading(false);
      return;
    }

    try {
      // Call your backend to create a payment intent
      const response = await fetch('http://localhost:4000/api/v1/payments/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            amount, 
            currency: 'usd',
            name : 'Ramu ram',
            line1: 'Raja park',
            line2: '',
            city: 'Jaipur',
            state: 'Rajasthan',
            postal_code: '307042',
            country: 'India' }),
      });

      const { clientSecret } = await response.json();

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess('Payment successful!');
      }
    } catch (err) {
      console.error('Payment failed:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Pay $100.00</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
        <button
          type="submit"
          disabled={!stripe || loading}
          style={{
            backgroundColor: '#007BFF',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
    </div>
  );
};

export default PaymentForm;
