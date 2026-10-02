# SolarMiner documentation / Dokumentation

[Deutsch](https://docs.solarminer.app/) · [English](https://docs.solarminer.app/en/)

## English

This repository contains the public SolarMiner documentation for Node operators, PC Agent users, and partners in the referrer portal. Docusaurus builds the German source pages in `docs/` and their complete English translations in `i18n/en/docusaurus-plugin-content-docs/current/`. Downloadable Compose examples are shared between both languages under `static/examples/`.

The Docusaurus build and deployment run through `.github/workflows/deploy.yml` on GitHub Pages. Edit the source files; generated directories such as `node_modules/`, `.docusaurus/`, and `build/` do not belong in the repository. The Node and PC Agent examples are snapshots of the files in the [Solar-Miner-Node repository](https://github.com/Solarminer-app/Solar-Miner-Node). Compare them with upstream whenever images, services, ports, or environment variables change. Check referral and pool-credit claims against the current [admin portal](https://portal.solarminer.app) and pool data. The [maintainer review note](MAINTAINERS.en.md) lists the sources and remaining verification limits.

Report documentation errors through an issue in this repository. Report Node defects in the [Node repository](https://github.com/Solarminer-app/Solar-Miner-Node/issues).

## Deutsch

Dieses Repository enthält die öffentliche [SolarMiner-Dokumentation](https://docs.solarminer.app) für Betreiber einer Node, Nutzer des PC-Agents und Partner im Referrer-Portal. Die deutschen Quellseiten liegen in `docs/`, die vollständigen englischen Übersetzungen in `i18n/en/docusaurus-plugin-content-docs/current/`. Herunterladbare Compose-Beispiele liegen für beide Sprachen in `static/examples/`.

## Veröffentlichung

Der Docusaurus-Build und die Veröffentlichung laufen über `.github/workflows/deploy.yml` auf GitHub Pages. Bearbeite die Quelldateien in `docs/`, `static/` und die Docusaurus-Konfiguration; generierte Verzeichnisse wie `node_modules/`, `.docusaurus/` und `build/` gehören nicht ins Repository.

Die Node- und PC-Agent-Beispiele sind Momentaufnahmen der Compose-Dateien im [Solar-Miner-Node-Repository](https://github.com/Solarminer-app/Solar-Miner-Node). Vergleiche sie bei Änderungen an Images, Diensten, Ports oder Umgebungsvariablen mit dem aktuellen Upstream. Aussagen zu Referrals und Pool-Gutschriften müssen mit dem tatsächlichen [Admin-Portal](https://portal.solarminer.app) und den jeweiligen Pool-Daten übereinstimmen. Der [Prüfvermerk](MAINTAINERS.md) nennt die für diese Überarbeitung verwendeten Quellen und offene Verifikationspunkte.

Fragen oder Fehler zur Dokumentation können als Issue in diesem Repository gemeldet werden. Node-Fehler gehören in das [Node-Repository](https://github.com/Solarminer-app/Solar-Miner-Node/issues).
