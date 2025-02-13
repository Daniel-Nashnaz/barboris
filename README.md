# Barboris Queue Management System

A queue management system built for Barboris hairdresser, helping to organize and manage customer appointments efficiently.

## Features

- Queue management for haircut appointments
- Customer tracking
- Time slot management
- Prisma database integration

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (latest LTS version)
- npm (comes with Node.js)
- Git

## Installation

1. Clone the repository:
   git clone https://github.com/Daniel-Nashnaz/barboris.git
   cd barboris

2. Install dependencies:
   npm install

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add necessary environment variables (database connection, etc.)

4. Initialize the database:
   npx prisma generate
   npx prisma db push

## Usage

1. Start the development server:
   npm run dev

2. Access the application through your web browser at `http://localhost:3000`

## Project Structure

barboris/
├── prisma/        # Database schema and migrations
├── src/           # Source code
├── .gitignore     # Git ignore file
├── package.json   # Project dependencies and scripts
├── tsconfig.json  # TypeScript configuration
└── README.md      # Project documentation

## Technologies Used

- TypeScript
- Node.js
- Prisma (Database ORM)
- Express.js (if applicable)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Daniel Nashnaz - [GitHub Profile](https://github.com/Daniel-Nashnaz)

Project Link: [https://github.com/Daniel-Nashnaz/barboris.git](https://github.com/Daniel-Nashnaz/barboris.git)