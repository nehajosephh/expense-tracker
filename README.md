# Expense Tracker API

An API for managing transactions and calculating balances, built with Node.js and Express. This project includes a front-end HTML interface for adding and viewing transactions.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

This Expense Tracker API allows users to:

- Create, read, update, and delete transactions.
- Calculate the total balance including income and expenses.
- View transactions and balance through a web-based interface.

## Features

- Add, view, edit, and delete transactions.
- Display total balance and categorize transactions.
- Simple and responsive HTML interface.

## Technologies

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, Javascript
- **Database**: SQLite
- **Deployment**: Render (or other deployment platforms)

## Setup

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node package manager)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/nehajosephh/expense-tracker.git
    cd expense-tracker-api
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file:**

    - Add your environment variables to a `.env` file in the root directory.

4. **Run the application:**

    ```bash
    npm start
    ```

5. **Access the API:**

    - API endpoints are available at `http://localhost:3000/transactions` for CRUD operations and `http://localhost:3000/transactions/balance` for balance calculations.

## Usage

- **Adding a Transaction:**

    - POST request to `/transactions` with JSON payload containing `description`, `amount`, `type`, `category`, and `date`.

- **Viewing Transactions:**

    - GET request to `/transactions`.

- **Updating a Transaction:**

    - PUT request to `/transactions/:id` with JSON payload containing updated transaction details.

- **Deleting a Transaction:**

    - DELETE request to `/transactions/:id`.

- **Calculating Balance:**

    - GET request to `/transactions/balance`.

## Deployment

This project can be deployed on various platforms such as Render. For deployment, follow the respective platform's documentation to connect your GitHub repository and set up the environment.
Link: https://expense-tracker-6pon.onrender.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


