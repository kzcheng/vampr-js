class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;

    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    for (const vampire of this.offspring) {
      const catchVamp = vampire.vampireWithName(name);
      if (catchVamp) {
        return catchVamp;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0;
    for (const vamp of this.offspring) {
      total += vamp.totalDescendents + 1;
    }
    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let list = [];
    if (this.yearConverted > 1980) {
      list.push(this);
    }
    for (const descendant of this.offspring) {
      const descendantsList = descendant.allMillennialVampires;
      list = Array.prototype.concat(list, descendantsList);
    }
    return list;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let myAncestors = [this];
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      myAncestors.push(currentVampire);
    }

    let theirAncestors = [vampire];
    currentVampire = vampire;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      theirAncestors.push(currentVampire);
    }

    for (const vamp of myAncestors) {
      const searchResult = theirAncestors.find(element => element === vamp);
      if (searchResult) {
        return searchResult;
      }
    }
    return undefined;
  }
}

module.exports = Vampire;

let rootVampire;
let offspring1, offspring2, offspring3, offspring4, offspring5, offspring6, offspring7, offspring8;
rootVampire = new Vampire("root");
offspring1 = new Vampire("a", 1000);
offspring2 = new Vampire("b", 900);
offspring3 = new Vampire("c", 1400);
offspring4 = new Vampire("d", 1890);
offspring5 = new Vampire("e", 1990);
offspring6 = new Vampire("f", 2000);
offspring7 = new Vampire("g", 2010);
offspring8 = new Vampire("h", 2017);

rootVampire.addOffspring(offspring1);
rootVampire.addOffspring(offspring2);
rootVampire.addOffspring(offspring3);
offspring3.addOffspring(offspring4);
offspring3.addOffspring(offspring5);
offspring5.addOffspring(offspring6);
offspring6.addOffspring(offspring7);
offspring2.addOffspring(offspring8);

console.log(rootVampire.allMillennialVampires);