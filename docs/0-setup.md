---
sidebar_position: 1
title: Setup Guide
slug: /setup
description: Lean how to setup the Solarminer.app local node program to mine bitcoins with your solar power surplus.
keywords: [Bitcoin mining automation, solar surplus rules, solarmining setup, PV Miner DSL, Home Assistant mining automation]
---

# Solar Miner Setup Guide

This guide walks you through the deployment of your Solar Miner system using Docker Compose.

## 🖥️ Hardware Requirements

To ensure a smooth operation of the Java-based microservices, databases, and the Lightning-Node, we recommend the following specifications as a minimum:

| Component | Minimum Specification |
| :--- | :--- |
| **CPU** | Intel N95 (Quad-Core) or equivalent (Only x86 supported) |
| **RAM** | 16 GB (8 GB minimum for smaller deployments) |
| **Storage** | 256 GB SSD (Recommended for database I/O performance) |
| **OS** | Linux (Ubuntu Server 22.04 LTS or newer recommended) |

> **Note:** Because the system manages databases and multiple Java services concurrently, an SSD is highly recommended to avoid I/O bottlenecks.

---

## 🚀 Installation Steps

### 1. Preparing the Directory Structure
Before starting the containers, you must create the mount directories on your host machine to ensure the data persists and to avoid permission errors. Run these commands in your project root:

```bash
mkdir -p ./app/frontend/app
mkdir -p ./app/frontend/mariadb_data
mkdir -p ./app/frontend/influxdb/data
mkdir -p ./app/frontend/influxdb/config
mkdir -p ./app/currency/backend
mkdir -p ./app/currency/mariadb
mkdir -p ./app/phoenixd
```


### 2. Environment Configuration (.env)
Create a .env file in the same directory as your compose.yml. This file stores sensitive credentials required by the services. Copy the template below and update the values:
```env
# InfluxDB Configuration
INFLUXDB_ADMIN_TOKEN=YourSecureToken
DOCKER_INFLUXDB_INIT_USERNAME=admin
DOCKER_INFLUXDB_INIT_PASSWORD=YourInfluxPassword

# MariaDB (Frontend)
MYSQL_PASSWORD=YourFrontendDBPassword

# Currency Service DB
CURRENCY_DB_PASSWORD=YourCurrencyDBPassword
```

### 3. Deploying the System
Once your compose.yml and .env files are in place, you can start the entire stack in detached mode: ```docker-compose up -d ```

``` yml
services:
  frontend:
    image: verdox/solar-miner
    ports:
      - "8080:8080"
    depends_on:
      - mariadb-frontend
      - influxdb-frontend
      - currency-service
      - core
      - phoenixd
    restart: unless-stopped
    env_file:
      - .env
    environment:
      - INFLUXDB_URL=http://influxdb-frontend:8086
      - MYSQL_URL=jdbc:mariadb://mariadb-frontend:3306/solarminer
      - CURRENCY_MICRO_SERVICE_URL=http://currency-service:8080
      - CORE_MICRO_SERVICE_URL=http://core:8080/api/miners
      - PHOENIXD_BACKEND_URL=http://phoenixd:9740
      - PHOENIX_CONFIG_PATH=/app/phoenixd/phoenix.conf
      - PHOENIX_SEED_PATH=/app/phoenixd/seed.dat

      - INFLUXDB_ADMIN_TOKEN=${INFLUXDB_ADMIN_TOKEN}
      - INFLUXDB_ORG=SolarMiner
      - INFLUXDB_BUCKET=solarminer
      - MYSQL_USER=solarminer
      - MYSQL_PASSWORD=${MYSQL_PASSWORD}
    entrypoint:
      - java
      - -Dspring.profiles.active=production
      - -jar
      - ./pv-miner.jar
    volumes:
      - ./app/frontend/app:/app/storage
      - ./app/phoenixd:/app/phoenixd:ro

  mariadb-frontend:
    image: mariadb:latest
    container_name: mariadb-frontend
    restart: always
    env_file:
      - .env
    environment:
      MYSQL_RANDOM_ROOT_PASSWORD: "yes"
      MYSQL_DATABASE: solarminer
      MYSQL_USER: solarminer
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    ports:
      - "3306:3306"
    volumes:
      - ./app/frontend/mariadb_data:/var/lib/mysql

  influxdb-frontend:
    image: influxdb:2
    restart: always
    environment:
      DOCKER_INFLUXDB_INIT_MODE: setup
      DOCKER_INFLUXDB_INIT_ORG: SolarMiner
      DOCKER_INFLUXDB_INIT_BUCKET: solarminer
      DOCKER_INFLUXDB_INIT_ADMIN_TOKEN: ${INFLUXDB_ADMIN_TOKEN}
      DOCKER_INFLUXDB_INIT_USERNAME: ${DOCKER_INFLUXDB_INIT_USERNAME}
      DOCKER_INFLUXDB_INIT_PASSWORD: ${DOCKER_INFLUXDB_INIT_PASSWORD}
    logging:
      driver: "json-file"
      options:
        max-size: 50m
    volumes:
      - ./app/frontend/influxdb/data:/var/lib/influxdb2
      - ./app/frontend/influxdb/config:/etc/influxdb2
    ports:
      - "8086:8086"

  currency-service:
    image: verdox/currency-rates-api:latest
    ports:
      - "8081:8080"
    depends_on:
      - mariadb-currency-service
    restart: unless-stopped
    env_file:
      - .env
    environment:
      MYSQL_URL: jdbc:mariadb://mariadb-currency-service:3306/currency_rates
      MYSQL_USER: currency_rates
      MYSQL_PASSWORD: ${CURRENCY_DB_PASSWORD}
    entrypoint:
      - java
      - -Dspring.profiles.active=production
      - -jar
      - ./currency-rates.jar
    volumes:
      - ./app/currency/backend:/app/storage

  mariadb-currency-service:
    image: mariadb:latest
    container_name: mariadb-currency-service
    restart: always
    env_file:
      - .env
    environment:
      MYSQL_RANDOM_ROOT_PASSWORD: "yes"
      MYSQL_DATABASE: currency_rates
      MYSQL_USER: currency_rates
      MYSQL_PASSWORD: ${CURRENCY_DB_PASSWORD}
    ports:
      - "3307:3306"
    volumes:
      - ./app/currency/mariadb:/var/lib/mysql

  core:
    image: verdox/solar-miner-core:latest-amd64
    ports:
      - "8082:8080"
    restart: unless-stopped
    environment:
      - JAVA_TOOL_OPTIONS=-Dio.netty.noUnsafe=true -Djdk.tls.client.protocols=TLSv1.2

  phoenixd:
    image: acinq/phoenixd:latest
    container_name: phoenixd
    restart: unless-stopped
    user: root
    ports:
      - "127.0.0.1:9740:9740"
    volumes:
      - ./app/phoenixd:/root/.phoenix
```


### 4. Maintenance & Best Practices
Your persistent data is stored in the ./app/ directory. It is crucial to perform regular backups of these folders:

:::warning Important
The ./app/phoenixd folder contains your Lightning node data (channel states, private keys). Always ensure you have a secure backup of your wallet seed and the phoenixd data directory. Losing these will result in the loss of funds.
:::

