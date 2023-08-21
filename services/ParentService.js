const  Parent = require( "../Schemas/Parent");

const ParentService = {

    create: async (data) => {
            let parent = await Parent.create(data)
            return parent
    },

    fineOne: async (data) => {
        let parent = await Parent.findOne({where: {name: data.name, phone: data.phone}})
        return parent
    }
}

module.exports = ParentService
