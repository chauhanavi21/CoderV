// Load .env before any other import reads process.env
import 'dotenv/config';

import app from './src/app.js';

// Default 5050: macOS often binds AirPlay Receiver to 5000 (Control Center), causing EADDRINUSE.
const PORT = Number(process.env.PORT) || 5050;

const server = app.listen(PORT, () => {
  console.log(`CoderV backend  →  http://localhost:${PORT}`);
  console.log(`Python command  →  ${process.env.PYTHON_CMD || 'python'}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\nPort ${PORT} is already in use. Options:`);
    console.error(`  • Set another port: PORT=5051 npm run dev`);
    console.error(`  • On macOS, port 5000 is often AirPlay: System Settings → AirDrop & Handoff → AirPlay Receiver (off), or use PORT=5050 in backend/.env\n`);
  }
  throw err;
});
