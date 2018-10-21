module.exports = new Date().toISOString().slice(0, 16).replace('T', '-').replace(/:/gi, '');
