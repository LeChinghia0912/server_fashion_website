const Slider = require('../models/Slider');
const { mutipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');

class SliderController {
    async showSlider(req, res, next) {
        try {
            const sliders = await Slider.find({});
            const responseData = mutipleMongooseToObject(sliders);

            const imageArray = responseData.map((slider) => slider.image);

            if (req.headers.accept && req.headers.accept.includes('application/json')) {
                res.json({ image: imageArray });
            } else {
                res.render('slider/show', { sliders: responseData });
            }
        } catch (error) {
            next(error);
        }
    }

    createSlider(req, res, next) {
        res.render('slider/createSlider');
    }

    async newSlider(req, res, next) {
        const sliderData = req.body;
        const slider = new Slider(sliderData);
        try {
            await slider.save();
            res.redirect('/slider/showSlider');
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async editSlider(req, res, next) {
        try {
            const slider = await Slider.findById(req.params.id);
            res.render('slider/editSlider', {
                slider: mongooseToObject(slider),
            });
        } catch (error) {
            next(error);
        }
    }

    async updateSlider(req, res, next) {
        try {
            await Slider.findByIdAndUpdate(req.params.id, req.body);
            res.redirect('/slider/showSlider');
        } catch (error) {
            next(error);
        }
    }

    async deleteSlider(req, res, next) {
        try {
            await Slider.deleteOne({ _id: req.params.id });
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new SliderController();
