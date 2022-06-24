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

        const checkId = await Medikasi.findOne({ _id: _id });
        const msg = "ID sudah ada!"
        if(checkId){
            response = new Response.Error(true, msg);
            res.status(httpStatus.BAD_REQUEST).json(response);
            return;
        }
        
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

const getMedikasiById = async (req, res) => {
    let response = null;
    try {
        const medikasi =  await Medikasi.findOne({ _id: req.params._id});

        res.status(httpStatus.OK).json(medikasi);
    } catch (error) {
        response = new Response.Error(true, error.message);
        res.status(httpStatus.BAD_REQUEST).json(response);
    }
};

const getMedikasiByName = async (req, res) => {
    let response = null;
    const errorMsg = "Nama medikasi tidak ditemukan!"
    try {
        const reqName = req.query.name;
        const capFirst = reqName.charAt(0).toUpperCase() + reqName.slice(1);
        const nameWord = capFirst.replace(/(^w{1})|(\s+\w{1})/g, word => word.toUpperCase());

        const findMedikasi = await Medikasi.find({
            name: {'$regex': nameWord},
        });

        if(!findMedikasi) {
            response = new Response.Error(true, errorMsg);
            res.status(httpStatus.BAD_REQUEST).json(response);
            return;
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
            return;
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
            return;
        };

        res.status(httpStatus.OK).json({ message: "Medikasi berhasil dihapus!"});
    } catch (error) {
        response = new Response.Error(true, error.message);
        res.status(httpStatus.BAD_REQUEST).json(response);
    }
};

module.exports = { postMedikasi, getMedikasi, getMedikasiById, getMedikasiByName, updateMedikasi, deleteMedikasi };