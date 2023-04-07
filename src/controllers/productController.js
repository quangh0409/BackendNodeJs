const mongoose = require("mongoose");
const Product = mongoose.model("products");

exports.getAllProducts = (req, res) => {
  Product.find().then(
    (products) => {
      res.send({ products });
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

exports.create = (req, res) => {
  var newProduct = new Product({
    name: req.body.name,
    color: req.body.color,
    price: req.body.price,
  });
  newProduct
    .save()
    .then(() => {
      res.send(newProduct);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getById = (req, res) => {
  // task.findById(req.params.productId, (err, product) => {
  //   if (err) res.send(err);
  //   res.json(product);
  // });
  var productId = req.params.productId;

  Product.findOne({ _id: productId }).then(
    (products) => {
      res.send(products);
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

exports.update = (req, res) => {
  // product.findOneAndUpdate(
  //   { _id: req.params.productId },
  //   req.body,
  //   { new: true },
  //   (err, product) => {
  //     if (err) res.send(err);
  //     res.json(product);
  //   }
  // );
  const query = { _id: req.params.productId };
  Product.findOneAndUpdate(
    query,
    {
      name: req.body.name,
      color: req.body.color,
      price: req.body.price,
    },
    { upsert: true, new: true }
  )
    .then((raw) => {
      res.send(raw);
    })
    .catch((e) => {
      res.status(400).send("Invalid user supplied");
    });
};

exports.delete = (req, res) => {
  // task.deleteOne({ _id: req.params.productId }, err => {
  //   if (err) res.send(err);
  //   res.json({
  //     message: 'task successfully deleted',
  //    _id: req.params.productId
  //   });
  // });
  const query = { _id: req.params.productId };
  Product.findOneAndRemove(query)
    .then((raw) => {
      res.send(raw);
    })
    .catch((e) => {
      res.status(400).send("Invalid username supplied");
    });
};
