# S3 Storage Project Documentation

## Introduction

This project aims to provide a simple yet effective solution for storing and managing files using Amazon S3 (Simple Storage Service). It utilizes Node.js along with Express.js framework for building the backend, MongoDB for database management, and integrates with AWS SDK for S3 operations. The project provides functionalities for user authentication, file uploading to S3, file fetching from S3, and error handling.

## Features

- User registration and login functionality with password hashing.
- Token-based authentication using JSON Web Tokens (JWT).
- Uploading files to Amazon S3 bucket with signed URLs for security.
- Fetching files securely from the S3 bucket.
- Middleware for token verification and error handling.

## Technologies Used

- **Node.js**: Runtime environment for JavaScript.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing user and file information.
- **AWS SDK for JavaScript**: Library for interacting with Amazon Web Services.
- **Multer**: Middleware for handling file uploads.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: Library for generating and verifying JSON Web Tokens.
- **Joi**: Library for data validation.
- **CustomError**: Custom error handling utility.

## Installation

To run this project locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Define the following variables:
     ```
     PORT=<port-number>
     MONGODB_URI=<mongodb-uri>
     SECRET_KEY=<secret-key>
     AWS_BUCKET_NAME=<aws-bucket-name>
     AWS_BUCKET_REGION=<aws-bucket-region>
     ACCESS_KEY_ID=<aws-access-key-id>
     SECRET_ACCESS_KEY=<aws-secret-access-key>
     ```
4. Start the server: `npm start`

## API Endpoints

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Login an existing user.
- **POST /upload**: Upload a file to S3.
- **GET /upload**: Fetch a file from S3.

## Middleware

- **tokenVerification**: Middleware for verifying JWT token.
- **joiValidation**: Middleware for validating request data using Joi.
- **upload**: Middleware for handling file uploads.

## Error Handling

The project includes a custom error handling middleware that returns appropriate error responses with status codes and messages.
