import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import axios, { BASE_URI } from '../../api/axios';
import useMediaQuery from '../../hooks/useMediaQuery';
// import animationData from '../lotties/airplane.json';
import animationData from '../../lotties/circle.json';

const CheckoutForm = ({ returnPage, price, id }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isTablet = useMediaQuery('(min-width: 656px)');
  const isDesktop = useMediaQuery('(min-width: 900px)');

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          const payment = {
            amount: paymentIntent.amount,
            created: paymentIntent.created,

            transaction: paymentIntent.client_secret.slice('_secret')[0],
          };
          axios
            .put('/appointment/updateInfo', payment)

            .then((response) => {
              console.log(response.data);
            });
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message) {
    }
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${BASE_URI}/${returnPage}`,
      },
    });

    console.log(message);
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }
    setIsLoading(false);
  };
  return (
    <form className="mx-auto form" id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        className="w-full py-3 bg-primary rounded -full text-white"
        disabled={isLoading || !stripe || !elements}
        type="submit"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="w-fit mx-auto min-h-screen flex justify-center items-center">
              <Lottie
                options={defaultOptions}
                isClickToPauseDisabled={true}
                width={isDesktop ? 400 : isTablet ? 300 : 200}
              />
            </div>
          ) : (
            'Pay now'
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};
export default CheckoutForm;
