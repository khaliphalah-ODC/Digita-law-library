import bookStoreDB from '../model/connect.js';
import {
  subscriptionsQuery,
  createSubscriptionQuery,
  fetchSubscriptionsByUserQuery,
  fetchSubscriptionByIdQuery,
  cancelSubscriptionQuery
} from '../model/subscriptions.model.js';



export const CreateSubscriptionsTable = () => {
  bookStoreDB.run(subscriptionsQuery, (err) => {
    if (err) {
      console.error('Error creating subscriptions table:', err.message);
    } else {
      console.log('Subscriptions table created or already exists');
    }
  });
};


export const createSubscription = (req, res) => {
  const user_id = req.user.id;
  const {  plan_name, start_date, end_date } = req.body;

  if (!plan_name || !start_date) {
    return res.status(400).json({
      message: 'All required fields must be provided'
    });
  }

  bookStoreDB.run(
    createSubscriptionQuery,
    [user_id, plan_name, start_date, end_date || null],
    function (err) {
      if (err) {
        return res.status(500).json({
          message: 'Failed to create subscription',
          error: err.message
        });
      }

      res.status(201).json({
        message: 'Subscription created successfully',
        data: {
          id: this.lastID,
      
          plan_name,
          start_date,
          end_date: end_date || null,
          status: 'active'
        }
      });
    }
  );
};


export const getSubscriptionsByUser = (req, res) => {
  const { user_id } = req.params;

  bookStoreDB.all(
    fetchSubscriptionsByUserQuery,
    [user_id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: 'Failed to fetch subscriptions',
          error: err.message
        });
      }

      res.status(200).json({
        message: 'Subscriptions retrieved successfully',
        data: rows
      });
    }
  );
};



export const getSubscriptionById = (req, res) => {
  const { id } = req.params;

  bookStoreDB.get(
    fetchSubscriptionByIdQuery,
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          message: 'Failed to fetch subscription',
          error: err.message
        });
      }

      if (!row) {
        return res.status(404).json({
          message: 'Subscription not found',
          data: null
        });
      }

      res.status(200).json({
        message: 'Subscription retrieved successfully',
        data: row
      });
    }
  );
};

export const cancelSubscription = (req, res) => {
  const { id } = req.params;

  bookStoreDB.run(
    cancelSubscriptionQuery,
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({
          message: 'Failed to cancel subscription',
          error: err.message
        });
      }

      if (this.changes === 0) {
        return res.status(400).json({
          message: 'Subscription already canceled or not found'
        });
      }

      res.status(200).json({
        message: 'Subscription canceled successfully',
        data: { id, status: 'canceled' }
      });
    }
  );
};
