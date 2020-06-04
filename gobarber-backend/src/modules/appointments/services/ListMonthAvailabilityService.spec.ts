import 'reflect-metadata';
import ListProviderMonthAvailabilityService from './ListMonthAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);

    it('should be able to list the month availability from provider', async () => {
      await fakeAppointmentsRepository.create({ provider_id: 'provider', date: new Date(2020, 3, 5, 8, 0, 0) });
      await fakeAppointmentsRepository.create({ provider_id: 'provider', date: new Date(2020, 5, 18, 8, 0, 0) });
      await fakeAppointmentsRepository.create({ provider_id: 'provider', date: new Date(2020, 5, 18, 9, 0, 0) });
      await fakeAppointmentsRepository.create({ provider_id: 'provider', date: new Date(2020, 5, 21, 8, 0, 0) });

      const availability = listProviderMonthAvailabilityService.execute({ provider_id: 'user', year: 2020, month: 5 });

      expect(availability).toEqual(
        expect.arrayContaining([
          { day: 18, availability: false },
          { day: 19, availability: true },
          { day: 20, availability: true },
        ]),
      );
    });
  });
});
