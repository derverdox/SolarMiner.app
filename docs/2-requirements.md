---
id: requirements
title: Requirements & Compatibility
sidebar_label: 2. Requirements
sidebar_position: 2
---

# Requirements & Compatibility

To ensure the Solar Miner App runs flawlessly and scales your hashrate with zero latency, we have optimized the software for specific, industry-standard hardware and protocols. 

Here is what you need to get started:

## 1. Mining Hardware & OS
The Solar Miner App relies on advanced API controls to tune ASIC frequencies and voltages on the fly. Therefore, standard factory firmware is not supported.

* **Supported Firmware:** **Braiins OS / Braiins OS+** (Mandatory)
* **Supported ASICs:** Any Bitcoin ASIC model that is officially supported by Braiins OS (e.g., Antminer S19 series, S21 series, etc.).

:::warning Firmware Requirement
You must flash your ASICs with Braiins OS before using the Solar Miner App. The app uses the native Braiins API to execute the power-scaling commands.
:::

## 2. Mining Pools
To guarantee a stable connection and properly route our automation fee, the app currently supports a specific pool ecosystem.

* **Supported Pool:** **Braiins Pool** (Currently exclusive)

:::note Why Braiins Pool?
By restricting the initial release to the Braiins Pool, we ensure maximum stability. More importantly, mining with Braiins OS on the Braiins Pool grants you a **0% pool fee**. This massive saving perfectly offsets the 2.5% Dev Fee required by the Solar Miner App, resulting in a highly profitable setup for you.
:::

## 3. Solar & Grid Data (Inverters)
The app needs to know exactly how much excess solar power is available at any given second. We support the most robust and widely used local protocols to read data from your smart meter or inverter:

* **Modbus TCP:** The industrial standard. If your inverter or smart meter supports Modbus TCP over your local network (e.g., Fronius, SMA, SolarEdge, Victron), you can map the exact registers directly inside the app.
* **REST API:** For maximum flexibility. You can use simple HTTP GET requests to fetch live data. This is perfect if you route your solar data through smart home hubs like **Home Assistant**, ioBroker, or custom Node-RED setups.

## 4. Network & Hosting
* **Local Machine:** A device to keep the app running 24/7 (e.g., a Windows PC, Mac, Linux machine, Mini PC, or Raspberry Pi).
* **Local Network:** The machine running the app, your PV inverter/smart meter, and your ASICs must all be on the same local network (LAN) to communicate securely without cloud latency.
