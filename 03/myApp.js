require('dotenv').config();
const envs = process.env;
const mongoose = require('mongoose');

//connect to mongo db. the url is stored as env var
mongoose.connect(envs.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//create a model called "Person" using personSchema
const personSchema = {
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [String]
}
const Person = mongoose.model('Person', personSchema);

//create some person data
const person1 = new Person({ name: 'James', age: 40, favoriteFoods: ['watermelon'] });
const person2 = new Person({ name: 'Daniel', age: 24, favoriteFoods: ['steak'] });
const arrayOfPeople = [person1, person2];

//create a record in db
const createAndSavePerson = (done) => {
    person1.save((err, data) => err ? done(err) : done(null, data));
};

//create many records in db
const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, data) => err ? done(err) : done(null, data));
};

//find records in db
const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (err, data) => err ? done(err) : done(null, data));
};

const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => err ? done(err) : done(null, data));
};

const findPersonById = (personId, done) => {
    Person.findById(personId, (err, data) => err ? done(err) : done(null, data));
};

//update(add on top) record's favouriteFood
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

//another way to update record
const findAndUpdate = (personName, done) => {
    const ageToSet = 20;

    Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedPerson) =>
        (err) ? done(err) : done(null, updatedPerson)
    )
};

//remove a record
const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, deletedPerson) => (err) ? done(err) : done(null, deletedPerson))
};

//remove many records
const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({ name: nameToRemove }, (err, deletedPersons) => (err) ? done(err) : done(null, deletedPersons))
};

//find records by criterias, and hide their age
const queryChain = (done) => {
    const foodToSearch = "burrito";
    Person.find({ favoriteFoods: foodToSearch })
        .sort({ name: 1 })
        .limit(2)
        .select({ age: 0 })
        .exec((err, deletedPersons) => (err) ? done(err) : done(null, deletedPersons));
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
