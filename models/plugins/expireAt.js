const expireAtPlugin = (schema, options) => {
  schema.add({ expiresAt: Date });

  schema.pre('save', (next) => {
    this.expiresAt = Date.now() + options.seconds * 1000;
    next();
  });
};

module.exports = expireAtPlugin;
