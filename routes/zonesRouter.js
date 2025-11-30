const express = require('express');
const router = express.Router();
const ZonesService = require('../services/zonesService');
const service = new ZonesService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Zone:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre de la zona
 *         description:
 *           type: string
 *           description: Descripción detallada
 *         isActive:
 *           type: boolean
 *           description: Estado de la zona
 *       example:
 *         name: "Zona Industrial Norte"
 *         description: "Área de manufactura pesada y sensores de humo"
 *         isActive: true
 */

/**
 * @swagger
 * tags:
 *   name: Zones
 *   description: Gestión de zonas geográficas
 */

/**
 * @swagger
 * /api/zones:
 *   get:
 *     summary: Listar todas las zonas
 *     tags: [Zones]
 *     responses:
 *       200:
 *         description: Lista de zonas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Zone'
 */
router.get('/', async (req, res, next) => {
    try { res.json(await service.getAll()); } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/zones/{id}:
 *   get:
 *     summary: Obtener zona por ID
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle de la zona
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zone'
 */
router.get('/:id', async (req, res, next) => {
    try { res.json(await service.getById(req.params.id)); } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/zones:
 *   post:
 *     summary: Crear nueva zona
 *     tags: [Zones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Zone'
 *     responses:
 *       201:
 *         description: Zona creada exitosamente
 */
router.post('/', async (req, res, next) => {
    try { res.status(201).json(await service.create(req.body)); } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/zones/{id}:
 *   patch:
 *     summary: Actualizar zona
 *     tags: [Zones]
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
 *             $ref: '#/components/schemas/Zone'
 *     responses:
 *       200:
 *         description: Zona actualizada
 */
router.patch('/:id', async (req, res, next) => {
    try { res.json(await service.update(req.params.id, req.body)); } catch (e) { next(e); }
});

/**
 * @swagger
 * /api/zones/{id}:
 *   delete:
 *     summary: Eliminar zona
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Zona eliminada
 *       409:
 *         description: No se puede eliminar (tiene dispositivos asociados)
 */
router.delete('/:id', async (req, res, next) => {
    try { res.json(await service.delete(req.params.id)); } catch (e) { next(e); }
});

module.exports = router;