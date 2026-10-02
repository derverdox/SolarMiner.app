---
title: Mining-Ziele, Gebühren und Auszahlungen
sidebar_position: 7
slug: /mining-fees
description: Pools, Worker, Entwicklergebühr, Wallets und echte Gutschriften richtig einordnen.
---

# Mining-Ziele, Gebühren und Auszahlungen

## Dein Mining-Ziel

Unter `Mining → Mining-Ziele` kannst du je Coin einen Pool, einen Worker-Präfix und gegebenenfalls eine öffentliche Auszahlungsadresse hinterlegen. Die Node verwaltet derzeit Ziele für Bitcoin, Monero und Pearl. Bei passenden ASICs schreibt Core die Konfiguration an das Gerät; bei PC-Agents werden Monero- und Pearl-Konfigurationen getrennt weitergegeben. Ein gespeichertes Ziel zeigt eine **Konfiguration**, keinen laufenden Miner und keine angenommene Share.

Mehrere Ziele können priorisiert werden. Die Node kann bei einem fehlgeschlagenen **Konfigurationsversuch** das nächste aktivierte Ziel probieren. Das ist kein automatischer Pool-Ausfallwechsel während laufenden Minings. Prüfe daher den Verbindungsstatus und die Pool-Abrechnung auch nach dem Anwenden eines Ziels.

## Entwicklergebühr und Referrals

SolarMiner leitet einen konfigurierten Teil der Mining-Arbeit an Gebührenziele. Der tatsächliche Anteil kann nach Coin und gültigem Referral-Code variieren; die lokale Mining-Ansicht zeigt die aktuelle Aufteilung. Der Stratum-Proxy ruft die Zielkonfiguration beim zentralen Fee-Backend ab. Braiins OS nutzt einen nativen Pool-Split über Core; andere unterstützte Wege verwenden den Proxy. Der Benutzer-Pool ist nicht auf Braiins beschränkt, sofern Gerät, Protokoll und Ziel kompatibel sind.

Ein Referral-Code wird in der Node unter `Mining` gewählt oder entfernt. Ein Code ändert die Aufteilung der Entwicklergebühr nach den zentral konfigurierten Bedingungen. Er ist kein zusätzlicher Aufschlag, den ein Partner frei festlegt. Partner können einen Anteil beantragen; die tatsächlichen Konditionen werden erst durch das Portal und die Freigabe wirksam. [Partnerportal](./7-partner-portal.md).

## Was zeigen die Zahlen?

| Anzeige | Bedeutung |
| --- | --- |
| Hashrate und Miner-Status | Messung oder Meldung des Geräts; noch keine Pool-Gutschrift |
| Pool-Worker und angenommene Shares | Angaben des jeweiligen Pools; die beste Kontrolle des Mining-Pfads |
| Schätzung im Agent oder Dashboard | Modellwert aus Hashrate, Netz- und Kursdaten; kann von der Auszahlung stark abweichen |
| Pool-Saldo | Guthaben beim Pool; noch keine Überweisung an eine Wallet |
| Wallet-Saldo | Bestand an einer Adresse; nicht automatisch Mining-Einkommen |
| Partner-Gutschrift im Portal | Aus realen Pool-Daten abgeleiteter Wert, soweit eine Pool-Integration für Coin und Konto vorhanden ist |

Bitcoin, Monero und Pearl haben unterschiedliche Einheiten und Abrechnungswege. Die Lightning-Wallet der Node ist Bitcoin-spezifisch. Ein öffentlicher Monero-Adressstring erlaubt keine zuverlässige Abfrage des On-Chain-Saldos. Für Pearl werden Pool- und Adressdaten nur angezeigt, wenn der verwendete Anbieter bzw. Explorer sie liefert. Fehlende Daten sollten als nicht verfügbar erscheinen und nicht als Nullertrag verstanden werden.

:::note Gebühren prüfen
Ein im Proxy konfigurierter Prozentsatz beweist keine entsprechende Pool-Gutschrift. Vergleiche nach ausreichender Laufzeit Nutzer-, Haus- und gegebenenfalls Partner-Worker mit den akzeptierten Shares und der Pool-Abrechnung. Bei einem unerwarteten Ergebnis siehe [Fehlersuche](./9-troubleshooting.md).
:::
