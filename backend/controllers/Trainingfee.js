export const collectTrainingFee = async (req, res) => {
    try {
        const visitorId = req.params.id;
        const { TrainingFee } = req.body;
        const voucherFile = req.files && req.files.Voucher ? req.files.Voucher[0].path : null;
        const visitor = await visitorsModel.findById(visitorId);

        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        visitor.TrainingFee = TrainingFee;
        if (voucherFile) {
            visitor.Voucher = voucherFile;
        }
        await visitor.save();

        res.status(200).json({ message: 'Training fee collected successfully', data: visitor });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error collecting training fee', error: error.message });
    }
};