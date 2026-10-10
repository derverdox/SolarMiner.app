---
id: pc-agent
title: Install the PC Agent
sidebar_position: 6
slug: /pc-agent
description: Run CPU and GPU mining on Windows or Linux with the local PC Agent.
---

# Install the PC Agent

The PC Agent has its own local interface on port `8084`. It can run on its own or be controlled by a SolarMiner Node. It includes an embedded Stratum proxy; you can choose an external proxy on the LAN in the interface instead. On first start it may search for an external proxy and fall back to the embedded one. **Starting the Agent does not download or start a miner.**

Choose **Stable** for the tested regular release. Choose **Beta** only when you intentionally want the newest prerelease features. Stable installers come from the latest stable GitHub release; beta bootstrap scripts come from the repository's `beta` branch and automatically resolve the newest `pc-agent-beta-*` prerelease. Stable and beta use separate local data directories and Docker image tags.

## Windows

Download `start-agent.bat` from the [latest PC Agent release](https://github.com/Solarminer-app/pc-agent/releases/latest) and run it. When needed, the launcher downloads the Agent and a private Java 21 runtime, checks the supplied SHA-256 values, and stores the files under `%LOCALAPPDATA%\SolarMiner\PC-Agent`. It requires internet access and Windows PowerShell 5.1. Then open `http://127.0.0.1:8084/`.

If a release does not yet include the Windows launcher, follow the [standalone guide in the source repository](https://github.com/Solarminer-app/pc-agent/blob/main/standalone/README.md). It also explains how to run the JAR with an existing Java 21 installation.

You can also download and run the bootstrap directly from PowerShell. It fetches the release launcher, which then installs the private Java runtime and Agent:

```powershell
$p = "$env:TEMP\solarminer-install.ps1"
Invoke-WebRequest https://github.com/Solarminer-app/pc-agent/releases/latest/download/install-windows.ps1 -OutFile $p
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $p
```

For the newest beta, download the bootstrap from the beta branch and select the beta channel:

```powershell
$p = "$env:TEMP\solarminer-install.ps1"
Invoke-WebRequest https://raw.githubusercontent.com/Solarminer-app/pc-agent/beta/standalone/install-windows.ps1 -OutFile $p
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $p -Channel beta
```

Windows Smart App Control may block unsigned launchers. Do not weaken a managed security policy without understanding the impact.

## Native Linux

The native Linux bootstrap installs missing base tools through a supported package manager, downloads a private x64 Java 21 runtime from Adoptium, verifies its published SHA-256 checksum, then verifies and starts the latest stable PC Agent. `curl` is the only command needed to fetch the bootstrap itself:

```sh
curl -fL https://github.com/Solarminer-app/pc-agent/releases/latest/download/install-linux.sh -o install-linux.sh
sh install-linux.sh
```

Beta:

```sh
curl -fL https://raw.githubusercontent.com/Solarminer-app/pc-agent/beta/standalone/install-linux.sh -o install-linux.sh
sh install-linux.sh --channel beta
```

## Linux Docker

The image targets Linux `amd64`. The bootstrap installs Docker and Compose through a supported system package manager when they are missing, downloads the release-owned Compose files, validates them, and starts the Agent with persistent data:

```sh
curl -fL https://github.com/Solarminer-app/pc-agent/releases/latest/download/install-docker.sh -o install-docker.sh
sh install-docker.sh --gpu none
```

For a beta container, download the bootstrap from the beta branch and add `--channel beta`; it selects the newest beta release assets and `latest-beta` image:

```sh
curl -fL https://raw.githubusercontent.com/Solarminer-app/pc-agent/beta/standalone/install-docker.sh -o install-docker.sh
sh install-docker.sh --channel beta --gpu none
```

Open `http://<AGENT-HOST-IP>:8084/` on your LAN. The example publishes `8092/udp` for external proxy heartbeat discovery. For NVIDIA GPUs, use the [NVIDIA overlay](/examples/pc-agent.nvidia.compose.yml), which requires a working NVIDIA Container Toolkit on the host:

```sh
sh install-docker.sh --gpu nvidia
```

Keep `--channel beta` in that command when you selected Beta.

For AMD GPUs, you need a suitable AMDGPU/ROCm OpenCL stack and the [AMD overlay](/examples/pc-agent.amd.compose.yml):

```sh
sh install-docker.sh --gpu amd
```

Keep `--channel beta` in that command when you selected Beta.

The bootstrap deliberately does not install or replace GPU or kernel drivers. NVIDIA therefore needs a working NVIDIA driver and NVIDIA Container Toolkit; AMD needs working `/dev/kfd` and `/dev/dri` devices from its AMDGPU/ROCm host stack. The Intel overlay currently supports device discovery only, not Pearl mining. For XMRig/RandomX, the [Linux Docker guide](https://github.com/Solarminer-app/pc-agent/blob/main/standalone/DOCKER.md) explains optional Huge Page preparation. Reserve host RAM for this only when you intend to use it.

## Set up mining

1. Open `Mining`. Choose Monero/CPU or Pearl/GPU and explicitly click **Herunterladen & installieren** (download and install). Only then does the Agent fetch XMRig or SRBMiner-MULTI.
2. Enter the pool, payout address or account, and worker. Review the displayed proxy and fee route. SolarMiner's default payout target is a separate choice that requires confirmation: choosing it sends the entire payout to the displayed destination.
3. For the GPU path, select only recognized, suitable devices. Start the desired miner and watch its console and pool status.
4. Check accepted shares in the pool account. The local revenue forecast is an estimate before pool, miner, and SolarMiner fee deductions.

Monero and Pearl can run as separate processes at the same time. The operator has approved Pearl for production, but individual GPU, driver, and OS combinations still require device testing. SRBMiner charges its own additional fee for PearlHash. To connect the Agent to a Node, enable **Node-Steuerung** (Node control) locally under `Hardware`. Individual CPU or GPU workers can be excluded from external control there. Do not expose the local Agent interface to the public internet.

The downloadable base and GPU overlay files mirror the current stable PC Agent repository. Use a GPU overlay only on a host with working GPU passthrough.
