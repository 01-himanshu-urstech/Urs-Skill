import axios from 'axios';

class CashfreeService {

async createOrder({ orderId, orderAmount, customer }) {

  const payload = {
    order_id: orderId,
    order_amount: Number(orderAmount),
    order_currency: 'INR',

    customer_details: {
      customer_id: customer.customerId.toString(),
      customer_email: customer.email,
      customer_phone: customer.phone // this is correct now
    },

    order_meta: {
      return_url: `${process.env.CASHFREE_RETURN_URL}?order_id=${orderId}`
    },

    // 🔥 REQUIRED FIELD (THIS WAS MISSING)
    order_note: 'Course purchase'
  };

  try {
    const { data } = await axios.post(
      `${process.env.CASHFREE_BASE_URL}/orders`,
      payload,
      {
        headers: {
          'x-client-id': process.env.CASHFREE_APP_ID,
          'x-client-secret': process.env.CASHFREE_SECRET_KEY,
          'x-api-version': '2022-09-01',
          'Content-Type': 'application/json'
        }
      }
    );

    return data;

  } catch (err) {
    console.error(
      '❌ Cashfree error response:',
      err.response?.data
    );
    throw err;
  }
}


  async getOrderStatus(orderId) {
    const { data } = await axios.get(
      `${process.env.CASHFREE_BASE_URL}/orders/${orderId}`,
      {
        headers: {
          'x-client-id': process.env.CASHFREE_APP_ID,
          'x-client-secret': process.env.CASHFREE_SECRET_KEY,
          'x-api-version': '2022-09-01'
        }
      }
    );

    return data.order_status;
  }
}

export const cashfreeService = new CashfreeService();
