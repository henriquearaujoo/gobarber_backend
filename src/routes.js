import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import authMiddlwware from './app/middlewares/auth';

const router = express.Router();
const upload = multer(multerConfig);

router.post('/users', UserController.store);
router.post('/sessions', SessionController.store);
router.use(authMiddlwware);
router.put('/users', UserController.update);

router.get('/providers', ProviderController.index);
router.get('/providers/:providerId/available', AvailableController.index);

router.post('/appointments', AppointmentController.store);
router.get('/appointments', AppointmentController.index);
router.delete('/appointments/:id', AppointmentController.delete);

router.get('/schedules', ScheduleController.index);

router.get('/notifications', NotificationController.index);
router.put('/notifications/:id', NotificationController.update);

// rota de uploads de arquivos com multer
router.post('/files', upload.single('file'), FileController.store);

export default router;
