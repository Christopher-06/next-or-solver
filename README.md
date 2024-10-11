# Next OR Solver
## Online Operation Research Solver

### Projektbeschreibung

Dieser Online Operation Research Solver bietet eine intuitive Plattform zur Lösung von Optimierungsproblemen mittels des Simplex-Algorithmus. Die Anwendung unterstützt sowohl die Eingabe von **CPLEX LP** als auch **GMPL** Modellen und bietet zusätzlich eine geführte **grafische Benutzeroberfläche** zur Modellierung spezifischer und allgemeiner linearer Modelle. 

Das Projekt wurde im Rahmen des Moduls **Programmierprojekt** an der **Hochschule Osnabrück** von vier Studenten entwickelt.

### Features

- **Modellunterstützung**: Import von Modellen im **CPLEX LP**-Format oder **GMPL** (GNU Math Programming Language).
- **Geführte grafische Modellierung**: Benutzerfreundliche Oberfläche zur Erstellung von Modellen, die sowohl Anfänger als auch fortgeschrittene Nutzer anspricht.
- **Solver-Integration**: Auswahl zwischen den Solvern **GLPK** (GNU Linear Programming Kit) und **HiGHS**.
- **Client-seitige Berechnung**: Alle Berechnungen werden auf der Client-Seite durchgeführt, sodass keine Daten an einen Server gesendet werden.
- **Exportmöglichkeiten**: Modelle und Ergebnisse können exportiert und zur weiteren Verwendung heruntergeladen werden.
- **Multilingual**: Die Webseite erkennt automatisch die Nutzersprache und zeigt dementsprechend Deutsche bzw standardmäßig Englische Texte an


### Verwendung von GLPK und HiGHS
-**MPS-Konvertierung**: **GLPK** wird genutzt, um Probleme im **MPS-Format** zu konvertieren. Dies ermöglicht die Bearbeitung komplexer mathematischer Optimierungsmodelle.
-**HiGHS Solver**: Für Modelle, die im **GMPL**-Format eingegeben werden, wird **GLPK** verwendet, um das Modell zu übersetzen und an HiGHS zur Lösung weiterzugeben. So wird eine effiziente Lösung linearer Probleme ermöglicht.

### Nutzung

1. **Modell laden oder erstellen**: 
   - Sie können ein Modell im **CPLEX LP**- oder **GMPL**-Format importieren oder ein neues Modell mithilfe der grafischen Oberfläche erstellen.
   
2. **Solver auswählen**: 
   - Wählen Sie zwischen den Solvern **GLPK** und **HiGHS**.
   
3. **Berechnung starten**: 
   - Nachdem das Modell erstellt oder importiert und der Solver gewählt wurde, können Sie die Berechnung starten.

4. **Ergebnisse exportieren**: 
   - Die Resultate können als Dateien exportiert werden, um sie für spätere Analysen zu verwenden.

### Entwickelt von

Das Projekt wurde von einem Team von vier Studenten der **Hochschule Osnabrück** im Rahmen des Moduls **Programmierprojekt** entwickelt.

### Lokale Entwicklungsumgebung einrichten

Um die Anwendung lokal auszuführen, benötigen Sie **Node.js 20.17 LTS**. Anschließend können Sie alle notwendigen Abhängigkeiten installieren und die Anwendung starten.

#### Voraussetzungen

- **Node.js 20.17 LTS**: Stellen Sie sicher, dass diese Version von Node.js auf Ihrem System installiert ist. Falls noch nicht geschehen, können Sie Node.js von der offiziellen Website herunterladen: [Node.js 20.17 LTS](https://nodejs.org/).

#### Schritte zur Ausführung:

1. **Repository klonen**:
   Laden Sie das Projekt-Repository herunter oder klonen Sie es in ein Verzeichnis Ihrer Wahl:
   ```bash
   git clone https://github.com/Christopher-06/next-or-solver
   ```

3. **Abhängigkeiten installieren**:
   Wechseln Sie in das Projektverzeichnis und installieren Sie alle benötigten Abhängigkeiten mit npm:
   ```bash
   npm install
   ```

4. **Anwendung starten**:
   Starten Sie die NextJS-App im Entwicklungsmodus:
   ```bash
   npm run dev
   ```

5. **Seite im Browser öffnen**:
   Sobald der Entwicklungsserver gestartet ist, können Sie die Anwendung unter folgender Adresse in Ihrem Browser aufrufen: [http://localhost:3000](http://localhost:3000)

Nun können Sie die Anwendung lokal nutzen und weiterentwickeln. Alle Änderungen am Code werden automatisch übernommen und der Server wird bei jeder Änderung neu geladen.
