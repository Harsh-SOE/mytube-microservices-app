import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { UserSignupResponse } from '@app/contracts/users';

import { UserAggregateFactory } from '@users/domain/factories';
import { UserCommandRepository } from '@users/infrastructure/repository';

import { SignupUserCommand } from './signup-user.command';

@CommandHandler(SignupUserCommand)
export class SignupUserHandler implements ICommandHandler<SignupUserCommand> {
  constructor(
    private readonly userAggregateFactory: UserAggregateFactory,
    private readonly userRepo: UserCommandRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({
    userSignupDto,
  }: SignupUserCommand): Promise<UserSignupResponse> {
    const { id, userName, email, fullName, dob, avatar, coverImage } =
      userSignupDto;
    const userDomain = this.eventPublisher.mergeObjectContext(
      this.userAggregateFactory.create(
        id,
        userName,
        email,
        fullName,
        new Date(dob),
        avatar,
        coverImage ?? undefined,
      ),
    );
    await this.userRepo.createOne(userDomain);
    userDomain.commit();
    return { response: 'signup successful', userId: id };
  }
}
