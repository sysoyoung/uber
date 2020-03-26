let db;

function createDB() {
    let openRequest = indexedDB.open('eber', 1);

    openRequest.onupgradeneeded = function() {

        db = openRequest.result;
        if (db != undefined) {
            if (!db.objectStoreNames.contains('customers')) {
                let customers = db.createObjectStore('customers');
                customers.createIndex('email_customer', '_email');
            }
            if (!db.objectStoreNames.contains('drivers')) {
                let drivers = db.createObjectStore('drivers');
                drivers.createIndex('email_driver', '_email');
            }
            if (!db.objectStoreNames.contains('trucks')) {
                let trucks = db.createObjectStore('trucks');
                trucks.createIndex('type_truck', '_type');
                trucks.createIndex('driver_id_truck', '_driverId');
            }
            if (!db.objectStoreNames.contains('loads')) {
                let loads = db.createObjectStore('loads');
                loads.createIndex('customer_id_load', '_customerId');
                loads.createIndex('driver_id_load', '_driverId');
                loads.createIndex('load_state', '_state');
            }
            console.log('DB upgraded');
        }
    }

    openRequest.onsuccess = function() {
        db = openRequest.result;
        if (db != undefined) {
            console.log('success');
            if (db.objectStoreNames.contains('customers')) {
                console.log('customer object exist');
                setNumberCustomers();
            }
            if (db.objectStoreNames.contains('drivers')) {
                console.log('drivers object exist');
                setNumberDrivers();
            }
            if (db.objectStoreNames.contains('trucks')) {
                console.log('trucks object exist');
                setNumberTrucks();
            }
            if (db.objectStoreNames.contains('loads')) {
                console.log('loads object exist');
                setNumberLoads();
            }
        }
    };

    openRequest.onerror = function() {
        console.error("Error", openRequest.error);
    };
};

function setNumberCustomers() {
    let transaction = db.transaction('customers');
    let customers = transaction.objectStore('customers');
    let request = customers.getAll();

    request.onsuccess = function() {
        arr = request.result;
        if (arr != undefined) {
            Customer.count = arr.length + 1;
        }
    }
}

function setNumberDrivers() {
    let transaction = db.transaction('drivers');
    let drivers = transaction.objectStore('drivers');
    let request = drivers.getAll();

    request.onsuccess = function() {
        arr = request.result;
        if (arr != undefined) {
            Driver.count = arr.length + 1;
        }
    }
}

function setNumberTrucks() {
    let transaction = db.transaction('trucks');
    let trucks = transaction.objectStore('trucks');
    let request = trucks.getAll();

    request.onsuccess = function() {
        arr = request.result;
        if (arr != undefined) {
            Truck.count = arr.length + 1;
        }
    }
}

function setNumberLoads() {
    let transaction = db.transaction('loads');
    let loads = transaction.objectStore('loads');
    let request = loads.getAll();

    request.onsuccess = function() {
        arr = request.result;
        if (arr != undefined) {
            Load.count = arr.length + 1;
        }
    }
}


function deleteDB() {
    if (db) {
        db.close();
    }
    indexedDB.deleteDatabase('eber');
    console.log('DB deleted')
}

class User {

    constructor(id, name, lastName, age, phone, email, password, mark) {
        this._id = id;
        this._name = name;
        this._lastName = lastName;
        this._age = age;
        this._phone = phone;
        this._email = email;
        this._password = password;
        this._mark = mark;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get lastname() {
        return this._lastName;
    }

    get age() {
        return this._age;
    }

    get phone() {
        return this._phone;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password
    }

    get mark() {
        return this._mark;
    }

    set mark(value) {
        if (this._mark == 0) {
            this._mark = value;
        } else {
            this._mark = (this._mark + value) / 2;
        }
    }
}

class Customer extends User {

    static count = 1;

    constructor(name, lastName, age, phone, email, password, id = Customer.count++, mark = 0, loads = []) {
        super(id, name, lastName, age, phone, email, password, mark);
        this._loads = loads;
    }

    get loads() {
        return this._loads;
    }

    addCustomerLoadId(load) {
        this._loads.push(load);
    }

    deleteLoadId(pos) {
        this._loads.splice(pos, 1);
    }

}

class Driver extends User {
    _city;
    _anotherCity; // yes | no
    _truckId;
    _loadId;

    static count = 1;

    constructor(name, lastName, age, phone, email, password, city, anotherCity, id = Driver.count++, mark = 0, truckId = 0, loadId = 0) {
        super(id, name, lastName, age, phone, email, password, mark);
        this._city = city;
        this._anotherCity = anotherCity;
        this._truckId = truckId;
        this._loadId = loadId;
    }

    get city() {
        return this._city;
    }

    get anotherCity() {
        return this._anotherCity;
    }

    get truckId() {
        return this._truckId;
    }

    set truckId(value) {
        this._truckId = value;
    }

    get loadId() {
        return this._loadId;
    }

    set loadId(value) {
        this._loadId = value;
    }
}

class Load {
    _id;
    _title;
    _size; // small | medium | large
    _weight;
    _description;
    //_from; // city | street | house
    //_to;
    _state; //created | posted | taken | loaded | completed | refused | notfound
    _customerId;
    _driverId;

    static count = 1;

    constructor(title, size, weight, description, fromCity, fromStreet, toCity, toStreet, customerId, id = Load.count++, state = 'created', driverId = 0) {
        this._id = id;
        this._title = title;
        this._size = size;
        this._weight = weight;
        this._description = description;
        this._fromCity = fromCity;
        this._fromStreet = fromStreet;
        this._toCity = toCity;
        this._toStreet = toStreet;
        this._state = state;
        this._customerId = customerId;
        this._driverId = driverId;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get title() {
        return this._title;
    }

    get size() {
        return this._size;
    }

    get weight() {
        return this._weight;
    }

    get description() {
        return this._description;
    }

    get fromCity() {
        return this._fromCity;
    }

    get fromStreet() {
        return this._fromStreet;
    }

    get toCity() {
        return this._toCity;
    }

    get toStreet() {
        return this._toStreet;
    }

    get customerId() {
        return this._customerId;
    }

    get driverId() {
        return this.driverId;
    }

    set driverId(value) {
        this._driverId = value;
    }
}

class Truck {
    _id;
    _title
    _type;
    _weightCapacity;
    _loadSize;
    _praice;
    _driverId;

