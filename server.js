const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let eaStatus = { running: false, pnl: 0, trades: 0, winrate: 78 };

// Status API
app.get('/status', (req, res) => {
  eaStatus.pnl += (Math.random() - 0.5) * 2; // Simulate
  res.json(eaStatus);
});

// Start EA
app.post('/start-ea', (req, res) => {
  eaStatus.running = true;
  res.json({ status: 'EA started', lot: req.body.lot });
});

// Stop EA
app.post('/stop-ea', (req, res) => {
  eaStatus.running = false;
  res.json({ status: 'EA stopped' });
});

// Manual trade
app.post('/trade', (req, res) => {
  const { action, lot } = req.body;
  eaStatus.trades++;
  eaStatus.pnl += action === 'BUY' ? lot * 2.5 : -lot * 1.2;
  res.json({ status: `${action} XAUUSD ${lot}lot sent` });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 MT5 Bridge running on port ${port}`);
});
