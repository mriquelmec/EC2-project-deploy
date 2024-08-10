import PetModel from '../models/pet.model.js';

const getPets = async (req, res) => {
    try {
        const pets = await PetModel.find();
        res.json(pets);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const getOnePet = async (req, res) => {
    try {
        const pet = await PetModel.findOne({ _id: req.params.id });
        res.json(pet);
    } catch (err) {
        res.status(400).json("Error: " + err);
    }
};

const createPet = async (req, res) => { 
    try {
        // Verificar si ya existe una mascota con el mismo nombre
        const existingPet = await PetModel.findOne({ name: req.body.name });
        if (existingPet) {
            return res.status(400).json({
                message: 'El nombre de la mascota ya existe. Por favor, elige otro nombre.',
                field: 'name'
            });
        }

        const newPet = await PetModel.create(req.body);
        res.json(newPet);
    } catch (error) {
        console.log("Error en createPet:", error);
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'El nombre de la mascota ya existe. Por favor, elige otro nombre.',
                field: 'name'
            });
        }
        res.status(400).json({ message: 'Error al crear la mascota', error });
    }
};

const updatePet = async (req, res) => {
    try {
        const dataBody = req.body;
        const petId = req.params.id;

        // Verificar si el nombre que se intenta actualizar ya está en uso por otra mascota
        const existingPet = await PetModel.findOne({ name: dataBody.name });
        if (existingPet && existingPet._id.toString() !== petId) {
            return res.status(400).json({
                message: 'El nombre de la mascota ya existe. Por favor, elige otro nombre.',
                field: 'name'
            });
        }

        // Actualizar la mascota
        const updatedPet = await PetModel.findByIdAndUpdate(petId, dataBody, { new: true, runValidators: true });
        if (!updatedPet) {
            return res.status(404).json({ message: "Mascota no encontrada" });
        }
        res.json(updatedPet);
    } catch (error) {
        console.log("Error en updatePet:", error);
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'El nombre de la mascota ya existe. Por favor, elige otro nombre.',
                field: 'name'
            });
        }
        res.status(500).json(error);
    }
};

const deletePet = async (req, res) => {
    try {
        const deletedPet = await PetModel.findByIdAndDelete(req.params.id);
        if (!deletedPet) {
            return res.status(404).json({ message: "Mascota no encontrada" });
        }
        res.json({ message: "Mascota eliminada correctamente", pet_eliminado: deletedPet });
    } catch (error) {
        console.log("Error en deletePet:", error);
        res.status(500).json(error);
    }
};

export {
    getPets,
    getOnePet,
    createPet,
    updatePet,
    deletePet
};

