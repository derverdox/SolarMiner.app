---
title: Mining targets, fees, and payouts
sidebar_position: 7
slug: /mining-fees
description: Understand pools, workers, developer fees, wallets, and actual credits.
---

# Mining targets, fees, and payouts

## Your mining target

Under `Mining → Mining targets`, you can configure a pool, worker prefix, and, where applicable, a public payout address for each coin. The Node currently manages targets for Bitcoin, Monero, and Pearl. Core writes the configuration to eligible ASICs; Monero and Pearl configurations are sent separately to PC Agents. A saved target represents a **configuration**, not a running miner or an accepted share.

You can assign priorities to multiple targets. If a **configuration attempt** fails, the Node may try the next enabled target. This is not automatic pool failover while mining is already running. Check the connection status and pool accounting even after applying a target.

## Developer fee and referrals

SolarMiner directs a configured portion of mining work to fee targets. The effective split can vary by coin and valid referral code; the local Mining view shows the current allocation. The Stratum proxy fetches the target configuration from the central fee backend. Braiins OS uses a native pool split through Core; other supported paths use the proxy. The user's pool is not limited to Braiins as long as the device, protocol, and target are compatible.

A referral code can be selected or removed in the Node's `Mining` view. It changes the allocation of the developer fee under centrally configured terms. It is not an extra surcharge that a partner can set freely. Partners may apply for a share; the actual terms take effect only after portal configuration and approval. See the [partner portal](./7-partner-portal.md).

## What do the numbers mean?

| Display | Meaning |
| --- | --- |
| Hashrate and miner status | Device measurement or report; not yet a pool credit |
| Pool workers and accepted shares | Information from the relevant pool; the best way to check the mining path |
| Agent or dashboard estimate | Model based on hashrate, network data, and prices; actual payout can differ substantially |
| Pool balance | Funds held by the pool; not yet transferred to a wallet |
| Wallet balance | Funds at an address; not automatically mining income |
| Partner credit in the portal | Value derived from real pool data where an integration exists for that coin and account |

Bitcoin, Monero, and Pearl use different units and accounting paths. The Node's Lightning wallet is specific to Bitcoin. A public Monero address cannot be used to reliably query its on-chain balance. Pearl pool and address data are shown only if the selected provider or explorer supplies them. Missing data should appear as unavailable, not be treated as zero earnings.

:::note Verify fees
A percentage configured in the proxy does not prove an equivalent pool credit. After enough runtime, compare the user, SolarMiner house, and, if applicable, partner workers with accepted shares and the pool's accounting. See [troubleshooting](./9-troubleshooting.md) if the results differ.
:::