    static count = 1;

    constructor(title, type, weightCapacity, loadSize, praice, id = Truck.count++, driverId = 0) {
        this._id = id;
        this._title = title;
        this._type = type;
        this._weightCapacity = weightCapacity;
        this._loadSize = loadSize;
        this._praice = praice;
        this._driverId = driverId;
    }

    get id() {
        return this._id;
    }
}

class Sprinter extends Truck {
    constructor(title) {
        super(title, 'Sprinter', 500, 'small', 300);
    }
}

class SmallStraite extends Truck {
    constructor(title) {
        super(title, 'Small Straite', 900, 'medium', 500);
    }
}

class LongStraite extends Truck {
    constructor(title) {
        super(title, 'Long Straite', 1500, 'large', 800);
    }
}

function navigation(current, select) {
    if (current.length > 1) {
        current.forEach(element => {
            document.querySelector(`${element}`).style.display = 'none';
        });
    } else {
        document.querySelector(`${current}`).style.display = 'none';
    }

    if (select.length > 1) {
        select.forEach(element => {
            document.querySelector(`${element}`).style.display = 'flex';
        });
    } else {
        document.querySelector(`${select}`).style.display = 'flex';
    }
}

// ------------------------- REGISTAARTION

function checkRegistrationForm() {

    event.preventDefault();

    let name = document.querySelector('#registration-name');
    let lastname = document.querySelector('#registration-lastname');
    let age = document.querySelector('#registration-age');
    let phone = document.querySelector('#registration-phone');
    let email = document.querySelector('#registration-email');
    let pass = document.querySelector('#registration-password');

    let err = false;

    if (isInputEmpty(name)) {
        err = true;
    }
    if (isInputEmpty(lastname)) {
        err = true;
    }
    if (isInputEmpty(age)) {
        err = true;
    }
    if (isInputEmpty(pass)) {
        err = true;
    }

    let phoneReg = /^\d[\d\(\)\ -]{8,13}\d$/;
    if (phoneReg.test(phone.value) == false) {
        phone.style.borderColor = 'red';
        setTimeout(() => phone.removeAttribute('style'), 3000);
        err = true;
    }

    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email.value) == false) {
        email.style.borderColor = 'red';
        setTimeout(() => email.removeAttribute('style'), 3000);
        err = true;
    }

    if (document.querySelector('.driver-form').style.display == 'flex') {
        let city = document.querySelector('#registration-city');
        let anotherCity = document.querySelector('#registration-anothercity');

        if (isInputEmpty(city)) {
            err = true;
        }
        if (isInputEmpty(anotherCity)) {
            err = true;
        }
    }

    if (err) {
        return err;
    }

    checkEqualEmail(email);

    return err;
}

function checkEqualEmail(mail) {

    let transaction = db.transaction('customers');
    let customers = transaction.objectStore('customers');
    let emailIndex = customers.index("email_customer");

    let request = emailIndex.get(mail.value);

    request.onsuccess = function() {
        if (request.result !== undefined) {
            console.log('user exist');
            redBorder(mail);
        } else {
            let transaction = db.transaction('drivers');
            let drivers = transaction.objectStore('drivers');
            let emailIndex = drivers.index("email_driver");

            let request = emailIndex.get(mail.value);

            request.onsuccess = function() {
                if (request.result !== undefined) {
                    console.log('user exist');
                    redBorder(mail);
                } else {
                    console.log("email is unique");
                    registration();
                }
            }
        }
    };
}

function registrationFormClear() {
    document.querySelector('#registration-name').value = '';
    document.querySelector('#registration-lastname').value = '';
    document.querySelector('#registration-age').value = '';
    document.querySelector('#registration-phone').value = '';
    document.querySelector('#registration-email').value = '';
    document.querySelector('#registration-password').value = '';
    document.querySelector('#registration-city').value = '';
    document.querySelector('#registration-anothercity').value = '';
}

function registration() {
    let name = document.querySelector('#registration-name').value;
    let lastname = document.querySelector('#registration-lastname').value;
    let age = document.querySelector('#registration-age').value;
    let phone = document.querySelector('#registration-phone').value;
    let email = document.querySelector('#registration-email').value;
    let pass = document.querySelector('#registration-password').value;

    if (document.querySelector('.driver-form').style.display == 'flex') {

        let city = document.querySelector('#registration-city').value;
        let anotherCity = document.querySelector('#registration-anothercity').value;
        let driver = new Driver(name, lastname, age, phone, email, pass, city, anotherCity);

        saveUser(driver);

        console.log('setting User' + `${driver.id}(id)`);
        setUser(driver.id);

        showDriverMark();
        navigation(['form[name=registration]', '.driver-form'], ['.driver-page']);

    } else {
        let customer = new Customer(name, lastname, age, phone, email, pass);

        saveUser(customer);

        console.log('setting User' + `${customer.id}(id)`);
        setUser(customer.id);

        clearLoadList();

        showCustomersMark();
        navigation(['form[name=registration]'], ['.customer-page']);
    }
    registrationFormClear();
}
//-------------------------------------------------INPUT SETTING
function isInputEmpty(element) {
    if (element.value == '') {
        redBorder(element)
        return true;
    }
    return false;
}

function redBorder(element) {
    element.style.borderColor = 'red';
    setTimeout(() => element.removeAttribute('style'), 3000);
}
//----------------------------------------------------ENTER

function checkEnterForm() {

    event.preventDefault();

    let email = document.querySelector('#enter-email');
    let pass = document.querySelector('#enter-password');

    let err = false;

    if (isInputEmpty(pass)) {
        err = true;
    }
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email.value) == false) {
        email.style.borderColor = 'red';
        setTimeout(() => email.removeAttribute('style'), 3000);
        err = true;
    }

    if (err) {
        return err
    }
    findUserEmail(email, pass);
}

function enterFormClear() {
    document.querySelector('#enter-email').value = '';
    document.querySelector('#enter-password').value = '';
}

