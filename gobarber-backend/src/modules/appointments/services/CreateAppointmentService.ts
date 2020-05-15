import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

/**
 * Dependency Inversion (SOLID)
 */

class CreateAppointmentService {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  public async execute({ provider_id, date }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
