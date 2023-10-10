import express from "express";
import { createRole, updateRole, getAllRoles, deleteRole } from '../controllers/role.controller.js'

const router = express.Router();

// Create a new role
router.post('/', createRole);

router.put('/:id', updateRole);

router.get('/getAll', getAllRoles);

router.delete('/:id', deleteRole);

export default router;