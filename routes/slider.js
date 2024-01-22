const express = require('express');
const router = express.Router();

const SliderController = require('../Controller/SliderController');

router.get('/showSlider', SliderController.showSlider);
router.get('/createSlider', SliderController.createSlider);
router.post('/newSlider', SliderController.newSlider);
router.get('/:id/editSlider', SliderController.editSlider);
router.put('/:id', SliderController.updateSlider);
router.delete('/:id', SliderController.deleteSlider);

module.exports = router;
