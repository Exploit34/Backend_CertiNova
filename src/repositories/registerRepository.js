const db = require('../database/database');

const registerRepository = (
    fullname,
    email,
    phone,
    company = null,
    password,
    role = 'user'
    ) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users (fullname, email, phone, company, password, role)
                    VALUES (?, ?, ?, ?, ?, ?)`,
                [fullname, email, phone, company ?? null, password, role],
                (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                }
            );
        });
    };

module.exports = registerRepository;