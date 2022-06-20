export function getMessageFromApiRequest(message: string): string {
  if (isJson(message)) {
    const messageJSON = JSON.parse(message);
    return Object.values(messageJSON).filter(error => !!error).join('\n');
  }
  return message;
}

function isJson(errorMessage): boolean {
  try {
    JSON.parse(errorMessage);
  } catch (e) {
    return false;
  }
  return true;
}
