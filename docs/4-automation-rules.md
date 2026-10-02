---
id: automation-rules
title: Automation rules
sidebar_position: 5
slug: /automation-rules
description: Configure cluster modes, power targets, and simulations with care.
---

# Automation rules

The Node configures a mining cluster through **operating modes**. Each mode has start and stop conditions, actions, and lock times for running, idling, and power changes. Mode order matters: the first matching mode is selected. The supplied default places a battery protection mode ahead of surplus tracking.

## Configure rules in the interface

1. Open the PV site → `Mining` → your cluster → `Configuration`.
2. For each start and stop condition, choose a measurement, comparison, threshold, and, if appropriate, a time window using `LIVE` or an aggregation such as `MEDIAN`.
3. Choose an action: pause, resume, or set a power target. A dynamic target converts a measurement into watts using a multiplier and offset. For a value in kW, a multiplier of `1000` produces watts; a lower multiplier leaves some headroom.
4. Set minimum run time, minimum idle time, and a lock time for power changes. These settings reduce frequent switching; they do not replace device protection or a suitable power meter.
5. Use the built-in simulation with presets or historical data, save the rules, and then watch real operation at the meter and miner.

The default configuration uses `POTENTIAL_PV_SURPLUS` and battery SoC. It enters surplus tracking only with positive surplus smoothed over 30 minutes and a high SoC; below 90% SoC, the higher-priority stop mode takes effect. These defaults are a starting point, not a recommendation for every site. Find the exact values in the cluster configuration and [source code](https://github.com/Solarminer-app/Solar-Miner-Node/blob/main/src/main/java/de/verdox/pv_miner/miningcontroller/dsl/DefaultCluster.java).

`POTENTIAL_PV_SURPLUS` accounts for current miner consumption so that starting a miner does not immediately cancel its own start condition. Even so, check at the grid connection point whether the rule handles export, import, and the battery as intended. Only devices with a suitable control path can reliably apply a power target; other devices may only support start and stop. See [compatibility](./2-requirements.md) and [troubleshooting](./9-troubleshooting.md).
