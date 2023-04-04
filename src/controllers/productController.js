const mongoose = require("mongoose");
const product = mongoose.model("product");

exports.getAllProducts = (req, res) => {
  product.find().then(
    (products) => {
      res.send({ products });
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

exports.create = (req, res) => {
  // const newProduct = new product(req.body);
  // newProduct.save((err, product) => {
  //   if (err) res.send(err);
  //   res.json(product);
  // });

  var newproduct = new product({
    name: req.body.name,
    color: req.body.color,
    price: req.body.price,
  });
  // result = User.addUser(user);
  newproduct.save().then(
    (newproduct) => {
      res.send(newproduct);
    },
    (e) => {
      res.status(400).send(e);
    }
  );
};

exports.getById = (req, res) => {
  // task.findById(req.params.productId, (err, product) => {
  //   if (err) res.send(err);
  //   res.json(product);
  // });
  var productId = req.params.productId;

  product.findOne({ _id: productId }).then(
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
  product
    .findOneAndUpdate(
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
  product
    .findOneAndRemove(query)
    .then((raw) => {
      res.send(raw);
    })
    .catch((e) => {
      res.status(400).send("Invalid username supplied");
    });
};
