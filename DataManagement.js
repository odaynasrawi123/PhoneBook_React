'use-strict';

//constructor for Contact
var Contact = function(name, phone, address, age, imgUrl) {
    //var scope = this;

    this.name = name;
    this.phone = phone;
    this.address = address;
    this.age = age;
    this.imgUrl = imgUrl;

    //Gets the current new contact id
    var id = localStorage.getItem('contactsId');
    if(!id) id = 0; //if id is null then set it to 0

    //Sets the current id
    this.id = id;

    //Updates the id to the next contact
    localStorage.setItem('contactsId', ++id);
};

//DataManager instance
var DataManager = new (function() {
    var scope = this;

    this.contacts = [];

    const contactsKey = 'contacts';

    //====================
    //===Event Handlers===
    //====================
    this.dataEdited = () => {};

    //Adds new contact object to the contacts array
    this.addContact = function(contact) {
        //Check if contact with same name already exists
        let cont = scope.contacts.find(c => c.name === contact.name);
        if(cont) {
            if(window.confirm("A simular contact with the same name was found do you wan't to replace it?")) {
                //If found only update data
                cont.phone = contact.phone;
                cont.address = contact.data;
                cont.address = contact.address;
                cont.age = contact.age;
                cont.imgUrl = contact.imgUrl;
            }
        } else scope.contacts.push(contact); //Add contact
        //Notify data update
        scope.dataEdited();
    };
    
    //Saves the array to the local storage
    this.saveContacts = function() {
        localStorage.setItem(contactsKey, JSON.stringify(scope.contacts));
    }

    //Removes contact by id
    this.removeContact = function(id) {
        var index = scope.contacts.findIndex(contact => {
            return contact.id === id;
        });
        scope.contacts.splice(index, 1);
    };

    //Deletes all contacts
    this.deleteContacts = function() {
        scope.contacts = [];
        localStorage.removeItem(contactsKey);
        //Notify data update
        scope.dataEdited();
    };

    //Gets contact object by id
    this.getContact = function(id) {
        return scope.contacts.find(contact => {
            return contact.id === id;
        });
    };

    //Updates contact data by id
    this.updateContactData = function(id, name, phone, address, age, imgUrl) {
        var index = scope.contacts.findIndex(contact => {
            return contact.id === id;
        });
        if(index === -1) return false;
        scope.contacts[index].name = name;
        scope.contacts[index].phone = phone;
        scope.contacts[index].address = address;
        scope.contacts[index].age = age;
        scope.contacts[index].imgUrl = imgUrl;
        //Notify data update
        scope.dataEdited();
    };

    //Loads the contacts array from local storage
    this.loadContacts = function() {
        var data = localStorage.getItem(contactsKey);
        data = data ? JSON.parse(data) : [];
        scope.contacts = data;
    }

    /*=======Four people in first time use======*/
    if(localStorage.getItem('contactsId') === null) {
        this.addContact(new Contact("Issa Misherky", "050-7337780", "", "12", "https://i.pravatar.cc/60?img=2"));
        this.addContact(new Contact("Oday Nasrawi", "052-6789463", "", "12", "https://i.pravatar.cc/60?img=3"));
        this.addContact(new Contact("React Native", "050-0000000", "", "12", "https://i.pravatar.cc/60?img=1"));
        this.addContact(new Contact("Malek Noon", "050-0000000", "", "12", "https://i.pravatar.cc/60?img=4"));
        this.saveContacts();
    }
    /*==========================================*/

    //Loads the contacts data at start up
    this.loadContacts();
})();

export default DataManager;
export { Contact };