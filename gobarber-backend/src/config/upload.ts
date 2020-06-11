import multer from 'multer';
import Path from 'path';
import crypto from 'crypto';

const tmpFolder = Path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  // uploadsFolder: Path.resolve(tmpFolder, 'uploads'),
  uploadsFolder: Path.resolve(tmpFolder),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
