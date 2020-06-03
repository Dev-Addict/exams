const sharp = require('sharp');

const factory = require('./handlerFactory');
const Question = require('../models/Question');
const catchRequest = require('../utils/catchRequest');

exports.getQuestions = factory.getAll(Question);

exports.createQuestion = factory.createOne(Question);

exports.getQuestion = factory.getOne(Question);

exports.updateQuestion = factory.updateOne(Question);

exports.deleteQuestion = factory.deleteOne(Question);

exports.saveAssets = catchRequest(
    async (req, res, next) => {
        if (req.files) {
            if (req.files.questionAsset  && req.files.questionAsset.length === 1) {
                const ext = req.files.questionAsset[0].mimetype.split('/')[1];
                req.files.questionAsset[0].filename = `question-asset-${req.user.id}-${Date.now()}.${ext}`;
                req.body.questionAsset = req.files.questionAsset[0].filename;
                await sharp(req.files.questionAsset[0].buffer)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`uploads/questionassets/${req.files.questionAsset[0].filename}`);
            }
            if (req.files.option1Asset  && req.files.option1Asset.length === 1) {
                const ext = req.files.option1Asset[0].mimetype.split('/')[1];
                req.files.option1Asset[0].filename = `option-1-${req.user.id}-${Date.now()}.${ext}`;
                req.body.option1Asset = req.files.option1Asset[0].filename;
                await sharp(req.files.option1Asset[0].buffer)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`uploads/optionassets/${req.files.option1Asset[0].filename}`);
            }
            if (req.files.option2Asset  && req.files.option2Asset.length === 1) {
                const ext = req.files.option2Asset[0].mimetype.split('/')[1];
                req.files.option2Asset[0].filename = `option-2-${req.user.id}-${Date.now()}.${ext}`;
                req.body.option2Asset = req.files.option2Asset[0].filename;
                await sharp(req.files.option2Asset[0].buffer)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`uploads/optionassets/${req.files.option2Asset[0].filename}`);
            }
            if (req.files.option3Asset  && req.files.option3Asset.length === 1) {
                const ext = req.files.option3Asset[0].mimetype.split('/')[1];
                req.files.option3Asset[0].filename = `option-3-${req.user.id}-${Date.now()}.${ext}`;
                req.body.option3Asset = req.files.option3Asset[0].filename;
                await sharp(req.files.option3Asset[0].buffer)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`uploads/optionassets/${req.files.option3Asset[0].filename}`);
            }
            if (req.files.option4Asset  && req.files.option4Asset.length === 1) {
                const ext = req.files.option4Asset[0].mimetype.split('/')[1];
                req.files.option4Asset[0].filename = `option-4-${req.user.id}-${Date.now()}.${ext}`;
                req.body.option4Asset = req.files.option4Asset[0].filename;
                await sharp(req.files.option4Asset[0].buffer)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`uploads/optionassets/${req.files.option4Asset[0].filename}`);
            }
            next();
        }
    }
);