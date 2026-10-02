# Documentation review record

As of October 2, 2026. This file supports maintenance of the public pages; it is not a product guarantee.

Update the German pages under `docs/` and their English counterparts under `i18n/en/docusaurus-plugin-content-docs/current/` together whenever behavior or wording changes. Keep IDs, slugs, ordering, and internal links aligned for each pair of pages. GitHub Actions builds both locales; do not commit generated Docusaurus files.

## Sources and decisions

| Topic | Workspace source checked | Decision for the public documentation |
| --- | --- | --- |
| Node installation | `Solar-Miner-Node/compose.yml`, `README.md` | Complete Compose copy with currency MariaDB and frontend storage initialization; host port 8080 is the baseline. |
| PC Agent | `pc-agent/docker-compose.pc-agent.yml`, NVIDIA overlay, `standalone/README.md`, `standalone/DOCKER.md` | Linux amd64 image and Windows launcher documented separately; downloading a miner remains an explicit user action. |
| PV profiles | Node `PVConfigController`, React `config/pv/config-editor.tsx`, contract C3 | Protocols and import/export are evidenced; no untested manufacturer support promises. |
| Miner control | Node `core` miner controllers, `DefaultCluster.java`, cluster configuration page | Braiins OS, stock Antminers, and PC Agent differ in capabilities. |
| Fees and targets | Node `docs/MINING-TARGETS.md`, `MiningTargetController`, `MiningController`, workspace contracts C1/C2 | Configuration, shares, balances, and payouts are distinguished explicitly. |
| Pearl | `PEARL-INTEGRATION.md`, production approval addendum of September 30 | Operator approval is stated; absent exported share/long-term measurements and unvalidated hardware combinations are not presented as verified. |
| Partner portal | `admin-portal` referrer and application pages, `ReferrerController`, `ReferralApplicationController`, `ReferrerService` | Application, code, dashboard, and own pool credentials are documented; no automatic payout is claimed. |
| Telemetry | Workspace contracts C8/C8a, Node `TelemetryReporter`, admin endpoints | Consents are separate; a public benchmark group may contain one sample. |

The Compose snippet supplied for this task contained Markdown-formatted URLs, omitted the currency MariaDB, published database/InfluxDB ports, and included JMX without authentication or TLS. The downloadable examples are therefore copies of current repository files; the pages explain adaptations and local network boundaries. Both Compose variants passed syntax checks, and internal Markdown links in both languages resolved. A Docusaurus production build succeeded before the English addition; GitHub Actions will validate the bilingual state. Local install and build files were removed. The complete system was not exercised with real PV devices, ASICs, GPUs, pool shares, or wallet payments.

The workspace guide `NEW-MINING-COIN-GUIDE.md` remains mandatory for any new coin. This documentation change introduces no coin, algorithm, or Stratum contract, so those integration steps do not apply here. Later changes to the proxy, fee backend, device, Node, or portal require coordinated review of the affected repositories and these public docs.
