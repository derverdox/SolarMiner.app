---
id: requirements
title: Requirements & Compatibility
sidebar_label: 2. Requirements
sidebar_position: 2
description: Find out what hardware and software you need for the Solar Miner App. Learn how to flash Braiins OS and configure the Braiins Pool for 0% fees.
keywords: [Braiins OS install, flash Braiins OS Antminer, Braiins Pool setup, Stratum URL, Bitcoin Mining Solar, ASIC auto tuning]
---

# Requirements & Compatibility

To ensure the Solar Miner App runs flawlessly and scales your hashrate with zero latency, we have optimized the software for specific, industry-standard hardware and protocols. 

Here is what you need to get started:

## 1. Mining Hardware & OS
The Solar Miner App relies on advanced API controls to tune ASIC frequencies and voltages on the fly. Therefore, standard factory firmware is not supported.

* **Supported Firmware:** **Braiins OS / Braiins OS+** (Mandatory)
* **Supported ASICs:** Any Bitcoin ASIC model officially supported by Braiins OS (e.g., Antminer S19 series, S21 series, etc.).

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

---

## 5. How to Flash Braiins OS (Step-by-Step)
If your ASIC is still running the factory firmware (e.g., Bitmain stock firmware), you need to upgrade it to Braiins OS. The easiest way to do this over your local network is by using the official **Braiins Toolbox**.

### Flashing via Braiins Toolbox
1. **Download the Toolbox:** Visit the official [Braiins website](https://braiins.com/os/plus/download) and download the **Braiins Toolbox** for your operating system (Windows or Linux).
2. **Find Your ASICs:** Open the Toolbox and enter the IP address range of your local network (e.g., `192.168.1.1-255`). Click **Scan** to locate your miners.
3. **Select Devices:** Check the boxes next to the ASICs you want to upgrade.
4. **Install Braiins OS:** Click on the **Install** button. The Toolbox will automatically deploy the Braiins OS firmware to your control board and reboot the miner. This process usually takes 2 to 5 minutes.

:::tip SD Card Fallback Method
If your ASIC has locked control boards (common on newer Antminer S19 models) and the network installation fails, you will need to flash the firmware using an SD card. Download the specific SD card image for your control board from the Braiins website, flash it onto an SD card using a tool like *BalenaEtcher*, insert it into the miner, and power it on.
:::

---

## 6. Configuring the Braiins Pool
Once Braiins OS is installed, you need to point your hash rate to the Braiins Pool to activate the **0% pool fee** benefit.

### Step 1: Create a Braiins Pool Account
If you don't have one yet, go to [pool.braiins.com](https://pool.braiins.com) and create a free account. Note your **Username**, as you will need it for the worker configuration.

### Step 2: Access the Miner Web Interface
1. Open your web browser and enter the local IP address of your ASIC.
2. Log in to the Braiins OS dashboard. (The default credentials are usually `root` / `root`).

### Step 3: Enter the Stratum URLs
Navigate to **Configuration > Pools** in the Braiins OS menu. Replace the default pools with the official Braiins Pool Stratum servers. Choose the server closest to your geographical location for the lowest latency:

* **Europe:** `stratum+tcp://eu.stratum.braiins.com:3333`
* **North America:** `stratum+tcp://na.stratum.braiins.com:3333`
* **Russia:** `stratum+tcp://ru.stratum.braiins.com:3333`
* **China:** `stratum+tcp://cn.stratum.braiins.com:3333`

### Step 4: Configure Your Worker
In the **User** field, enter your Braiins Pool username followed by a period and a worker name of your choice (e.g., `YourUsername.Miner01`). The **Password** field can usually be left blank or filled with an `x`.

Click **Save & Apply**. Your ASIC will now restart the mining process, connect to the Braiins Pool, and you are officially ready to integrate the **Solar Miner App**!
