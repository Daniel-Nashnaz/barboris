# 💈 BarBoris Backend 🖥️

A robust backend server for the BarBoris Barbershop Website, built with Nest.js and Prisma ORM.

## 🌟 Overview

BarBoris Backend provides comprehensive appointment management and database services for the barbershop management system. It handles scheduling, user management, and business logic through a RESTful API interface.

## 🚀 Features

- **📅 Appointment Management System**
  - Schedule new appointments
  - Modify existing bookings
  - Cancel appointments
  - View appointment history

- **🗄️ Database Operations**
  - Efficient data handling with Prisma ORM
  - Secure data storage and retrieval
  - Optimized query performance

- **🔗 API Services**
  - RESTful endpoints for frontend integration
  - Secure authentication system
  - Comprehensive documentation

## 🛠️ Tech Stack

- **Core Framework**: Nest.js 🐈
- **Database ORM**: Prisma 🔺
- **Database**: PostgreSQL 🐘 / MongoDB 🍃
- **Language**: TypeScript 📘
- **Containerization**: Docker 🐳 (optional)

## 🏁 Getting Started

### Prerequisites

- Node.js (v14 or higher) 📦
- npm or yarn 🧶
- PostgreSQL/MongoDB instance 🗃️

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Daniel-Nashnaz/barboris.git
   cd barboris
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env with your configurations
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

### 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/barboris"
JWT_SECRET="your-secret-key"
PORT=3001
```

## 📚 API Documentation

The API runs on `http://localhost:3001` by default.

### Key Endpoints

- `POST /appointments` - Create new appointment
- `GET /appointments` - List all appointments
- `PUT /appointments/:id` - Update appointment
- `DELETE /appointments/:id` - Cancel appointment

## 🚢 Deployment

### Using Docker

```bash
# Build the image
docker build -t barboris-backend .

# Run the container
docker run -p 3001:3001 barboris-backend
```

### Using PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start dist/main.js --name barboris-backend
```

## 🛠️ Development

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Database Management

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio
```

## 🔗 Related Projects

- Frontend Repository: [BarBoris Frontend](https://github.com/Daniel-Nashnaz/barbershop-website)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- Daniel Nashnaz - Project Lead 👨‍💻
