import mongoose from 'mongoose';

const clientListSchema = new mongoose.Schema({
    Oname: {
        type: String,
        required: true,
    },
    Pno: {
        type: String, // Assuming PAN number is a string
        required: true,
    },
    OAdd: {
        type: String,
        required: true,
    },
    Cname: {
        type: String,
        required: true,
    },
    Phno: {
        type: String, // Assuming phone number is a string
        required: true,
    },
    Ann: {
        type: Number,
        required: true,
    },
    Dashbon: {
        type: Boolean,
        default: false,
    },
    vat: {
        type: Boolean,
        required: true,
    },
    constdate: {
        type: Date,
        required: true,
    },
    conendate: {
        type: Date,
        required: true,
    },
  
    NSG: {
        type: Number,
        default: 0,
    },
   
    NCleaner: {
        type: Number,
        default: 0,
    },
   
    NBouncer: {
        type: Number,
        default: 0,
    },
   
    NEP: {
        type: Number,
        default: 0,
    },
    
    NES: {
        type: Number,
        default: 0,
    },
    file_contract: {
        type: String, // Assuming this is a path to the file
        default: null,
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const clientlistModel = mongoose.model('ClientList', clientListSchema);

export default clientlistModel;