const express = require('express');
const router = express.Router();
const ReadingsService = require('../services/readingsService');
const service = new ReadingsService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Reading:
 *       type: object
 *       required:
 *         - sensorId
 *         - value
 *       properties:
 *         sensorId:
 *           type: string
 *           description: ID del sensor que generó la lectura
 *         time:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de la lectura (Default ahora)
 *         value:
 *           type: number
 *           description: Valor registrado
 *       example:
 *         sensorId: "641f0a9c8b3d2e1f4a5b6c7d"
 *         value: 25.5
 *         time: "2024-11-20T10:00:00.000Z"
 */

/**
 * @swagger
 * tags:
 *   name: Readings
 *   description: Historial de lecturas de sensores
 */

/**
 * @swagger
 * /api/readings:
 *   get:
 *     summary: Listar todas las lecturas
 *     tags: [Readings]
 *     responses:
 *       200:
 *         description: Historial de lecturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reading'
 */
router.get('/', async (req, res, next) => {
    try { res.json(await service.getAll()); } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/readings/{id}:
 *   get:
 *     summary: Obtener lectura por ID
 *     tags: [Readings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle de la lectura
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reading'
 */
router.get('/:id', async (req, res, next) => {
    try { res.json(await service.getById(req.params.id)); } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/readings:
 *   post:
 *     summary: Registrar nueva lectura (Sensor debe existir)
 *     tags: [Readings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reading'
 *     responses:
 *       201:
 *         description: Lectura registrada
 *       400:
 *         description: Sensor no encontrado
 */
router.post('/', async (req, res, next) => {
    try { res.status(201).json(await service.create(req.body)); } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/readings/{id}:
 *   patch:
 *     summary: Corregir lectura
 *     tags: [Readings]
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
 *             $ref: '#/components/schemas/Reading'
 *     responses:
 *       200:
 *         description: Lectura corregida
 */
router.patch('/:id', async (req, res, next) => {
    try { res.json(await service.update(req.params.id, req.body)); } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/readings/{id}:
 *   delete:
 *     summary: Eliminar lectura
 *     tags: [Readings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lectura eliminada
 */
router.delete('/:id', async (req, res, next) => {
    try { res.json(await service.delete(req.params.id)); } catch (e) { next(e); }
});

module.exports = router;