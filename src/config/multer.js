import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

// verificar a utilizacao do aws s3 ou digital ocean spaces para upload de imagens
// por enquanto salvando imagens localmente
export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
