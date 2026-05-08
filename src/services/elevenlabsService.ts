/**
 * ElevenLabs Service
 * Handles text-to-speech conversion via server proxy for security.
 */

export async function speak(text: string, voiceId: string = '21m00Tcm4TlvDq8ikWAM'): Promise<HTMLAudioElement> {
  const response = await fetch('/api/tts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      voiceId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Speech generation failed');
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  return new Audio(url);
}
