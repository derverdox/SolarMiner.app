---
title: Local operation and data sharing
sidebar_position: 9
slug: /data-privacy
description: Which connections SolarMiner uses and which telemetry sharing is optional.
---

# Local operation and data sharing

The Node stores site configuration, operational data, and wallet data locally in persistent volumes. ASIC control, the PC Agent, and the proxy operate on the LAN. The local Node and proxy APIs are designed for a trusted LAN; they are not hardened public web services. Limit access with network segmentation and a firewall.

| Connection | Purpose | Operator choice |
| --- | --- | --- |
| Stratum proxy → central fee backend | Fetch fee targets for the selected coin | Required for the intended fee path; without a valid route, the PC Agent may refuse to start a miner. |
| Miner/proxy → selected pool | Jobs, shares, and pool accounting | The operator configures the pool. |
| Node → central services | Lightning tunnel, referral-code catalog and assignment, and, where applicable, profiles and other data | Depends on enabled features; code assignment is reported independently of the telemetry opt-in. |
| Node → portal telemetry | Operational and benchmark data with a stable, random Node ID and a coarse, selected location grid | Site telemetry requires explicit consent. |
| Standalone PC Agent → benchmark service | Device performance values | Separate consent, off by default; does not require a Node. |

When site telemetry is turned off, the Node sends a minimal revocation message without measurements. The standalone PC Agent has a separate **Anonyme Leistungswerte teilen** (share anonymous performance data) control on the Benchmarks page. Public benchmark groups can currently appear with just **one** sample; in a single-device group, that device's performance values may be recognizable. Enable sharing only if you are comfortable with that.

The portal endpoints for Node assignment and telemetry currently use a Node UUID in the request without additional per-Node proof of possession. This technical limitation matters when handling central data. Keep credentials for local miners, pool APIs, and Phoenixd locally or in the designated portal form, and do not publish them in screenshots or support logs.
