---
id: pc-agent
title: PC-Agent installieren
sidebar_position: 6
slug: /pc-agent
description: CPU- und GPU-Mining auf Windows oder Linux mit lokalem PC-Agent.
---

# PC-Agent installieren

Der PC-Agent hat eine eigene lokale Oberfläche auf Port `8084`. Er kann allein laufen oder von einer SolarMiner Node gesteuert werden. Er enthält einen eingebauten Stratum-Proxy; in der Oberfläche lässt sich alternativ ein externer Proxy im LAN auswählen. Beim ersten Start kann er einen externen Proxy suchen und sonst den eingebauten verwenden. **Ein gestarteter Agent lädt und startet noch keinen Miner.**

## Windows

Lade `start-agent.bat` aus dem [aktuellen PC-Agent-Release](https://github.com/Solarminer-app/Solar-Miner-Node/releases/latest) und starte es. Der Launcher lädt bei Bedarf den Agent samt privater Java-21-Laufzeit, prüft die bereitgestellten SHA-256-Werte und speichert die Dateien unter `%LOCALAPPDATA%\SolarMiner\PC-Agent`. Er benötigt Internetzugang und Windows PowerShell 5.1. Öffne danach `http://127.0.0.1:8084/`.

Falls ein Release den Windows-Launcher noch nicht enthält, folge der [Standalone-Anleitung im Quellrepository](https://github.com/Solarminer-app/Solar-Miner-Node/blob/main/pc-agent/standalone/README.md); sie beschreibt auch den Start der JAR mit vorhandenem Java 21.

## Linux-Docker

Das Image ist für Linux `amd64`. Lade [Basis-Compose](/examples/pc-agent.compose.yml) und starte es im eigenen Verzeichnis mit persistentem `./data`:

```sh
mkdir -p solarminer-pc-agent
cd solarminer-pc-agent
curl -fL https://docs.solarminer.app/examples/pc-agent.compose.yml -o compose.yml
docker compose config --quiet
docker compose up -d
docker compose ps
```

Öffne `http://<IP-des-Agent-Hosts>:8084/` im LAN. Das Beispiel veröffentlicht `8091/udp` für die lokale Proxy-Suche. Für NVIDIA-GPUs ist das [NVIDIA-Overlay](/examples/pc-agent.nvidia.compose.yml) vorgesehen; es setzt ein funktionsfähiges NVIDIA Container Toolkit auf dem Host voraus:

```sh
curl -fL https://docs.solarminer.app/examples/pc-agent.nvidia.compose.yml -o nvidia.yml
docker compose -f compose.yml -f nvidia.yml up -d
```

Für AMD-GPUs brauchst du einen passenden AMDGPU/ROCm-OpenCL-Stack und das [AMD-Overlay aus dem Node-Repository](https://github.com/Solarminer-app/Solar-Miner-Node/blob/main/pc-agent/docker-compose.pc-agent.amd.yml). Das Intel-Overlay dient derzeit nur der Geräteerkennung, nicht Pearl-Mining. Für XMRig/RandomX beschreibt die [Linux-Docker-Anleitung](https://github.com/Solarminer-app/Solar-Miner-Node/blob/main/pc-agent/standalone/DOCKER.md) die optionale Vorbereitung von Huge Pages. Reserviere Host-RAM dafür nur bewusst.

## Mining einrichten

1. Öffne `Mining`. Wähle Monero/CPU oder Pearl/GPU und klicke ausdrücklich auf **Herunterladen & installieren**. Der Agent bezieht XMRig bzw. SRBMiner-MULTI erst dann.
2. Trage Pool, Auszahlungsadresse bzw. Konto und Worker ein. Prüfe die angezeigte Proxy- und Gebührenroute. Das SolarMiner-Standardauszahlungsziel ist eine eigene, bestätigungspflichtige Wahl: Dabei geht die gesamte Auszahlung an das angezeigte Ziel.
3. Wähle beim GPU-Pfad nur erkannte, passende Geräte aus. Starte den gewünschten Miner und beobachte dessen Konsole und Poolstatus.
4. Prüfe angenommene Shares im Poolkonto. Die lokale Ertragsprognose ist eine Schätzung vor Pool-, Miner- und Gebührenabzügen.

Monero und Pearl können als getrennte Prozesse gleichzeitig laufen. Pearl wurde vom Betreiber zur Produktion freigegeben; einzelne GPU-/Treiber-/OS-Kombinationen erfordern weiterhin Gerätetests. SRBMiner erhebt für PearlHash zusätzlich eine eigene Miner-Gebühr. Beim Verbinden mit einer Node muss **Node-Steuerung** lokal unter `Hardware` erlaubt werden; einzelne CPU-/GPU-Worker können dort von externer Steuerung ausgenommen werden. Die lokale Agent-Oberfläche gehört nicht ins öffentliche Internet.

Die vom Nutzer bereitgestellte Compose-Variante mit `latest-beta` und `gpus: all` kann zum Testen dienen. Die hier herunterladbare Basis folgt dem aktuellen stabilen Repository-Compose; verwende das NVIDIA-Overlay nur auf einem Host mit bereitgestelltem GPU-Zugriff.
