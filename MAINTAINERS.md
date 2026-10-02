# Dokumentations-Prüfvermerk

Stand: 2. Oktober 2026. Diese Datei ist für die Pflege der öffentlichen Seiten; sie ist keine Produktzusage.

Die deutschen Seiten unter `docs/` und die englischen Gegenstücke unter `i18n/en/docusaurus-plugin-content-docs/current/` müssen bei inhaltlichen Änderungen gemeinsam aktualisiert werden. IDs, Slugs, Reihenfolge und interne Links bleiben je Seitenpaar gleich. Der GitHub-Actions-Build baut beide Sprachen; keine generierten Docusaurus-Dateien einchecken.

## Quellen und Entscheidungen

| Thema | Geprüfte Quelle im Workspace | Folgerung für öffentliche Doku |
| --- | --- | --- |
| Node-Installation | `Solar-Miner-Node/compose.yml`, `README.md` | Vollständige Compose-Kopie mit Currency-MariaDB und Frontend-Storage-Init; Host-Port 8080 als Basis. |
| PC-Agent | `pc-agent/docker-compose.pc-agent.yml`, NVIDIA-Overlay, `standalone/README.md`, `standalone/DOCKER.md` | Linux-amd64-Image und Windows-Launcher getrennt beschrieben; Miner-Download bleibt explizite Nutzeraktion. |
| PV-Profile | Node `PVConfigController`, React `config/pv/config-editor.tsx`, Vertrag C3 | Protokolle und Import/Export belegt; keine ungetesteten Hersteller-Versprechen. |
| Miner-Steuerung | Node `core` Miner-Controller, `DefaultCluster.java`, Cluster-Konfigurationsseite | Braiins OS, Stock-Antminer und PC-Agent unterscheiden sich in Fähigkeiten. |
| Gebühren und Ziele | Node `docs/MINING-TARGETS.md`, `MiningTargetController`, `MiningController`, Workspace-Vertrag C1/C2 | Konfiguration, Shares, Saldo und Auszahlung ausdrücklich getrennt. |
| Pearl | `PEARL-INTEGRATION.md`, Nachtrag Produktionsfreigabe 30. September | Betreiber-Freigabe genannt; fehlende exportierte Share-/Langzeitmessungen und nicht validierte Hardwarekombinationen nicht als belegt dargestellt. |
| Partnerportal | `admin-portal` Referrer- und Bewerbungsseiten, `ReferrerController`, `ReferralApplicationController`, `ReferrerService` | Bewerbung, Code, Dashboard und eigene Pool-Daten beschrieben; keine automatische Auszahlung behauptet. |
| Telemetrie | Workspace-Vertrag C8/C8a, Node `TelemetryReporter`, Admin-Endpunkte | Einwilligungen getrennt; öffentliche Benchmark-Gruppe kann eine Probe enthalten. |

Das für den Auftrag bereitgestellte Compose-Snippet enthielt Markdown-formatierte URLs, eine fehlende Currency-MariaDB, öffentlich bindbare Datenbank-/Influx-Ports und eine JMX-Konfiguration ohne Authentifizierung/TLS. Die Download-Beispiele sind deshalb Kopien der aktuellen Repository-Dateien; die Seiten erklären Anpassungen und lokale Netzgrenzen. Beide Compose-Varianten wurden syntaktisch geprüft und die internen Markdown-Links beider Sprachen aufgelöst. Der Docusaurus-Produktionsbuild war vor der englischen Ergänzung erfolgreich; den zweisprachigen Stand prüft der GitHub-Actions-Build. Lokale Installations- und Build-Dateien wurden entfernt. Das komplette System wurde nicht mit echten PV-Geräten, ASICs, GPUs, Pool-Shares oder Wallet-Zahlungen ausgeführt.

Bei einem neuen Coin gilt weiterhin der Workspace-Guide `NEW-MINING-COIN-GUIDE.md`. Diese Dokumentationsänderung führt keinen Coin, Algorithmus oder Stratum-Vertrag neu ein; die Integrationsschritte sind dafür nicht anwendbar. Bei einer späteren Änderung von Proxy, Fee-Backend, Gerät, Node oder Portal müssen die betroffenen Repositories und diese öffentliche Doku gemeinsam geprüft werden.
