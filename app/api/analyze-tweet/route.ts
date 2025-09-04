import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
  
  return new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { tweetText, authorHandle } = await req.json();

    if (!tweetText) {
      return NextResponse.json(
        { error: 'Tweet text is required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          error: 'AI analysis not available - API key not configured',
          sentiment: 'neutral',
          credibilityScore: 50,
          botProbability: 50,
          reasoning: 'Analysis unavailable without API key'
        },
        { status: 200 }
      );
    }

    const openai = getOpenAIClient();

    // Analyze sentiment and credibility using AI
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: `You are an expert content analyzer. Analyze the given tweet and provide:
          1. Sentiment (positive, negative, neutral)
          2. Credibility score (0-100, where 100 is most credible)
          3. Bot probability (0-100, where 100 is most likely to be a bot)
          4. Content quality assessment
          
          Consider factors like:
          - Writing quality and coherence
          - Emotional manipulation tactics
          - Spam indicators
          - Source authority signals
          - Misinformation patterns
          
          Respond with a JSON object containing: sentiment, credibilityScore, botProbability, reasoning.`
        },
        {
          role: "user",
          content: `Analyze this tweet from ${authorHandle}: "${tweetText}"`
        }
      ],
      temperature: 0.3,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from AI');
    }

    // Parse the AI response
    const analysis = JSON.parse(response);

    return NextResponse.json({
      sentiment: analysis.sentiment,
      credibilityScore: analysis.credibilityScore,
      botProbability: analysis.botProbability,
      reasoning: analysis.reasoning,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error analyzing tweet:', error);
    return NextResponse.json(
      { error: 'Failed to analyze tweet' },
      { status: 500 }
    );
  }
}
