---
id: pc-agent
title: PC-Agent installieren
sidebar_position: 6
slug: /pc-agent
description: CPU- und GPU-Mining auf Windows oder Linux mit lokalem PC-Agent.
---

# PC-Agent installieren

Der PC-Agent hat eine eigene lokale Oberfläche auf Port `8084`. Er kann allein laufen oder von einer SolarMiner Node gesteuert werden. Er enthält einen eingebauten Stratum-Proxy; in der Oberfläche lässt sich alternativ ein externer Proxy im LAN auswählen. Beim ersten Start kann er einen externen Proxy suchen und sonst den eingebauten verwenden. **Ein gestarteter Agent lädt und startet noch keinen Miner.**

Wähle **Stable** für den geprüften regulären Release. Wähle **Beta** nur, wenn du bewusst die neuesten Vorabfunktionen testen möchtest. Stable-Installer kommen aus dem neuesten stabilen GitHub-Release; die Beta-Bootstrap-Skripte kommen aus dem `beta`-Branch und ermitteln automatisch den neuesten `pc-agent-beta-*`-Prerelease. Stable und Beta verwenden getrennte lokale Datenverzeichnisse und Docker-Image-Tags.

## Windows

Lade `start-agent.bat` aus dem [aktuellen PC-Agent-Release](https://github.com/Solarminer-app/pc-agent/releases/latest) und starte es. Der Launcher lädt bei Bedarf den Agent samt privater Java-21-Laufzeit, prüft die bereitgestellten SHA-256-Werte und speichert die Dateien unter `%LOCALAPPDATA%\SolarMiner\PC-Agent`. Er benötigt Internetzugang und Windows PowerShell 5.1. Öffne danach `http://127.0.0.1:8084/`.

Falls ein Release den Windows-Launcher noch nicht enthält, folge der [Standalone-Anleitung im Quellrepository](https://github.com/Solarminer-app/pc-agent/blob/main/standalone/README.md); sie beschreibt auch den Start der JAR mit vorhandenem Java 21.

Du kannst den Bootstrap auch direkt aus PowerShell herunterladen und ausführen. Er lädt den Release-Launcher, der anschließend die private Java-Laufzeit und den Agent installiert:

```powershell
$p = "$env:TEMP\solarminer-install.ps1"
Invoke-WebRequest https://github.com/Solarminer-app/pc-agent/releases/latest/download/install-windows.ps1 -OutFile $p
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $p
```

Für die neueste Beta lädst du den Bootstrap aus dem Beta-Branch und wählst den Beta-Kanal:

```powershell
$p = "$env:TEMP\solarminer-install.ps1"
Invoke-WebRequest https://raw.githubusercontent.com/Solarminer-app/pc-agent/beta/standalone/install-windows.ps1 -OutFile $p
powershell.exe -NoProfile -ExecutionPolicy Bypass -File $p -Channel beta
```

Windows Smart App Control kann nicht signierte Launcher blockieren. Schwäche eine verwaltete Sicherheitsrichtlinie nicht ab, ohne die Auswirkungen zu verstehen.

## Linux nativ

Der native Linux-Bootstrap installiert fehlende Basiswerkzeuge über einen unterstützten Paketmanager, lädt eine private x64-Java-21-Laufzeit von Adoptium, prüft ihre veröffentlichte SHA-256-Prüfsumme und prüft und startet danach den aktuellen stabilen PC-Agent. Nur `curl` wird bereits zum Laden des Bootstraps benötigt:

```sh
curl -fL https://github.com/Solarminer-app/pc-agent/releases/latest/download/install-linux.sh -o install-linux.sh
sh install-linux.sh
```

Beta:

```sh
curl -fL https://raw.githubusercontent.com/Solarminer-app/pc-agent/beta/standalone/install-linux.sh -o install-linux.sh
sh install-linux.sh --channel beta
```

## Linux-Docker

Das Image ist für Linux `amd64`. Der Bootstrap installiert fehlendes Docker und Compose über einen unterstützten System-Paketmanager, lädt die Compose-Dateien aus dem Release, validiert sie und startet den Agent mit persistenten Daten:

```sh
curl -fL https://github.com/Solarminer-app/pc-agent/releases/latest/download/install-docker.sh -o install-docker.sh
sh install-docker.sh --gpu none
```

Für einen Beta-Container lädst du den Bootstrap aus dem Beta-Branch und ergänzt `--channel beta`; damit werden die neuesten Beta-Release-Dateien und das Image `latest-beta` gewählt:

```sh
curl -fL https://raw.githubusercontent.com/Solarminer-app/pc-agent/beta/standalone/install-docker.sh -o install-docker.sh
sh install-docker.sh --channel beta --gpu none
```

Öffne `http://<IP-des-Agent-Hosts>:8084/` im LAN. Das Beispiel veröffentlicht `8092/udp` für den Empfang externer Proxy-Heartbeats. Für NVIDIA-GPUs ist das [NVIDIA-Overlay](/examples/pc-agent.nvidia.compose.yml) vorgesehen; es setzt ein funktionsfähiges NVIDIA Container Toolkit auf dem Host voraus:

```sh
sh install-docker.sh --gpu nvidia
```

Wenn du Beta gewählt hast, behalte `--channel beta` auch in diesem Befehl bei.

Für AMD-GPUs brauchst du einen passenden AMDGPU/ROCm-OpenCL-Stack und das [AMD-Overlay](/examples/pc-agent.amd.compose.yml):

```sh
sh install-docker.sh --gpu amd
```

Wenn du Beta gewählt hast, behalte `--channel beta` auch in diesem Befehl bei.

Der Bootstrap installiert oder ersetzt bewusst keine GPU- oder Kernel-Treiber. NVIDIA braucht deshalb einen funktionierenden NVIDIA-Treiber samt NVIDIA Container Toolkit; AMD benötigt funktionierende `/dev/kfd`- und `/dev/dri`-Geräte aus dem AMDGPU/ROCm-Host-Stack. Das Intel-Overlay dient derzeit nur der Geräteerkennung, nicht Pearl-Mining. Für XMRig/RandomX beschreibt die [Linux-Docker-Anleitung](https://github.com/Solarminer-app/pc-agent/blob/main/standalone/DOCKER.md) die optionale Vorbereitung von Huge Pages. Reserviere Host-RAM dafür nur bewusst.

## Mining einrichten

1. Öffne `Mining`. Wähle Monero/CPU oder Pearl/GPU und klicke ausdrücklich auf **Herunterladen & installieren**. Der Agent bezieht XMRig bzw. SRBMiner-MULTI erst dann.
2. Trage Pool, Auszahlungsadresse bzw. Konto und Worker ein. Prüfe die angezeigte Proxy- und Gebührenroute. Das SolarMiner-Standardauszahlungsziel ist eine eigene, bestätigungspflichtige Wahl: Dabei geht die gesamte Auszahlung an das angezeigte Ziel.
3. Wähle beim GPU-Pfad nur erkannte, passende Geräte aus. Starte den gewünschten Miner und beobachte dessen Konsole und Poolstatus.
4. Prüfe angenommene Shares im Poolkonto. Die lokale Ertragsprognose ist eine Schätzung vor Pool-, Miner- und Gebührenabzügen.

Monero und Pearl können als getrennte Prozesse gleichzeitig laufen. Pearl wurde vom Betreiber zur Produktion freigegeben; einzelne GPU-/Treiber-/OS-Kombinationen erfordern weiterhin Gerätetests. SRBMiner erhebt für PearlHash zusätzlich eine eigene Miner-Gebühr. Beim Verbinden mit einer Node muss **Node-Steuerung** lokal unter `Hardware` erlaubt werden; einzelne CPU-/GPU-Worker können dort von externer Steuerung ausgenommen werden. Die lokale Agent-Oberfläche gehört nicht ins öffentliche Internet.

Die hier herunterladbaren Basis- und GPU-Overlay-Dateien entsprechen dem aktuellen stabilen PC-Agent-Repository. Verwende ein GPU-Overlay nur auf einem Host mit bereitgestelltem GPU-Zugriff.