function findUserEmail(mail, pass) {

    let transaction = db.transaction('customers');
    let customers = transaction.objectStore('customers');
    let emailIndex = customers.index("email_customer");

    let request = emailIndex.get(mail.value);

    request.onsuccess = function() {
        if (request.result !== undefined) {
            console.log('user exist');

            checkEqualPassword(pass, request.result, 'customer');

        } else {
            let transaction = db.transaction('drivers');
            let drivers = transaction.objectStore('drivers');
            let emailIndex = drivers.index("email_driver");

            let request = emailIndex.get(mail.value);

            request.onsuccess = function() {
                if (request.result !== undefined) {
                    console.log('user exist');
                    checkEqualPassword(pass, request.result, 'driver');
                } else {
                    console.log("no such user");
                    redBorder(mail);
                }
            }
        }
    };
}

function checkEqualPassword(pass, userObj, user) {
    console.log('checking pass');
    if (pass.value == userObj._password) {

        setUser(userObj._id);

        if (user == 'customer') {
            showCustomersMark();
            getCurrentCustomer(getLoadList);
            navigation(['form[name=enter]'], ['.customer-page']);
        } else {
            getCurrentDriver(showTakenLoad);
            showDriverMark();
            navigation(['form[name=enter]'], ['.driver-page']);
        }
        enterFormClear();
    } else {
        redBorder(pass);
        console.log('password incorrect')
    }
}

//------------------------------------------------------SET USER

function saveUser(user) {

    let users;

    if (user instanceof Customer) {
        let transaction = db.transaction("customers", "readwrite");
        users = transaction.objectStore("customers");
    } else {
        let transaction = db.transaction("drivers", "readwrite");
        users = transaction.objectStore("drivers");
    }

    let request = users.add(user, user.id);

    request.onsuccess = function() {
        console.log("Пользователь добавлен в хранилище. id = ", request.result);
    };

    request.onerror = function() {
        console.log("Ошибка", request.error);
    };
}

function deleteUser(user) {
    let transaction = db.transaction(`${user}s`, "readwrite");
    let users = transaction.objectStore(`${user}s`);
    users.delete(getUser());
}

// ------------------------  SET CURRENT USER
function setUser(id) {
    document.cookie = `currentUser=${id}`;
}

function getUser() {
    let currentUser = document.cookie;
    let arr = currentUser.split('=');
    return +arr[1];
}

// ---------------------- CREATE NEW LOAD

function checkLoadForm() {
    event.preventDefault();

    let title = document.querySelector('#load-title');
    let size = document.querySelector('#load-size');
    let weight = document.querySelector('#load-weight');
    let description = document.querySelector('#description');

    let fromCity = document.querySelector('#from-city');
    let fromStreet = document.querySelector('#from-street');
    let toCity = document.querySelector('#to-city');
    let toStreet = document.querySelector('#to-street');

    let err = false;

    if (isInputEmpty(title)) {
        err = true;
    }
    if (isInputEmpty(size)) {
        err = true;
    }
    if (isInputEmpty(weight)) {
        err = true;
    }
    if (isInputEmpty(description)) {
        err = true;
    }
    if (isInputEmpty(fromCity)) {
        err = true;
    }
    if (isInputEmpty(fromStreet)) {
        err = true;
    }
    if (isInputEmpty(toCity)) {
        err = true;
    }
    if (isInputEmpty(toStreet)) {
        err = true;
    }

    if (err) {
        return err;
    }
    getCurrentCustomer(addLoad);
    return err;
}

function loadFormClean() {
    document.querySelector('#load-title').value = '';
    document.querySelector('#load-size').value = '';
    document.querySelector('#load-weight').value = '';
    document.querySelector('#description').value = '';

    document.querySelector('#from-city').value = '';
    document.querySelector('#from-street').value = '';
    document.querySelector('#to-city').value = '';
    document.querySelector('#to-street').value = '';
}

function addLoad(currentCustomer) {
    let title = document.querySelector('#load-title').value;
    let size = document.querySelector('#load-size').value;
    let weight = document.querySelector('#load-weight').value;
    let description = document.querySelector('#description').value;

    let fromCity = document.querySelector('#from-city').value;
    let fromStreet = document.querySelector('#from-street').value;
    let toCity = document.querySelector('#to-city').value;
    let toStreet = document.querySelector('#to-street').value;

    console.log('add load to customer(id):' + getUser());

    let load = new Load(title, size, weight, description, fromCity, fromStreet, toCity, toStreet, getUser());

    saveLoad(currentCustomer, load);

    navigation(['form[name=add-load]'], ['.customer-page']);
}

function saveLoad(customer, load) {
    let transaction = db.transaction("loads", "readwrite");
    let loads = transaction.objectStore("loads");
    let request = loads.add(load, load.id);

    request.onsuccess = function() {
        console.log("Груз добавлен в хранилище. id = ", request.result);
        loadFormClean();
        customer.addCustomerLoadId(load.id);
        deleteUser('customer');
        saveUser(customer);
        getCurrentCustomer(getLoadList);
    };

    request.onerror = function() {
        console.log("Ошибка", request.error);
        load.id = Load.count++;
        saveLoad(customer, load);
    };
}

//------------------------------------------LOAD LIST

function getLoadList(currentCustomer) {

    clearLoadList();

    let transaction = db.transaction('loads');
    let loads = transaction.objectStore('loads');
    let customerIdIndex = loads.index("customer_id_load");

    let request = customerIdIndex.getAll(getUser());

    request.onsuccess = function() {
        if (request.result !== undefined) {
            createLoadList(request.result, currentCustomer);
        } else {
            console.log('no loads')
        }
    }
}

function createLoadList(loadList, currentCustomer) {

    let loadListElem = document.querySelector('.customer-loads-list');
    let postedLoadListElem = document.querySelector('.customer-posted-loads-list');

    loadList.forEach(element => {
        let pos;
        let div;
        for (let i = 0; i < currentCustomer.loads.length; i++) {
            if (element._id == currentCustomer.loads[i]) {
                pos = i;
            }
        }
        switch (element._state) {
            case 'created':
                div = createCreatedItem(element, pos);
                loadListElem.append(div);
                break;
            case 'posted':
                div = createPostedLoadItem(element, pos);
                postedLoadListElem.append(div);
                break;
            case 'taken':
                div = createTakenItem(element, pos);
                postedLoadListElem.append(div);
                break;
            case 'loaded':
                div = createLoadedItem(element);
                postedLoadListElem.append(div);
                break;
            case 'completed':
                div = createCompletedItem(element, pos);
                postedLoadListElem.append(div);
                break;
            case 'refused':
                div = createRefusedItem(element, pos);
                loadListElem.append(div);
                break;
            case 'notfound':
                div = createNotFoundItem(element, pos);
                loadListElem.append(div);
                break;
        }
    });
}

