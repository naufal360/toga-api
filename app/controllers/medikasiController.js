const httpStatus = require("http-status");
const Response = require("../model/Response");
const Medikasi = require("../model/Medikasi");
const medikasiValidator = require("../utils/medikasiValidator");

const postMedikasi = async (req, res) => {
    let response = null;
    try {
        const {
            _id,
            name,
            description,
            material,
            make,
            consume,
            moreAbout,
        } = await medikasiValidator.validateAsync(req.body);

        const medikasi = new Medikasi({
            _id,
            name,
            description,
            material,
            make,
            consume,
            moreAbout,
        });

        const medikasiSave = await medikasi.save();
        res.status(httpStatus.CREATED).json(medikasiSave);
    } catch (error) {
        response = new Response.Error(true, error.message);
        res.status(httpStatus.BAD_REQUEST).json(response);
    }
};

const getMedikasi = async (req, res) => {
    let response = null;
    try {
        const medikasi = await Medikasi.find();

        res.status(httpStatus.OK).json(medikasi);
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

        res.status(httpStatus.OK).json(findMedikasi);
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