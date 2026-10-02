---
id: setup
title: Node mit Docker Compose installieren
sidebar_position: 3
slug: /setup
description: SolarMiner Node, Datenbanken, Core, Proxy und Phoenixd mit einem vollständigen Compose-Beispiel starten.
---

# Node mit Docker Compose installieren

Dieses Beispiel richtet eine lokale Node auf einem Linux-Host ein. Es ist eine Kopie der [Compose-Datei aus dem Node-Repository](https://github.com/Solarminer-app/Solar-Miner-Node/blob/main/compose.yml), Stand 2. Oktober 2026: [Compose-Datei herunterladen](/examples/solarminer-node.compose.yml). Das für diese Dokumentation bereitgestellte Produktionsbeispiel nutzt teils andere Image-Tags und Host-Ports. Vor allem enthält es keine `mariadb-currency-service`, obwohl der Currency-Service diese Datenbank als `MYSQL_URL` erwartet. Die vollständige Datei hier schließt sie ein.

## 1. Dateien und Geheimnisse vorbereiten

```sh
mkdir -p solarminer
cd solarminer
curl -fL https://docs.solarminer.app/examples/solarminer-node.compose.yml -o compose.yml
mkdir -p app/frontend/app app/frontend/mariadb_data app/frontend/influxdb/data app/frontend/influxdb/config app/currency/backend app/currency/mariadb app/phoenixd
```

Lege eine `.env` im gleichen Verzeichnis an. Ersetze **alle** Beispielwerte durch eigene lange, zufällige Werte:

```dotenv
MYSQL_PASSWORD=HIER_EIGENES_PASSWORT
CURRENCY_DB_PASSWORD=HIER_ANDERES_PASSWORT
INFLUXDB_ADMIN_TOKEN=HIER_EIGENES_LANGES_TOKEN
DOCKER_INFLUXDB_INIT_USERNAME=admin
DOCKER_INFLUXDB_INIT_PASSWORD=HIER_DRITTES_PASSWORT
SOLARMINER_UID=1000
SOLARMINER_GID=1000
```

`SOLARMINER_UID` und `SOLARMINER_GID` müssen dem Benutzer gehören, der die persistenten Dateien verwaltet. Die Datei enthält Zugangsdaten: Rechte einschränken und nicht in Git einchecken. Das Beispiel legt Phoenixd-Daten unter `app/phoenixd` ab; sichere dieses Verzeichnis und den Seed besonders sorgfältig.

## 2. Konfiguration prüfen und starten

```sh
docker compose config --quiet
docker compose up -d
docker compose ps
docker compose logs --tail=100 frontend core stratum-proxy
```

Öffne `http://<IP-des-Hosts>:8080/` im lokalen Netz. Wenn du Host-Port 80 bevorzugst, ändere **nur** beim Service `frontend` die Zuordnung `8080:8080` zu `80:8080`, bevor du startest. Die Node-Anwendung hört im Container weiter auf `8080`.

Das Beispiel enthält `frontend-storage-init` zur Berechtigung des Speicherverzeichnisses, eine separate MariaDB für Kurse und einen Healthcheck für InfluxDB. `stratum-proxy` nutzt Host-Networking; Core erreicht seine API über `host.docker.internal:8090`. Der Host und die Firewall müssen diesen lokalen Datenweg zulassen.

## 3. Einrichtung in der Oberfläche

1. Folge dem Setup der Node und wähle ein passendes PV-Profil. Prüfe live die Werte für Erzeugung, Netzbezug/Einspeisung und Speicher, bevor ein Miner gesteuert wird.
2. Lege Miner und gegebenenfalls einen Cluster an. Trage Pool, Worker und [Mining-Ziele](./6-mining-fees.md) in der Node ein.
3. Starte mit konservativen [Automationsregeln](./4-automation-rules.md). Beobachte reale Leistungsaufnahme und Miner-Status.
4. Vergleiche akzeptierte Shares und Auszahlungen im tatsächlichen Poolkonto. Das Node-Dashboard allein belegt keine Auszahlung.

## Betrieb, Ports und Backups

Die mitgelieferte Datei veröffentlicht außer der Oberfläche auch Datenbank-, Influx- und Core-Ports. Binde sie per Firewall an das vertrauenswürdige LAN oder entferne Host-Port-Freigaben, die du nicht brauchst. Stelle die Node und die PC-Agent-Oberfläche nicht direkt ins öffentliche Internet. Die im bereitgestellten Produktionsbeispiel gezeigten JMX-Optionen deaktivieren Authentifizierung und TLS; übernimm sie nicht in eine öffentlich erreichbare Installation.

Sichere vor Updates mindestens die persistenten Verzeichnisse unter `app/`, die `.env` und den Phoenixd-Seed. Beende oder konsistentiere schreibende Datenbankdienste für eine wiederherstellbare Sicherung; ein einfaches Kopieren während laufender Schreibvorgänge reicht nicht immer. Verwende für einen geplanten Rollout festgelegte Image-Versionen statt beweglicher `latest`-Tags. Nach einem Update: `docker compose pull`, `docker compose up -d`, Logs und Poolbetrieb prüfen.

Fehler beim Start? [Fehlersuche](./9-troubleshooting.md). Für CPU/GPU-Mining auf einem anderen Rechner: [PC-Agent](./5-pc-agent.md).
