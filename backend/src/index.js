import express from 'express';
import cors from 'cors';
import { router as bfhlRouter } from './routes/bfhl.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/bfhl', bfhlRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});