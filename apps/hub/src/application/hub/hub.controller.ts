import { Controller, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';

import {
  HubActivateMonitizationDto,
  HubCreatedResponse,
  HubCreateDto,
  HubFindByIdDto,
  HubFindByIdResponse,
  HubMonitizationActivatedResponse,
  HubServiceController,
  HubServiceControllerMethods,
  HubUpdateByIdDto,
  HubUpdateByIdResponse,
  HubVerifyByIdDto,
  HubVerifyByIdResponse,
} from '@app/contracts/hub';
import { GrpcAppExceptionFilter } from '@app/utils';

import { HubService } from './hub.service';

@Controller('channel')
@UseFilters(GrpcAppExceptionFilter)
@HubServiceControllerMethods()
export class HubController implements HubServiceController {
  constructor(private readonly hubService: HubService) {}

  createHub(
    hubCreateDto: HubCreateDto,
  ):
    | Promise<HubCreatedResponse>
    | Observable<HubCreatedResponse>
    | HubCreatedResponse {
    return this.hubService.createHub(hubCreateDto);
  }

  activateMonitization(
    videoChannelActivateMonitizationDto: HubActivateMonitizationDto,
  ):
    | Promise<HubMonitizationActivatedResponse>
    | Observable<HubMonitizationActivatedResponse>
    | HubMonitizationActivatedResponse {
    return this.hubService.activateMonitization(
      videoChannelActivateMonitizationDto,
    );
  }

  findHubById(
    hubFindByIdDto: HubFindByIdDto,
  ):
    | Promise<HubFindByIdResponse>
    | Observable<HubFindByIdResponse>
    | HubFindByIdResponse {
    return this.hubService.findHubById(hubFindByIdDto);
  }

  hubUpdateById(
    hubUpdateByIdDto: HubUpdateByIdDto,
  ):
    | Promise<HubUpdateByIdResponse>
    | Observable<HubUpdateByIdResponse>
    | HubUpdateByIdResponse {
    return this.hubService.updateHubById(hubUpdateByIdDto);
  }

  hubVerify(
    hubVerifyByIdDto: HubVerifyByIdDto,
  ):
    | Promise<HubVerifyByIdResponse>
    | Observable<HubVerifyByIdResponse>
    | HubVerifyByIdResponse {
    return this.hubService.hubVerify(hubVerifyByIdDto);
  }
}
