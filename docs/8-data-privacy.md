---
title: Lokaler Betrieb und Datenfreigabe
sidebar_position: 9
slug: /data-privacy
description: Welche Verbindungen SolarMiner nutzt und welche Telemetrie freiwillig ist.
---

# Lokaler Betrieb und Datenfreigabe

Die Node speichert Anlagenkonfiguration, Betriebsdaten und Wallet-Daten lokal in den persistenten Volumes. ASIC-Steuerung, PC-Agent und Proxy arbeiten im LAN. Die lokalen Node- und Proxy-APIs sind als vertrauenswürdige LAN-Dienste ausgelegt; sie sind kein öffentlich abgesicherter Webdienst. Begrenze ihren Zugriff mit Netzsegmentierung und Firewall.

| Verbindung | Wofür sie verwendet wird | Wahlmöglichkeit |
| --- | --- | --- |
| Stratum-Proxy → zentrales Fee-Backend | Gebührenziele für den gewählten Coin laden | Für den vorgesehenen Gebührenweg erforderlich; ohne gültige Route kann der PC-Agent den Minerstart ablehnen. |
| Miner/Proxy → gewählter Pool | Jobs, Shares und Pool-Abrechnung | Pool wird vom Betreiber konfiguriert. |
| Node → zentrale Dienste | Lightning-Tunnel, Referral-Code-Katalog/-Zuordnung, gegebenenfalls Profile und weitere Daten | Abhängig von aktivierten Funktionen; Code-Zuordnung erfolgt unabhängig vom Telemetrie-Opt-in. |
| Node → Portal-Telemetrie | Betriebs- und Benchmarkdaten mit stabiler zufälliger Node-ID und grobem, gewähltem Standort-Raster | Site-Telemetrie ist eine ausdrückliche Einwilligung. |
| Standalone-PC-Agent → Benchmark-Dienst | Geräteleistungswerte | Separate Einwilligung, standardmäßig aus; braucht keine Node. |

Für die Site-Telemetrie sendet die Node bei deaktivierter Freigabe eine minimale Widerrufsnachricht ohne Messwerte. Der Standalone-PC-Agent hat eine eigene Schaltfläche **Anonyme Leistungswerte teilen** auf der Benchmarks-Seite. Die öffentlichen Benchmark-Gruppen können derzeit schon mit **einem** Datensatz erscheinen; bei nur einem Gerät können dessen Leistungswerte im Gruppenwert erkennbar sein. Aktiviere die Freigabe nur, wenn das für dich passt.

Die Portal-Endpunkte für Node-Zuordnung und Telemetrie verwenden derzeit eine Node-UUID im Request und keinen zusätzlichen Besitznachweis pro Node. Diese technische Grenze ist für den Umgang mit zentralen Daten wichtig. Zugangsdaten für lokale Miner, Pool-API und Phoenixd sollten lokal bzw. im vorgesehenen Portal gespeichert und nicht in Screenshots oder Support-Logs veröffentlicht werden.
