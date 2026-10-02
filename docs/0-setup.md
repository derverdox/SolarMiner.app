---
id: setup
title: Install the Node with Docker Compose
sidebar_position: 3
slug: /setup
description: Start the SolarMiner Node, databases, Core, proxy, and Phoenixd with a complete Compose example.
---

# Install the Node with Docker Compose

This example installs a local Node on a Linux host. It is a copy of the [Compose file in the Node repository](https://github.com/Solarminer-app/Solar-Miner-Node/blob/main/compose.yml), as of October 2, 2026: [download the Compose file](/examples/solarminer-node.compose.yml). The production example supplied for this documentation uses some different image tags and host ports. In particular, it omits `mariadb-currency-service` even though the currency service expects that database in its `MYSQL_URL`. The complete file here includes it.

## 1. Prepare files and secrets

```sh
mkdir -p solarminer
cd solarminer
curl -fL https://docs.solarminer.app/examples/solarminer-node.compose.yml -o compose.yml
mkdir -p app/frontend/app app/frontend/mariadb_data app/frontend/influxdb/data app/frontend/influxdb/config app/currency/backend app/currency/mariadb app/phoenixd
```

Create a `.env` file in the same directory. Replace **every** example value with your own long, random value:

```dotenv
MYSQL_PASSWORD=YOUR_OWN_PASSWORD
CURRENCY_DB_PASSWORD=A_DIFFERENT_PASSWORD
INFLUXDB_ADMIN_TOKEN=YOUR_OWN_LONG_TOKEN
DOCKER_INFLUXDB_INIT_USERNAME=admin
DOCKER_INFLUXDB_INIT_PASSWORD=A_THIRD_PASSWORD
SOLARMINER_UID=1000
SOLARMINER_GID=1000
```

`SOLARMINER_UID` and `SOLARMINER_GID` must match the user that manages the persistent files. The file contains credentials: restrict its permissions and do not commit it to Git. The example stores Phoenixd data under `app/phoenixd`; protect backups of that directory and the seed especially carefully.

## 2. Validate the configuration and start

```sh
docker compose config --quiet
docker compose up -d
docker compose ps
docker compose logs --tail=100 frontend core stratum-proxy
```

Open `http://<HOST-IP>:8080/` on your local network. If you prefer host port 80, change **only** the `frontend` service's mapping from `8080:8080` to `80:8080` before starting. The Node application still listens on `8080` inside the container.

The example includes `frontend-storage-init` to set permissions on the storage directory, a separate MariaDB for exchange rates, and an InfluxDB health check. `stratum-proxy` uses host networking; Core reaches its API through `host.docker.internal:8090`. The host and firewall must permit this local path.

## 3. Complete setup in the interface

1. Follow the Node setup and choose a suitable PV profile. Check live values for generation, grid import/export, and battery before controlling any miner.
2. Add miners and, if needed, a cluster. Set up the pool, worker, and [mining targets](./6-mining-fees.md) in the Node.
3. Start with conservative [automation rules](./4-automation-rules.md). Watch actual power draw and miner status.
4. Compare accepted shares and payouts in the real pool account. The Node dashboard alone does not prove a payout.

## Operation, ports, and backups

Besides the web interface, the supplied file publishes database, InfluxDB, and Core ports. Restrict them to a trusted LAN with a firewall, or remove host port mappings you do not need. Do not expose the Node or PC Agent interface directly to the public internet. The JMX options in the supplied production example disable authentication and TLS; do not carry them into an internet-accessible installation.

Before upgrades, back up at least the persistent directories under `app/`, the `.env` file, and the Phoenixd seed. Stop or properly snapshot writing database services for a restorable backup; copying files during active writes may not suffice. Pin image versions for planned rollouts rather than relying on moving `latest` tags. After an update, run `docker compose pull` and `docker compose up -d`, then check logs and actual pool operation.

Having trouble starting? See [troubleshooting](./9-troubleshooting.md). For CPU/GPU mining on another computer, see the [PC Agent](./5-pc-agent.md).
