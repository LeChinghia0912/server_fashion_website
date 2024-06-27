const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose
            .connect('mongodb://127.0.0.1:27017/ivymoda', {
                family: 4,
            })
            .then(() => {
                console.log('Connect success!');
            })
            .catch(() => {
                console.log('Connect Error!');
            });
    } catch (error) {
        console.error('Lỗi kết nối MongoDB:', error);
    }
}

module.exports = { connect };
