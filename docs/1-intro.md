---
id: intro
title: Understanding SolarMiner
sidebar_position: 1
slug: /
description: What SolarMiner controls locally and where users and partners should begin.
---

# Understanding SolarMiner

SolarMiner connects data from a photovoltaic (PV) system to mining hardware. The self-hosted **Node** displays PV sites, miners, mining targets, and financial data, and can control miners using rules. A separate **PC Agent** runs CPU and GPU miners on a computer. The **partner portal** manages referrals and shows partners the pool data assigned to them.

## Where should you start?

| Goal | Start here |
| --- | --- |
| Control a PV system and ASICs with a Node | [Requirements](./2-requirements.md) → [Install the Node](./0-setup.md) → [Connect your PV system](./3-pv-connection.md) |
| Mine Monero or Pearl on a PC | [Install the PC Agent](./5-pc-agent.md); a Node is not required for local standalone operation |
| Assign mining revenue to a pool or wallet | [Mining targets and fees](./6-mining-fees.md) |
| Recommend SolarMiner as a referrer | [Partner portal](./7-partner-portal.md) |

## How the components work together

```text
PV device / smart meter ──► Node ──► Core ──► ASIC or PC Agent
                            │                    │
                            └── local interface   │
                                                 ▼
                                  Stratum proxy ──► user pool
                                         └─────────► fee target
```

The Node, Core, databases, Phoenixd, and Stratum proxy run on the operator's infrastructure. The proxy requests fee targets from the central fee backend. The Node can connect to the central Lightning service and, when telemetry is enabled, to the portal. **Self-hosted** therefore does not mean that the entire installation works offline. The PC Agent can use its embedded proxy or an external one. [Learn about data flows and consent](./8-data-privacy.md).

SolarMiner directs a configured share of mining work to developer-fee targets. The amounts actually credited to a user or partner depend on accepted shares and the accounting of the relevant pool. A displayed hashrate or a configured target does not establish that a credit has been earned.

## Current capabilities

The Node supports Braiins OS, certain Antminers with stock firmware, and connected PC Agents through different control paths. Capabilities such as gradual power adjustment depend on the specific device, its firmware, and available measurements. The PC Agent offers Monero/RandomX for CPUs and Pearl/PearlHash for supported AMD and NVIDIA GPUs. These paths require the appropriate miner to be installed and a loaded fee route. Check [compatibility](./2-requirements.md) before use.

The Node source code is licensed under AGPLv3; the name and logo have additional trademark terms. See the [Node repository's terms](https://github.com/Solarminer-app/Solar-Miner-Node/blob/main/TRADEMARK.md) before modifying or distributing it.
