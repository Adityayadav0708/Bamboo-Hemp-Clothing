const mongoose = require('mongoose');
const { User } = require('../models');
const store = require('../services/storeService');

const ADDRESS_FIELDS = [
  'recipientName',
  'addressLine1',
  'addressLine2',
  'city',
  'state',
  'postalCode',
  'country',
  'phone',
  'isDefault'
];

function validateAddressPayload(body = {}, { partial = false } = {}) {
  if (!partial) {
    const required = ['recipientName', 'addressLine1', 'city', 'state', 'postalCode'];
    for (const field of required) {
      if (!body[field] || !String(body[field]).trim()) {
        return `Field '${field}' is required for a shipping address.`;
      }
    }
  }
  if (body.postalCode !== undefined && !/^\d{6}$/.test(String(body.postalCode).trim())) {
    return 'Postal code must be a valid 6-digit Indian pincode.';
  }
  return null;
}

function formatAddresses(addresses = []) {
  return addresses.map((addr, idx) => ({
    _id: (addr._id || addr.id || `addr_${idx}`).toString(),
    id: (addr._id || addr.id || `addr_${idx}`).toString(),
    recipientName: addr.recipientName || '',
    addressLine1: addr.addressLine1 || '',
    addressLine2: addr.addressLine2 || '',
    city: addr.city || '',
    state: addr.state || '',
    postalCode: addr.postalCode || '',
    country: addr.country || 'India',
    phone: addr.phone || '',
    isDefault: Boolean(addr.isDefault)
  }));
}

async function ensureMongoAddressesInitialized(userDoc) {
  let dirty = false;
  if (!Array.isArray(userDoc.addresses)) userDoc.addresses = [];
  userDoc.addresses.forEach((addr) => {
    if (!addr._id) {
      addr._id = new mongoose.Types.ObjectId();
      dirty = true;
    }
  });
  if (dirty) {
    await userDoc.save();
  }
}

const getAddresses = async (req, res, next) => {
  try {
    const userId = req.user._id ? req.user._id.toString() : req.user.id;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId);
      if (user) {
        await ensureMongoAddressesInitialized(user);
        return res.json({
          success: true,
          data: formatAddresses(user.addresses)
        });
      }
    }

    const addresses = store.getUserAddresses(userId);
    return res.json({
      success: true,
      data: formatAddresses(addresses)
    });
  } catch (err) {
    next(err);
  }
};

const addAddress = async (req, res, next) => {
  try {
    const validationError = validateAddressPayload(req.body);
    if (validationError) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_ADDRESS', message: validationError }
      });
    }

    const userId = req.user._id ? req.user._id.toString() : req.user.id;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId);
      if (user) {
        await ensureMongoAddressesInitialized(user);
        const makeDefault = req.body.isDefault === true || user.addresses.length === 0;
        if (makeDefault) {
          user.addresses.forEach((a) => { a.isDefault = false; });
        }

        const newAddress = {
          _id: new mongoose.Types.ObjectId(),
          recipientName: req.body.recipientName.trim(),
          addressLine1: req.body.addressLine1.trim(),
          addressLine2: (req.body.addressLine2 || '').trim(),
          city: req.body.city.trim(),
          state: req.body.state.trim(),
          postalCode: String(req.body.postalCode).trim(),
          country: (req.body.country || 'India').trim(),
          phone: (req.body.phone || '').trim(),
          isDefault: makeDefault
        };

        user.addresses.push(newAddress);
        await user.save();

        const formatted = formatAddresses(user.addresses);
        return res.status(201).json({
          success: true,
          data: {
            address: formatted[formatted.length - 1],
            addresses: formatted
          }
        });
      }
    }

    const result = store.addUserAddress(userId, req.body);
    const formatted = formatAddresses(result.addresses);
    return res.status(201).json({
      success: true,
      data: {
        address: formatted.find(a => a._id === result.address._id.toString()) || formatted[formatted.length - 1],
        addresses: formatted
      }
    });
  } catch (err) {
    next(err);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const validationError = validateAddressPayload(req.body, { partial: true });
    if (validationError) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_ADDRESS', message: validationError }
      });
    }

    const userId = req.user._id ? req.user._id.toString() : req.user.id;
    const { addressId } = req.params;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId);
      if (user) {
        await ensureMongoAddressesInitialized(user);
        const target = user.addresses.find((a) => a._id.toString() === addressId);
        if (!target) {
          return res.status(404).json({
            success: false,
            error: { code: 'NOT_FOUND', message: 'Saved address not found.' }
          });
        }

        if (req.body.isDefault === true) {
          user.addresses.forEach((a) => { a.isDefault = false; });
        }

        for (const key of ADDRESS_FIELDS) {
          if (req.body[key] !== undefined) {
            target[key] = typeof req.body[key] === 'string' ? req.body[key].trim() : req.body[key];
          }
        }

        if (!user.addresses.some((a) => a.isDefault) && user.addresses.length > 0) {
          user.addresses[0].isDefault = true;
        }

        await user.save();
        const formatted = formatAddresses(user.addresses);
        return res.json({
          success: true,
          data: {
            address: formatted.find((a) => a._id === addressId),
            addresses: formatted
          }
        });
      }
    }

    const result = store.updateUserAddress(userId, addressId, req.body);
    if (!result) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Saved address not found.' }
      });
    }

    const formatted = formatAddresses(result.addresses);
    return res.json({
      success: true,
      data: {
        address: formatted.find((a) => a._id === addressId),
        addresses: formatted
      }
    });
  } catch (err) {
    next(err);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const userId = req.user._id ? req.user._id.toString() : req.user.id;
    const { addressId } = req.params;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId);
      if (user) {
        await ensureMongoAddressesInitialized(user);
        const idx = user.addresses.findIndex((a) => a._id.toString() === addressId);
        if (idx === -1) {
          return res.status(404).json({
            success: false,
            error: { code: 'NOT_FOUND', message: 'Saved address not found.' }
          });
        }

        const wasDefault = user.addresses[idx].isDefault;
        user.addresses.splice(idx, 1);
        if (wasDefault && user.addresses.length > 0) {
          user.addresses[0].isDefault = true;
        }

        await user.save();
        return res.json({
          success: true,
          data: {
            addresses: formatAddresses(user.addresses)
          }
        });
      }
    }

    const updated = store.deleteUserAddress(userId, addressId);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Saved address not found.' }
      });
    }

    return res.json({
      success: true,
      data: {
        addresses: formatAddresses(updated)
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  formatAddresses
};
