import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviderService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);

    it('should be able to list the providers', async () => {
      const user = await fakeUsersRepository.create({ name: 'John Doe', email: 'JD@fake.com', password: '123456' });

      const user2 = await fakeUsersRepository.create({ name: 'John Tre', email: 'JDT@fake.com', password: '123456' });

      const loggedUser = await fakeUsersRepository.create({
        name: 'John Qua',
        email: 'JDT4@fake.com',
        password: '123456',
      });

      const providers = await listProviders.execute({ user_id: loggedUser.id });

      expect(providers).toEqual([user, user2]);
    });
  });
});
