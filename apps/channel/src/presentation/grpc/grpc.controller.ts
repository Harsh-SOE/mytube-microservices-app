import { Controller, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';

import {
  ChannelActivateMonitizationDto,
  ChannelCreatedResponse,
  ChannelCreateDto,
  ChannelFindByIdDto,
  ChannelFindByIdResponse,
  ChannelMonitizationActivatedResponse,
  ChannelServiceController,
  ChannelServiceControllerMethods,
  ChannelUpdateByIdDto,
  ChannelUpdateByIdResponse,
  ChannelVerifyByIdResponse,
  ChannelVerifyByIdDto,
} from '@app/contracts/channel';

import { GrpcAppExceptionFilter } from '@app/utils';

import { GrpcService } from './grpc.service';

@Controller('channel')
@UseFilters(GrpcAppExceptionFilter)
@ChannelServiceControllerMethods()
export class GrpcController implements ChannelServiceController {
  constructor(private readonly grpcService: GrpcService) {}

  createChannel(
    channelCreateDto: ChannelCreateDto,
  ):
    | Promise<ChannelCreatedResponse>
    | Observable<ChannelCreatedResponse>
    | ChannelCreatedResponse {
    return this.grpcService.createHub(channelCreateDto);
  }

  activateMonitization(
    channelActivateMonitizationDto: ChannelActivateMonitizationDto,
  ):
    | Promise<ChannelMonitizationActivatedResponse>
    | Observable<ChannelMonitizationActivatedResponse>
    | ChannelMonitizationActivatedResponse {
    return this.grpcService.activateMonitization(
      channelActivateMonitizationDto,
    );
  }

  findChannelById(
    channelFindByIdDto: ChannelFindByIdDto,
  ):
    | Promise<ChannelFindByIdResponse>
    | Observable<ChannelFindByIdResponse>
    | ChannelFindByIdResponse {
    return this.grpcService.findHubById(channelFindByIdDto);
  }

  channelUpdateById(
    channelUpdateByIdDto: ChannelUpdateByIdDto,
  ):
    | Promise<ChannelUpdateByIdResponse>
    | Observable<ChannelUpdateByIdResponse>
    | ChannelUpdateByIdResponse {
    return this.grpcService.updateChannelById(channelUpdateByIdDto);
  }

  channelVerify(
    channelVerifyByIdDto: ChannelVerifyByIdDto,
  ):
    | Promise<ChannelVerifyByIdResponse>
    | Observable<ChannelVerifyByIdResponse>
    | ChannelVerifyByIdResponse {
    return this.grpcService.channelVerify(channelVerifyByIdDto);
  }
}
