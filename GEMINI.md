# Gemini Project Context: MyTube

This document provides context for the MyTube project, a NestJS-based microservices application.

## Project Overview

MyTube is a video-sharing platform built with a microservices architecture. It is a monorepo managed with Yarn, and the services are containerized using Docker. The project uses NestJS as the primary framework and TypeScript as the programming language.

### Architecture

The project is structured as a monorepo with multiple applications in the `apps` directory and shared libraries in the `libs` directory. The services communicate with each other using a combination of gRPC and a Kafka message broker.

- **API Gateway:** A central entry point for all client requests, which then routes them to the appropriate microservice.
- **Microservices:** The application is divided into several microservices, each responsible for a specific domain (e.g., users, videos, comments, likes).
- **Databases:** Each microservice has its own PostgreSQL database, managed with the Prisma ORM.
- **Messaging:** Kafka is used for asynchronous communication between services.
- **Caching:** Redis is used for caching to improve performance.
- **Authorization:** OpenFGA is used for fine-grained authorization.
- **Observability:** The project includes a monitoring stack with Prometheus for metrics, Grafana for dashboards, and Loki for logging.

### Technologies

- **Framework:** NestJS
- **Language:** TypeScript
- **Package Manager:** Yarn
- **Database:** PostgreSQL with Prisma ORM
- **Messaging:** Kafka
- **Caching:** Redis
- **Authorization:** OpenFGA
- **Containerization:** Docker
- **API:** REST (API Gateway) and gRPC (inter-service communication)

## Building and Running

### Prerequisites

- Node.js
- Yarn
- Docker

### Installation

```bash
yarn install
```

### Running the Application

#### Development

To run the application in development mode with hot-reloading:

```bash
yarn run start:dev
```

To start the entire stack using Docker:

```bash
docker compose -f compose.yml -f compose.dev.yml up
```

#### Production

To build and run the application in production mode:

```bash
yarn run build
yarn run start:prod
```

To start the production stack using Docker:

```bash
docker compose up
```

### Testing

To run the test suite:

```bash
yarn run test
```

To run end-to-end tests:

```bash
yarn run test:e2e
```

To get a test coverage report:

```bash
yarn run test:cov
```

## Development Conventions

### Code Style

- **Formatting:** Prettier is used for code formatting. To format the code, run:
  ```bash
  yarn run format
  ```
- **Linting:** ESLint is used for linting. To lint the code, run:
  ```bash
  yarn run lint
  ```

### Database Migrations

Prisma is used for database migrations. The following scripts are available:

- `prisma:init`: Initialize Prisma for a new service.
- `prisma:generate:client`: Generate the Prisma client.
- `prisma:generate:migrations`: Generate a new database migration.

### gRPC

The project uses gRPC for inter-service communication. The `.proto` files are located in the `libs/proto` directory. To generate the TypeScript code from the `.proto` files, run:

```bash
yarn run grpc:generate:proto
```
