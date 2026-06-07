---
id: lightning-payouts
title: Automatic Lightning Payouts (WIP)
sidebar_label: 6. Lightning Payouts (WIP)
sidebar_position: 6
description: The future of solar mining payouts. Learn how the Solar Miner App is integrating local Lightning Nodes and BOLT12 addresses for instant, fee-less Bitcoin payouts from the Braiins Pool.
keywords: [Bitcoin Lightning Payout, Braiins Pool Lightning, BOLT12 Mining, Solar Miner Node, Instant ASIC Payouts, Lightning Network Mining]
---

# Automatic Lightning Payouts (Work in Progress)

The future of Bitcoin mining is instant, streaming, and fee-less. 

Currently, most mining pools require you to reach a high minimum payout threshold before they send your earnings via a standard on-chain Bitcoin transaction. This can take weeks for small-scale home miners and incurs high network fees.

To solve this, we are currently developing the ultimate payout solution: **Direct Lightning Network Integration.**

## ⚡ How It Works

We are building a bridge between your local PV Miner instance and our live backend infrastructure to host and manage Lightning Network routing for you.

1. **Local Lightning Node integration:** The Solar Miner App will interface directly with a lightning node setup.
2. **Static BOLT12 Addresses:** Through our backend, every user will be able to generate a static, reusable **BOLT12 Lightning Offer Address** (e.g., `pv_miner_node_94@phoenixwallet.me`).
3. **Plug & Play with Braiins:** You simply paste this BOLT12 address into your Braiins Pool payout settings.
4. **Streaming Money:** As your ASICs hash on solar energy, the Braiins Pool streams your earnings instantly and daily over the Lightning Network directly into your Solar Miner Wallet.

## 📊 The Lightning Dashboard

Once released, you will have access to a dedicated Lightning Wallet View inside the app, featuring:
* **Balance Overview:** Your current Lightning liquidity in Sats and your local fiat currency.
* **Instant Withdrawals:** Send your Sats instantly to any mobile Lightning wallet (like Phoenix, Muun, or Strike) or cold storage.
* **Transaction History:** A detailed ledger of every incoming micro-payout from your mining pool.
* **Channel Statistics:** Deep-dive metrics into your local and remote node liquidity for advanced users.

## ⏳ Release Status & Pricing

*Please note that this feature is currently heavily under development.* Managing Lightning channels, inbound liquidity, and routing fees requires constant active management on our backend. Therefore, once released, this feature will likely include a small, transparent service fee or a fixed-tier pricing model to maintain the node infrastructure. 

Stay tuned to our [Discord Community](#) for beta-testing announcements regarding the BOLT12 integration!
