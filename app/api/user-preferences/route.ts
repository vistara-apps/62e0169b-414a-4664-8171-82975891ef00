import { NextRequest, NextResponse } from 'next/server';

// Mock database - in production, use Supabase or similar
const userPreferences = new Map();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    );
  }

  const preferences = userPreferences.get(userId) || {
    credibilityThreshold: 50,
    botThreshold: 70,
    sentimentFilter: ['positive', 'neutral', 'negative'],
    blockedSources: [],
    trustedSources: [],
    twitterHandle: null,
  };

  return NextResponse.json(preferences);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, preferences } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    userPreferences.set(userId, {
      ...preferences,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error saving preferences:', error);
    return NextResponse.json(
      { error: 'Failed to save preferences' },
      { status: 500 }
    );
  }
}
