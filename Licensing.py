import os

# Definiere den String, der an den Anfang jeder Datei angefügt werden soll
string_to_prepend = """/*\n* This program is free software: you can redistribute it and/or modify\n* it under the terms of the GNU General Public License as published by\n* the Free Software Foundation, version 2 of the License.\n*\n* This program is distributed in the hope that it will be useful,\n* but WITHOUT ANY WARRANTY; without even the implied warranty of\n* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the\n* GNU General Public License for more details.\n*/\n\n"""

# Funktion, um den Text an den Anfang der Datei einzufügen
def prepend_to_file(file_path, string_to_prepend):
    # Öffne die Datei und lies den Inhalt
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Schreibe den neuen Inhalt (angefügter String + alter Inhalt)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(string_to_prepend + content)

# Funktion, um rekursiv durch die Verzeichnisse zu gehen und Dateien zu bearbeiten
def process_directory(directory, string_to_prepend):
    for root, _, files in os.walk(directory):
        for file in files:
            # Überprüfe, ob die Datei die richtige Endung hat
            if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
                file_path = os.path.join(root, file)
                prepend_to_file(file_path, string_to_prepend)
                print(f"Text wurde zu {file_path} hinzugefügt.")

# Hauptfunktion
if __name__ == "__main__":
    # Gebe hier das Verzeichnis an, das durchsucht werden soll
    directory_to_process = input("Gib das Verzeichnis an, das verarbeitet werden soll: ")
    
    # Starte den Verarbeitungsprozess
    process_directory(directory_to_process, string_to_prepend)
