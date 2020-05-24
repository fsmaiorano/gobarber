# Password Recovery

**Functional requirements**
  - User can be password recovery using your e-mail.
  - User can be receive a e-mail with password reset instructions.
  - User can be reset your password

**Non-functional requirements**
  - Should use Mailtrap to test e-mails in dev environment.
  - Should use Amazon SES to send e-mails in production environment.
  - E-mails should be send in background.

**Business**
  - Recovery password link should be valid to 2 hours.
  - User need confirm the new password when reset password.

# Update Profile

**Functional requirements**
  - User can be update your profile(name, e-mail, password).

**Non-functional requirements**

**Business**
  - User not should update your e-mail with another existing e-mail.
  - To update current password, the user need to enter your old password.
  - To update current password, the user need to confirm new password.

# Provider Dashboard

**Functional requirements**
  - Users must be list all schedules of an specific day.
  - Providers must be receive an notification when exists a new schedule for him.
  - Providers must be read all unread notifications.

**Non-functional requirements**
  - All schedules must be storaged in cache.
  - Notifications of an provider must be storaged in MongoDB.
  - Notifications of an provider must be send in real time using Socket.io

**Business**
  - An notification must have status read or unread.

# Service Schedule

**Functional requirements**
  - User can be list all providers to registered services.
  - User can be list days of an month with at least one avaible schedule of an provider.
  - User can be list avaible schedules of one provider.
  - User can be to do an schedule with one provider.

**Non-functional requirements**
  - List of providers must be storaged in cache.

**Business**
  - One schedule must be done in 1 hour.
  - Schedules must be avaible between 8hrs to 18hrs.
  - Users can't schedule in the same hour of other schedule.
  - Users can't schedule with yourself.

