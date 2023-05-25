# GSES2 BTC Application

This repository contains the implementation of a service with an API that allows you to perform the following tasks:

- Get the current exchange rate of Bitcoin (BTC) to Ukrainian Hryvnia (UAH).
- Subscribe an email address to receive information about the change in the exchange rate.
- Send a request to all subscribed users with the current exchange rate.

## Requirements

1. The service should adhere to the API described below. Authentication is not required.
2. All data for the application should be stored in files. No database connection is needed. Implement data storage and manipulation (e.g., email addresses) using the file system.
3. The repository must include a Dockerfile, which allows running the system in Docker. You are required to familiarize yourself with Docker independently.
4. You can add comments or descriptions of the implementation logic in the README.md document. Properly implemented logic can be an advantage during evaluation, even if you don't fully complete the task.

The expected programming languages for this task are PHP, Go, and JavaScript (Node.js). You can use other languages, but it won't be considered an advantage.

Feel free to use any available resources, but please complete the task independently.

Good luck!

## API Specification

### Base URL

```http://gses2.app/api```

### Rate Endpoints

#### Get Current BTC to UAH Exchange Rate

```
GET /rate
````
- Description: This request retrieves the current exchange rate of Bitcoin (BTC) to Ukrainian Hryvnia (UAH) using any third-party service with a public API.
- Response: Returns the current exchange rate as a JSON number.

### Subscription Endpoints

#### Subscribe Email for Exchange Rate Updates

```
POST /subscribe
```


- Description: This request checks if the provided email address is not already present in the current database (file-based) and, if not, adds it to the database. Later, we will send emails to all addresses in this database.
- Parameters:
  - `email` (required): The email address to subscribe.
- Response:
  - `200`: Email address successfully added.
  - `409`: Returned if the email address already exists in the database.

#### Send Emails with Current Rate to Subscribed Emails

```
POST /sendEmails
```

- Description: This request retrieves the current exchange rate of Bitcoin (BTC) to Ukrainian Hryvnia (UAH) using a third-party service and sends an email containing the rate to all previously subscribed email addresses.
- Response:
  - `200`: Emails successfully sent.
