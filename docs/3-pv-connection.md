---
id: pv-connection
title: Connect Your PV System for Solar Mining
sidebar_label: 3. Connect PV System
sidebar_position: 3
description: Learn how to connect your solar inverter or smart meter to your Bitcoin miner. Detailed guide on Modbus TCP and REST API (Home Assistant) configurations for automated solar mining.
keywords: [connect PV to bitcoin miner, solar mining modbus TCP, home assistant bitcoin mining REST API, ASIC solar tuning, read inverter data, solar surplus bitcoin]
---

# Connect Your PV System for Solar Mining

To achieve true **solar mining**, your ASIC needs to know exactly how much excess energy your photovoltaic (PV) system is producing in real-time. The Solar Miner App acts as the brain between your inverter/smart meter and your mining hardware.

We support the two most robust methods for reading live telemetry data: **Modbus TCP** (direct inverter connection) and **REST API** (perfect for Smart Home hubs like Home Assistant).

Below is the detailed guide on how to create configuration files mapping your specific hardware registers and endpoints to our application.

---

## 🧮 The Power of the Formula Engine

Before diving into the protocols, it is important to understand our built-in **Formula Engine**. Different inverter brands output data differently. Some output Watts, some output Kilowatts. Some provide a direct "Grid Surplus" value, while others only provide "Total Production" and "House Consumption".

In both the Modbus and REST configurations, you will find a **Scale (Faktor)** and a **Formula (Formel)** column. 

* **Scale:** The raw value read from your device is multiplied by this factor first. (e.g., If your inverter outputs `4500` for 4.5kW, a scale of `1.0` keeps it as `4500` Watts).
* **Formula (`x`):** The letter `x` represents the scaled value. You can use standard math operations (e.g., `x / 1000`).
* **Cross-Referencing (`$variable`):** You can calculate values based on other read fields! For example, if you need to calculate grid export manually, your formula could be: `$pv_production - $house_consumption`.

---

## Method 1: Modbus TCP Configuration

Modbus TCP is the industrial standard for smart meters and inverters (like Fronius, SMA, SolarEdge, and Victron). It is incredibly fast, operates entirely over your local network (LAN), and requires no cloud connection.

### Step 1: Create a Modbus Config
1. Open the **Modbus-PV Configurator** (`config/pv/modbus/tcp`) in the app.
2. In the left sidebar, select a template (e.g., `PV_SITE`).
3. Enter a name for your configuration (e.g., "Fronius_Symo") and click the **+** button.

### Step 2: Test the Connection
Before mapping registers, ensure the app can talk to your inverter.
1. Open the **Live-Test Modbus Connection** panel.
2. Enter the **IP Address** of your inverter.
3. Enter the **Port** (default is usually `502`) and the **Slave ID** (often `1`).
4. Click **Test Connection**. A green checkmark confirms a successful local link.

### Step 3: Map Your Registers
Consult the Modbus register manual of your specific inverter brand. Fill out the table rows for the required telemetry fields (like Grid Power, PV Power, Battery Status):

* **Register (Address):** The starting address (e.g., `40083` for SunSpec standard power).
* **Size (Länge):** How many registers to read (usually `1` or `2`).
* **Type:** Select the correct data type (e.g., `INT16`, `UINT32`, `FLOAT32`).
* **Operation:** Choose the Modbus function code (usually `READ_HOLDING_REGISTER` or `READ_INPUT_REGISTER`).
* **Byte Order:** `BIG_ENDIAN` or `LITTLE_ENDIAN` depending on your inverter manufacturer.

:::tip Real-Time Validation
As soon as you enter the correct register and scale, the **Live-Value** column at the end of the row will instantly update every 2 seconds, showing you exactly what the app is reading. If the number looks wrong, adjust your Scale or Byte Order!
:::

---

## Method 2: REST API (Home Assistant)

If your solar setup is complex (e.g., multiple inverters from different brands) or you already use a smart home hub like **Home Assistant** or ioBroker, the REST API configuration is the most powerful choice. It allows you to pull aggregated data directly from your smart hub.

### Step 1: Create a REST Config
1. Open the **REST-PV Configurator** (`config/pv/rest`) in the app.
2. Select the `HOME_ASSISTANT_PV` template.
3. Enter a name (e.g., "HomeAssistant_Hub") and click the **+** button.

### Step 2: Test the Connection
1. Open the **Live-Test REST Connection** panel.
2. Enter your **Base URL** (e.g., `http://192.168.178.50:8123`).
3. Enter a **Long-Lived Access Token** (You can generate this inside your Home Assistant profile settings).
4. Click **Test Connection** to verify access.

### Step 3: Define Your Endpoints
For each required field, map the exact API path where the data is stored.

* **Method:** Usually `GET`.
* **URL Extension / Path:** The endpoint for the specific sensor. For Home Assistant, this looks like: `/api/states/sensor.grid_export_power`.
* **JSON Path:** Home Assistant wraps the actual number inside a JSON object. Enter `state` here so the app knows exactly where to extract the numerical value from the API response.
* **Type:** Select the data type (usually `FLOAT` or `DOUBLE` for REST APIs).

Once configured correctly, the **Live-Value** column will immediately start polling your Home Assistant server, confirming that the data is ready to be used by the mining controller.

---

## 🤝 Community Configurations (Discord)

Every inverter brand has its own unique Modbus registers and API structures. To make the setup process as plug-and-play as possible, we highly encourage sharing working setups!

:::info Join our Discord Server!
Did you successfully map the registers for a specific Huawei, Growatt, or Solax inverter? Or are you struggling to find the right Home Assistant JSON paths? 

**[Join the official Solar Miner Discord Server (Click Here)](https://discord.solarminer.app/)**

We have dedicated channels where users can **upload, download, and share their `.json` configuration files**. You can simply download a community-tested config, click the **Import** button in the app, and have your PV data flowing in seconds!
:::

---

## Next Steps

Once your PV data is successfully flowing into the application—either via Modbus or REST—you are ready to define your automation logic. 

Head over to the next section to learn how to set up the **Miner Controller Config**, where you define exactly when your ASICs should scale up, down, or shut off based on the live data you just connected!
