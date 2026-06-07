---
id: pv-configuration
title: PV Array Setup & Forecasting
sidebar_label: 5.2 PV Array & Forecast
sidebar_position: 6
description: Configure your solar panel setup with azimuth and slope details. Get a precise 3-day forecast combining expected solar generation and estimated Bitcoin mining revenue.
keywords: [solar panel azimuth slope, pv production forecast, bitcoin mining revenue prediction, solar array configuration, kWp solar mining]
---

# PV Array Setup & Forecasting

To maximize your mining automation, the app needs to understand the physical characteristics of your solar array. The **PV Details** page allows you to input these specifications and unlocks powerful predictive analytics.

## 📐 Solar Array Configuration
You can define multiple groups of panels (e.g., East/West roofs) to accurately reflect your real-world setup[cite: 18]. For each group, you configure:
* **Latitude & Longitude:** For accurate sun tracking.
* **Amount of Panels & Power per Panel:** To calculate your total peak power (kWp).
* **Azimuth:** The compass direction your panels face.
* **Slope:** The tilt angle of your roof.

The dashboard instantly summarizes your global KPIs, displaying your total installed peak power, panel count, and array groups.

## 🔮 3-Day Solar & Mining Forecast
Based on your panel configuration, the Solar Miner App generates a localized **3-Day Forecast**. 
This dual-axis chart predicts your upcoming solar generation (in kW) and automatically converts the anticipated surplus into **projected Bitcoin mining revenue** in your local fiat currency.
