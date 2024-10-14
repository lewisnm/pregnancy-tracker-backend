const Pregnancy = require('../models/Pregnancy');

// Add a new pregnancy entry
exports.addPregnancy = async (req, res) => {
  const { dueDate, trimester, milestones } = req.body;

  try {
    const pregnancy = new Pregnancy({
      userId: req.user.id, // Assuming req.user.id is set by auth middleware
      dueDate,
      trimester,
      milestones
    });

    await pregnancy.save();
    res.status(201).json({ success: true, data: pregnancy });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error adding pregnancy' });
  }
};

// Update a pregnancy's milestones
exports.updatePregnancy = async (req, res) => {
  const { id } = req.params;
  const { milestones } = req.body;

  try {
    const pregnancy = await Pregnancy.findByIdAndUpdate(
      id,
      { milestones },
      { new: true }
    );

    if (!pregnancy) {
      return res.status(404).json({ success: false, error: 'Pregnancy not found' });
    }

    res.status(200).json({ success: true, data: pregnancy });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error updating pregnancy' });
  }
};

// Get the logged-in user's pregnancy details
exports.getPregnancy = async (req, res) => {
  try {
    const pregnancy = await Pregnancy.findOne({ userId: req.user.id });

    if (!pregnancy) {
      return res.status(404).json({ success: false, error: 'No pregnancy record found' });
    }

    res.status(200).json({ success: true, data: pregnancy });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error fetching pregnancy details' });
  }
};
