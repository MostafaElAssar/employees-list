'use strict';

const express = require('express');
const uuid = require('uuid');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let employees = [];

app.get('/employees', function (req, res) {
  const promise = new Promise((resolve, reject) => {
    resolve(employees);
  });
  promise.then((data) => res.status(200).json(data));
});

app.post('/employees', function (req, res) {
  const promise = new Promise((resolve, reject) => {
    const newEmployee = {
      id: uuid.v4(),
      ...req.body,
      status: 'added',
    };
    employees.unshift(newEmployee);
    resolve(newEmployee);
  });
  promise.then((data) => res.status(201).json(data));
});

app.patch('/employees/:id', function (req, res) {
  const promise = new Promise((resolve, reject) => {
    const id = req.params.id;
    const index = employees.findIndex((el) => el.id === id);
    const updatedEmployee = {
      ...employees[index],
      ...req.body,
    };
    employees.splice(index, 1, updatedEmployee);
    resolve(updatedEmployee);
  });
  promise.then((data) => res.status(200).json(data));
});

app.listen(process.env.HTTP_PORT || 5000);
