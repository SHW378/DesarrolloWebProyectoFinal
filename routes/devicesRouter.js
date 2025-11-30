const express = require('express');
const router = express.Router();
const DevicesService = require('../services/devicesService');
const service = new DevicesService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       required:
 *         - serialNumber
 *         - ownerId
 *         - zoneId
 *       properties:
 *         serialNumber:
 *           type: string
 *           description: Número de serie único
 *         model:
 *           type: string
 *           description: Modelo del dispositivo
 *         ownerId:
 *           type: string
 *           description: ID del usuario propietario
 *         zoneId:
 *           type: string
 *           description: ID de la zona de instalación
 *         status:
 *           type: string
 *           enum: [active, maintenance, offline]
 *       example:
 *         serialNumber: "SN-IOT-2024-001"
 *         model: "ESP32-Cam-Pro"
 *         ownerId: "641f0a9c8b3d2e1f4a5b6c7d"
 *         zoneId: "641f0b1d8b3d2e1f4a5b6c8e"
 *         status: "active"
 */

/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: Gestión de dispositivos IoT
 */

/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: Listar todos los dispositivos
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: Lista de dispositivos con información populada (Owner y Zone)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 */
router.get('/', async (req, res, next) => {
    try {
        res.json(await service.getAll());
    } catch (e) {
        next(e);
    }
});

/**
 * @swagger
 * /api/devices/{id}:
 *   get:
 *     summary: Obtener dispositivo por ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle del dispositivo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 */
router.get('/:id', async (req, res, next) => {
    try {
        res.json(await service.getById(req.params.id));
    } catch (e) {
        next(e);
    }
});

/**
 * @swagger
 * /api/devices:
 *   post:
 *     summary: Crear dispositivo (Requiere Owner y Zone existentes)
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       201:
 *         description: Dispositivo creado exitosamente
 *       400:
 *         description: Error de validación (Owner o Zone no existen)
 */
router.post('/', async (req, res, next) => {
    try {
        res.status(201).json(await service.create(req.body));
    } catch (e) {
        next(e);
    }
});

/**
 * @swagger
 * /api/devices/{id}:
 *   patch:
 *     summary: Actualizar dispositivo
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       200:
 *         description: Dispositivo actualizado
 */
router.patch('/:id', async (req, res, next) => {
    try {
        res.json(await service.update(req.params.id, req.body));
    } catch (e) {
        next(e);
    }
});

/**
 * @swagger
 * /api/devices/{id}:
 *   delete:
 *     summary: Eliminar dispositivo
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dispositivo eliminado
 */
router.delete('/:id', async (req, res, next) => {
    try {
        res.json(await service.delete(req.params.id));
    } catch (e) {
        next(e);
    }
});

module.exports = router;