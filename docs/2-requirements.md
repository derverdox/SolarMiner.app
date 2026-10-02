---
id: requirements
title: Voraussetzungen und Kompatibilität
sidebar_position: 2
slug: /requirements
description: Voraussetzungen für Node, ASICs, PV-Geräte und den PC-Agent.
---

# Voraussetzungen und Kompatibilität

## Node auf einem eigenen Rechner

- Linux-Host mit Docker Engine und Docker Compose Plugin. Das mitgelieferte Compose-Beispiel enthält mehrere Java-Dienste, zwei MariaDB-Instanzen, InfluxDB und Phoenixd. Plane genügend RAM und SSD-Speicher ein und beobachte die tatsächliche Auslastung; eine für alle Anlagen verlässliche Mindestgröße ist nicht nachgewiesen.
- Der Host muss die PV-Geräte und Miner im lokalen Netz erreichen. `8080/tcp` ist die Standardoberfläche der Node. `8082/tcp` ist Core, `3333/tcp` Stratum und `8090/tcp` die Proxy-API. Diese lokalen Steuerports gehören in ein vertrauenswürdiges Netz.
- Für die Gebührenziele braucht der Proxy Zugriff auf `fee.solarminer.app`. Weitere Internetverbindungen hängen von aktivierten Funktionen ab, etwa Kursen, Community-Profilen, Lightning und freiwilliger Telemetrie.

## Mining-Hardware

| Gerät | Aktueller Steuerweg | Grenze |
| --- | --- | --- |
| Braiins OS ASIC | Native Braiins-API über Core | Unterstützte Modelle und Firmware-Versionen am Gerät prüfen; eine pauschale Zusage für alle ASICs gibt es nicht. |
| Bestimmte Antminer mit Stock-Firmware | CGMiner/CGI über Core, Stratum über Proxy | Leistungssteuerung und Rückmeldungen unterscheiden sich nach Modell/Firmware; vor Ort testen. |
| CPU mit PC-Agent | XMRig / Monero (RandomX) | Miner muss in der lokalen Agent-Oberfläche ausdrücklich installiert und konfiguriert werden. |
| AMD- oder NVIDIA-GPU mit PC-Agent | SRBMiner-MULTI / Pearl (PearlHash) | Passender Treiber und nutzbarer GPU-Zugriff nötig; Intel-GPU ist für diesen Pfad derzeit nicht freigegeben. |

Ein erfolgreicher Start eines Containers beweist weder eine wirksame Leistungsregelung noch akzeptierte Pool-Shares. Kontrolliere beides am realen Miner und im Pool.

## PV-Daten

Die Node kann PV-Profile für Modbus TCP, Modbus RTU, REST, MQTT und WebSocket verwalten. Ein vorhandenes Profil ist nur ein Ausgangspunkt: Register, Einheiten, Vorzeichen und Geräteerreichbarkeit müssen zur eigenen Anlage passen. Für Modbus RTU ist zusätzlicher serieller Hostzugriff nötig. [PV-Anbindung einrichten](./3-pv-connection.md).

## PC-Agent ohne Node

Für den Standalone-Agent gibt es einen Windows-Launcher mit privatem Java-21-Runtime-Download sowie ein Linux-`amd64`-Docker-Image. GPU-Mining im Linux-Container braucht die [passende Host- und Compose-Konfiguration](./5-pc-agent.md). Die Oberfläche auf `8084/tcp` sollte nur lokal bzw. im vertrauenswürdigen LAN erreichbar sein.
