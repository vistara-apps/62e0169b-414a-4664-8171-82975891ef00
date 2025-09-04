'use client';

import { Shield, Bot, Heart, MessageCircle, Repeat2, ExternalLink } from 'lucide-react';

interface Tweet {
  id: string;
  author: string;
  content: string;
  credibilityScore: number;
  botProbability: number;
  sentiment: string;
  timestamp: string;
  verified: boolean;
  engagement: {
    likes: number;
    retweets: number;
    replies: number;
  };
}

interface TweetCardProps {
  tweet: Tweet;
  variant?: 'filtered' | 'original';
}

export function TweetCard({ tweet, variant = 'filtered' }: TweetCardProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getCredibilityColor = (score: number) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <div className="card hover:bg-surface/80 transition-colors animate-fade-in">
      {/* Tweet Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">{tweet.author.charAt(1).toUpperCase()}</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-white">{tweet.author}</span>
              {tweet.verified && (
                <Shield className="w-4 h-4 text-blue-400" />
              )}
            </div>
            <span className="text-sm text-textSecondary">{tweet.timestamp}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-xs">
          <div className={`flex items-center space-x-1 ${getCredibilityColor(tweet.credibilityScore)}`}>
            <Shield className="w-3 h-3" />
            <span>{tweet.credibilityScore}%</span>
          </div>
          {tweet.botProbability > 30 && (
            <div className="flex items-center space-x-1 text-orange-400">
              <Bot className="w-3 h-3" />
              <span>{tweet.botProbability}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Tweet Content */}
      <div className="mb-4">
        <p className="body text-textPrimary leading-relaxed">{tweet.content}</p>
      </div>

      {/* Analysis Tags */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full bg-surface border ${getSentimentColor(tweet.sentiment)}`}>
            {tweet.sentiment}
          </span>
          {tweet.credibilityScore >= 70 && (
            <span className="text-xs px-2 py-1 rounded-full bg-green-400/10 border border-green-400/20 text-green-400">
              High Credibility
            </span>
          )}
          {tweet.botProbability <= 20 && (
            <span className="text-xs px-2 py-1 rounded-full bg-blue-400/10 border border-blue-400/20 text-blue-400">
              Verified Human
            </span>
          )}
        </div>
        
        <button className="text-textSecondary hover:text-white transition-colors">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-textSecondary hover:text-red-400 transition-colors cursor-pointer">
            <Heart className="w-4 h-4" />
            <span className="text-sm">{formatNumber(tweet.engagement.likes)}</span>
          </div>
          <div className="flex items-center space-x-2 text-textSecondary hover:text-green-400 transition-colors cursor-pointer">
            <Repeat2 className="w-4 h-4" />
            <span className="text-sm">{formatNumber(tweet.engagement.retweets)}</span>
          </div>
          <div className="flex items-center space-x-2 text-textSecondary hover:text-blue-400 transition-colors cursor-pointer">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{formatNumber(tweet.engagement.replies)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
