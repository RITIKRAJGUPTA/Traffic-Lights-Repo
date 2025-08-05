const express = require('express');
const cors = require('cors');
const trafficRoutes = require('./routes/trafficRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use('/', trafficRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
