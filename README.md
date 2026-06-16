# ☀️ Solar Miner App

> **Stop selling cheap electricity. Start mining smarter.**  
> Automate your Bitcoin ASICs to perfectly match your solar surplus.

[![Website](https://img.shields.io/badge/Website-solarminer.app-00FFA3?style=flat-square)](https://solarminer.app)
[![Docs](https://img.shields.io/badge/Docs-Read_Here-F7931A?style=flat-square)](https://docs.solarminer.app)
[![License](https://img.shields.io/badge/License-Proprietary-blue?style=flat-square)](https://solarminer.app/terms)

The **Solar Miner App** is a local-first automation tool that dynamically scales your ASIC's power consumption based on real-time solar production. Instead of shutting down your miners when a cloud passes by, our app dials down the hashrate, keeping your machines online and profitable for significantly longer.

---

## ⚡ The Uptime Advantage

Traditional smart-home setups rely on simple "On/Off" relay switches. If your solar production drops below your ASIC's minimum threshold, the miner shuts down completely. **You mine zero Bitcoin.**

**With Solar Miner:** We communicate directly with your ASIC's control board. As solar production drops, we dynamically lower the frequency and voltage. Your miner stays online, generating Bitcoin continuously throughout the day, drastically improving your ROI.

## ✨ Key Features

*   **🧠 Braiins OS Native:** Built from the ground up for Braiins OS. We utilize native APIs for zero-latency power tuning.
*   **🔌 Universal Inverter Support:** Fetch live PV data via **Home Assistant**, **REST API**, or directly map your own **Modbus TCP** registers (supports Fronius, SMA, Victron, Huawei, and more).
*   **🔒 100% Local-First:** No cloud accounts required. The software runs entirely on your local network. Your telemetry and miner access never leave your house.
*   **📈 Built-In Amortization:** Track your exact break-even points, historical profits, and real-time efficiency metrics in a beautiful, local dashboard.

---

## 💰 Pricing & The 0% Pool Fee Synergy

We believe in a "Zero Upfront Costs" model. There are no monthly subscriptions and no credit cards required.

**The Dev Fee:** Solar Miner takes a transparent **2.5% developer fee** (directed hashrate). We only succeed when your hardware is actually running and generating Bitcoin. If the sun isn't shining, you pay absolutely nothing.

**🔥 Pro Tip: Mine for 0% Pool Fees!**
Because Solar Miner natively supports Braiins OS, you can point your hashrate to the **Braiins Pool** to take advantage of their 0% pool fee offer. The pool fee you save essentially pays for our automation tool!

---

## 🚀 Quick Start

Getting started takes less than 10 minutes. You will need:
1. An ASIC running **Braiins OS+**
2. A way to read your solar surplus (e.g., Home Assistant, or a Modbus TCP enabled Inverter/Smart Meter)
3. A local x86 machine that runs docker to run the Solar Miner App.

### 📖 Read the Documentation
For detailed installation instructions, API documentation, and Modbus configuration guides, please visit our official documentation:

👉 **[docs.solarminer.app](https://docs.solarminer.app)**

---

## 💬 Support & Community

*   **Documentation:** [docs.solarminer.app](https://docs.solarminer.app)
*   **Website:** [solarminer.app](https://solarminer.app)
*   **Bug Reports:** Please use the [GitHub Issues](https://github.com/derverdox/SolarMiner.app/issues) tab in this repository.

***

*Built for Miners. Local First. Non-Custodial. Bitcoin Native.*
