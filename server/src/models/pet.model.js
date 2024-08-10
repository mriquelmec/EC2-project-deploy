import { model, Schema } from 'mongoose';
import uniqueValidator  from 'mongoose-unique-validator';

const PetSchema = new Schema({
    name: {
        type: String,
        required: [true, "Pet must have a name!"],
        required: [2, "Pet name must be at least two characters!"],
        unique: true,
    },
    type: {
        type: String,
        required: [true, "Pet must have a type!"],
        required: [2, "Pet tpye must be at least two characters!"]
    },
    description: {
        type: String,
        required: [true, "Pet must have a description!"],
        required: [5, "Pet description must be at least five characters!"]
    },
    skillOne: {
        type: String,
    },
    skillTwo: {
        type: String,
    },
    skillThree: {
        type: String,
    }
    
}, {timestamps: true})

PetSchema.plugin(uniqueValidator);
const PetModel = model("Pet", PetSchema);

export default PetModel;

