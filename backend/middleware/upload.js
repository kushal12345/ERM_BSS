// middlewares/upload.js
import multer, { diskStorage } from 'multer';
import { join, extname } from 'path';
import { mkdirSync } from 'fs';

// Simple disk storage example (adjust to S3 or another storage in production)
const storage = diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = join(__dirname, '..', 'uploads', 'vouchers');
    mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  // allow images and pdfs only
  const allowed = /jpeg|jpg|png|gif|pdf/;
  const ext = extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error('Only images and PDFs are allowed'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

export default upload;
