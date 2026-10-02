---
id: pv-connection
title: PV-Anlage verbinden
sidebar_position: 4
slug: /pv-connection
description: PV-Profil auswählen, Messwerte prüfen und eigene Modbus- oder REST-Profile importieren.
---

# PV-Anlage verbinden

Die Node benötigt verlässliche Messwerte, bevor sie einen Miner nach PV-Überschuss regeln kann. Benutze möglichst Zählerwerte am Netzanschlusspunkt sowie Erzeugung und gegebenenfalls Batterie-SoC. Prüfe Einheiten und Vorzeichen mit einer bekannten Situation: Einspeisung bei Sonne, Netzbezug bei hoher Hauslast.

## Profil wählen und testen

1. Öffne das Setup der Node oder die PV-Konfiguration unter `Konfiguration → PV`.
2. Suche im lokalen oder Community-Katalog nach deinem Gerät und wähle das passende Protokoll. Die Oberfläche bietet REST, Modbus TCP, Modbus RTU, MQTT und WebSocket.
3. Trage die lokale Geräteadresse und erforderliche Zugangsdaten ein. Die Node muss das Ziel aus ihrem Container-Netz erreichen können; `localhost` würde dort den Container selbst bezeichnen.
4. Nutze Vorschau/Live-Test. Prüfe jede für die Regel verwendete Größe auf plausible Werte, richtige Einheit und Vorzeichen. Ein erfolgreicher Verbindungsaufbau allein bestätigt die Messwerte nicht.
5. Speichere das Profil und beobachte den Live-Verlauf, bevor du eine Automationsregel aktivierst.

## Eigenes Profil

Die Profilansicht kann JSON-Profile importieren und exportieren. Für REST ordnest du je Messgröße einen Pfad, eine HTTP-Methode, den Wertpfad in der Antwort sowie Typ, Skalierungsfaktor und gegebenenfalls eine Formel zu. Bei Modbus sind Startadresse, Registeranzahl, Operation und Byte-Reihenfolge relevant. Eine Registerliste vom Hersteller ist erforderlich; gleiche Modellnamen können abweichende Firmware-Register haben.

Der [SolarMiner Configurator](https://github.com/derverdox/solarminer-configurator) hilft beim Erstellen und Live-Test eigener Profile. Importiere dessen Export in die Node und teste dort erneut: Configurator und Node verwenden ein gemeinsames Serialisierungsformat, aber ihre Laufzeitumgebungen und Erreichbarkeit können abweichen.

Für serielle Modbus-RTU-Geräte muss der Host das Gerät in den Node-Container durchreichen. Die [RTU-Docker-Anleitung](https://github.com/Solarminer-app/Solar-Miner-Node/blob/main/docs/MODBUS_RTU_DOCKER.md) beschreibt die zusätzlichen Schritte. Bei MQTT und WebSocket müssen Broker bzw. Endpunkt sowie Topic und Nachrichtenschema zur gewählten Vorlage passen.

:::warning Messwerte zuerst prüfen
Ein falsch skaliertes oder umgekehrt vorzeichenbehaftetes Netzsignal kann Miner trotz Netzbezug starten. Teste bei wechselnder Erzeugung und Last, bevor du die [Automationsregeln](./4-automation-rules.md) einschaltest.
:::
