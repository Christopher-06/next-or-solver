# Next OR Solver
## Online Operation Research Solver

### Projektbeschreibung

Dieser Online Operation Research Solver bietet eine intuitive Plattform zur Lösung von Optimierungsproblemen mittels des Simplex-Algorithmus. Die Anwendung unterstützt sowohl die Eingabe von **CPLEX LP** als auch **GMPL** Modellen und bietet zusätzlich eine geführte **grafische Benutzeroberfläche** zur Modellierung spezifischer und allgemeiner linearer Modelle. 

Das Projekt wurde im Rahmen des Moduls **Programmierprojekt** an der **Hochschule Osnabrück** von vier Studenten entwickelt.

### Features

- **Modellunterstützung**: Import von Modellen im **CPLEX LP**-Format oder **GMPL** (GNU Math Programming Language).  
- **Geführte grafische Modellierung**: Benutzerfreundliche, an GLPM angelehnte Oberfläche zur Erstellung von Modellen, die sowohl Anfänger als auch fortgeschrittene Nutzer anspricht.  
- **Solver-Integration**: Auswahl zwischen den Solvern **GLPK** (GNU Linear Programming Kit) und **HiGHS**.  
- **Client-seitige Berechnung**: Alle Berechnungen werden auf der Client-Seite durchgeführt, sodass keine Daten an einen Server gesendet werden.  
- **Exportmöglichkeiten**: Modelle und Ergebnisse können exportiert und zur weiteren Verwendung heruntergeladen werden.  
- **Multilingual**: Die Webseite erkennt automatisch die Nutzersprache und zeigt dementsprechend Deutsche bzw standardmäßig Englische Texte an.  


### Verwendung von GLPK und HiGHS
- **MPS-Konvertierung**: **GLPK** wird genutzt, um Probleme zu parsen, um sie im Anschluss ins **MPS-Format** zu konvertieren. Dies ermöglicht die Bearbeitung komplexer mathematischer Optimierungsmodelle. Außerdem wird er verwendet, um Probleme im **GMPL-Format** 
ins **LP-Format** zu übersetzen, da HiGHS nur das **LP-Format** akzeptiert.  
- **HiGHS Solver**: Für Modelle, die im **GMPL**-Format eingegeben werden, wird **GLPK** verwendet, um das Modell zu übersetzen und an HiGHS zur Lösung weiterzugeben. So wird eine effiziente Lösung linearer Probleme ermöglicht.  

### Nutzung

1. **Modell laden oder erstellen**: 
   - Sie können ein Modell im **CPLEX LP**- oder **GMPL**-Format importieren oder ein neues Modell mithilfe der grafischen Oberfläche erstellen.
   
2. **Solver auswählen**: 
   - Wählen Sie zwischen den Solvern **GLPK** und **HiGHS**.
   
3. **Berechnung starten**: 
   - Nachdem das Modell erstellt oder importiert und der Solver gewählt wurde, können Sie die Berechnung starten.

4. **Ergebnisse exportieren**: 
   - Die Resultate können als Dateien exportiert werden, um sie für spätere Analysen zu verwenden.


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

6. **Test Ausführung**:
   Um sicherzustellen, dass die Anwendung korrekt funktioniert, können Sie die Tests ausführen. 
   Führen Sie die Tests mit folgendem Befehl aus:
   ```bash
   npm run test
   ```

7. **Linter Ausführung**:
   Um den Linter zu starten kann man folgenden Befehl ausführen:
   ```bash
   npm run lint
   ```

Nun können Sie die Anwendung lokal nutzen und weiterentwickeln. Alle Änderungen am Code werden automatisch übernommen und der Server wird bei jeder Änderung neu geladen.

### Verwendete Frameworks

#### Next.js 
Wie nutzen Next.js aus folgenden Gründen:  
1. Server-Side Rendering (SSR)  
- Schnelle Initiale Ladezeiten: SSR führt zu schnelleren initialen Seitenladezeiten, da der Server den gesamten Inhalt liefert und der Browser nicht auf das clientseitige Rendering warten muss.  
2. Optimierte Performance  
- Automatisches Code-Splitting: Next.js teilt deinen Code automatisch auf, um nur das Nötigste zu laden. Dies reduziert die Ladezeiten und verbessert die allgemeine Performance der Website.  
- Optimierung von Bildern: Mit der integrierten Next.js Image-Komponente kannst du Bilder optimieren (z.B. Lazy Loading, automatische Größenanpassung), was die Ladegeschwindigkeit weiter verbessert.  
3. Internationalisierung (i18n)  
- Eingebaute Unterstützung für mehrsprachige Webseiten: Next.js bietet native Unterstützung für Internationalisierung, was die Implementierung mehrsprachiger Webseiten vereinfacht.  
4. TypeScript-Unterstützung  
- Nahtlose Integration mit TypeScript: Next.js bietet First-Class TypeScript-Unterstützung. Das bedeutet, dass du ohne große Konfiguration TypeScript in deinem Projekt verwenden kannst.  
5. Vercel-Hosting und Deployment  
- Nahtloses Deployment mit Vercel: Vercel, das Unternehmen hinter Next.js, bietet eine exzellente Hosting-Plattform für Next.js-Anwendungen. Du kannst dein Projekt mit einem Klick automatisch deployen, und es unterstützt Funktionen wie Edge-Caching und statische Bereitstellungen, um die Performance deiner Website weiter zu optimieren.  
6. React-Basierte Entwicklung  
- Kompatibilität mit React-Ökosystem: Da Next.js auf React aufbaut, kannst du alle bekannten React-Bibliotheken und -Tools verwenden. Wenn du bereits Erfahrung mit React hast, ist der Einstieg in Next.js sehr einfach.  
7. Integrierte CSS- und Sass-Unterstützung  
Next.js unterstützt CSS- und Sass-Module von Haus aus, ohne dass zusätzliche Konfigurationen erforderlich sind. Du kannst auch styled-components oder andere CSS-in-JS-Lösungen nahtlos integrieren.  
