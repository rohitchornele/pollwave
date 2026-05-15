import Joi from "joi";

class BaseDto {

    static schmea = Joi.object({})

    static validate(data) {
        const {error, value} = this.schmea.validate(data, {
            abortEarly: false,
            stripUnknown: true
        })

        if(error){
            const errors = error.details.map((d) => d.message)
            return {errors, value : null}
        }

        return {errors: null, value}
    }
}

export default BaseDto;