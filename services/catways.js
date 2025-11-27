const Catway = require ('../models/catway');

// GET ALL
exports.getAll = async (req, res, next) => {
    try {
        let catways = await Catway.find();
        catways.sort((a, b)=> a.catwayNumber - b.catwayNumber);

        // 🎯 Mode test : renvoie JSON
        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ data: catways });
        }

        return res.render('catways', { data: catways, user: req.session?.user });

    } catch (error) {
        return res.status(501).json('error');
    }
};

// GET BY ID
exports.getById = async (req, res, next) => {
    const id = req.body.catwayNumber;
    try {
        let oneCatway = await Catway.findOne({ catwayNumber: id });

        if (!oneCatway) {
            return res.status(404).json('catway_not_found');
        }

        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ catway: oneCatway });
        }

        return res.render('oneCatway', { oneCatway });

    } catch (error) {
        return res.status(501).json(error);
    }
};

// ADD
exports.add = async (req, res, next) => {
    const temp = {
        catwayNumber: req.body.catwayNumber,
        catwayType: req.body.catwayType,
        catwayState: req.body.catwayState
    };

    try {
        let catway = await Catway.create(temp);

        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ catway });
        }

        return res.render('catwaysAdd', { catway });

    } catch (error) {
        return res.status(501).json(error);
    }
};

// UPDATE
exports.update = async (req, res, next) => {
    const id = req.params.id;

    const temp = {
        catwayState: req.body.catwayState
    };

    try {
        let catway = await Catway.findOne({ _id : id });

        if (!catway) {
            return res.status(404).json("catway_not_found");
        }

        Object.keys(temp).forEach(key => {
            if (temp[key]) catway[key] = temp[key];
        });

        await catway.save();

        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ catway });
        }

        return res.render('catwaysUpdate', { catway });

    } catch (error) {
        return res.status(501).json(error);
    }
};

// DELETE
exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        await Catway.deleteOne({ _id: id });

        if (process.env.NODE_ENV === "test") {
            return res.status(200).json({ deleted: true });
        }

        return res.render('catwayDelete');

    } catch (error) {
        return res.status(501).json(error);
    }
};
