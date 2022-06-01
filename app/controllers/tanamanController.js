const httpStatus = require("http-status");
const Response = require("../model/Response");
const Tanaman = require("../model/Tanaman");
const tanamanValidator = require("../utils/tanamanValidator");

const postTanaman = async (req, res) => {
    let response = null;
    try {
        const {
            imageUrl,
            name,
            latinName,
            family,
            description,
            goodPart,
            efficacy,
        } = await tanamanValidator.validateAsync(req.body);

        const tanaman = new Tanaman({
            imageUrl,
            name,
            latinName,
            family,
            description,
            goodPart,
            efficacy,
        });

        const tanamanSave = await tanaman.save();
        response = new Response.Success(false, null, tanamanSave);
        res.status(httpStatus.OK).json(response);
    } catch (error) {
        response = new Response.Error(false, null, );
    }
};

const getTanaman = async (req, res) => {
    let response = null;
    try {
        const tanaman = await Tanaman.find();

        response = new Response.Success(false, null, tanaman);
        res.status(httpStatus.OK).json(response);
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
        const findTanaman = await Tanaman.findOne({
            name: reqName,
        });

        if(!findTanaman) {
            response = new Response.Error(true, errorMsg);
            res.status(httpStatus.BAD_REQUEST).json(response);
        }

        response = new Response.Success(false, null, findTanaman);
        res.status(httpStatus.OK).json(response);
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
        };

        response = new Response.Success(false, null, findTanaman);
        res.status(httpStatus.OK).json(response);
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
        };

        response = new Response.Success(false, null, delTanaman);
        res.status(httpStatus.OK).json(response)
    } catch (error) {
        response = new Response.Error(true, error.message);
        res.status(httpStatus.BAD_REQUEST).json(response);
    }
};

module.exports = { postTanaman, getTanaman, getTanamanByName, updateTanaman, deleteTanaman };