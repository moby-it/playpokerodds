import { config } from 'dotenv';
import express, { Application } from 'express';
import { BootstrapApplicationModule } from './application';

config();
const app: Application = express();
BootstrapApplicationModule(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
