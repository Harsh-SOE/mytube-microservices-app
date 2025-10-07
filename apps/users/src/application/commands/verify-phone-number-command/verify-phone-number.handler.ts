import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserPhoneNumberVerifiedResponse } from '@app/contracts/users';

import { VerifyPhoneNumberCommand } from './verify-phone-number.command';
import { UserCommandRepository } from '@users/infrastructure/repository';

@CommandHandler(VerifyPhoneNumberCommand)
export class VerifyPhoneNumberCommandHandler
  implements ICommandHandler<VerifyPhoneNumberCommand>
{
  constructor(private readonly userRepository: UserCommandRepository) {}

  async execute({
    userVerifyPhoneNumberDto,
  }: VerifyPhoneNumberCommand): Promise<UserPhoneNumberVerifiedResponse> {
    // extract the inputs...
    const { id } = userVerifyPhoneNumberDto;

    // load the aggregate...
    const userAggregate = await this.userRepository.loadOneAggregateById(id);

    // actual logic to verify the phone number here...

    // enforce the business rules...
    userAggregate.verifyUserPhoneNumber();

    // perist the aggregate...
    await this.userRepository.updateOneById(id, userAggregate);

    // return the response...
    return { response: "The user's was verified successfully", verified: true };
  }
}
