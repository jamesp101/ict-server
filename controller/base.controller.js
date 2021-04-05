
const connection = require('../database.config').getConnection()
const mongoose = require('mongoose')

module.exports = class Controller {

    constructor(model, ) {
        this.Model = model
    }


    async insert(data) {
        const model = new this.Model(data)
        await model.save()
        return model
    }

    async update(find = {}, data = {}, options = {}) {
        return await this.Model.findOneAndUpdate(
            find,
            data,
            { new: true, options }
        )
    }
    async updateMulitple(find = {}, fields = {}, options = {}) {
        return await this.Model.updateMany(find, fields)
    }

    async delete(id) {
        const model = this.Model
        await model.deleteOne({ _id: id })
        return model
    }

    async select(query = {}, field = {}, populate = {}) {
        const model = this.Model
        return model.find(query, field)
    }

}


