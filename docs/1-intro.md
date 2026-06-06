---
id: intro
title: Introduction
sidebar_label: 1. Introduction
sidebar_position: 1
---

# Welcome to Solar Miner

**Stop wasting solar energy. Start mining smarter.**

Welcome to the official documentation for the **Solar Miner App**. This software is a local-first automation tool designed to bridge the gap between your photovoltaic (PV) system and your Bitcoin mining hardware. 

By dynamically adjusting your ASIC's power consumption to match your real-time solar surplus, we help you maximize your mining uptime, increase your Bitcoin yield, and eliminate the need to sell your energy back to the grid for pennies (or even zero tariffs).

## The Uptime Advantage

Traditional smart-home setups rely on simple "On/Off" relay switches. If your solar production drops below your ASIC's minimum threshold (e.g., when a cloud passes by), the miner is shut down completely. **You mine zero Bitcoin during this time.**

The Solar Miner App takes a smarter approach:
* **Dynamic Scaling:** We communicate directly with your ASIC's control board via Braiins OS. As solar production drops, we dynamically lower the frequency and voltage. 
* **Continuous Operation:** Your miner stays online, running efficiently at a lower hashrate, generating Bitcoin continuously throughout the day.
* **Instant Adjustments:** The app polls your solar data constantly and adjusts the miner's power limit in real-time.

## Local First & Secure

We believe in sovereignty. The Solar Miner App runs entirely on your local network. It talks directly to your solar inverters and your ASICs. 
* No cloud accounts required.
* No mandatory internet dependency for internal telemetry.
* Your hardware credentials never leave your home network.

:::tip The 0% Pool Fee Synergy
We utilize a transparent 2.5% Developer Fee model to keep the software free of upfront costs. Because our tool integrates natively with **Braiins OS**, you can mine on the **Braiins Pool** to enjoy their **0% pool fee** offer. This effectively pays for our automation tool!
:::

Let's move on to the next section to ensure you have the right setup.
