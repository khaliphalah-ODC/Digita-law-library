import bookStoreDB from '../model/connect.js';
import {
  purchasesQuery,
  createPurchaseQuery,
  fetchPurchasesByUserQuery,
  fetchPurchaseByIdQuery,
  deletePurchaseQuery
} from '../model/purchases.model.js';

export const CreatePurchasesTable = () => {
  bookStoreDB.run(purchasesQuery, (err) => {
    if (err) {
      console.error('Error creating purchases table:', err.message);
    } else {
      console.log('Purchases table created or already exists');
    }
  });
};



export const createPurchase = (req, res) => {
  const user_id = req.user.id
  const {  book_id, amount_paid, payment_reference } = req.body;

  if ( !book_id || !amount_paid || !payment_reference) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }

  bookStoreDB.run(
    createPurchaseQuery,
    [user_id, book_id, amount_paid, payment_reference],
    function (err) {
      if (err) {
        return res.status(500).json({
          message: 'Failed to create purchase',
          error: err.message
        });
      }

      res.status(201).json({
        message: 'Purchase created successfully',
        data: {
          id: this.lastID,
          book_id,
          amount_paid,
          payment_reference
        }
      });
    }
  );
};


export const getPurchasesByUser = (req, res) => {
  const { user_id } = req.params;

  bookStoreDB.all(
    fetchPurchasesByUserQuery,
    [user_id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: 'Failed to fetch purchases',
          error: err.message
        });
      }

      res.status(200).json({
        message: 'Purchases retrieved successfully',
        data: rows
      });
    }
  );
};


//getpurchases by id

export const getPurchaseById = (req, res) => {
  const { id } = req.params;

  bookStoreDB.get(
    fetchPurchaseByIdQuery,
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          message: 'Failed to fetch purchase',
          error: err.message
        });
      }

      if (!row) {
        return res.status(404).json({
          message: 'Purchase not found',
          data: null
        });
      }

      res.status(200).json({
        message: 'Purchase retrieved successfully',
        data: row
      });
    }
  );
};


//delete 

export const deletePurchase = (req, res) => {
  const { id } = req.params;

  bookStoreDB.run(
    deletePurchaseQuery,
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({
          message: 'Failed to delete purchase',
          error: err.message
        });
      }

      res.status(200).json({
        message: 'Purchase deleted successfully',
        data: { id }
      });
    }
  );
};