function clearLoadList() {
    let customerLoadList = document.querySelector('.customer-loads-list');
    customerLoadList.innerHTML = '';
    customerLoadList = document.querySelector('.customer-posted-loads-list');
    customerLoadList.innerHTML = '';
}

function createCreatedItem(load, pos) {
    let div = document.createElement('div');
    div.className = "load-item";
    div.innerHTML = `${load._title} <div><button onclick="postLoadOnPosition(${pos})">post</button><button onclick="deleteLoadOnPosition(${pos})">delete</button></div> `;
    return div;
}

function createPostedLoadItem(load, pos) {
    let div = document.createElement('div');
    div.className = "load-posted-item";
    div.innerHTML = `${load._title} is posted <div><button onclick="refuseLoadOnPosition(${pos})">refuse</button><button onclick="deleteLoadOnPosition(${pos})">delete</button></div>`;
    return div;
}

function createTakenItem(load, pos) {
    let div = document.createElement('div');
    div.className = "load-taken-item";
    div.innerHTML = `Driver accepted the order ${load._title}  <button onclick="refuseLoadOnPosition(${pos})">refuse</button>`;
    return div;
}

function createLoadedItem(load) {
    let div = document.createElement('div');
    div.className = "load-loaded-item";
    div.innerHTML = `${load._title} is loaded`;
    return div;
}

function createCompletedItem(load, pos) {
    let div = document.createElement('div');
    div.className = "load-completed-item";
    div.innerHTML = `${load._title} is completed <div><button onclick="rejectLoadOnPosition(${pos})">reject</button><button onclick="confirmLoadOnPosition(${pos})">confirm</button></div>`;
    return div;
}

function createRefusedItem(load, pos) {
    let div = document.createElement('div');
    div.className = "load-refused-item";
    div.innerHTML = `${load._title} refused <div><button onclick="postLoadOnPosition(${pos})">post</button><button onclick="deleteLoadOnPosition(${pos})">delete</button></div>`;
    return div;
}

function createNotFoundItem(load, pos) {
    let div = document.createElement('div');
    div.className = "load-notfound-item";
    div.innerHTML = `There is no driver for ${load._title}  <div><button onclick="postLoadOnPosition(${pos})">post</button><button onclick="deleteLoadOnPosition(${pos})">delete</button></div>`;
    return div;
}

//------------------------------------------REFUSE LOAD

function refuseLoadOnPosition(pos) {
    getCurrentCustomer(refuseLoad, pos);
}

function refuseLoad(currentCustomer, pos) {
    let transaction = db.transaction(`loads`, "readwrite");
    let loads = transaction.objectStore(`loads`);
    let request = loads.get(currentCustomer.loads[pos]);

    request.onsuccess = function() {
        let load = request.result;
        if (load != undefined) {

            load._state = 'refused';
            loads.delete(load._id);
            let newRequest = loads.add(load, load._id);

            newRequest.onsuccess = function() {
                console.log("Груз добавлен в хранилище. id = ", newRequest.result);
            }

            getLoadList(currentCustomer);
        }
    }
}

//-------------------------------------------DELETE LOAD
function deleteLoadOnPosition(position) {
    getCurrentCustomer(deleteLoad, position);
}

function deleteLoad(customer, pos) {

    let transaction = db.transaction(`loads`, "readwrite");
    let loads = transaction.objectStore(`loads`);
    loads.delete(customer.loads[pos]);

    customer.deleteLoadId(pos);

    deleteUser('customer');
    saveUser(customer);

    getLoadList(customer);
}

function getCurrentCustomer(callback, pos) {

    let transaction = db.transaction("customers");
    let customers = transaction.objectStore("customers");
    let request = customers.get(getUser());

    request.onsuccess = function() {
        let user = request.result;
        if (user != undefined) {
            let currentCustomer = new Customer(user._name, user._lastName, user._age, user._phone, user._email, user._password, user._id, user._mark, user._loads);

            if (pos != undefined) {
                callback(currentCustomer, pos);
            } else {
                callback(currentCustomer);
            }
        }
    }
}

//---------------------------------------------POST LOAD

function postLoadOnPosition(pos) {
    getCurrentCustomer(postLoad, pos);
}

function postLoad(customer, pos) {
    let transaction = db.transaction(`loads`, "readwrite");
    let loads = transaction.objectStore(`loads`);
    let request = loads.get(customer.loads[pos]);

    request.onsuccess = function() {
        let load = request.result;
        if (load != undefined) {
            findDriver(load);
        }
    }
}

function findDriver(load) {

    if (!checkLoadType(load)) {
        availableDriverNotExist(load)
        return;
    }

    let transaction = db.transaction("drivers");
    let drivers = transaction.objectStore("drivers");
    let request = drivers.getAll();

    request.onsuccess = function() {
        let drivers = request.result;
        if (drivers != undefined) {

            drivers = findDriversWithTruck(drivers);

            if (load._fromCity != load._toCity) {
                drivers = findDriversToAnotherCity(drivers);
            }

            if (drivers.length == 0) {
                availableDriverNotExist(load)
                return;
            }

            let result = drivers.map(function(elem) {
                return elem._truckId;
            })

            checkTruckParameters(load, result);
        } else {
            availableDriverNotExist(load)
            return;
        }
    }
}

function checkLoadType(load) {
    let size = load._size;
    let weight = load._weight;

    if (weight > 1500) {
        return false;
    }
    if (weight <= 500 && size == 'small') {
        return 'Sprinter';
    }
    if (weight <= 900 && (size == 'small' || size == 'medium')) {
        return 'Small Straite';
    }
    if (weight <= 1500) {
        return 'Long Straite';
    }
}

