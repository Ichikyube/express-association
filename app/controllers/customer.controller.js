const db = require("../models");
const config = require("../config/auth.config");
const Customer = db.Customer;
const Op = db.Sequelize.Op;

// Create and Save a new Customer
exports.create = (req, res) => {
    if(!req.body.fullname) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    const customer = {
        fullname:      req.body.fullname,
        email:      req.body.email,
        phone:   req.body.phone,
        address:    req.body.address
    }

    Customer.create(customer).then(data=>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while creating the Customer"
        })
    })
};
// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    const fullname = req.query.fullname;
    var condition = fullname ? { fullname: { [Op.iLike]: `%${fullname}%` } } : null;

    Customer.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Customer.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Customer with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Customer with id=" + id
        });
      });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Customer.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Customer was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Customer with id=" + id
        });
      });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Customer.destroy({
        where:{id: id}
    }).then(num=>   {
        if(num ==1) {
        res.send({
            message: "Customer was deleted successfully!"
        });
        } else {
            res.send({
                message: `Cannot delete Customer with id=${id}.  Maybe Customer was not found!`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete Customer with id=" + id
        });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Customer.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({message: `${nums} Customers were deleted successfull`})
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while removing all customers."
        })
    })
};
