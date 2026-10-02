---
id: pc-agent
title: Install the PC Agent
sidebar_position: 6
slug: /pc-agent
description: Run CPU and GPU mining on Windows or Linux with the local PC Agent.
---

# Install the PC Agent

The PC Agent has its own local interface on port `8084`. It can run on its own or be controlled by a SolarMiner Node. It includes an embedded Stratum proxy; you can choose an external proxy on the LAN in the interface instead. On first start it may search for an external proxy and fall back to the embedded one. **Starting the Agent does not download or start a miner.**

## Windows

Download `start-agent.bat` from the [latest PC Agent release](https://github.com/Solarminer-app/Solar-Miner-Node/releases/latest) and run it. When needed, the launcher downloads the Agent and a private Java 21 runtime, checks the supplied SHA-256 values, and stores the files under `%LOCALAPPDATA%\SolarMiner\PC-Agent`. It requires internet access and Windows PowerShell 5.1. Then open `http://127.0.0.1:8084/`.

If a release does not yet include the Windows launcher, follow the [standalone guide in the source repository](https://github.com/Solarminer-app/Solar-Miner-Node/blob/main/pc-agent/standalone/README.md). It also explains how to run the JAR with an existing Java 21 installation.

## Linux Docker

The image targets Linux `amd64`. Download the [base Compose file](/examples/pc-agent.compose.yml) and start it in its own directory with persistent `./data`:

```sh
mkdir -p solarminer-pc-agent
cd solarminer-pc-agent
curl -fL https://docs.solarminer.app/examples/pc-agent.compose.yml -o compose.yml
docker compose config --quiet
docker compose up -d
docker compose ps
```

Open `http://<AGENT-HOST-IP>:8084/` on your LAN. The example publishes `8091/udp` for local proxy discovery. For NVIDIA GPUs, use the [NVIDIA overlay](/examples/pc-agent.nvidia.compose.yml), which requires a working NVIDIA Container Toolkit on the host:

```sh
curl -fL https://docs.solarminer.app/examples/pc-agent.nvidia.compose.yml -o nvidia.yml
docker compose -f compose.yml -f nvidia.yml up -d
```

For AMD GPUs, you need a suitable AMDGPU/ROCm OpenCL stack and the [AMD overlay in the Node repository](https://github.com/Solarminer-app/Solar-Miner-Node/blob/main/pc-agent/docker-compose.pc-agent.amd.yml). The Intel overlay currently supports device discovery only, not Pearl mining. For XMRig/RandomX, the [Linux Docker guide](https://github.com/Solarminer-app/Solar-Miner-Node/blob/main/pc-agent/standalone/DOCKER.md) explains optional Huge Page preparation. Reserve host RAM for this only when you intend to use it.

## Set up mining

1. Open `Mining`. Choose Monero/CPU or Pearl/GPU and explicitly click **Herunterladen & installieren** (download and install). Only then does the Agent fetch XMRig or SRBMiner-MULTI.
2. Enter the pool, payout address or account, and worker. Review the displayed proxy and fee route. SolarMiner's default payout target is a separate choice that requires confirmation: choosing it sends the entire payout to the displayed destination.
3. For the GPU path, select only recognized, suitable devices. Start the desired miner and watch its console and pool status.
4. Check accepted shares in the pool account. The local revenue forecast is an estimate before pool, miner, and SolarMiner fee deductions.

Monero and Pearl can run as separate processes at the same time. The operator has approved Pearl for production, but individual GPU, driver, and OS combinations still require device testing. SRBMiner charges its own additional fee for PearlHash. To connect the Agent to a Node, enable **Node-Steuerung** (Node control) locally under `Hardware`. Individual CPU or GPU workers can be excluded from external control there. Do not expose the local Agent interface to the public internet.

The Compose variant supplied for this documentation with `latest-beta` and `gpus: all` can be used for testing. The downloadable base file here follows the current stable repository Compose; use the NVIDIA overlay only on a host with working GPU passthrough.