function findDriversToAnotherCity(drivers) {
    let result = drivers.filter(function(elem) {
        if (elem._anotherCity == 'yes') {
            return true;
        }
        return false;
    })
    return result;
}

function findDriversWithTruck(drivers) {
    let result = drivers.filter(function(elem) {
        if (elem._truckId != 0 && elem._loadId == 0) {
            return true;
        }
        return false;
    })
    return result;
}

function checkTruckParameters(load, trucksId) {

    let loadType = checkLoadType(load);

    if (loadType == 'Sprinter') {
        availableDriverExist(load);
        return true;
    }

    let truckFind = false;

    trucksId.forEach(element => {
        let transaction = db.transaction("trucks");
        let trucks = transaction.objectStore("trucks");
        let request = trucks.get(element);

        request.onsuccess = function() {
            let truck = request.result;
            if (truck != undefined) {

                if (loadType == 'Small Straite') {

                    if (truck._type == 'Small Straite' || truck._type == 'Long Straite') {
                        truckFind = true;
                        availableDriverExist(load);
                        return true;
                    }
                }
                if (loadType == 'Long Straite') {

                    if (truck._type == 'Long Straite') {
                        truckFind = true;
                        availableDriverExist(load);
                        return true;
                    }
                }
                if (trucksId[trucksId.length - 1] == truck._id && !truckFind) {
                    availableDriverNotExist(load);
                    return;
                }
            }
        }
        if (truckFind) {
            return
        }
    });
}

function availableDriverExist(load) {
    let transaction = db.transaction(`loads`, "readwrite");
    let loads = transaction.objectStore(`loads`);
    let request = loads.get(load._id);

    request.onsuccess = function() {
        let newLoad = request.result;
        if (newLoad != undefined) {
            newLoad._state = 'posted';
            loads.delete(newLoad._id);

            request = loads.add(newLoad, newLoad._id);
            request.onsuccess = function() {
                console.log('load(id:' + load._id + ') posted');
                getCurrentCustomer(getLoadList);
            }
        }
    }
}

function availableDriverNotExist(load) {
    let transaction = db.transaction(`loads`, "readwrite");
    let loads = transaction.objectStore(`loads`);
    let request = loads.get(load._id);

    request.onsuccess = function() {
        let newLoad = request.result;
        if (newLoad != undefined) {
            newLoad._state = 'notfound';
            loads.delete(newLoad._id);

            request = loads.add(newLoad, newLoad._id);
            request.onsuccess = function() {
                console.log(`driver for ${newLoad._id}(load id) is not found`);
                getCurrentCustomer(getLoadList);
            }
        }
    }
}
//--------------------------------------------CUSTOMER COMPLETE LOAD

function rejectLoadOnPosition(pos) {
    getCurrentCustomer(rejectLoad, pos);
}

function rejectLoad(customer, pos) {

    let transaction = db.transaction(`loads`, "readwrite");
    let loads = transaction.objectStore(`loads`);
    let request = loads.get(customer.loads[pos]);

    request.onsuccess = function() {
        load = request.result;
        if (load != undefined) {
            let driverId = load._driverId;
            load._driverId = 0;
            load._state = 'refused'
            loads.delete(load._id);

            let newLoadRequest = loads.add(load, load._id);
            newLoadRequest.onsuccess = function() {
                console.log("Груз добавлен в хранилище. id = ", newLoadRequest.result);
            }

            let transaction = db.transaction('drivers', 'readwrite');
            let drivers = transaction.objectStore('drivers');
            let newRequest = drivers.get(driverId);

            newRequest.onsuccess = function() {
                let driver = newRequest.result;
                if (driver != undefined) {

                    if (driver._mark == 0) {
                        driver._mark = 0.1;
                    } else {
                        driver._mark = (driver._mark + 0.1) / 2;
                    }
                    drivers.delete(driverId);
                    let newDriverRequest = drivers.add(driver, driver._id);

                    newDriverRequest.onsuccess = function() {
                        console.log("Пользователь добавлен в хранилище. id = ", newDriverRequest.result);
                    }
                }
            }
            getLoadList(customer);
        }
    }
}

function confirmLoadOnPosition(pos) {
    getCurrentCustomer(confirmLoad, pos);
}

function confirmLoad(customer, pos) {

    let transaction = db.transaction(`loads`, "readwrite");
    let loads = transaction.objectStore(`loads`);
    let request = loads.get(customer.loads[pos]);

    request.onsuccess = function() {
        load = request.result;
        if (load != undefined) {

            load._state = 'mark';
            loads.delete(load._id);

            let newRequest = loads.add(load, load._id);

            newRequest.onsuccess = function() {
                console.log("Груз добавлен в хранилище. id = ", newRequest.result);

                document.querySelector('.customer-mark-block-wrapper').style.display = 'flex';
            }
        }
    }
}

function setCancelConfirm() {
    getCurrentCustomer(cancelConfirm);
}

function cancelConfirm(customer) {
    customer.loads.forEach((element) => {

        let transaction = db.transaction(`loads`, "readwrite");
        let loads = transaction.objectStore(`loads`);
        let request = loads.get(element);

        request.onsuccess = function() {
            let load = request.result;
            if (load != undefined) {

                if (load._state == 'mark') {

                    load._state = 'completed';
                    loads.delete(load._id);

                    let newRequest = loads.add(load, load._id);

                    newRequest.onsuccess = function() {
                        console.log("Груз добавлен в хранилище. id = ", newRequest.result);
                    }
                    document.querySelector('.customer-mark-block-wrapper').style.display = 'none';
                }
            }
        }
    });
}

//-------------------------------------------------CUSTOMER GIVE MARK

function giveDriverMark(mark) {
    getCurrentCustomer(saveDriverMark, mark);
}

