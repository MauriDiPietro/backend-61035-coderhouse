import {Schema, model} from "mongoose";

const PetSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

export const PetModel = model("pets", PetSchema);
