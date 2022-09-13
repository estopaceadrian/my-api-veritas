const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  dateCreated: { type: Date, default: Date.now },
  quantity: { type: Number, required: true, min: 0, max: 255 },
  price: { type: Number, default: 0 },
  description: { type: String, default: '' },
});

productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
productSchema.set('toJSON', {
  virtuals: true,
});

//Model
exports.Product = mongoose.model('Product', productSchema);
exports.productSchema = productSchema;