function saveDriverMark(customer, mark) {

    customer.loads.forEach((element, index) => {

        let transaction = db.transaction(`loads`, "readwrite");
        let loads = transaction.objectStore(`loads`);
        let request = loads.get(element);

        request.onsuccess = function() {
            let load = request.result;
            if (load != undefined) {

                if (load._state == 'mark') {

                    let transaction = db.transaction(`drivers`, "readwrite");
                    let drivers = transaction.objectStore(`drivers`);
                    let driverRequest = drivers.get(load._driverId);

                    driverRequest.onsuccess = function() {
                        let driver = driverRequest.result;
                        if (driver != undefined) {
                            if (driver._mark == 0) {
                                driver._mark = mark;
                            } else {
                                driver._mark = (driver._mark + mark) / 2;
                            }
                            drivers.delete(driver._id);
                            let newDriverRequest = drivers.add(driver, driver._id);
                            alert('mark' + mark)
                            newDriverRequest.onsuccess = function() {
                                console.log("Пользователь добавлен в хранилище. id = ", newDriverRequest.result);
                            }
                        }
                    }
                    getLoadList(customer);
                    document.querySelector('.customer-mark-block-wrapper').style.display = 'none';
                    customer.deleteLoadId(index);
                    deleteUser('customer');
                    saveUser(customer);
                }
            }
        }
    });
}

function setNoDriverMark() {
    getCurrentCustomer(noDriverMark);
}

function noDriverMark(customer) {
    customer.loads.forEach((element, index) => {

        let transaction = db.transaction(`loads`, "readwrite");
        let loads = transaction.objectStore(`loads`);
        let request = loads.get(element);

        request.onsuccess = function() {
            let load = request.result;
            if (load != undefined) {

                if (load._state == 'mark') {

                    getLoadList(customer);
                    document.querySelector('.customer-mark-block-wrapper').style.display = 'none';
                    customer.deleteLoadId(index);
                    deleteUser('customer');
                    saveUser(customer);
                }
            }
        }
    });
}
//----------------------------------------------SHOW CUSTOMER MARK

function showCustomersMark() {
    let elem = document.querySelector('.dicsplay-customer-mark');
    getCurrentCustomer(showMark, elem);
}

function showMark(user, elem) {
    elem.innerHTML = '';
    let mark = Math.round(user._mark);
    elem.innerHTML = `Your mark: ${mark}/5`;
}

//-----------------------------------------CREATE NEW TRUCK

function checkTruckForm() {

    event.preventDefault();

    let title = document.querySelector('#truck-title');
    let category = document.querySelector('#truck-category');

    let err = false;

    if (isInputEmpty(title)) {
        err = true;
    }
    if (isInputEmpty(category)) {
        err = true;
    }

    if (err) {
        return err;
    }

    createTruck(title.value, category.value);
    navigation(['form[name=truck-form]'], ['.driver-page']);
    return err;
}

function truckFormClear() {
    document.querySelector('#truck-title').value = '';
    document.querySelector('#truck-category').value = '';
}

function createTruck(title, category, oldTruck) {
    let truck;
    switch (category) {
        case 'Sprinter':
            truck = new Sprinter(title);
            break;
        case 'Small Straite':
            truck = new SmallStraite(title);
            break;
        case 'Long Straite':
            truck = new LongStraite(title);
            break;
        case 'Truck':
            truck = new Truck(title, oldTruck._type, oldTruck._weightCapacity, oldTruck._loadSize, oldTruck._praice, oldTruck._id, getUser());
            break;
        case 'Free':
            truck = new Truck(title, oldTruck._type, oldTruck._weightCapacity, oldTruck._loadSize, oldTruck._praice, oldTruck._id, 0);
            break;
    }
    saveTruck(truck);
}

function saveTruck(truck) {
    let transaction = db.transaction("trucks", "readwrite");

    let trucks = transaction.objectStore("trucks");

    let request = trucks.add(truck, truck.id);

    request.onsuccess = function() {
        console.log("Грузовик добавлен в хранилище. id = ", request.result);
        truckFormClear();
    };

    request.onerror = function() {
        console.log("Ошибка", request.error);
    };
}

//---------------------------------------CREATE FREE TRUCK LIST

function getTruckList() {

    let transaction = db.transaction('trucks');
    let trucks = transaction.objectStore('trucks');
    let driverIdIndex = trucks.index("driver_id_truck");

    let request = driverIdIndex.getAll(0);

    request.onsuccess = function() {
        if (request.result !== undefined) {
            createTruckList(request.result);
        } else {
            console.log('no trucks')
        }
    }
}

function createTruckList(truckList) {

    let truckListElem = document.querySelector('.select-truck');

    truckList.forEach(element => {
        let div = createTruckItem(element);
        truckListElem.append(div);
    });

    navigation(['.driver-page'], ['.select-truck-page']);
}

function createTruckItem(truck) {
    let div = document.createElement('div');
    div.className = "truck-item";
    div.innerHTML = `${truck._title} (${truck._type}) <button onclick="chooseTruck(${truck._id})">Choose</button>`;
    return div;
}

function chooseTruck(id) {
    console.log(`you select truck: ${id}(id)`);

    getCurrentDriver(setDriverInTruck, id);

    clearTruckList();
    navigation(['.select-truck-page'], ['.driver-page']);
}

function clearTruckList() {
    document.querySelector('.select-truck').innerHTML = '';
}

function getCurrentDriver(callback, pos) {

    let transaction = db.transaction("drivers");
    let drivers = transaction.objectStore("drivers");
    let request = drivers.get(getUser());

    request.onsuccess = function() {
        let user = request.result;
        if (user != undefined) {
            let currentDriver = new Driver(user._name, user._lastName, user._age, user._phone, user._email, user._password, user._city, user._anotherCity, user._id, user._mark, user._truckId, user._loadId);

            if (pos != undefined) {
                callback(currentDriver, pos);
            } else {
                callback(currentDriver);
            }
        }
    }
}

function setDriverInTruck(currentDriver, id) {

    let transaction = db.transaction("trucks");
    let trucks = transaction.objectStore("trucks");
    let request = trucks.get(id);

    request.onsuccess = function() {
        let truck = request.result;
        if (truck != undefined) {
            freeOldTruck(currentDriver._id);

            deleteTruck(truck._id);
            createTruck(truck._title, 'Truck', truck);
        }
        deleteUser('driver');
        currentDriver.truckId = id;
        saveUser(currentDriver);
    }
}

