---
id: automation-rules
title: Automationsregeln
sidebar_position: 5
slug: /automation-rules
description: Cluster-Modi, Leistungsziele und Simulation sicher einrichten.
---

# Automationsregeln

Die Node konfiguriert einen Mining-Cluster über **Betriebsmodi**. Jeder Modus hat Start- und Stop-Bedingungen, Aktionen und Sperrzeiten für Laufzeit, Pause und Leistungswechsel. Die Reihenfolge der Modi ist relevant: Der erste passende Modus wird ausgewählt. Der mitgelieferte Standard legt einen Batterie-Schutzmodus vor die Überschussregelung.

## In der Oberfläche einrichten

1. Öffne die PV-Anlage → `Mining` → deinen Cluster → `Konfiguration`.
2. Wähle für die Start- und Stop-Bedingungen Messgröße, Vergleich, Schwellwert und gegebenenfalls ein Zeitfenster mit `LIVE` oder einer Aggregation wie `MEDIAN`.
3. Wähle eine Aktion: pausieren, fortsetzen oder ein Leistungsziel setzen. Ein dynamischer Zielwert rechnet eine Messgröße mit Multiplikator und Offset in Watt um. Bei einem Wert in kW ergibt der Multiplikator `1000` Watt pro kW; ein kleinerer Wert lässt Reserve.
4. Setze Mindestlaufzeit, Mindestpause und Sperre für Leistungsänderungen. Diese Zeiten vermeiden hektische Wechsel; sie sind kein Ersatz für Geräteschutz oder einen passenden Leistungsmesser.
5. Nutze die eingebaute Simulation mit Presets oder historischen Daten, speichere und beobachte anschließend den echten Betrieb am Zähler und Miner.

Die Standardkonfiguration verwendet `POTENTIAL_PV_SURPLUS` sowie Batterie-SoC. Sie startet den Überschussmodus erst bei positivem, über 30 Minuten geglättetem Überschuss und hohem SoC; unter 90 % SoC greift der vorrangige Stoppmodus. Die Standardwerte sind ein Ausgangspunkt, keine Empfehlung für jede Anlage. Die tatsächlichen Werte findest du in der Cluster-Konfiguration und im [Quellcode](https://github.com/Solarminer-app/Solar-Miner-Node/blob/main/src/main/java/de/verdox/pv_miner/miningcontroller/dsl/DefaultCluster.java).

`POTENTIAL_PV_SURPLUS` berücksichtigt den aktuellen Miner-Verbrauch, damit ein Miner seine eigene Startbedingung nicht unmittelbar zunichtemacht. Prüfe dennoch am Netzanschlusspunkt, ob die Regel Einspeisung, Bezug und Batterie wie gewünscht behandelt. Nur Geräte mit passendem Steuerweg können ein Leistungsziel zuverlässig umsetzen; andere können eventuell nur gestartet oder gestoppt werden. [Kompatibilität](./2-requirements.md) und [Fehlersuche](./9-troubleshooting.md).
