const express = require('express');
const app = express();

app.use(express.json());

// A sample standard growth chart data for comparison (this should be replaced with real data)
const standardGrowthCharts = {
  weight: {
    "0": 3.5,  // 3.5 kg for newborns
    "1": 4.5,  // 4.5 kg at 1 month
    "6": 7.5,  // 7.5 kg at 6 months
    "12": 9.5, // 9.5 kg at 12 months
    "24": 12.0 // 12.0 kg at 24 months
  },
  height: {
    "0": 50.0, // 50 cm for newborns
    "1": 54.7, // 54.7 cm at 1 month
    "6": 66.0, // 66.0 cm at 6 months
    "12": 75.0, // 75.0 cm at 12 months
    "24": 85.0 // 85.0 cm at 24 months
  }
};

// In-memory storage for baby growth data
let babyGrowthData = {};

// Record baby's growth data
app.post('/baby/growth', (req, res) => {
  const { babyName, ageInMonths, weight, height, headCircumference } = req.body;

  if (!babyName || ageInMonths === undefined || !weight || !height) {
    return res.status(400).send('Missing required fields.');
  }

  // Store the data for the baby
  if (!babyGrowthData[babyName]) {
    babyGrowthData[babyName] = [];
  }

  babyGrowthData[babyName].push({ ageInMonths, weight, height, headCircumference });

  res.send(`Growth data for ${babyName} at ${ageInMonths} months has been recorded.`);
});

// Compare baby's data with standard growth charts
app.get('/baby/growth/comparison/:babyName', (req, res) => {
  const babyName = req.params.babyName;

  if (!babyGrowthData[babyName]) {
    return res.status(404).send('No growth data found for this baby.');
  }

  const babyData = babyGrowthData[babyName];

  // Create a comparison report based on standard charts
  const comparison = babyData.map(data => {
    const age = data.ageInMonths;
    const standardWeight = standardGrowthCharts.weight[age];
    const standardHeight = standardGrowthCharts.height[age];

    return {
      ageInMonths: age,
      recordedWeight: data.weight,
      standardWeight: standardWeight || "No data",
      weightComparison: standardWeight ? `${data.weight}kg vs ${standardWeight}kg` : "No data",
      recordedHeight: data.height,
      standardHeight: standardHeight || "No data",
      heightComparison: standardHeight ? `${data.height}cm vs ${standardHeight}cm` : "No data",
    };
  });

  res.json({
    babyName,
    growthComparison: comparison
  });
});

// Set up the server to listen on a port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