function freeOldTruck(driverId) {
    let transaction = db.transaction("trucks");
    let trucks = transaction.objectStore("trucks");
    let driverIdIndex = trucks.index("driver_id_truck");
    let request = driverIdIndex.get(driverId);

    request.onsuccess = function() {
        if (request.result != undefined) {
            let truck = request.result;

            deleteTruck(truck._id);
            createTruck(truck._title, 'Free', truck);
        }
    }

}

function deleteTruck(id) {
    let transaction = db.transaction(`trucks`, "readwrite");

    let trucks = transaction.objectStore(`trucks`);

    trucks.delete(id);
}

//---------------------------------------------GET POSTED LOAD(DRIVER)

function findPostedLoads() {

    let transaction = db.transaction('loads');
    let loads = transaction.objectStore('loads');
    let postedLoadsIndex = loads.index("load_state");

    let request = postedLoadsIndex.getAll('posted');

    request.onsuccess = function() {
        let postedLoads = request.result;
        if (postedLoads != undefined) {
            getCurrentDriver(getTruckParameters, postedLoads)
        }
    }
}

function getTruckParameters(currentDriver, postedLoads) {

    let transaction = db.transaction('trucks');
    let trucks = transaction.objectStore('trucks');
    let driverIdIndex = trucks.index("driver_id_truck");

    let request = driverIdIndex.get(currentDriver._id);

    request.onsuccess = function() {
        truck = request.result;
        if (truck != undefined) {

            let truckType = truck._type;
            let suitLoads;

            if (truckType == 'Sprinter') {

                suitLoads = postedLoads.filter(function(item) {

                    let loadType = checkLoadType(item);
                    if (loadType == 'Sprinter') {
                        return true;
                    }
                    return false;
                })
            }
            if (truckType == 'Small Straite') {

                suitLoads = postedLoads.filter(function(item) {

                    let loadType = checkLoadType(item);
                    if (loadType == 'Sprinter' || loadType == 'Small Straite') {
                        return true;
                    }
                    return false;
                })
            }
            if (truckType == 'Long Straite') {
                suitLoads = postedLoads;
            }
            createAvailableLoadsList(suitLoads);
        }
    }
}

function createAvailableLoadsList(loads) {

    let loadListElem = document.querySelector('.select-load-list');

    loads.forEach(element => {
        let div = createAvailableLoadItem(element);
        loadListElem.append(div);
    });
}

function createAvailableLoadItem(load) {
    let div = document.createElement('div');
    div.className = "posted-load-item";
    div.innerHTML = `${load._title} <button class="take-load" onclick="takeLoadOnPosition(${load._id})">take</button>`;
    return div;
}

function clearAvailableLoadList() {
    let customerLoadList = document.querySelector('.select-load-list');
    customerLoadList.innerHTML = '';
}

//-----------------------------------------------------TAKE LOAD

function takeLoadOnPosition(id) {
    console.log(`you take load: ${id}(id)`);

    getCurrentDriver(takeLoad, id);

    clearAvailableLoadList();
    navigation(['.select-load-page'], ['.driver-page']);
}

function takeLoad(currentDriver, id) {

    let transaction = db.transaction("loads", "readwrite");
    let loads = transaction.objectStore("loads");
    let request = loads.get(id);

    request.onsuccess = function() {
        let load = request.result;
        if (load != undefined) {

            loads.delete(load._id);
            load._driverId = currentDriver.id;
            load._state = 'taken';
            let newRequest = loads.add(load, load._id);

            newRequest.onsuccess = function() {
                console.log("Груз добавлен в хранилище. id = ", newRequest.result);
            }

            deleteUser('driver');
            currentDriver.loadId = id;
            saveUser(currentDriver);

            showTakenLoad(currentDriver);
        }
    }
}

//-------------------------------------------------SHOW TAKEN LOAD(DRIVER)

function showTakenLoad(driver) {

    if (driver.loadId == 0) {
        showDriverButtons();
        return;
    }

    hideDriverButtons();

    let transaction = db.transaction('loads');
    let loads = transaction.objectStore('loads');
    let request = loads.get(driver.loadId);

    request.onsuccess = function() {
        let load = request.result;
        if (load != undefined) {
            showLoadInfo(load, '.driver-load-list');
        } else {
            loadListElem = document.querySelector(`.driver-load-list`);
            createCustomerRefused(undefined, loadListElem)
        }
    }
}

function hideDriverButtons() {
    document.querySelector('.find-load').style.display = 'none';
    document.querySelector('.get-truck').style.display = 'none';
}

function showDriverButtons() {
    document.querySelector('.find-load').style.display = 'inline';
    document.querySelector('.get-truck').style.display = 'inline';
}

function showLoadInfo(load, selector) {

    clearTakenLoad();
    let loadListElem = document.querySelector(`${selector}`);

    if (load._state == 'completed' || load._state == 'mark') {
        completedLoadShow(load);
        return;
    }

    infoItem('Title', load._title, loadListElem)
    infoItem('Size', load._size, loadListElem)
    infoItem('Weight', load._weight, loadListElem)
    infoItem('Description', load._description, loadListElem)
    infoItem('From city', load._fromCity, loadListElem)
    infoItem('Street', load._fromStreet, loadListElem)
    infoItem('To city', load._toCity, loadListElem)
    infoItem('Street', load._toStreet, loadListElem)

    switch (load._state) {
        case 'taken':
            showCustomerInfo(load._customerId, loadListElem, createTakenLoadButtons);
            break;
        case 'refused':
            showCustomerInfo(load._customerId, loadListElem, createCustomerRefused);
            break;
        case 'loaded':
            showCustomerInfo(load._customerId, loadListElem, createCompleteLoad);
            break;
    }
}

function infoItem(itemName, itemInfo, loadListElem) {
    let div = document.createElement('div');
    div.className = "load-info";
    div.innerHTML = `<span class="info-name">${itemName}<span>  :  <span class="info">${itemInfo}</span>`;
    loadListElem.append(div);
}

function showCustomerInfo(customerId, loadListElem, callback) {
    let transaction = db.transaction("customers");
    let customers = transaction.objectStore("customers");
    let request = customers.get(customerId);

    request.onsuccess = function() {
        customer = request.result;
        if (customer != undefined) {
            infoItem('Customer name', customer._name, loadListElem)
            infoItem('Customer lastname', customer._lastName, loadListElem)
            infoItem('Customer phone', customer._phone, loadListElem)
        }
        if (callback != undefined) {
            callback(customerId, loadListElem)
        }
    }
}

