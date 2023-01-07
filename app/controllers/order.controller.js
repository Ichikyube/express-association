
const db = require("../models");
const Order = db.Order;
const Customer = db.Customer;
const Product = db.Product;

exports.add = (req, res) => {
  Order.create({
    customerId: req.body.customerId,
    productId: req.body.productId,
    tanggal_order: req.body.tanggal_order,
    status: req.body.status
  })
    .then((order) => {
      res.status(200).send({
        message: "Order successfully made",
        data: order
      });
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.all = (req, res) => {
  Order.findAll({
    include: [Customer, Product],
  })
    .then((order) => {
      res.status(200).send({
        message: "Order is found",
        data: order
      })
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}