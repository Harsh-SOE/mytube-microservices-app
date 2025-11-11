import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  ChannelActivateMonitizationDto,
  ChannelCreateDto,
  ChannelFindByIdDto,
  ChannelFindByIdResponse,
  ChannelMonitizationActivatedResponse,
  ChannelCreatedResponse,
  ChannelUpdateByIdDto,
  ChannelUpdateByIdResponse,
  ChannelVerifyByIdResponse,
  ChannelVerifyByIdDto,
} from '@app/contracts/channel';

import {
  ActivateMonitizationCommand,
  CreateChannelCommand,
  UpdateChannelCommand,
  VerifyChannelCommand,
} from '@channel/application/commands';
import { FindChannelByIdQuery } from '@channel/application/query';

@Injectable()
export class GrpcService {
  public constructor(
    public readonly commandBus: CommandBus,
    public readonly queryBus: QueryBus,
  ) {}

  public createHub(
    channelCreateDto: ChannelCreateDto,
  ): Promise<ChannelCreatedResponse> {
    return this.commandBus.execute<
      CreateChannelCommand,
      ChannelCreatedResponse
    >(new CreateChannelCommand(channelCreateDto));
  }

  public activateMonitization(
    channelActivateMonitizationDto: ChannelActivateMonitizationDto,
  ): Promise<ChannelMonitizationActivatedResponse> {
    return this.commandBus.execute<
      ActivateMonitizationCommand,
      ChannelMonitizationActivatedResponse
    >(new ActivateMonitizationCommand(channelActivateMonitizationDto));
  }

  public updateChannelById(
    updateChannelByIdDto: ChannelUpdateByIdDto,
  ): Promise<ChannelUpdateByIdResponse> {
    return this.commandBus.execute<
      UpdateChannelCommand,
      ChannelUpdateByIdResponse
    >(new UpdateChannelCommand(updateChannelByIdDto));
  }

  public findHubById(
    channelFindByIdDto: ChannelFindByIdDto,
  ): Promise<ChannelFindByIdResponse> {
    return this.queryBus.execute<FindChannelByIdQuery, ChannelFindByIdResponse>(
      new FindChannelByIdQuery(channelFindByIdDto),
    );
  }

  public channelVerify(
    channelVerifyByIdDto: ChannelVerifyByIdDto,
  ): Promise<ChannelVerifyByIdResponse> {
    return this.commandBus.execute<
      VerifyChannelCommand,
      ChannelVerifyByIdResponse
    >(new VerifyChannelCommand(channelVerifyByIdDto));
  }
}