function createTakenLoadButtons(customerId, loadListElem) {

    let buttonRefuse = document.createElement('button');
    buttonRefuse.onclick = function() {
        getCurrentDriver(driverRefuseLoad);
    }
    buttonRefuse.innerHTML = 'refuse';

    loadListElem.append(buttonRefuse);
    buttonRefuse.style.marginRight = '30px';
    let buttonLoaded = document.createElement('button');
    buttonLoaded.onclick = function() {
        getCurrentDriver(driverLoadedLoad);
    }
    buttonLoaded.innerHTML = 'loaded';
    loadListElem.append(buttonLoaded);
}

function createCustomerRefused(customerId, loadListElem) {

    clearTakenLoad();
    let div = document.createElement('div');
    div.className = "customer-refused-item";
    div.innerHTML = `Delivery refused <button onclick="callDeleteDriverLoad()">delete</button>`;
    loadListElem.append(div);
}

function clearTakenLoad() {
    document.querySelector('.driver-load-list').innerHTML = '';
}

function callDeleteDriverLoad() {
    getCurrentDriver(deleteDriverLoad);
}

function deleteDriverLoad(driver) {
    clearTakenLoad();
    let id = driver.loadId;
    driver.loadId = 0;
    deleteUser('driver');
    saveUser(driver);

    let transaction = db.transaction('loads', 'readwrite');
    let loads = transaction.objectStore('loads');
    let request = loads.get(id);

    request.onsuccess = function() {
        load = request.result;
        if (load != undefined) {
            load._driverId = 0;
            showTakenLoad(driver);

            loads.delete(load._id);
            let newRequest = loads.add(load, load._id);

            newRequest.onsuccess = function() {
                console.log("Груз добавлен в хранилище. id = ", newRequest.result);
            }
        }
    }
}

function driverRefuseLoad(driver) {

    let transaction = db.transaction('loads', 'readwrite');
    let loads = transaction.objectStore('loads');
    let request = loads.get(driver.loadId);

    request.onsuccess = function() {
        load = request.result;
        if (load != undefined) {
            load._state = 'refused';

            loads.delete(load._id);
            let newRequest = loads.add(load, load._id);

            newRequest.onsuccess = function() {
                console.log("Груз добавлен в хранилище. id = ", newRequest.result);
                deleteDriverLoad(driver);
            }
        }
    }
}

function driverLoadedLoad(driver) {
    let transaction = db.transaction('loads', "readwrite");
    let loads = transaction.objectStore('loads');
    let request = loads.get(driver.loadId);

    request.onsuccess = function() {
        load = request.result;
        if (load != undefined) {
            load._state = 'loaded';

            loads.delete(load._id);
            let newRequest = loads.add(load, load._id);

            newRequest.onsuccess = function() {
                console.log("Груз добавлен в хранилище. id = ", newRequest.result);

                clearTakenLoad();
                showTakenLoad(driver);
            }
        }
    }
}
//----------------------------------------------------DRIVER COMPLETE LOAD
function createCompleteLoad(customerId, loadListElem) {

    let buttonComplete = document.createElement('button');
    buttonComplete.onclick = function() {
        getCurrentDriver(driverCompleteLoad);
    }
    buttonComplete.innerHTML = 'complete';
    loadListElem.append(buttonComplete);
}

function driverCompleteLoad(driver) {
    let transaction = db.transaction('loads', 'readwrite');
    let loads = transaction.objectStore('loads');
    let request = loads.get(driver.loadId);

    request.onsuccess = function() {
        load = request.result;
        if (load != undefined) {
            load._state = 'completed';

            loads.delete(load._id);
            let newRequest = loads.add(load, load._id);

            newRequest.onsuccess = function() {
                console.log("Груз добавлен в хранилище. id = ", newRequest.result);

                clearTakenLoad();
                completedLoadShow(load);
            }
        }
    }
}

function completedLoadShow(load) {
    let loadListElem = document.querySelector('.driver-load-list');

    let div = document.createElement('div');
    div.innerHTML = 'Delivery is completed';
    div.style.marginBottom = '10px';
    div.style.textAlign = 'center';
    loadListElem.append(div);

    showCustomerInfo(load._customerId, loadListElem, showCustomerMark);
}
//-----------------------------------------------DRIVER GIVE MARK
function showCustomerMark(customerId, loadListElem) {
    document.querySelector('.driver-page .driver-mark-block').style.display = 'flex';
}

function hideCustomerMark() {
    document.querySelector('.driver-page .driver-mark-block').style.display = 'none';
}

function giveCustomerMark(mark) {
    getCurrentDriver(saveCustomerMark, mark)
}

function saveCustomerMark(driver, mark) {

    hideCustomerMark();
    clearTakenLoad();

    let transaction = db.transaction('loads', 'readwrite');
    let loads = transaction.objectStore('loads');
    let request = loads.get(driver.loadId);

    request.onsuccess = function() {
        let load = request.result;
        if (load != undefined) {

            if (mark != 0) {
                let transaction = db.transaction('customers', 'readwrite');
                let customers = transaction.objectStore('customers');
                let newRequest = customers.get(load._customerId);

                newRequest.onsuccess = function() {
                    let customer = newRequest.result;
                    if (customer != undefined) {

                        if (customer._mark == 0) {
                            customer._mark = mark;
                        } else {
                            customer._mark = (customer._mark + mark) / 2;
                        }

                        customers.delete(customer._id);
                        let newCustomerRequest = customers.add(customer, customer._id);

                        newCustomerRequest.onsuccess = function() {
                            console.log("Пользователь добавлен в хранилище. id = ", newCustomerRequest.result);
                        }
                    }
                }
            }
            showDriverButtons();
            driver.loadId = 0;
            deleteUser('driver');
            saveUser(driver);
        }
    }
}

//---------------------------------------------DRIVER DISPLAY MARK

function showDriverMark() {
    let elem = document.querySelector('.display-driver-mark');
    getCurrentDriver(showMark, elem);
}