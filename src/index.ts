import { SkillBuilders } from 'ask-sdk-core';
import { LaunchRequestHandler } from './handlers/LaunchRequestHandler';
import { DescribePictureIntentHandler } from './handlers/DescribePictureIntentHandler';
import { ModifyPictureIntentHandler } from './handlers/ModifyPictureIntentHandler';
import { ApproveImageIntentHandler } from './handlers/ApproveImageIntentHandler';
import { PrintImageIntentHandler } from './handlers/PrintImageIntentHandler';
import { StartOverIntentHandler } from './handlers/StartOverIntentHandler';
import { HelpIntentHandler } from './handlers/HelpIntentHandler';
import { CancelAndStopIntentHandler } from './handlers/CancelAndStopIntentHandler';
import { SessionEndedRequestHandler } from './handlers/SessionEndedRequestHandler';
import { UnrecognizedIntentHandler } from './handlers/UnrecognizedIntentHandler';
import { ErrorHandler } from './handlers/ErrorHandler';
import { DisplayErrorRequestInterceptor, DisplayErrorResponseInterceptor } from './interceptors/DisplayErrorInterceptor';

export const handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    DescribePictureIntentHandler,
    ModifyPictureIntentHandler,
    ApproveImageIntentHandler,
    PrintImageIntentHandler,
    StartOverIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    UnrecognizedIntentHandler // Add this before the error handler as a fallback
  )
  .addRequestInterceptors(DisplayErrorRequestInterceptor)
  .addResponseInterceptors(DisplayErrorResponseInterceptor)
  .addErrorHandlers(ErrorHandler)
  .lambda();