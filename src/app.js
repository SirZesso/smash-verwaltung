let personen = [];
let ortschaften = [];

class Person {
    constructor(name, vorname, geburtsdatum, heimatort, addressen, hauptadresse) {
        this.name = name;
        this.vorname = vorname;
        this.geburtsdatum = geburtsdatum;
        this.heimatort = heimatort;  // Einzelne Ortschaft
        this.hauptadresse = hauptadresse;
        this.adressen = addressen;  // Liste der Addressen
    }
}

class Adresse {
    constructor(strasse, nummer, ortschaft) {
        this.strasse = strasse;
        this.nummer = nummer;
        this.ortschaft = ortschaft;  // Einzelne Ortschaft
    }
}

class Ortschaft {
    constructor(plz, name) {
        this.plz = plz;
        this.name = name;
    }
}

function store() {
    localStorage.setItem('personen', JSON.stringify(personen));
    localStorage.setItem('ortschaften', JSON.stringify(ortschaften));
}

function load() {
    
}
