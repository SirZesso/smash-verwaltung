class State {
    constructor() {
        // Tries to load the sate from the local storage
        // If this fails it loads an empty array instead
        this.load();
    }

    // Finds an ortschaft with the PK PLZ
    // Returns an ortschaft or null
    findOrtschaft(plz) {
        this.ortschaften.forEach((ortschaft) => {
            if (ortschaft.plz == plz) {
                return ortschaft;
            }
        });
        return null;
    }

    // Checks if an ortschaft exists in the list, otherwise return false
    existsOrtschaft(plz) {
        if (this.findOrtschaft(plz) == null) {
            return false;
        }
        return true;
    }

    // Adds an ortschaft if it doesnt already exist
    addOrtschaft(plz, name) {
        if (!this.existsOrtschaft(plz)) {
            this.ortschaften.push(new Ortschaft(plz, name));
            this.save();
        }
    }

    // Finds a person with keys vorname & nachname
    findPerson(name, vorname) {
        this.personen.forEach((person) => {
            if (person.name == name && person.vorname == vorname) {
                return person;
            }
        });
        return null;
    }

    // Checks if an person exists in the list, otherwise return false
    existsPerson(name, vorname) {
        if (this.findPerson(name, vorname) == null) {
            return false;
        }
        return true;
    }

    // Adds an person if it doesnt already exist
    addPerson(name, vorname, geburtsdatum, heimatort) {
        if (!this.existsPerson(name, vorname)) {
            this.personen.push(new Person(name, vorname, geburtsdatum, heimatort));
            this.save();
        }
    }

    // Getter for Ortschaften
    getOrtschaften() {
        return this.ortschaften;
    }

    // Getter for personen
    getPersonen() {
        return this.personen;
    }

    // Add adress to personen
    addAdresseToPerson(name, vorname, addresse, isHauptAddresse = false) {
        person = this.findPerson(name, vorname);
        if (person != null) {
            person.addAdresse(addresse, isHauptAddresse)
        }
        // TODO: Add alert
    }

    // Saves the state to local storage
    save() {
        localStorage.setItem('personen', JSON.stringify(this.personen));
        localStorage.setItem('ortschaften', JSON.stringify(this.ortschaften));
    }

    // Loads the state from local storage
    load() {
        try {
            this.personen = JSON.parse(localStorage.getItem('personen'));
            this.ortschaften = JSON.parse(localStorage.getItem('ortschaften'));
        } finally {
            if (this.personen == null) {
                this.personen = [];
            }
            if (this.ortschaften == null) {
                this.ortschaften = [];
            }
        }
        
    }

    test() {
        this.addOrtschaft(3000, "Bern");
        this.addOrtschaft(4500, "Solothurn");
    }

}

class Person {
    constructor(name, vorname, geburtsdatum, heimatort, addressen = []) {
        this.name = name;
        this.vorname = vorname;
        this.geburtsdatum = geburtsdatum;
        this.heimatort = heimatort;  // Einzelne Ortschaft
        this.adressen = [];  // Liste der Addressen
    }

    // Adds a new address
    addAdresse(addresse, isHauptAddresse = false) {
        if (this.hasHauptAdresse() && isHauptAddresse) {
            // TODO: Add alert to overwrite hauptadresse
        } else {
            if (!this.existsAdresse(addresse)) {
                this.adressen.append(addresse);
            }
            // TODO: Add alert
        }
    }

    // Checks if this person has an hauptadresse aready
    hasHauptAdresse() {
        let result = false;
        this.addressen.forEach(addresse => {
            if (addresse.isHauptAddresse) {
                result = true;
            }
        });
        return result;
    }

    // Checks if address already exists for this person
    existsAdresse(addresse) {
        this.adressen.forEach((existing) => {
            if (existing.strasse == addresse.strasse && existing.nummer == addresse.nummer && existing.ortschaft.plz == addresse.ortschaft.plz) {
                return true;
            }
        });
        return false;
    }

}

class Adresse {
    constructor(strasse, nummer, ortschaft, isHauptAddresse = false) {
        this.strasse = strasse;
        this.nummer = nummer;
        this.ortschaft = ortschaft;  // Einzelne Ortschaft
        this.isHauptAddresse = isHauptAddresse
    }
}

class Ortschaft {
    constructor(plz, name) {
        this.plz = plz;
        this.name = name;
    }
}

// Initialize the state and make it usable
state = new State();
