const userController = require('../controllers/userController.js')
const User = require('../models/user.js')

describe('UserController', () => {
    it('Should get create a new user', async () => {
        const newUser = await userController.default.create({ params: { userName: 'asd' } });
        console.log(newUser)
        await User.findOneById(newUser['_id'])
        expect(newUser).created.to.equal()
    });
});