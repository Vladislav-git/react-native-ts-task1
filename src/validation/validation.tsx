const Joi = require('react-native-joi')

const registrationShema = Joi.object().keys({

    firstname: Joi.string().alphanum().min(3).max(30).required(),

    secondname : Joi.string().alphanum().min(3).max(30).required(),

    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),

    email: Joi.string().email().required(),

    shops: Joi.array()
})

const shopSchema = Joi.object().keys({

    shopname: Joi.string().required(),

    shoptype: Joi.string().required(),

    shoplat: Joi.string().required(),

    shoplon: Joi.string().required(),

    isLiked: Joi.bool().required()
});

export const registrationValid = (data) => {
    return registrationShema.validate(data)
}

export const shopValid = (data) => {
    let arr = []
    let err = ''
    for (let i = 0 ; i < data.shops.length; i++) {
        arr.push(shopSchema.validate(data.shops[i]))
    }
    for (let i = 0 ; i < arr.length; i++) {
        if (arr[i].error === null) {
            continue;
        } else {
            err = 'error'
        }
    }
    return err
}


