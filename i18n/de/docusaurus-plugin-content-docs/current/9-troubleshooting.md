---
title: Fehlersuche
sidebar_position: 10
slug: /troubleshooting
description: Häufige Probleme bei Start, PV-Messung, Proxy, Agent und Pool-Abrechnung.
---

# Fehlersuche

## Node startet nicht

Führe im Compose-Verzeichnis `docker compose config --quiet`, `docker compose ps` und `docker compose logs --tail=150 frontend core stratum-proxy` aus. Prüfe, ob `.env` vollständig ist, Port `8080` frei ist und die Datenbank-/Influx-Container laufen. Der Currency-Service braucht seine **eigene MariaDB**; ein Compose ohne `mariadb-currency-service` passt nicht zur hier verwendeten Node-Konfiguration. Prüfe Dateirechte für `app/frontend/app` und den UID/GID-Wert.

## PV-Werte fehlen oder sind unplausibel

Teste die Erreichbarkeit des Geräts aus dem Container-Netz. Prüfe Modbus-Adresse, Registertyp, Byte-Reihenfolge, Skalierung, Einheit und Einspeise-/Bezugs-Vorzeichen. Bei REST/MQTT/WebSocket zusätzlich Pfad/Topic und Authentifizierung prüfen. Schalte die Automatik erst ein, wenn Werte und Zeitverlauf mit dem echten Zähler übereinstimmen.

## Miner verbindet sich nicht mit dem Pool

Prüfe Proxy-Status, konfigurierten Coin, Pool-Adresse, Worker und den geladenen Gebührenweg. Core nutzt standardmäßig `host.docker.internal:8090` für die Proxy-API; der Proxy nutzt im Compose Host-Networking. Beim PC-Agent zeigt die Mining-Konsole Start- und Verbindungsfehler. Eine veraltete Direktpool-Konfiguration oder ein nicht erreichbarer externer Proxy kann den Start verhindern. Falls der Proxy in Ordnung ist, vergleiche angenommene Shares und Gutschriften im **Poolkonto**.

## GPU wird im PC-Agent nicht gefunden

Im Linux-Container reicht die Basis-Compose keine GPU durch. Für NVIDIA sind Toolkit und GPU-Overlay nötig; für AMD das passende OpenCL-System und AMD-Overlay. Intel-GPU ist für PearlHash über den aktuellen SRBMiner-Pfad nicht freigegeben. Prüfe Treiber und Geräteauflistung auf dem Host und im Container, danach die Agent-Konsole. Hardware-spezifische Leistungslimits müssen am Gerät verifiziert werden.

## Portalwert und Poolwert unterscheiden sich

Vergleiche denselben Coin, Pool-Worker und Zeitraum. Hashrate und Prognose sind keine Pool-Gutschrift; Pool-Saldo und Wallet-Bestand sind unterschiedliche Werte. Melde einen konkreten Zeitraum und Worker, ohne Token oder private Schlüssel weiterzugeben. [Begriffe und Gebühren](./6-mining-fees.md).
