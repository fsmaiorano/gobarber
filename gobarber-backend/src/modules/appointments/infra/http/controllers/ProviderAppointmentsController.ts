import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;
    console.log('aaa');
    const listProvidersAppointmentsService = container.resolve(ListProviderAppointmentsService);

    const appointment = await listProvidersAppointmentsService.execute({ provider_id, day, month, year });
    console.log('teste');
    console.log(appointment);
    return response.json(appointment);
  }
}
