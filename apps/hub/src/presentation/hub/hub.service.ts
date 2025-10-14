import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  HubActivateMonitizationDto,
  HubCreateDto,
  HubFindByIdDto,
  HubFindByIdResponse,
  HubMonitizationActivatedResponse,
  HubCreatedResponse,
  HubUpdateByIdDto,
  HubUpdateByIdResponse,
  HubVerifyByIdResponse,
  HubVerifyByIdDto,
} from '@app/contracts/hub';

import {
  ActivateMonitizationCommand,
  CreateHubCommand,
  UpdateHubCommand,
  VerifyHubCommand,
} from '@hub/application/commands';
import { FindHubByIdQuery } from '@hub/application/query';

@Injectable()
export class HubService {
  public constructor(
    public readonly commandBus: CommandBus,
    public readonly queryBus: QueryBus,
  ) {}

  public createHub(hubCreateDto: HubCreateDto): Promise<HubCreatedResponse> {
    return this.commandBus.execute<CreateHubCommand, HubCreatedResponse>(
      new CreateHubCommand(hubCreateDto),
    );
  }

  public activateMonitization(
    hubActivateMonitizationDto: HubActivateMonitizationDto,
  ): Promise<HubMonitizationActivatedResponse> {
    return this.commandBus.execute<
      ActivateMonitizationCommand,
      HubMonitizationActivatedResponse
    >(new ActivateMonitizationCommand(hubActivateMonitizationDto));
  }

  public updateHubById(
    updateHubByIdDto: HubUpdateByIdDto,
  ): Promise<HubUpdateByIdResponse> {
    return this.commandBus.execute<UpdateHubCommand, HubUpdateByIdResponse>(
      new UpdateHubCommand(updateHubByIdDto),
    );
  }

  public findHubById(
    hubFindByIdDto: HubFindByIdDto,
  ): Promise<HubFindByIdResponse> {
    return this.queryBus.execute<FindHubByIdQuery, HubFindByIdResponse>(
      new FindHubByIdQuery(hubFindByIdDto),
    );
  }

  public hubVerify(
    hubVerifyByIdDto: HubVerifyByIdDto,
  ): Promise<HubVerifyByIdResponse> {
    return this.commandBus.execute<VerifyHubCommand, HubVerifyByIdResponse>(
      new VerifyHubCommand(hubVerifyByIdDto),
    );
  }
}
