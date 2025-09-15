import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { SKILL_NAME, SKILL_NAME_DE } from '../utils/constants';
import { getOrCreateSession } from '../utils/sessionUtils';
import { APLService } from '../services/APLService';

export const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  
  async handle(handlerInput: HandlerInput): Promise<Response> {
    const { requestEnvelope } = handlerInput;
    const locale = requestEnvelope.request.locale || 'en-US';
    const isGerman = locale.startsWith('de');
    
    // Check if device has display capabilities (required for this skill)
    const hasDisplay = requestEnvelope.context?.System?.device?.supportedInterfaces?.['Alexa.Presentation.APL'];
    
    if (!hasDisplay) {
      const noDisplayMessage = isGerman
        ? 'Entschuldigung, aber Malbuch Zauberer funktioniert nur auf Geräten mit Bildschirm wie dem Echo Show. Du brauchst einen Bildschirm, um deine Malvorlagen zu sehen!'
        : 'Sorry, but Color Magic only works on devices with screens like the Echo Show. You need a screen to see your coloring pages!';
      
      return handlerInput.responseBuilder
        .speak(noDisplayMessage)
        .getResponse();
    }

    try {
      // Clear any previous error states since this is a fresh launch
      const { VoiceErrorHandler } = await import('../utils/errorHandling');
      VoiceErrorHandler.clearRetryState(handlerInput);

      // Create or retrieve user session
      const session = await getOrCreateSession(handlerInput);
      
      // Store session info in Alexa session attributes for quick access
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      sessionAttributes.userSessionId = session.sessionId;
      sessionAttributes.language = session.language;
      sessionAttributes.conversationState = session.conversationState;
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      
      const skillName = isGerman ? SKILL_NAME_DE : SKILL_NAME;
      
      // Get user's first name if available for personalization
      const givenName = (requestEnvelope.context?.System?.user as any)?.givenName;
      const greeting = givenName 
        ? (isGerman ? `Hallo ${givenName}!` : `Hi ${givenName}!`)
        : (isGerman ? 'Hallo!' : 'Hi there!');
      
      // Check if user has an existing session with images
      const hasExistingImages = session.imageHistory.length > 0;
      
      let speakOutput: string;
      if (hasExistingImages) {
        speakOutput = isGerman 
          ? `${greeting} Willkommen zurück bei ${skillName}! Ich sehe, du warst schon mal hier. Möchtest du ein neues Bild erstellen oder an deinem letzten Bild weiterarbeiten?`
          : `${greeting} Welcome back to ${skillName}! I see you've been here before. Would you like to create a new picture or continue with your last one?`;
      } else {
        speakOutput = isGerman 
          ? `${greeting} Willkommen bei ${skillName}! Ich bin dein magischer Assistent zum Erstellen von Malvorlagen. Du kannst mir einfach beschreiben, was du zeichnen möchtest, und ich zeige es dir auf dem Bildschirm. Zum Beispiel: "Ich möchte ein Bild von einem Einhorn" oder "Zeichne mir einen Dinosaurier". Was möchtest du heute malen?`
          : `${greeting} Welcome to ${skillName}! I'm your magical assistant for creating coloring pages. Just tell me what you'd like to draw, and I'll show it on the screen. For example, say "I want a picture of a unicorn" or "Draw me a dinosaur". What would you like to create today?`;
      }
      
      const repromptText = isGerman
        ? 'Beschreibe mir, was ich für dich zeichnen soll. Du kannst zum Beispiel sagen: "Ich möchte eine Katze".'
        : 'Tell me what you\'d like me to draw. You can say something like "I want a cat".';

      const responseBuilder = handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(repromptText);

      // Try to create APL display for Echo Show 15 with error handling
      APLService.safeCreateAPLDirective(
        handlerInput,
        () => APLService.createWelcomeDisplay(
          session.language,
          greeting,
          hasExistingImages
        ),
        speakOutput
      );

      return responseBuilder.getResponse();
        
    } catch (error) {
      console.error('Error in LaunchRequestHandler:', error);
      
      // Use enhanced error handling for session creation failures
      const { VoiceErrorHandler } = await import('../utils/errorHandling');
      return VoiceErrorHandler.handleOperationFailure(
        handlerInput,
        'session_save',
        error as Error
      );
    }
  },
};