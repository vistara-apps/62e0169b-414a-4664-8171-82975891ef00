'use client';

import { useState } from 'react';
import { Sliders, Shield, Bot, Heart, Meh, Frown } from 'lucide-react';

interface SettingsPanelProps {
  credibilityThreshold: number;
  onCredibilityThresholdChange: (value: number) => void;
  botThreshold: number;
  onBotThresholdChange: (value: number) => void;
  sentimentFilter: string[];
  onSentimentFilterChange: (values: string[]) => void;
}

export function SettingsPanel({
  credibilityThreshold,
  onCredibilityThresholdChange,
  botThreshold,
  onBotThresholdChange,
  sentimentFilter,
  onSentimentFilterChange
}: SettingsPanelProps) {
  const [blockedSources, setBlockedSources] = useState<string[]>(['@spambot', '@fakeupdates']);
  const [trustedSources, setTrustedSources] = useState<string[]>(['@reuters', '@nytimes']);
  const [newSource, setNewSource] = useState('');

  const handleSentimentToggle = (sentiment: string) => {
    if (sentimentFilter.includes(sentiment)) {
      onSentimentFilterChange(sentimentFilter.filter(s => s !== sentiment));
    } else {
      onSentimentFilterChange([...sentimentFilter, sentiment]);
    }
  };

  const addBlockedSource = () => {
    if (newSource && !blockedSources.includes(newSource)) {
      setBlockedSources([...blockedSources, newSource]);
      setNewSource('');
    }
  };

  const removeBlockedSource = (source: string) => {
    setBlockedSources(blockedSources.filter(s => s !== source));
  };

  return (
    <div className="card space-y-6 animate-slide-up">
      <div className="flex items-center space-x-2 mb-4">
        <Sliders className="w-5 h-5 text-primary" />
        <h3 className="headline">Filter Settings</h3>
      </div>

      {/* Credibility Threshold */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">Minimum Credibility</span>
          </div>
          <span className="text-sm text-textSecondary">{credibilityThreshold}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={credibilityThreshold}
          onChange={(e) => onCredibilityThresholdChange(Number(e.target.value))}
          className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-textSecondary">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      {/* Bot Detection Threshold */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium">Max Bot Probability</span>
          </div>
          <span className="text-sm text-textSecondary">{botThreshold}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={botThreshold}
          onChange={(e) => onBotThresholdChange(Number(e.target.value))}
          className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-textSecondary">
          <span>Strict</span>
          <span>Lenient</span>
        </div>
      </div>

      {/* Sentiment Filter */}
      <div className="space-y-3">
        <span className="text-sm font-medium">Allowed Sentiments</span>
        <div className="flex space-x-3">
          {[
            { key: 'positive', icon: Heart, color: 'text-green-400', label: 'Positive' },
            { key: 'neutral', icon: Meh, color: 'text-yellow-400', label: 'Neutral' },
            { key: 'negative', icon: Frown, color: 'text-red-400', label: 'Negative' }
          ].map(({ key, icon: Icon, color, label }) => (
            <button
              key={key}
              onClick={() => handleSentimentToggle(key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                sentimentFilter.includes(key)
                  ? 'bg-primary/20 border border-primary/30'
                  : 'bg-surface border border-gray-700'
              }`}
            >
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Source Management */}
      <div className="space-y-3">
        <span className="text-sm font-medium">Blocked Sources</span>
        <div className="flex flex-wrap gap-2 mb-2">
          {blockedSources.map(source => (
            <span
              key={source}
              onClick={() => removeBlockedSource(source)}
              className="text-xs px-2 py-1 bg-red-400/10 border border-red-400/20 text-red-400 rounded cursor-pointer hover:bg-red-400/20 transition-colors"
            >
              {source} ×
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newSource}
            onChange={(e) => setNewSource(e.target.value)}
            placeholder="@username or domain"
            className="flex-1 px-3 py-2 bg-surface border border-gray-700 rounded text-sm focus:outline-none focus:border-primary"
            onKeyPress={(e) => e.key === 'Enter' && addBlockedSource()}
          />
          <button
            onClick={addBlockedSource}
            className="btn-primary text-sm px-3 py-2"
          >
            Block
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2">
        <button
          onClick={() => {
            onCredibilityThresholdChange(70);
            onBotThresholdChange(30);
            onSentimentFilterChange(['positive', 'neutral']);
          }}
          className="btn-secondary text-xs flex-1"
        >
          Strict Mode
        </button>
        <button
          onClick={() => {
            onCredibilityThresholdChange(30);
            onBotThresholdChange(80);
            onSentimentFilterChange(['positive', 'neutral', 'negative']);
          }}
          className="btn-secondary text-xs flex-1"
        >
          Relaxed Mode
        </button>
      </div>
    </div>
  );
}
