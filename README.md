# Cars Home

A web platform that enables users to browse available cars for sale and quickly calculate financing options (monthly installment + payment schedule). The main goal is to simplify the process of searching and preliminary financial assessment for potential car buyers.

## Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Getting Started Locally](#getting-started-locally)
- [Available Scripts](#available-scripts)
- [Project Scope](#project-scope)
- [Project Status](#project-status)
- [License](#license)

## Project Description

Cars Home solves several key problems for potential car buyers:

1. **Lack of easy access to offers** - Users no longer need to visit multiple dealerships or websites
2. **Difficulty in assessing financial possibilities** - Quick calculation of monthly payments
3. **Lack of transparency in financing options** - Detailed payment schedules available upfront
4. **Time-consuming search process** - Centralized catalog with sorting capabilities

The MVP (Minimum Viable Product) focuses on core functionalities to verify the business concept within one week of development. The application is built as a responsive web app, accessible on both mobile and desktop devices.

## Tech Stack

### Frontend
- **Next.js** - React framework with built-in routing and server-side rendering
- **React 19** - For interactive UI components
- **TypeScript 5** - For static typing and better IDE support
- **Tailwind 4** - For convenient styling
- **ShadcnUI** - Accessible React component library

### Backend
- **Payload CMS** - Headless CMS with PostgreSQL database
- **Next.js API routes** - For backend functionality

### CI/CD & Hosting
- **GitHub Actions** - For CI/CD pipelines
- **Vercel** - For MVP hosting
- **DigitalOcean** - For hosting via Docker image (post-MVP)

## Getting Started Locally

### Prerequisites

- Node.js (^18.20.2 || >=20.9.0)
- pnpm (^9 || ^10)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/cars-home.git
   cd cars-home
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the necessary environment variables.

4. Start the development server
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `pnpm build` - Builds the application for production
- `pnpm dev` - Starts the development server
- `pnpm devsafe` - Removes the .next directory and starts the development server
- `pnpm generate:importmap` - Generates import map for Payload
- `pnpm generate:types` - Generates TypeScript types for Payload
- `pnpm lint` - Runs the linter
- `pnpm payload` - Runs Payload CLI commands
- `pnpm start` - Starts the production server

## Project Scope

### Functional Requirements

1. **Car Catalog**
   - Display list of available cars with basic info
   - Sort by price (ascending/descending)
   - Car details page with additional information
   - Responsive design for all screen sizes

2. **Admin Panel**
   - Authentication system for administrators
   - Offer management (add, edit, delete cars)
   - Financing parameters configuration

3. **Financing Calculator**
   - Available on car detail pages
   - Support for two financing types: credit and leasing
   - User-input parameters (down payment, financing period, financing type)
   - Calculations based on equal installment formula

4. **Payment Schedule**
   - Detailed table showing the complete payment plan
   - Payment dates, remaining capital, installment breakdown

### Outside MVP Scope

- Direct online car purchase
- Payment and settlement system
- User panel and accounts
- Advanced search and filtering
- Payment schedule export to PDF
- Online price negotiation
- Integration with external financial systems
- Vehicle reservation
- History of viewed offers

### Technical Limitations

- No Docker deployment at MVP stage
- No advanced analytics tools
- Simple authentication for administrators
- No automated performance tests

## Project Status

The project is currently in MVP (Minimum Viable Product) phase, focusing on core functionalities.

### Success Metrics

- **User Activity**: Minimum 200 unique users in first 3 months
- **Engagement**: Average time spent on platform over 3 minutes
- **Calculator Usage**: At least 40% of visitors use the financing calculator
- **Conversion**: At least 5% of users view the payment schedule
- **Platform Stability**: 99% uptime in first 3 months
- **Performance**: Average page load time under 4 seconds

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
