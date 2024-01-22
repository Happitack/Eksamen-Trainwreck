const dataModel = require('../models/dataModel');

// Controller for handling data requests
const dataController = {
  // Get all data
  getAllData: async (req, res) => {
    try {
      const data = await dataModel.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get data by ID
  getDataById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await dataModel.findById(id);
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ error: 'Data not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Create new data
  createData: async (req, res) => {
    try {
      const newData = req.body;
      const createdData = await dataModel.create(newData);
      res.status(201).json(createdData);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update data by ID
  updateDataById: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const result = await dataModel.findByIdAndUpdate(id, updatedData);
      if (result) {
        res.json({ message: 'Data updated successfully' });
      } else {
        res.status(404).json({ error: 'Data not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete data by ID
  deleteDataById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await dataModel.findByIdAndDelete(id);
      if (result) {
        res.json({ message: 'Data deleted successfully' });
      } else {
        res.status(404).json({ error: 'Data not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = dataController;
