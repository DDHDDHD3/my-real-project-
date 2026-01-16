import { Injectable } from '@angular/core';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { environment } from '../environments/environment';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai!: GoogleGenAI;

  constructor() {
    if (environment.apiKey) {
      this.ai = new GoogleGenAI({ apiKey: environment.apiKey });
    } else {
      console.error('API_KEY environment variable is not set.');
    }
  }

  private ensureAiInitialized() {
    if (!this.ai) {
      throw new Error('Gemini AI SDK not initialized. An API key is required.');
    }
  }

  async generateImage(prompt: string, aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'): Promise<string> {
    this.ensureAiInitialized();
    const response = await this.ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio,
      },
    });

    const image = response.generatedImages?.[0]?.image;
    if (!image || !image.imageBytes) {
      throw new Error('Image generation failed to produce image data.');
    }
    return `data:image/png;base64,${image.imageBytes}`;
  }

  async describeImage(imageBase64: string, mimeType: string): Promise<string> {
    this.ensureAiInitialized();
    const imagePart = { inlineData: { mimeType, data: imageBase64 } };
    const textPart = { text: "Describe this image in detail for an image generation model. Focus on the main subject, setting, and style." };

    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });

    return response.text ?? '';
  }

  async animateImage(prompt: string, imageBase64: string, mimeType: string, aspectRatio: '16:9' | '9:16', onStatusUpdate: (status: string) => void): Promise<string> {
    this.ensureAiInitialized();
    onStatusUpdate('Starting video generation...');
    let operation = await this.ai.models.generateVideos({
      model: 'veo-2.0-generate-001',
      prompt,
      image: { imageBytes: imageBase64, mimeType },
      config: {
        numberOfVideos: 1,
        aspectRatio
      }
    });

    onStatusUpdate('Processing video... This can take several minutes.');
    while (!operation.done) {
      await delay(10000); // Poll every 10 seconds
      onStatusUpdate('Still processing... Please wait.');
      operation = await this.ai.operations.getVideosOperation({ operation });
    }

    onStatusUpdate('Video generated successfully! Preparing for display...');
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
      throw new Error('Video generation failed to produce a download link.');
    }

    const apiKey = environment.apiKey;
    if (!apiKey) {
      throw new Error('API_KEY is not configured.');
    }
    return `${downloadLink}&key=${apiKey}`;
  }
}
