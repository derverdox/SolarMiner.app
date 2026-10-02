---
id: intro
title: SolarMiner verstehen
sidebar_position: 1
slug: /
description: Was SolarMiner lokal steuert und wo Nutzer und Partner beginnen.
---

# SolarMiner verstehen

SolarMiner verbindet Messwerte einer Photovoltaikanlage mit Mining-Hardware. Die selbst betriebene **Node** zeigt PV-Anlagen, Miner, Mining-Ziele und Finanzen an und kann Miner anhand von Regeln steuern. Ein eigener **PC-Agent** betreibt CPU- und GPU-Miner auf einem Rechner. Das **Partnerportal** verwaltet Referrals und zeigt dem jeweiligen Partner seine zugeordneten Pool-Daten.

## Welcher Einstieg passt zu dir?

| Ziel | Einstieg |
| --- | --- |
| PV-Anlage und ASICs mit einer Node steuern | [Voraussetzungen](./2-requirements.md) → [Node installieren](./0-setup.md) → [PV anbinden](./3-pv-connection.md) |
| Auf einem PC Monero oder Pearl minen | [PC-Agent installieren](./5-pc-agent.md); die Node ist für den lokalen Standalone-Betrieb nicht erforderlich |
| Mining-Erlöse einem Pool oder Wallet zuordnen | [Mining-Ziele und Gebühren](./6-mining-fees.md) |
| SolarMiner als Referrer empfehlen | [Partnerportal](./7-partner-portal.md) |

## So arbeiten die Komponenten zusammen

```text
PV-Gerät / Smart Meter ──► Node ──► Core ──► ASIC oder PC-Agent
                            │                    │
                            └── lokale Oberfläche │
                                                 ▼
                                  Stratum-Proxy ──► Nutzer-Pool
                                         └─────────► Gebühren-Ziel
```

Die Node, Core, Datenbanken, Phoenixd und der Stratum-Proxy laufen beim Betreiber. Der Proxy fragt Gebührenziele beim zentralen Fee-Backend ab; die Node kann eine Verbindung zum zentralen Lightning-Dienst und bei aktivierter Telemetrie zum Portal aufbauen. „Lokal betrieben“ bedeutet daher **nicht**, dass die gesamte Installation offline arbeitet. Der PC-Agent kann einen eingebauten oder einen externen Proxy verwenden. [Mehr zu Datenflüssen und Einwilligung](./8-data-privacy.md).

SolarMiner verteilt einen konfigurierten Anteil der Mining-Arbeit als Entwicklergebühr. Die tatsächlich beim Nutzer oder Partner gutgeschriebenen Beträge hängen von akzeptierten Shares und der Abrechnung des jeweiligen Pools ab. Ein angezeigter Hashrate-Wert oder ein konfiguriertes Ziel ist noch kein Nachweis für eine Gutschrift.

## Funktionsstand

Die Node unterstützt Braiins OS, bestimmte Antminer mit Stock-Firmware und angebundene PC-Agents über unterschiedliche Steuerwege. Funktionen wie stufenlose Leistungsregelung hängen vom konkreten Gerät, dessen Firmware und verfügbaren Messwerten ab. Der PC-Agent bietet Monero/RandomX für CPU und Pearl/PearlHash für unterstützte AMD- und NVIDIA-GPUs; diese Pfade benötigen eine passende Miner-Installation und einen geladenen Gebührenweg. Prüfe vor dem Betrieb die [Kompatibilität](./2-requirements.md).

Der Quellcode der Node steht unter AGPLv3; Name und Logo unterliegen zusätzlichen Markenbedingungen. Für Änderungen und Weitergabe gelten die Bedingungen im [Node-Repository](https://github.com/Solarminer-app/Solar-Miner-Node/blob/main/TRADEMARK.md).
