import express from "express";
import { createRole, updateRole, getAllRoles, deleteRole } from '../controllers/role.controller.js'
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Create a new role
router.post('/', verifyAdmin, createRole);

router.put('/:id', verifyAdmin, updateRole);

router.get('/getAll', verifyAdmin, getAllRoles);

router.delete('/:id', verifyAdmin, deleteRole);

export default router;