class State {
    constructor() {
        // Tries to load the sate from the local storage
        // If this fails it loads an empty array instead
        this.load();
        // Load ortschaften that should exist
        this.addExistentOrtschaften();
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
                return person 
            }
        });
        return null;
    }

    // Returns the index of the person
    indexOfPerson(name, vorname) {
        let person = this.findPerson(name, vorname);
        if (person != null) {
            return this.personen.indexOf(person);
        }
    }

    // Deletes a person
    deletePerson(name, vorname) {
        if (this.indexOfPerson(name, vorname) != null) {
            delete this.personen[this.indexOfPerson(name, vorname)];
        }
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
        this.addPersonObj(new Person(name, vorname, geburtsdatum, heimatort));
    }

    // Adds an person if it doesnt already exist
    addPersonObj(person) {
        if (!this.existsPerson(person.name, person.vorname)) {
            this.personen.push(person);
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
        let person = this.findPerson(name, vorname);
        if (person != null) {
            // Delete person in the state
            this.deletePerson(name, vorname);
            person.addAdresse(addresse, isHauptAddresse);
            this.addPerson(person)
            this.save(); // Update the state
        }
        // TODO: Add alert
        
    }

    // Saves the state to local storage
    save() {
        localStorage.setItem('personen', JSON.stringify(this.personen));
        localStorage.setItem('ortschaften', JSON.stringify(this.ortschaften));
        
        this.renderPersonenTable();
        this.renderOrtschaftenTable();
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
        this.renderPersonenTable();
        this.renderOrtschaftenTable();
    }

    // Adds Ortschaften from Personen to the table that must exist
    addExistentOrtschaften() {
        this.personen.forEach(person => {
            if (person.addressen != null && person.addressen.length > 0) {
                person.addressen.forEach((addresse) => {
                    if (!this.existsOrtschaft(addresse.plz)) {
                        this.addOrtschaft(addresse.ortschaft.plz, addresse.ortschaft.name);
                    }
                });

                if(person.heimatort != null && !this.existsOrtschaft(person.heimatort.plz)) {
                    this.addOrtschaft(person.heimatort.plz, person.heimatort.name);
                }
            }
        });
    }

    renderPersonenTable() {
        let personenTable = document.getElementById('personen');
        // Remove contents
        personenTable.innerHTML = "";
        // Add content again
        this.personen.forEach((person) => {
            personenTable.innerHTML += `
            <tr>
            <td>${person.name}</td>
            <td>${person.vorname}</td>
            <td>${person.geburtsdatum}</td>
            <td>${person.heimatort.plz} - ${person.heimatort.name}</td>
            <td>
            `
            if (person.addressen != null && person.addressen.length > 0) {
                person.addressen.forEach((addresse) => {
                    personenTable.innerHTML += `
                    ${addresse.strasse} ${addresse.nummer}, ${addresse.ortschaft.plz} ${addresse.ortschaft.name}
                    `
                });
            }
            personenTable.innerHTML += `
            </td>
            <td>
                <a class="add" title="" data-toggle="tooltip" data-original-title="Add"><i class="material-icons"></i></a>
                <a class="edit" title=""><i class="material-icons"></i></a>
            </td>
            </tr>
            `;
        });   
    }

    renderOrtschaftenTable() {
        let ortschaftenTable = document.getElementById('ortschaften');
        // Remove contents
        ortschaftenTable.innerHTML = "";
        // Add content again
        this.ortschaften.forEach((ortschaft) => {
            ortschaftenTable.innerHTML += `
            <tr>
            <td>${ortschaft.plz}</td>
            <td>${ortschaft.name}</td>
            <td>
                <a class="add" title="" data-toggle="tooltip" data-original-title="Add"><i class="material-icons"></i></a>
                <a class="edit" title=""><i class="material-icons"></i></a>
            </td>
            </tr>
            `;
        });   
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
let state = new State();
