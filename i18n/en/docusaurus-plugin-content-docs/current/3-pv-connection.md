---
id: pv-connection
title: Connect your PV system
sidebar_position: 4
slug: /pv-connection
description: Select a PV profile, verify measurements, and import your own Modbus or REST profiles.
---

# Connect your PV system

The Node needs dependable measurements before it can regulate a miner according to PV surplus. Where possible, use readings from the meter at the grid connection point, along with generation and, if applicable, battery state of charge (SoC). Check units and signs in a known situation: grid export in sunshine and grid import under high household load.

## Choose and test a profile

1. Open the Node setup or the PV section under `Configuration → PV`.
2. Search the local or community catalog for your device and select the appropriate protocol. The interface offers REST, Modbus TCP, Modbus RTU, MQTT, and WebSocket.
3. Enter the local device address and any required credentials. The Node must reach the target from its container network; `localhost` would refer to the container itself.
4. Use preview or live test. Check every value used by a rule for plausible readings, correct units, and the right sign. A successful connection by itself does not validate the measurements.
5. Save the profile and observe the live values over time before enabling an automation rule.

## Create your own profile

The profile interface can import and export JSON profiles. For REST, map each measurement to an endpoint path, HTTP method, value path in the response, data type, scale factor, and, if needed, a formula. For Modbus, the start address, register count, operation, and byte order matter. You need the manufacturer's register list; devices with the same model name may use different registers across firmware versions.

The [SolarMiner Configurator](https://github.com/derverdox/solarminer-configurator) helps create and live-test custom profiles. Import its export into the Node and test again there: Configurator and Node share the serialization format, but may differ in runtime environment and network access.

For serial Modbus RTU devices, pass the host device into the Node container. The [RTU Docker guide](https://github.com/Solarminer-app/Solar-Miner-Node/blob/main/docs/MODBUS_RTU_DOCKER.md) describes the extra steps. For MQTT and WebSocket, the broker or endpoint, topic, and message format must match the selected template.

:::warning Verify readings before automation
An incorrectly scaled grid reading or reversed import/export sign can start miners while you are buying electricity from the grid. Test during changing generation and household load before enabling [automation rules](./4-automation-rules.md).
:::
