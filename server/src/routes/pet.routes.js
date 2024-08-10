import { Router } from 'express';
import { getPets, getOnePet, createPet, updatePet, deletePet} from '../controllers/pet.controller.js';


const petRouter = Router();

// TODAS ESTAS RUTAS PARTEN DESDE 
//pet
petRouter.get("/getPets",  getPets);
petRouter.get("/:id",  getOnePet);
petRouter.post("/create",  createPet);
petRouter.put("/update/:id",  updatePet);
petRouter.delete("/delete/:id",  deletePet);

export default petRouter;

 
