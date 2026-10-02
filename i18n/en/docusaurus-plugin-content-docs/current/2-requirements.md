---
id: requirements
title: Requirements and compatibility
sidebar_position: 2
slug: /requirements
description: Requirements for the Node, ASICs, PV devices, and PC Agent.
---

# Requirements and compatibility

## Node on your own computer

- A Linux host with Docker Engine and the Docker Compose plugin. The supplied Compose example contains several Java services, two MariaDB instances, InfluxDB, and Phoenixd. Plan for sufficient RAM and SSD space and monitor actual usage; no reliable minimum size has been established for every installation.
- The host must reach the PV devices and miners on the local network. `8080/tcp` is the Node's default web interface, `8082/tcp` is Core, `3333/tcp` is Stratum, and `8090/tcp` is the proxy API. Keep these local control ports on a trusted network.
- The proxy needs access to `fee.solarminer.app` to obtain fee targets. Other internet connections depend on enabled features, such as exchange rates, community profiles, Lightning, and optional telemetry.

## Mining hardware

| Device | Current control path | Limitation |
| --- | --- | --- |
| Braiins OS ASIC | Native Braiins API through Core | Check model and firmware support on the device; support is not guaranteed for every ASIC. |
| Certain Antminers with stock firmware | CGMiner/CGI through Core, Stratum through the proxy | Power control and feedback vary by model and firmware; test on the actual device. |
| CPU with PC Agent | XMRig / Monero (RandomX) | Install and configure the miner explicitly in the local Agent interface. |
| AMD or NVIDIA GPU with PC Agent | SRBMiner-MULTI / Pearl (PearlHash) | Requires a suitable driver and usable GPU access; Intel GPUs are not enabled for this path. |

A container starting successfully proves neither effective power control nor accepted pool shares. Verify both on the real miner and at the pool.

## PV data

The Node can manage PV profiles for Modbus TCP, Modbus RTU, REST, MQTT, and WebSocket. An existing profile is only a starting point: registers, units, signs, and device connectivity must match your installation. Modbus RTU also requires access to the host's serial device. [Set up the PV connection](./3-pv-connection.md).

## PC Agent without a Node

The standalone Agent has a Windows launcher that downloads a private Java 21 runtime and a Linux `amd64` Docker image. GPU mining in the Linux container needs the [appropriate host and Compose configuration](./5-pc-agent.md). The interface on `8084/tcp` should only be reachable locally or from a trusted LAN.
