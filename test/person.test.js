
const PersonController = require('../controller/person.controller')
const controller = new PersonController()
const assert = require('assert')



const sample_data = {
    lastname: 'Lastname',
    firstname: 'Firstname',
    birthdate: '1999-04-17',
    gender: 'Male',
    address: {
        street: 'Street',
        barangay: '3',
        city: 'City',
        province: 'Province'
    }


}


describe('Person Model:', () => {

    let person

    describe('Adding to db', () => {

        it(`should return 'createdAt' data`, async () => {
            person = await controller.insert(sample_data)
            const check = (typeof person.createdAt == "undefined")
            assert.equal(check, false)
        })
    })
    describe('Retrieve from db', () => {
        it('should return all documents', async () => {
            const get = await controller.select()
            assert(get.length >= 0, 'no documents retrieved')
        })

        it('should return lastnames', async () => {
            const get = await controller.select({}, { lastname: 1 })
            assert(get.length >= 0, 'no documents retrieved')
        })
        it('should return the created db', async () => {
            const get = await controller.select({ _id: person.id }, { lastname: 1 })
            assert(get.length >= 0, 'no documents retrieved')
        })

    })

    describe('Editing to db', () => {

        it(`should return updated Data `, async () => {
            const ln_update = 'Hello'
            const updated = await controller.update(
                { _id: person.id },
                { lastname: ln_update }
            )
            person = updated
            assert.equal(updated.lastname, ln_update)
        })
    })
    describe('Editing to db', () => {

        it(`should return updated Data `, async () => {
            const ln_update = 'Hello'
            const updated = await controller.update(
                { _id: person.id },
                { lastname: ln_update }
            )
            person = updated
            assert.equal(updated.lastname, ln_update)
        })
    })




})
