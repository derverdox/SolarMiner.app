---
title: Troubleshooting
sidebar_position: 10
slug: /troubleshooting
description: Common startup, PV measurement, proxy, Agent, and pool accounting problems.
---

# Troubleshooting

## The Node does not start

From the Compose directory, run `docker compose config --quiet`, `docker compose ps`, and `docker compose logs --tail=150 frontend core stratum-proxy`. Check that `.env` is complete, port `8080` is available, and the database and InfluxDB containers are running. The currency service needs **its own MariaDB**; a Compose file without `mariadb-currency-service` does not match the Node configuration documented here. Check permissions on `app/frontend/app` and the UID/GID settings.

## PV values are missing or implausible

Test whether the device is reachable from the container network. Check the Modbus address, register type, byte order, scaling, units, and grid import/export sign. For REST, MQTT, or WebSocket, also check the path or topic and authentication. Enable automation only after readings and trends agree with the actual meter.

## A miner cannot connect to the pool

Check proxy status, the configured coin, pool address, worker, and loaded fee route. Core uses `host.docker.internal:8090` for the proxy API by default; the proxy uses host networking in the Compose example. The PC Agent's Mining console shows startup and connection errors. An outdated direct-pool configuration or unreachable external proxy may block startup. If the proxy is healthy, compare accepted shares and credits in the **pool account**.

## The PC Agent cannot find a GPU

The base Linux container Compose file does not pass through a GPU. NVIDIA requires the Toolkit and GPU overlay; AMD requires a suitable OpenCL stack and AMD overlay. Intel GPUs are not enabled for PearlHash through the current SRBMiner path. Check drivers and device listings on the host and in the container, then inspect the Agent console. Verify hardware-specific power limits on the actual device.

## Portal and pool figures differ

Compare the same coin, pool worker, and time period. Hashrate and forecasts are not pool credits; a pool balance and wallet holdings are different figures. Report a specific period and worker without sending tokens or private keys. See [terms and fees](./6-mining-fees.md).
