const express = require('express');
const router = express.Router();
const SensorsService = require('../services/sensorsService');
const service = new SensorsService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Sensor:
 *       type: object
 *       required:
 *         - type
 *         - unit
 *       properties:
 *         type:
 *           type: string
 *           enum: [temperature, humidity, co2, noise]
 *           description: Tipo de sensor
 *         unit:
 *           type: string
 *           description: Unidad de medida (ej. °C, %, ppm)
 *         model:
 *           type: string
 *         location:
 *           type: string
 *           description: Coordenadas o descripción de ubicación
 *         isActive:
 *           type: boolean
 *       example:
 *         type: temperature
 *         unit: "°C"
 *         model: "DHT22"
 *         location: "21.1234, -101.5678"
 *         isActive: true
 */

/**
 * @swagger
 * tags:
 *   name: Sensors
 *   description: Gestión de sensores individuales
 */

/**
 * @swagger
 * /api/sensors:
 *   get:
 *     summary: Listar todos los sensores
 *     tags: [Sensors]
 *     responses:
 *       200:
 *         description: Lista de sensores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sensor'
 */
router.get('/', async (req, res, next) => {
    try { res.json(await service.getAll()); } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/sensors/{id}:
 *   get:
 *     summary: Obtener sensor por ID
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle del sensor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 */
router.get('/:id', async (req, res, next) => {
    try { res.json(await service.getById(req.params.id)); } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/sensors:
 *   post:
 *     summary: Registrar nuevo sensor
 *     tags: [Sensors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sensor'
 *     responses:
 *       201:
 *         description: Sensor creado
 */
router.post('/', async (req, res, next) => {
    try { res.status(201).json(await service.create(req.body)); } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/sensors/{id}:
 *   patch:
 *     summary: Actualizar sensor
 *     tags: [Sensors]
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
 *             $ref: '#/components/schemas/Sensor'
 *     responses:
 *       200:
 *         description: Sensor actualizado
 */
router.patch('/:id', async (req, res, next) => {
    try { res.json(await service.update(req.params.id, req.body)); } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/sensors/{id}:
 *   delete:
 *     summary: Eliminar sensor
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sensor eliminado
 *       409:
 *         description: No se puede eliminar (tiene lecturas registradas)
 */
router.delete('/:id', async (req, res, next) => {
    try { res.json(await service.delete(req.params.id)); } catch (e) { next(e); }
});

module.exports = router;