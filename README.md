# Smash Verwaltung
Dokumentiere deine Smashes und halte fest wo du schon alles gesmasht hast! 

## Ausgangslage

...ist ein kleiner Prototyp, den ihr mit egal welcher Technologie erstellen sollt:

- Eine Datenbanktabelle Person mit den Spalten Name, Vorname, Geburtsdatum und Heimatort (Interne Daten, mittel)
- Eine Datenbanktabelle Adresse mit den Spalten Strasse, Nummer, gültig ab, gültig bis (interne Daten, mittel)
- Eine Datenbanktabelle Ortschaft mit den Spalten PLZ und Ort (interne Daten, einfach)
- Die Beziehungen sind wie folgt definiert: Eine Person kann mehrere Adressen haben, nur eine ist jeweils gültig, eine Adresse hat genau eine Ortschaft
- Es muss in einem grafischen Benutzerinterface (GUI) möglich sein
-- neue Personen zu erfassen
-- bestehende Personen zu löschen
-- bestehende Personen zu mutieren
-- einer Person eine neue Adresse hinzuzufügen
-- Ortschaften in einem Ortschaftsverzeichnis zu pflegen (neu, bearbeiten, löschen)
-- Eine Liste aller Personen mit allen Adressen am Bildschirm auszugeben

## Aufgabe

- [x] Erstellt kurz ein paar Handskizzen, wie diese Applikation aussehen soll
- [ ] Ermittelt aus den Skizzen die Anzahl Transaktionen (Input, Output, Abfragen)
- [x] Versucht den Schwierigkeitsgrad abzuschätzen
- [ ] Berechnet die Function Points in einem Excel Sheet
- [x] Programmiert die Applikation mit einer Technologie nach Wahl (die Cracks sollen ran, die anderen unterstützen). Der Aufwand dafür sollte 5 Stunden nicht überschreiten. Fragt, wenn ihr Fragen habt. Schön ist nicht wichtig. Nur die Funktionalität muss stimmen. Messt den Aufwand so genau wie möglich für die einzelnen Function Points.
- [ ] Erstellt eine Auswertung, welche FPs wie lange in der Umsetzung brauchten
- [x] Gebt die Auswertung und die Applikation inkl. Source Code ab

## Beurteilungskriterien

* Vollständigkeit der Umsetzung
* Vollständigkeit und Nachvollziehbarkeit der Function Point Aufstellung
* Nachvollziehbarkeit der Aufwandsdokumentation
* Wiederverwendbarkeit der Kalkulation
