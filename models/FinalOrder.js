const express = require('express');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const seq = require('sequelize');
const path = require("path");



const Store = require("../Schemas/Store");
const Customer = require('../Schemas/Student');
const Order = require('../Schemas/orders');
const Product = require('../Schemas/products');


class Store {
    constructor() {

    }
    storeFinalOrders(storeId, costumerId){

    }
}