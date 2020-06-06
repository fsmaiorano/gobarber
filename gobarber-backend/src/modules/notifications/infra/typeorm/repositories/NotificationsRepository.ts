import { getMongoRepository, MongoRepository } from 'typeorm';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '../schemas/notification';

class NotificationRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo'); //select db by name
  }

  public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({ content, recipient_id });
    await this.ormRepository.save(notification);
    return notification;
  }
}

export default NotificationRepository;
