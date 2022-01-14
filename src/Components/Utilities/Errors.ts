

export function InvalidArgTypeError (argName : string, expectedType : string, receivedType : string, functionName : string) {
    throw new Error(`received arg ${argName} of invalid type ${receivedType}, expected type ${expectedType} at funtion ${functionName}`);
}