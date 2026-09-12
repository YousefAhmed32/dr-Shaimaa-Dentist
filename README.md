# Dr. Shaimaa Clinical Portfolio

A bilingual Arabic/English MERN portfolio with a public clinical-work archive, visitor accounts, and protected administration.

## Project structure

```text
client/                 React + Vite frontend
  public/               Clinical media, CV, favicon, and web manifest
  src/                  Pages, components, contexts, and styles
  package.json
server/                 Express + MongoDB backend
  config/               Environment and database setup
  middleware/           Authentication and image uploads
  models/               User and clinical-case schemas
  routes/               Auth, case, and admin APIs
  scripts/              Database seed commands
  uploads/              Runtime uploads; contents are not committed
  .env.example
  package.json
deploy/                 systemd and Nginx examples for Ubuntu VPS
deploy.sh               Repeatable VPS build, restart, and health check
package.json            Root development orchestration
```

## Local setup

1. Install the root tools and both applications:

   ```bash
   npm install
   npm run setup
   ```

2. Copy `server/.env.example` to `server/.env` and replace the database URI, JWT secret, administrator email, and temporary password.
3. Optional: copy `client/.env.example` to `client/.env` to change local ports.
4. Seed the curated cases and first administrator:

   ```bash
   npm run seed
   npm run seed:admin
   ```

5. Start React and Express together:

   ```bash
   npm run dev
   ```

Local addresses:

- Website: `http://127.0.0.1:5173`
- Account: `http://127.0.0.1:5173/account`
- Administration: `http://127.0.0.1:5173/admin`
- API health: `http://127.0.0.1:5000/api/health`

## Production VPS

The production server reads `server/.env` and serves the built React application from `client/dist`. Set at least:

```dotenv
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/dr_shaimaa_portfolio
CLIENT_URL=https://dr-shaimaa-dentist.yansytech.com
JWT_SECRET=replace-with-a-long-random-production-secret
```

Install the supplied service and Nginx examples after confirming their paths and domain:

```bash
sudo cp deploy/dr-shaimaa-dentist-backend.service.example /etc/systemd/system/dr-shaimaa-dentist-backend.service
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/dr-shaimaa-dentist
sudo ln -s /etc/nginx/sites-available/dr-shaimaa-dentist /etc/nginx/sites-enabled/dr-shaimaa-dentist
sudo systemctl daemon-reload
sudo systemctl enable --now dr-shaimaa-dentist-backend.service
sudo nginx -t && sudo systemctl reload nginx
```

For later releases, run from the repository root:

```bash
git pull --ff-only origin main
sudo ./deploy.sh
```

`deploy.sh` uses direct shell commands only, prevents concurrent deployments, builds `client`, installs production dependencies in `server`, restarts systemd, checks `/api/health`, validates Nginx, and prints service logs if startup fails.

Use HTTPS before opening the website publicly. Keep `server/.env` and uploaded clinical images out of Git, and back up MongoDB plus `server/uploads` before production updates.
