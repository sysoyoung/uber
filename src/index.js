"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createSuper(Derived) { return function() { var Super = _getPrototypeOf(Derived),
            result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function() {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db;

function createDB() {
    var openRequest = indexedDB.open('eber', 1);

    openRequest.onupgradeneeded = function() {
        db = openRequest.result;

        if (db != undefined) {
            if (!db.objectStoreNames.contains('customers')) {
                var customers = db.createObjectStore('customers');
                customers.createIndex('email_customer', '_email');
            }

            if (!db.objectStoreNames.contains('drivers')) {
                var drivers = db.createObjectStore('drivers');
                drivers.createIndex('email_driver', '_email');
            }

            if (!db.objectStoreNames.contains('trucks')) {
                var trucks = db.createObjectStore('trucks');
                trucks.createIndex('type_truck', '_type');
                trucks.createIndex('driver_id_truck', '_driverId');
            }

            if (!db.objectStoreNames.contains('loads')) {
                var loads = db.createObjectStore('loads');
                loads.createIndex('customer_id_load', '_customerId');
                loads.createIndex('driver_id_load', '_driverId');
                loads.createIndex('load_state', '_state');
            }

            console.log('DB upgraded');
        }
    };

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
}

;

function setNumberCustomers() {
    var transaction = db.transaction('customers');
    var customers = transaction.objectStore('customers');
    var request = customers.getAll();

    request.onsuccess = function() {
        var arr = request.result;

        if (arr != undefined) {
            Customer.count = arr.length + 1;
        }
    };
}

function setNumberDrivers() {
    var transaction = db.transaction('drivers');
    var drivers = transaction.objectStore('drivers');
    var request = drivers.getAll();

    request.onsuccess = function() {
        var arr = request.result;

        if (arr != undefined) {
            Driver.count = arr.length + 1;
        }
    };
}

function setNumberTrucks() {
    var transaction = db.transaction('trucks');
    var trucks = transaction.objectStore('trucks');
    var request = trucks.getAll();

    request.onsuccess = function() {
        var arr = request.result;

        if (arr != undefined) {
            Truck.count = arr.length + 1;
        }
    };
}

function setNumberLoads() {
    var transaction = db.transaction('loads');
    var loads = transaction.objectStore('loads');
    var request = loads.getAll();

    request.onsuccess = function() {
        var arr = request.result;

        if (arr != undefined) {
            Load.count = arr.length + 1;
        }
    };
}

function deleteDB() {
    if (db) {
        db.close();
    }

    indexedDB.deleteDatabase('eber');
    console.log('DB deleted');
}

var User = /*#__PURE__*/ function() {
    function User(id, name, lastName, age, phone, email, password, mark) {
        _classCallCheck(this, User);

        this._id = id;
        this._name = name;
        this._lastName = lastName;
        this._age = age;
        this._phone = phone;
        this._email = email;
        this._password = password;
        this._mark = mark;
    }

    _createClass(User, [{
        key: "id",
        get: function get() {
            return this._id;
        }
    }, {
        key: "name",
        get: function get() {
            return this._name;
        }
    }, {
        key: "lastname",
        get: function get() {
            return this._lastName;
        }
    }, {
        key: "age",
        get: function get() {
            return this._age;
        }
    }, {
        key: "phone",
        get: function get() {
            return this._phone;
        }
    }, {
        key: "email",
        get: function get() {
            return this._email;
        }
    }, {
        key: "password",
        get: function get() {
            return this._password;
        }
    }, {
        key: "mark",
        get: function get() {
            return this._mark;
        },
        set: function set(value) {
            if (this._mark == 0) {
                this._mark = value;
            } else {
                this._mark = (this._mark + value) / 2;
            }
        }
    }]);

    return User;
}();

var Customer = /*#__PURE__*/ function(_User) {
    _inherits(Customer, _User);

    var _super = _createSuper(Customer);

    function Customer(name, lastName, age, phone, email, password) {
        var _this;

        var id = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Customer.count++;
        var mark = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
        var loads = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [];

        _classCallCheck(this, Customer);

        _this = _super.call(this, id, name, lastName, age, phone, email, password, mark);
        _this._loads = loads;
        return _this;
    }

    _createClass(Customer, [{
        key: "addCustomerLoadId",
        value: function addCustomerLoadId(load) {
            this._loads.push(load);
        }
    }, {
        key: "deleteLoadId",
        value: function deleteLoadId(pos) {
            this._loads.splice(pos, 1);
        }
    }, {
        key: "loads",
        get: function get() {
            return this._loads;
        }
    }]);

    return Customer;
}(User);

_defineProperty(Customer, "count", 1);

var Driver = /*#__PURE__*/ function(_User2) {
    _inherits(Driver, _User2);

    var _super2 = _createSuper(Driver);

    function Driver(name, lastName, age, phone, email, password, city, anotherCity) {
        var _this2;

        var id = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : Driver.count++;
        var mark = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
        var truckId = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 0;
        var loadId = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;

        _classCallCheck(this, Driver);

        _this2 = _super2.call(this, id, name, lastName, age, phone, email, password, mark);
        _this2._city = city;
        _this2._anotherCity = anotherCity;
        _this2._truckId = truckId;
        _this2._loadId = loadId;
        return _this2;
    }

    _createClass(Driver, [{
        key: "city",
        get: function get() {
            return this._city;
        }
    }, {
        key: "anotherCity",
        get: function get() {
            return this._anotherCity;
        }
    }, {
        key: "truckId",
        get: function get() {
            return this._truckId;
        },
        set: function set(value) {
            this._truckId = value;
        }
    }, {
        key: "loadId",
        get: function get() {
            return this._loadId;
        },
        set: function set(value) {
            this._loadId = value;
        }
    }]);

    return Driver;
}(User);

_defineProperty(Driver, "count", 1);

var Load = /*#__PURE__*/ function() {
    function Load(title, size, weight, description, fromCity, fromStreet, toCity, toStreet, customerId) {
        var id = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : Load.count++;
        var state = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 'created';
        var driverId = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;

        _classCallCheck(this, Load);

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

    _createClass(Load, [{
        key: "id",
        get: function get() {
            return this._id;
        },
        set: function set(value) {
            this._id = value;
        }
    }, {
        key: "title",
        get: function get() {
            return this._title;
        }
    }, {
        key: "size",
        get: function get() {
            return this._size;
        }
    }, {
        key: "weight",
        get: function get() {
            return this._weight;
        }
    }, {
        key: "description",
        get: function get() {
            return this._description;
        }
    }, {
        key: "fromCity",
        get: function get() {
            return this._fromCity;
        }
    }, {
        key: "fromStreet",
        get: function get() {
            return this._fromStreet;
        }
    }, {
        key: "toCity",
        get: function get() {
            return this._toCity;
        }
    }, {
        key: "toStreet",
        get: function get() {
            return this._toStreet;
        }
    }, {
        key: "customerId",
        get: function get() {
            return this._customerId;
        }
    }, {
        key: "driverId",
        get: function get() {
            return this.driverId;
        },
        set: function set(value) {
            this._driverId = value;
        }
    }]);

    return Load;
}();

_defineProperty(Load, "count", 1);

var Truck = /*#__PURE__*/ function() {
    function Truck(title, type, weightCapacity, loadSize, praice) {
        var id = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : Truck.count++;
        var driverId = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

        _classCallCheck(this, Truck);

        this._id = id;
        this._title = title;
        this._type = type;
        this._weightCapacity = weightCapacity;
        this._loadSize = loadSize;
        this._praice = praice;
        this._driverId = driverId;
    }

    _createClass(Truck, [{
        key: "id",
        get: function get() {
            return this._id;
        }
    }]);

    return Truck;
}();

_defineProperty(Truck, "count", 1);

var Sprinter = /*#__PURE__*/ function(_Truck) {
    _inherits(Sprinter, _Truck);

    var _super3 = _createSuper(Sprinter);

    function Sprinter(title) {
        _classCallCheck(this, Sprinter);

        return _super3.call(this, title, 'Sprinter', 500, 'small', 300);
    }

    return Sprinter;
}(Truck);

var SmallStraite = /*#__PURE__*/ function(_Truck2) {
    _inherits(SmallStraite, _Truck2);

    var _super4 = _createSuper(SmallStraite);

    function SmallStraite(title) {
        _classCallCheck(this, SmallStraite);

        return _super4.call(this, title, 'Small Straite', 900, 'medium', 500);
    }

    return SmallStraite;
}(Truck);

var LongStraite = /*#__PURE__*/ function(_Truck3) {
    _inherits(LongStraite, _Truck3);

    var _super5 = _createSuper(LongStraite);

    function LongStraite(title) {
        _classCallCheck(this, LongStraite);

        return _super5.call(this, title, 'Long Straite', 1500, 'large', 800);
    }

    return LongStraite;
}(Truck);

function navigation(current, select) {
    if (current.length > 1) {
        current.forEach(function(element) {
            document.querySelector("".concat(element)).style.display = 'none';
        });
    } else {
        document.querySelector("".concat(current)).style.display = 'none';
    }

    if (select.length > 1) {
        select.forEach(function(element) {
            document.querySelector("".concat(element)).style.display = 'flex';
        });
    } else {
        document.querySelector("".concat(select)).style.display = 'flex';
    }
} // ------------------------- REGISTAARTION


function checkRegistrationForm() {
    event.preventDefault();
    var name = document.querySelector('#registration-name');
    var lastname = document.querySelector('#registration-lastname');
    var age = document.querySelector('#registration-age');
    var phone = document.querySelector('#registration-phone');
    var email = document.querySelector('#registration-email');
    var pass = document.querySelector('#registration-password');
    var err = false;

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

    var phoneReg = /^\d[\d\(\)\ -]{8,13}\d$/;

    if (phoneReg.test(phone.value) == false) {
        phone.style.borderColor = 'red';
        setTimeout(function() {
            return phone.removeAttribute('style');
        }, 3000);
        err = true;
    }

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(email.value) == false) {
        email.style.borderColor = 'red';
        setTimeout(function() {
            return email.removeAttribute('style');
        }, 3000);
        err = true;
    }

    if (document.querySelector('.driver-form').style.display == 'flex') {
        var city = document.querySelector('#registration-city');
        var anotherCity = document.querySelector('#registration-anothercity');

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
    var transaction = db.transaction('customers');
    var customers = transaction.objectStore('customers');
    var emailIndex = customers.index("email_customer");
    var request = emailIndex.get(mail.value);

    request.onsuccess = function() {
        if (request.result !== undefined) {
            console.log('user exist');
            redBorder(mail);
        } else {
            var _transaction = db.transaction('drivers');

            var drivers = _transaction.objectStore('drivers');

            var _emailIndex = drivers.index("email_driver");

            var _request = _emailIndex.get(mail.value);

            _request.onsuccess = function() {
                if (_request.result !== undefined) {
                    console.log('user exist');
                    redBorder(mail);
                } else {
                    console.log("email is unique");
                    registration();
                }
            };
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
    var name = document.querySelector('#registration-name').value;
    var lastname = document.querySelector('#registration-lastname').value;
    var age = document.querySelector('#registration-age').value;
    var phone = document.querySelector('#registration-phone').value;
    var email = document.querySelector('#registration-email').value;
    var pass = document.querySelector('#registration-password').value;

    if (document.querySelector('.driver-form').style.display == 'flex') {
        var city = document.querySelector('#registration-city').value;
        var anotherCity = document.querySelector('#registration-anothercity').value;
        var driver = new Driver(name, lastname, age, phone, email, pass, city, anotherCity);
        saveUser(driver);
        console.log('setting User' + "".concat(driver.id, "(id)"));
        setUser(driver.id);
        showDriverMark();
        navigation(['form[name=registration]', '.driver-form'], ['.driver-page']);
    } else {
        var customer = new Customer(name, lastname, age, phone, email, pass);
        saveUser(customer);
        console.log('setting User' + "".concat(customer.id, "(id)"));
        setUser(customer.id);
        clearLoadList();
        showCustomersMark();
        navigation(['form[name=registration]'], ['.customer-page']);
    }

    registrationFormClear();
} //-------------------------------------------------INPUT SETTING


function isInputEmpty(element) {
    if (element.value == '') {
        redBorder(element);
        return true;
    }

    return false;
}

function redBorder(element) {
    element.style.borderColor = 'red';
    setTimeout(function() {
        return element.removeAttribute('style');
    }, 3000);
} //----------------------------------------------------ENTER


function checkEnterForm() {
    event.preventDefault();
    var email = document.querySelector('#enter-email');
    var pass = document.querySelector('#enter-password');
    var err = false;

    if (isInputEmpty(pass)) {
        err = true;
    }

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(email.value) == false) {
        email.style.borderColor = 'red';
        setTimeout(function() {
            return email.removeAttribute('style');
        }, 3000);
        err = true;
    }

    if (err) {
        return err;
    }

    findUserEmail(email, pass);
}

function enterFormClear() {
    document.querySelector('#enter-email').value = '';
    document.querySelector('#enter-password').value = '';
}

function findUserEmail(mail, pass) {
    var transaction = db.transaction('customers');
    var customers = transaction.objectStore('customers');
    var emailIndex = customers.index("email_customer");
    var request = emailIndex.get(mail.value);

    request.onsuccess = function() {
        if (request.result !== undefined) {
            console.log('user exist');
            checkEqualPassword(pass, request.result, 'customer');
        } else {
            var _transaction2 = db.transaction('drivers');

            var drivers = _transaction2.objectStore('drivers');

            var _emailIndex2 = drivers.index("email_driver");

            var _request2 = _emailIndex2.get(mail.value);

            _request2.onsuccess = function() {
                if (_request2.result !== undefined) {
                    console.log('user exist');
                    checkEqualPassword(pass, _request2.result, 'driver');
                } else {
                    console.log("no such user");
                    redBorder(mail);
                }
            };
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
        console.log('password incorrect');
    }
} //------------------------------------------------------SET USER


function saveUser(user) {
    var users;

    if (user instanceof Customer) {
        var transaction = db.transaction("customers", "readwrite");
        users = transaction.objectStore("customers");
    } else {
        var _transaction3 = db.transaction("drivers", "readwrite");

        users = _transaction3.objectStore("drivers");
    }

    var request = users.add(user, user.id);

    request.onsuccess = function() {
        console.log("Пользователь добавлен в хранилище. id = ", request.result);
    };

    request.onerror = function() {
        console.log("Ошибка", request.error);
    };
}

function deleteUser(user) {
    var transaction = db.transaction("".concat(user, "s"), "readwrite");
    var users = transaction.objectStore("".concat(user, "s"));
    users.delete(getUser());
} // ------------------------  SET CURRENT USER


function setUser(id) {
    document.cookie = "currentUser=".concat(id);
}

function getUser() {
    var currentUser = document.cookie;
    var arr = currentUser.split('=');
    return +arr[1];
} // ---------------------- CREATE NEW LOAD


function checkLoadForm() {
    event.preventDefault();
    var title = document.querySelector('#load-title');
    var size = document.querySelector('#load-size');
    var weight = document.querySelector('#load-weight');
    var description = document.querySelector('#description');
    var fromCity = document.querySelector('#from-city');
    var fromStreet = document.querySelector('#from-street');
    var toCity = document.querySelector('#to-city');
    var toStreet = document.querySelector('#to-street');
    var err = false;

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
    var title = document.querySelector('#load-title').value;
    var size = document.querySelector('#load-size').value;
    var weight = document.querySelector('#load-weight').value;
    var description = document.querySelector('#description').value;
    var fromCity = document.querySelector('#from-city').value;
    var fromStreet = document.querySelector('#from-street').value;
    var toCity = document.querySelector('#to-city').value;
    var toStreet = document.querySelector('#to-street').value;
    console.log('add load to customer(id):' + getUser());
    var load = new Load(title, size, weight, description, fromCity, fromStreet, toCity, toStreet, getUser());
    saveLoad(currentCustomer, load);
    navigation(['form[name=add-load]'], ['.customer-page']);
}

function saveLoad(customer, load) {
    var transaction = db.transaction("loads", "readwrite");
    var loads = transaction.objectStore("loads");
    var request = loads.add(load, load.id);

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
} //------------------------------------------LOAD LIST


function getLoadList(currentCustomer) {
    clearLoadList();
    var transaction = db.transaction('loads');
    var loads = transaction.objectStore('loads');
    var customerIdIndex = loads.index("customer_id_load");
    var request = customerIdIndex.getAll(getUser());

    request.onsuccess = function() {
        if (request.result !== undefined) {
            createLoadList(request.result, currentCustomer);
        } else {
            console.log('no loads');
        }
    };
}

function createLoadList(loadList, currentCustomer) {
    var loadListElem = document.querySelector('.customer-loads-list');
    var postedLoadListElem = document.querySelector('.customer-posted-loads-list');
    loadList.forEach(function(element) {
        var pos;
        var div;

        for (var i = 0; i < currentCustomer.loads.length; i++) {
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
    var customerLoadList = document.querySelector('.customer-loads-list');
    customerLoadList.innerHTML = '';
    customerLoadList = document.querySelector('.customer-posted-loads-list');
    customerLoadList.innerHTML = '';
}

function createCreatedItem(load, pos) {
    var div = document.createElement('div');
    div.className = "load-item";
    div.innerHTML = "".concat(load._title, " <div><button onclick=\"postLoadOnPosition(").concat(pos, ")\">post</button><button onclick=\"deleteLoadOnPosition(").concat(pos, ")\">delete</button></div> ");
    return div;
}

function createPostedLoadItem(load, pos) {
    var div = document.createElement('div');
    div.className = "load-posted-item";
    div.innerHTML = "".concat(load._title, " is posted <div><button onclick=\"refuseLoadOnPosition(").concat(pos, ")\">refuse</button><button onclick=\"deleteLoadOnPosition(").concat(pos, ")\">delete</button></div>");
    return div;
}

function createTakenItem(load, pos) {
    var div = document.createElement('div');
    div.className = "load-taken-item";
    div.innerHTML = "Driver accepted the order ".concat(load._title, "  <button onclick=\"refuseLoadOnPosition(").concat(pos, ")\">refuse</button>");
    return div;
}

function createLoadedItem(load) {
    var div = document.createElement('div');
    div.className = "load-loaded-item";
    div.innerHTML = "".concat(load._title, " is loaded");
    return div;
}

function createCompletedItem(load, pos) {
    var div = document.createElement('div');
    div.className = "load-completed-item";
    div.innerHTML = "".concat(load._title, " is completed <div><button onclick=\"rejectLoadOnPosition(").concat(pos, ")\">reject</button><button onclick=\"confirmLoadOnPosition(").concat(pos, ")\">confirm</button></div>");
    return div;
}

function createRefusedItem(load, pos) {
    var div = document.createElement('div');
    div.className = "load-refused-item";
    div.innerHTML = "".concat(load._title, " refused <div><button onclick=\"postLoadOnPosition(").concat(pos, ")\">post</button><button onclick=\"deleteLoadOnPosition(").concat(pos, ")\">delete</button></div>");
    return div;
}

function createNotFoundItem(load, pos) {
    var div = document.createElement('div');
    div.className = "load-notfound-item";
    div.innerHTML = "There is no driver for ".concat(load._title, "  <div><button onclick=\"postLoadOnPosition(").concat(pos, ")\">post</button><button onclick=\"deleteLoadOnPosition(").concat(pos, ")\">delete</button></div>");
    return div;
} //------------------------------------------REFUSE LOAD


function refuseLoadOnPosition(pos) {
    getCurrentCustomer(refuseLoad, pos);
}

function refuseLoad(currentCustomer, pos) {
    var transaction = db.transaction("loads", "readwrite");
    var loads = transaction.objectStore("loads");
    var request = loads.get(currentCustomer.loads[pos]);

    request.onsuccess = function() {
        var load = request.result;

        if (load != undefined) {
            load._state = 'refused';
            loads.delete(load._id);
            var newRequest = loads.add(load, load._id);

            newRequest.onsuccess = function() {
                console.log("Груз добавлен в хранилище. id = ", newRequest.result);
            };

            getLoadList(currentCustomer);
        }
    };
} //-------------------------------------------DELETE LOAD


function deleteLoadOnPosition(position) {
    getCurrentCustomer(deleteLoad, position);
}

function deleteLoad(customer, pos) {
    var transaction = db.transaction("loads", "readwrite");
    var loads = transaction.objectStore("loads");
    loads.delete(customer.loads[pos]);
    customer.deleteLoadId(pos);
    deleteUser('customer');
    saveUser(customer);
    getLoadList(customer);
}

function getCurrentCustomer(callback, pos) {
    var transaction = db.transaction("customers");
    var customers = transaction.objectStore("customers");
    var request = customers.get(getUser());

    request.onsuccess = function() {
        var user = request.result;

        if (user != undefined) {
            var currentCustomer = new Customer(user._name, user._lastName, user._age, user._phone, user._email, user._password, user._id, user._mark, user._loads);

            if (pos != undefined) {
                callback(currentCustomer, pos);
            } else {
                callback(currentCustomer);
            }
        }
    };
} //---------------------------------------------POST LOAD


function postLoadOnPosition(pos) {
    getCurrentCustomer(postLoad, pos);
}

function postLoad(customer, pos) {
    var transaction = db.transaction("loads", "readwrite");
    var loads = transaction.objectStore("loads");
    var request = loads.get(customer.loads[pos]);

    request.onsuccess = function() {
        var load = request.result;

        if (load != undefined) {
            findDriver(load);
        }
    };
}

function findDriver(load) {
    if (!checkLoadType(load)) {
        availableDriverNotExist(load);
        return;
    }

    var transaction = db.transaction("drivers");
    var drivers = transaction.objectStore("drivers");
    var request = drivers.getAll();

    request.onsuccess = function() {
        var drivers = request.result;

        if (drivers != undefined) {
            drivers = findDriversWithTruck(drivers);

            if (load._fromCity != load._toCity) {
                drivers = findDriversToAnotherCity(drivers);
            }

            if (drivers.length == 0) {
                availableDriverNotExist(load);
                return;
            }

            var result = drivers.map(function(elem) {
                return elem._truckId;
            });
            checkTruckParameters(load, result);
        } else {
            availableDriverNotExist(load);
            return;
        }
    };
}

function checkLoadType(load) {
    var size = load._size;
    var weight = load._weight;

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
    var result = drivers.filter(function(elem) {
        if (elem._anotherCity == 'yes') {
            return true;
        }

        return false;
    });
    return result;
}

function findDriversWithTruck(drivers) {
    var result = drivers.filter(function(elem) {
        if (elem._truckId != 0 && elem._loadId == 0) {
            return true;
        }

        return false;
    });
    return result;
}

function checkTruckParameters(load, trucksId) {
    var loadType = checkLoadType(load);

    if (loadType == 'Sprinter') {
        availableDriverExist(load);
        return true;
    }

    var truckFind = false;
    trucksId.forEach(function(element) {
        var transaction = db.transaction("trucks");
        var trucks = transaction.objectStore("trucks");
        var request = trucks.get(element);

        request.onsuccess = function() {
            var truck = request.result;

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
        };

        if (truckFind) {
            return;
        }
    });
}

function availableDriverExist(load) {
    var transaction = db.transaction("loads", "readwrite");
    var loads = transaction.objectStore("loads");
    var request = loads.get(load._id);

    request.onsuccess = function() {
        var newLoad = request.result;

        if (newLoad != undefined) {
            newLoad._state = 'posted';
            loads.delete(newLoad._id);
            request = loads.add(newLoad, newLoad._id);

            request.onsuccess = function() {
                console.log('load(id:' + load._id + ') posted');
                getCurrentCustomer(getLoadList);
            };
        }
    };
}

function availableDriverNotExist(load) {
    var transaction = db.transaction("loads", "readwrite");
    var loads = transaction.objectStore("loads");
    var request = loads.get(load._id);

    request.onsuccess = function() {
        var newLoad = request.result;

        if (newLoad != undefined) {
            newLoad._state = 'notfound';
            loads.delete(newLoad._id);
            request = loads.add(newLoad, newLoad._id);

            request.onsuccess = function() {
                console.log("driver for ".concat(newLoad._id, "(load id) is not found"));
                getCurrentCustomer(getLoadList);
            };
        }
    };
} //--------------------------------------------CUSTOMER COMPLETE LOAD


function rejectLoadOnPosition(pos) {
    getCurrentCustomer(rejectLoad, pos);
}

function rejectLoad(customer, pos) {
    var transaction = db.transaction("loads", "readwrite");
    var loads = transaction.objectStore("loads");
    var request = loads.get(customer.loads[pos]);

    request.onsuccess = function() {
        var load = request.result;

        if (load != undefined) {
            var driverId = load._driverId;
            load._driverId = 0;
            load._state = 'refused';
            loads.delete(load._id);
            var newLoadRequest = loads.add(load, load._id);

            newLoadRequest.onsuccess = function() {
                console.log("Груз добавлен в хранилище. id = ", newLoadRequest.result);
            };

            var _transaction4 = db.transaction('drivers', 'readwrite');

            var drivers = _transaction4.objectStore('drivers');

            var newRequest = drivers.get(driverId);

            newRequest.onsuccess = function() {
                var driver = newRequest.result;

                if (driver != undefined) {
                    if (driver._mark == 0) {
                        driver._mark = 0.1;
                    } else {
                        driver._mark = (driver._mark + 0.1) / 2;
                    }

                    drivers.delete(driverId);
                    var newDriverRequest = drivers.add(driver, driver._id);

                    newDriverRequest.onsuccess = function() {
                        console.log("Пользователь добавлен в хранилище. id = ", newDriverRequest.result);
                    };
                }
            };

            getLoadList(customer);
        }
    };
}

function confirmLoadOnPosition(pos) {
    getCurrentCustomer(confirmLoad, pos);
}

function confirmLoad(customer, pos) {
    var transaction = db.transaction("loads", "readwrite");
    var loads = transaction.objectStore("loads");
    var request = loads.get(customer.loads[pos]);

    request.onsuccess = function() {
        var load = request.result;

        if (load != undefined) {
            load._state = 'mark';
            loads.delete(load._id);
            var newRequest = loads.add(load, load._id);

            newRequest.onsuccess = function() {
                console.log("Груз добавлен в хранилище. id = ", newRequest.result);
                document.querySelector('.customer-mark-block-wrapper').style.display = 'flex';
            };
        }
    };
}

function setCancelConfirm() {
    getCurrentCustomer(cancelConfirm);
}

function cancelConfirm(customer) {
    customer.loads.forEach(function(element) {
        var transaction = db.transaction("loads", "readwrite");
        var loads = transaction.objectStore("loads");
        var request = loads.get(element);

        request.onsuccess = function() {
            var load = request.result;

            if (load != undefined) {
                if (load._state == 'mark') {
                    load._state = 'completed';
                    loads.delete(load._id);
                    var newRequest = loads.add(load, load._id);

                    newRequest.onsuccess = function() {
                        console.log("Груз добавлен в хранилище. id = ", newRequest.result);
                    };

                    document.querySelector('.customer-mark-block-wrapper').style.display = 'none';
                }
            }
        };
    });
} //-------------------------------------------------CUSTOMER GIVE MARK


function giveDriverMark(mark) {
    getCurrentCustomer(saveDriverMark, mark);
}

function saveDriverMark(customer, mark) {
    customer.loads.forEach(function(element, index) {
        var transaction = db.transaction("loads", "readwrite");
        var loads = transaction.objectStore("loads");
        var request = loads.get(element);

        request.onsuccess = function() {
            var load = request.result;

            if (load != undefined) {
                if (load._state == 'mark') {
                    var _transaction5 = db.transaction("drivers", "readwrite");

                    var drivers = _transaction5.objectStore("drivers");

                    var driverRequest = drivers.get(load._driverId);

                    driverRequest.onsuccess = function() {
                        var driver = driverRequest.result;

                        if (driver != undefined) {
                            if (driver._mark == 0) {
                                driver._mark = mark;
                            } else {
                                driver._mark = (driver._mark + mark) / 2;
                            }

                            drivers.delete(driver._id);
                            var newDriverRequest = drivers.add(driver, driver._id);

                            newDriverRequest.onsuccess = function() {
                                console.log("Пользователь добавлен в хранилище. id = ", newDriverRequest.result);
                            };
                        }
                    };

                    getLoadList(customer);
                    document.querySelector('.customer-mark-block-wrapper').style.display = 'none';
                    customer.deleteLoadId(index);
                    deleteUser('customer');
                    saveUser(customer);
                }
            }
        };
    });
}

function setNoDriverMark() {
    getCurrentCustomer(noDriverMark);
}

function noDriverMark(customer) {
    customer.loads.forEach(function(element, index) {
        var transaction = db.transaction("loads", "readwrite");
        var loads = transaction.objectStore("loads");
        var request = loads.get(element);

        request.onsuccess = function() {
            var load = request.result;

            if (load != undefined) {
                if (load._state == 'mark') {
                    getLoadList(customer);
                    document.querySelector('.customer-mark-block-wrapper').style.display = 'none';
                    customer.deleteLoadId(index);
                    deleteUser('customer');
                    saveUser(customer);
                }
            }
        };
    });
} //----------------------------------------------SHOW CUSTOMER MARK


function showCustomersMark() {
    var elem = document.querySelector('.dicsplay-customer-mark');
    getCurrentCustomer(showMark, elem);
}

function showMark(user, elem) {
    elem.innerHTML = '';
    var mark = Math.round(user._mark);
    elem.innerHTML = "Your mark: ".concat(mark, "/5");
} //-----------------------------------------CREATE NEW TRUCK


function checkTruckForm() {
    event.preventDefault();
    var title = document.querySelector('#truck-title');
    var category = document.querySelector('#truck-category');
    var err = false;

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
    var truck;

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
    var transaction = db.transaction("trucks", "readwrite");
    var trucks = transaction.objectStore("trucks");
    var request = trucks.add(truck, truck.id);

    request.onsuccess = function() {
        console.log("Грузовик добавлен в хранилище. id = ", request.result);
        truckFormClear();
    };

    request.onerror = function() {
        console.log("Ошибка", request.error);
    };
} //---------------------------------------CREATE FREE TRUCK LIST


function getTruckList() {
    var transaction = db.transaction('trucks');
    var trucks = transaction.objectStore('trucks');
    var driverIdIndex = trucks.index("driver_id_truck");
    var request = driverIdIndex.getAll(0);

    request.onsuccess = function() {
        if (request.result !== undefined) {
            createTruckList(request.result);
        } else {
            console.log('no trucks');
        }
    };
}

function createTruckList(truckList) {
    var truckListElem = document.querySelector('.select-truck');
    truckList.forEach(function(element) {
        var div = createTruckItem(element);
        truckListElem.append(div);
    });
    navigation(['.driver-page'], ['.select-truck-page']);
}

function createTruckItem(truck) {
    var div = document.createElement('div');
    div.className = "truck-item";
    div.innerHTML = "".concat(truck._title, " (").concat(truck._type, ") <button onclick=\"chooseTruck(").concat(truck._id, ")\">Choose</button>");
    return div;
}

function chooseTruck(id) {
    console.log("you select truck: ".concat(id, "(id)"));
    getCurrentDriver(setDriverInTruck, id);
    clearTruckList();
    navigation(['.select-truck-page'], ['.driver-page']);
}

function clearTruckList() {
    document.querySelector('.select-truck').innerHTML = '';
}

function getCurrentDriver(callback, pos) {
    var transaction = db.transaction("drivers");
    var drivers = transaction.objectStore("drivers");
    var request = drivers.get(getUser());

    request.onsuccess = function() {
        var user = request.result;

        if (user != undefined) {
            var currentDriver = new Driver(user._name, user._lastName, user._age, user._phone, user._email, user._password, user._city, user._anotherCity, user._id, user._mark, user._truckId, user._loadId);

            if (pos != undefined) {
                callback(currentDriver, pos);
            } else {
                callback(currentDriver);
            }
        }
    };
}

function setDriverInTruck(currentDriver, id) {
    var transaction = db.transaction("trucks");
    var trucks = transaction.objectStore("trucks");
    var request = trucks.get(id);

    request.onsuccess = function() {
        var truck = request.result;

        if (truck != undefined) {
            freeOldTruck(currentDriver._id);
            deleteTruck(truck._id);
            createTruck(truck._title, 'Truck', truck);
        }

        deleteUser('driver');
        currentDriver.truckId = id;
        saveUser(currentDriver);
    };
}

function freeOldTruck(driverId) {
    var transaction = db.transaction("trucks");
    var trucks = transaction.objectStore("trucks");
    var driverIdIndex = trucks.index("driver_id_truck");
    var request = driverIdIndex.get(driverId);

    request.onsuccess = function() {
        if (request.result != undefined) {
            var truck = request.result;
            deleteTruck(truck._id);
            createTruck(truck._title, 'Free', truck);
        }
    };
}

function deleteTruck(id) {
    var transaction = db.transaction("trucks", "readwrite");
    var trucks = transaction.objectStore("trucks");
    trucks.delete(id);
} //---------------------------------------------GET POSTED LOAD(DRIVER)


function findPostedLoads() {
    var transaction = db.transaction('loads');
    var loads = transaction.objectStore('loads');
    var postedLoadsIndex = loads.index("load_state");
    var request = postedLoadsIndex.getAll('posted');

    request.onsuccess = function() {
        var postedLoads = request.result;

        if (postedLoads != undefined) {
            getCurrentDriver(getTruckParameters, postedLoads);
        }
    };
}

function getTruckParameters(currentDriver, postedLoads) {
    var transaction = db.transaction('trucks');
    var trucks = transaction.objectStore('trucks');
    var driverIdIndex = trucks.index("driver_id_truck");
    var request = driverIdIndex.get(currentDriver._id);

    request.onsuccess = function() {
        var truck = request.result;

        if (truck != undefined) {
            var truckType = truck._type;
            var suitLoads;

            if (truckType == 'Sprinter') {
                suitLoads = postedLoads.filter(function(item) {
                    var loadType = checkLoadType(item);

                    if (loadType == 'Sprinter') {
                        return true;
                    }

                    return false;
                });
            }

            if (truckType == 'Small Straite') {
                suitLoads = postedLoads.filter(function(item) {
                    var loadType = checkLoadType(item);

                    if (loadType == 'Sprinter' || loadType == 'Small Straite') {
                        return true;
                    }

                    return false;
                });
            }

            if (truckType == 'Long Straite') {
                suitLoads = postedLoads;
            }

            createAvailableLoadsList(suitLoads);
        }
    };
}

function createAvailableLoadsList(loads) {
    var loadListElem = document.querySelector('.select-load-list');
    loads.forEach(function(element) {
        var div = createAvailableLoadItem(element);
        loadListElem.append(div);
    });
}

function createAvailableLoadItem(load) {
    var div = document.createElement('div');
    div.className = "posted-load-item";
    div.innerHTML = "".concat(load._title, " <button class=\"take-load\" onclick=\"takeLoadOnPosition(").concat(load._id, ")\">take</button>");
    return div;
}

function clearAvailableLoadList() {
    var customerLoadList = document.querySelector('.select-load-list');
    customerLoadList.innerHTML = '';
} //-----------------------------------------------------TAKE LOAD


function takeLoadOnPosition(id) {
    console.log("you take load: ".concat(id, "(id)"));
    getCurrentDriver(takeLoad, id);
    clearAvailableLoadList();
    navigation(['.select-load-page'], ['.driver-page']);
}

function takeLoad(currentDriver, id) {
    var transaction = db.transaction("loads", "readwrite");
    var loads = transaction.objectStore("loads");
    var request = loads.get(id);

    request.onsuccess = function() {
        var load = request.result;

        if (load != undefined) {
            loads.delete(load._id);
            load._driverId = currentDriver.id;
            load._state = 'taken';
            var newRequest = loads.add(load, load._id);

            newRequest.onsuccess = function() {
                console.log("Груз добавлен в хранилище. id = ", newRequest.result);
            };

            deleteUser('driver');
            currentDriver.loadId = id;
            saveUser(currentDriver);
            showTakenLoad(currentDriver);
        }
    };
} //-------------------------------------------------SHOW TAKEN LOAD(DRIVER)


function showTakenLoad(driver) {
    if (driver.loadId == 0) {
        showDriverButtons();
        return;
    }

    hideDriverButtons();
    var transaction = db.transaction('loads');
    var loads = transaction.objectStore('loads');
    var request = loads.get(driver.loadId);

    request.onsuccess = function() {
        var load = request.result;

        if (load != undefined) {
            showLoadInfo(load, '.driver-load-list');
        } else {
            loadListElem = document.querySelector(".driver-load-list");
            createCustomerRefused(undefined, loadListElem);
        }
    };
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
    var loadListElem = document.querySelector("".concat(selector));

    if (load._state == 'completed' || load._state == 'mark') {
        completedLoadShow(load);
        return;
    }

    infoItem('Title', load._title, loadListElem);
    infoItem('Size', load._size, loadListElem);
    infoItem('Weight', load._weight, loadListElem);
    infoItem('Description', load._description, loadListElem);
    infoItem('From city', load._fromCity, loadListElem);
    infoItem('Street', load._fromStreet, loadListElem);
    infoItem('To city', load._toCity, loadListElem);
    infoItem('Street', load._toStreet, loadListElem);

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
    var div = document.createElement('div');
    div.className = "load-info";
    div.innerHTML = "<span class=\"info-name\">".concat(itemName, "<span>  :  <span class=\"info\">").concat(itemInfo, "</span>");
    loadListElem.append(div);
}

function showCustomerInfo(customerId, loadListElem, callback) {
    var transaction = db.transaction("customers");
    var customers = transaction.objectStore("customers");
    var request = customers.get(customerId);

    request.onsuccess = function() {
        var customer = request.result;

        if (customer != undefined) {
            infoItem('Customer name', customer._name, loadListElem);
            infoItem('Customer lastname', customer._lastName, loadListElem);
            infoItem('Customer phone', customer._phone, loadListElem);
        }

        if (callback != undefined) {
            callback(customerId, loadListElem);
        }
    };
}

function createTakenLoadButtons(customerId, loadListElem) {
    var buttonRefuse = document.createElement('button');

    buttonRefuse.onclick = function() {
        getCurrentDriver(driverRefuseLoad);
    };

    buttonRefuse.innerHTML = 'refuse';
    loadListElem.append(buttonRefuse);
    buttonRefuse.style.marginRight = '30px';
    var buttonLoaded = document.createElement('button');

    buttonLoaded.onclick = function() {
        getCurrentDriver(driverLoadedLoad);
    };

    buttonLoaded.innerHTML = 'loaded';
    loadListElem.append(buttonLoaded);
}

function createCustomerRefused(customerId, loadListElem) {
    clearTakenLoad();
    var div = document.createElement('div');
    div.className = "customer-refused-item";
    div.innerHTML = "Delivery refused <button onclick=\"callDeleteDriverLoad()\">delete</button>";
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
    var id = driver.loadId;
    driver.loadId = 0;
    deleteUser('driver');
    saveUser(driver);
    var transaction = db.transaction('loads', 'readwrite');
    var loads = transaction.objectStore('loads');
    var request = loads.get(id);

    request.onsuccess = function() {
        var load = request.result;

        if (load != undefined) {
            load._driverId = 0;
            showTakenLoad(driver);
            loads.delete(load._id);
            var newRequest = loads.add(load, load._id);

            newRequest.onsuccess = function() {
                console.log("Груз добавлен в хранилище. id = ", newRequest.result);
            };
        }
    };
}

function driverRefuseLoad(driver) {
    var transaction = db.transaction('loads', 'readwrite');
    var loads = transaction.objectStore('loads');
    var request = loads.get(driver.loadId);

    request.onsuccess = function() {
        var load = request.result;

        if (load != undefined) {
            load._state = 'refused';
            loads.delete(load._id);
            var newRequest = loads.add(load, load._id);

            newRequest.onsuccess = function() {
                console.log("Груз добавлен в хранилище. id = ", newRequest.result);
                deleteDriverLoad(driver);
            };
        }
    };
}

function driverLoadedLoad(driver) {
    var transaction = db.transaction('loads', "readwrite");
    var loads = transaction.objectStore('loads');
    var request = loads.get(driver.loadId);

    request.onsuccess = function() {
        var load = request.result;

        if (load != undefined) {
            load._state = 'loaded';
            loads.delete(load._id);
            var newRequest = loads.add(load, load._id);

            newRequest.onsuccess = function() {
                console.log("Груз добавлен в хранилище. id = ", newRequest.result);
                clearTakenLoad();
                showTakenLoad(driver);
            };
        }
    };
} //----------------------------------------------------DRIVER COMPLETE LOAD


function createCompleteLoad(customerId, loadListElem) {
    var buttonComplete = document.createElement('button');

    buttonComplete.onclick = function() {
        getCurrentDriver(driverCompleteLoad);
    };

    buttonComplete.innerHTML = 'complete';
    loadListElem.append(buttonComplete);
}

function driverCompleteLoad(driver) {
    var transaction = db.transaction('loads', 'readwrite');
    var loads = transaction.objectStore('loads');
    var request = loads.get(driver.loadId);

    request.onsuccess = function() {
        var load = request.result;

        if (load != undefined) {
            load._state = 'completed';
            loads.delete(load._id);
            var newRequest = loads.add(load, load._id);

            newRequest.onsuccess = function() {
                console.log("Груз добавлен в хранилище. id = ", newRequest.result);
                clearTakenLoad();
                completedLoadShow(load);
            };
        }
    };
}

function completedLoadShow(load) {
    var loadListElem = document.querySelector('.driver-load-list');
    var div = document.createElement('div');
    div.innerHTML = 'Delivery is completed';
    div.style.marginBottom = '10px';
    div.style.textAlign = 'center';
    loadListElem.append(div);
    showCustomerInfo(load._customerId, loadListElem, showCustomerMark);
} //-----------------------------------------------DRIVER GIVE MARK


function showCustomerMark(customerId, loadListElem) {
    document.querySelector('.driver-page .driver-mark-block').style.display = 'flex';
}

function hideCustomerMark() {
    document.querySelector('.driver-page .driver-mark-block').style.display = 'none';
}

function giveCustomerMark(mark) {
    getCurrentDriver(saveCustomerMark, mark);
}

function saveCustomerMark(driver, mark) {
    hideCustomerMark();
    clearTakenLoad();
    var transaction = db.transaction('loads', 'readwrite');
    var loads = transaction.objectStore('loads');
    var request = loads.get(driver.loadId);

    request.onsuccess = function() {
        var load = request.result;

        if (load != undefined) {
            if (mark != 0) {
                var _transaction6 = db.transaction('customers', 'readwrite');

                var customers = _transaction6.objectStore('customers');

                var newRequest = customers.get(load._customerId);

                newRequest.onsuccess = function() {
                    var customer = newRequest.result;

                    if (customer != undefined) {
                        if (customer._mark == 0) {
                            customer._mark = mark;
                        } else {
                            customer._mark = (customer._mark + mark) / 2;
                        }

                        customers.delete(customer._id);
                        var newCustomerRequest = customers.add(customer, customer._id);

                        newCustomerRequest.onsuccess = function() {
                            console.log("Пользователь добавлен в хранилище. id = ", newCustomerRequest.result);
                        };
                    }
                };
            }

            showDriverButtons();
            driver.loadId = 0;
            deleteUser('driver');
            saveUser(driver);
        }
    };
} //---------------------------------------------DRIVER DISPLAY MARK


function showDriverMark() {
    var elem = document.querySelector('.display-driver-mark');
    getCurrentDriver(showMark, elem);
}