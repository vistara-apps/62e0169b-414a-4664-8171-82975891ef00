'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { TweetCard } from './components/TweetCard';
import { SettingsPanel } from './components/SettingsPanel';
import { StatsCard } from './components/StatsCard';
import { FilterStats } from './components/FilterStats';

// Mock data for demonstration
const mockTweets = [
  {
    id: '1',
    author: '@elonmusk',
    content: 'Mars colonization is the next step for humanity. We need to become a multiplanetary species.',
    credibilityScore: 85,
    botProbability: 5,
    sentiment: 'positive',
    timestamp: '2h',
    verified: true,
    engagement: { likes: 12400, retweets: 3200, replies: 890 }
  },
  {
    id: '2',
    author: '@garyv',
    content: 'The future belongs to those who understand that patience and long-term thinking always wins.',
    credibilityScore: 78,
    botProbability: 8,
    sentiment: 'neutral',
    timestamp: '4h',
    verified: true,
    engagement: { likes: 5600, retweets: 1200, replies: 340 }
  },
  {
    id: '3',
    author: '@aicryptobot',
    content: '🚀🚀🚀 HUGE ANNOUNCEMENT! New crypto project launching TONIGHT! Don\'t miss out! 💰💰💰',
    credibilityScore: 15,
    botProbability: 95,
    sentiment: 'positive',
    timestamp: '1h',
    verified: false,
    engagement: { likes: 23, retweets: 5, replies: 2 }
  }
];

export default function HomePage() {
  const [filteredTweets, setFilteredTweets] = useState(mockTweets);
  const [credibilityThreshold, setCredibilityThreshold] = useState(50);
  const [botThreshold, setBotThreshold] = useState(70);
  const [sentimentFilter, setSentimentFilter] = useState<string[]>(['positive', 'neutral', 'negative']);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const filtered = mockTweets.filter(tweet => 
      tweet.credibilityScore >= credibilityThreshold &&
      tweet.botProbability <= botThreshold &&
      sentimentFilter.includes(tweet.sentiment)
    );
    setFilteredTweets(filtered);
  }, [credibilityThreshold, botThreshold, sentimentFilter]);

  const stats = {
    totalFiltered: mockTweets.length - filteredTweets.length,
    credibilityBlocked: mockTweets.filter(t => t.credibilityScore < credibilityThreshold).length,
    botsBlocked: mockTweets.filter(t => t.botProbability > botThreshold).length,
    timeSaved: Math.round((mockTweets.length - filteredTweets.length) * 2.3)
  };

  return (
    <AppShell>
      <div className="max-w-screen-sm mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="display text-white">ChronoFilter</h1>
          <p className="text-textSecondary">Curate Your Feed, Reclaim Your Focus</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            title="Content Filtered"
            value="$19,608"
            subtitle="spam free"
            chart={true}
          />
          <div className="space-y-4">
            <StatsCard
              title="Experience"
              value="84.6%"
              subtitle="satisfaction"
              compact={true}
            />
            <StatsCard
              title="Status"
              value="14,389"
              subtitle="enhanced"
              compact={true}
            />
          </div>
        </div>

        {/* Filter Statistics */}
        <FilterStats stats={stats} />

        {/* Tweet Feed */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="headline">Your Filtered Feed</h2>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="btn-secondary text-sm"
            >
              Settings
            </button>
          </div>

          {showSettings && (
            <SettingsPanel
              credibilityThreshold={credibilityThreshold}
              onCredibilityThresholdChange={setCredibilityThreshold}
              botThreshold={botThreshold}
              onBotThresholdChange={setBotThreshold}
              sentimentFilter={sentimentFilter}
              onSentimentFilterChange={setSentimentFilter}
            />
          )}

          <div className="space-y-4">
            {filteredTweets.map(tweet => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))}
            
            {filteredTweets.length === 0 && (
              <div className="card text-center py-8">
                <p className="text-textSecondary">No tweets match your current filters.</p>
                <p className="text-sm text-textSecondary mt-2">
                  Try adjusting your credibility or bot detection thresholds.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
