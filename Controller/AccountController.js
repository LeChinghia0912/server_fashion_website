const Account = require('../models/Account'); // Assuming 'Account' is the correct model name
const { mutipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');
const bcrypt = require('bcryptjs');

class AccountController {
    createAccount(req, res, next) {
        res.render('account/createAccount');
    }

    async showAccount(req, res, next) {
        try {
            const accounts = await Account.find({});
            const responseData = mutipleMongooseToObject(accounts);
            res.render('account/show', { accounts: responseData });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách tài khoản:', error);
            res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách tài khoản' });
        }
    }

    async newAccount(req, res, next) {
        const { fullName, username, email, address, phoneNumber, password, confirmPassword } = req.body;

        if (!fullName || !username || !email || !address || !phoneNumber || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
        }

        try {
            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Mật khẩu không trùng khớp' });
            }

            const existingUser = await Account.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                if (existingUser.username === username) {
                    return res.status(400).json({ message: 'Username đã tồn tại' });
                }
                if (existingUser.email === email) {
                    return res.status(400).json({ message: 'Email đã tồn tại' });
                }
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const account = new Account({
                fullName,
                username,
                email,
                address,
                phoneNumber,
                password: hashedPassword,
            });

            await account.save();

            res.status(201).json({ message: 'Đăng kí tài khoản thành công' });
        } catch (error) {
            console.error('Lỗi khi đăng kí tài khoản:', error);
            res.status(500).json({ message: 'Có lỗi xảy ra khi đăng kí tài khoản' });
        }
    }

    async editAccount(req, res, next) {
        try {
            const account = await Account.findById(req.params.id);
            res.render('account/updateAccount', {
                account: mongooseToObject(account),
            });
        } catch (error) {
            next(error);
        }
    }

    async updateAccount(req, res, next) {
        const { fullName, address, phoneNumber } = req.body;

        if (!fullName || !address || !phoneNumber) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
        }

        try {
            const account = await Account.findById(req.params.id);

            if (!account) {
                return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
            }

            account.fullName = fullName;
            account.address = address;
            account.phoneNumber = phoneNumber;

            await account.save();

            res.redirect('/account/showAccount');
        } catch (error) {
            console.error('Lỗi khi cập nhật tài khoản:', error);
            res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật tài khoản' });
        }
    }

    async deleteAccount(req, res, next) {
        try {
            await Account.deleteOne({ _id: req.params.id });
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AccountController();
