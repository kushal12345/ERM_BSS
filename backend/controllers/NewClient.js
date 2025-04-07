import clientlistModel from "../models/Clientlistmodel.js";

export const NewClient = async (req, res) => {
    try {
        const clientData = {
            Oname: req.body.Oname,
            Pno: req.body.Pno,
            OAdd: req.body.OAdd,
            Cname: req.body.Cname,
            Phno: req.body.Phno,
            Ann: req.body.Ann,
            Dashbon: req.body.Dashbon,
            vat: req.body.vat,
            constdate: req.body.constdate,
            conendate: req.body.conendate,
            NSG: req.body.NSG,
            NCleaner: req.body.NCleaner,
            NBouncer: req.body.NBouncer,
            NEP: req.body.NEP,
            NES: req.body.NES,
            // Handle file uploads
            file_contract: req.files.file_contract ? req.files.file_contract[0].path : null,
        };

        console.log(clientData);

        const newClient = new clientlistModel(clientData);
        await newClient.save();

        res.status(201).json({ message: 'New client created successfully', data: newClient });        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating new client', error: error.message });
    }
}