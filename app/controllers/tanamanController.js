const httpStatus = require("http-status");
const Response = require("../model/Response");
const Tanaman = require("../model/Tanaman");
const tanamanValidator = require("../utils/tanamanValidator");

const postTanaman = async (req, res) => {
    let response = null;
    try {
        const {
            _id,
            imageUrl,
            name,
            latinName,
            family,
            description,
            goodPart,
            efficacy,
        } = await tanamanValidator.validateAsync(req.body);

        const tanaman = new Tanaman({
            _id,
            imageUrl,
            name,
            latinName,
            family,
            description,
            goodPart,
            efficacy,
        });

        const checkId = await Tanaman.findOne({ _id: _id });
        const msg = "ID sudah ada!"
        if(checkId){
            response = new Response.Error(true, msg);
            res.status(httpStatus.BAD_REQUEST).json(response);
            return;
        }

        const tanamanSave = await tanaman.save();
        res.status(httpStatus.CREATED).json(tanamanSave);
    } catch (error) {
        response = new Response.Error(true, error.message);
        res.status(httpStatus.BAD_REQUEST).json(response);
    }
};

const getTanaman = async (req, res) => {
    let response = null;
    try {
        const tanaman = await Tanaman.find();

        res.status(httpStatus.OK).json(tanaman);
    } catch (error) {
        response = new Response.Error(true, error.message);
        res.status(httpStatus.BAD_REQUEST).json(response);
    }
};

const getTanamanById = async (req, res) => {
    let response = null;
    try {
        const tanaman =  await Tanaman.findOne({ _id: req.params._id});

        res.status(httpStatus.OK).json(tanaman);
    } catch (error) {
        response = new Response.Error(true, error.message);
        res.status(httpStatus.BAD_REQUEST).json(response);
    }
};

const getTanamanByName = async (req, res) => {
    let response = null;
    const errorMsg = "Nama tanaman tidak ditemukan!"
    try {
        const reqName = req.query.name;
        const capFirst = reqName.charAt(0).toUpperCase() + reqName.slice(1);
        const nameWord = capFirst.replace(/(^w{1})|(\s+\w{1})/g, word => word.toUpperCase());
        
        const findTanaman = await Tanaman.find({
            name: {'$regex': nameWord},
        });

        if(!findTanaman) {
            response = new Response.Error(true, errorMsg);
            res.status(httpStatus.BAD_REQUEST).json(response);
            return;
        }

        res.status(httpStatus.OK).json(findTanaman);
    } catch (error) {
        response = new Response.Error(true, error.message);
        res.status(httpStatus.BAD_REQUEST).json(response);
    }
};

const updateTanaman = async (req, res) => {
    let response = null;
    const errorMsg = "ID tanaman tidak ditemukan!";
    try {
        const findTanaman = await Tanaman.findByIdAndUpdate(req.query.id, req.body);

        if(!findTanaman) {
            response = new Response.Error(true, errorMsg);
            res.status(httpStatus.BAD_REQUEST).json(response);
            return;
        };

        res.status(httpStatus.OK).json({ message: "Tanaman berhasil diupdate!" });
    } catch (error) {
        response = new Response.Error(true, error.message);
        res.status(httpStatus.BAD_REQUEST).json(response);
    }
};

const deleteTanaman = async (req, res) => {
    let response = null;
    const errorMsg = "ID tanaman tidak ditemukan!";
    try {
        const delTanaman = await Tanaman.findByIdAndDelete(req.query.id);

        if(!delTanaman) {
            response = new Response.Error(true, errorMsg);
            res.status(httpStatus.BAD_REQUEST).json(response);
            return;
        };

        res.status(httpStatus.OK).json({ message: "Tanaman berhasil dihapus!"});
    } catch (error) {
        response = new Response.Error(true, error.message);
        res.status(httpStatus.BAD_REQUEST).json(response);
    }
};

module.exports = { postTanaman, getTanaman, getTanamanById, getTanamanByName, updateTanaman, deleteTanaman };