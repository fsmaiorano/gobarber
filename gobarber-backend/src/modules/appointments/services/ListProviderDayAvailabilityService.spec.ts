import 'reflect-metadata';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);

    it('should be able to list the month availability from provider', async () => {
      await fakeAppointmentsRepository.create({ provider_id: 'provider', date: new Date(2020, 5, 18, 8, 0, 0) });
      await fakeAppointmentsRepository.create({ provider_id: 'provider', date: new Date(2020, 5, 18, 9, 0, 0) });
      await fakeAppointmentsRepository.create({ provider_id: 'provider', date: new Date(2020, 5, 18, 10, 0, 0) });
      await fakeAppointmentsRepository.create({ provider_id: 'provider', date: new Date(2020, 5, 18, 11, 0, 0) });

      const availability = listProviderMonthAvailabilityService.execute({
        provider_id: 'user',
        year: 2020,
        month: 5,
        day: 10,
      });

      expect(availability).toEqual(
        expect.arrayContaining([
          { hour: 10, availability: false },
          { hour: 11, availability: false },
          { hour: 12, availability: true },
        ]),
      );
    });
  });
});
