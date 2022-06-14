const httpStatus = require("http-status");
const Response = require("../model/Response");
const Medikasi = require("../model/Medikasi");
const medikasiValidator = require("../utils/medikasiValidator");

const postMedikasi = async (req, res) => {
    let response = null;
    try {
        const {
            name,
            description,
            treatment,
            moreAbout,
        } = await medikasiValidator.validateAsync(req.body);

        const medikasi = new Medikasi({
            name,
            description,
            treatment,
            moreAbout,
        });

        await medikasi.save();
        res.status(httpStatus.OK).json({ message: "Medikasi berhasil ditambahkan!" });
    } catch (error) {
        response = new Response.Error(true, error.message);
        res.status(httpStatus.BAD_REQUEST).json(response);
    }
};

const getMedikasi = async (req, res) => {
    let response = null;
    const msg = "success";
    try {
        const medikasi = await Medikasi.find();

        response = new Response.Success(false, msg, medikasi);
        res.status(httpStatus.OK).json(response);
    } catch (error) {
        response = new Response.Error(true, error.message);
        res.status(httpStatus.BAD_REQUEST).json(response);
    }
};

const getMedikasiByName = async (req, res) => {
    let response = null;
    const msg = "success";
    const errorMsg = "Nama medikasi tidak ditemukan!"
    try {
        const reqName = req.query.name;
        const findMedikasi = await Medikasi.findOne({
            name: reqName,
        });

        if(!findMedikasi) {
            response = new Response.Error(true, errorMsg);
            res.status(httpStatus.BAD_REQUEST).json(response);
        }

        response = new Response.Success(false, msg, findMedikasi);
        res.status(httpStatus.OK).json(response);
    } catch (error) {
        response = new Response.Error(true, error.message);
        res.status(httpStatus.BAD_REQUEST).json(response);
    }
};

const updateMedikasi = async (req, res) => {
    let response = null;
    const errorMsg = "ID medikasi tidak ditemukan!";
    try {
        const findMedikasi = await Medikasi.findByIdAndUpdate(req.query.id, req.body);

        if(!findMedikasi) {
            response = new Response.Error(true, errorMsg);
            res.status(httpStatus.BAD_REQUEST).json(response);
        };

        res.status(httpStatus.OK).json({ message: "Medikasi berhasil diupdate!" });
    } catch (error) {
        response = new Response.Error(true, error.message);
        res.status(httpStatus.BAD_REQUEST).json(response);
    }
};

const deleteMedikasi = async (req, res) => {
    let response = null;
    const errorMsg = "ID medikasi tidak ditemukan!";
    try {
        const delMedikasi = await Medikasi.findByIdAndDelete(req.query.id);

        if(!delMedikasi) {
            response = new Response.Error(true, errorMsg);
            res.status(httpStatus.BAD_REQUEST).json(response);
        };

        res.status(httpStatus.OK).json({ message: "Medikasi berhasil dihapus!"});
    } catch (error) {
        response = new Response.Error(true, error.message);
        res.status(httpStatus.BAD_REQUEST).json(response);
    }
};

module.exports = { postMedikasi, getMedikasi, getMedikasiByName, updateMedikasi, deleteMedikasi };