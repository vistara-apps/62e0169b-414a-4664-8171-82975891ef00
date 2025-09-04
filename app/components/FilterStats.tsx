'use client';

import { Shield, Bot, Clock, Filter } from 'lucide-react';

interface FilterStatsProps {
  stats: {
    totalFiltered: number;
    credibilityBlocked: number;
    botsBlocked: number;
    timeSaved: number;
  };
}

export function FilterStats({ stats }: FilterStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="card p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Filter className="w-4 h-4 text-primary" />
              <span className="text-xs text-textSecondary">Total Filtered</span>
            </div>
            <div className="text-lg font-bold text-white">{stats.totalFiltered}</div>
          </div>
        </div>
      </div>

      <div className="card p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-xs text-textSecondary">Low Credibility</span>
            </div>
            <div className="text-lg font-bold text-white">{stats.credibilityBlocked}</div>
          </div>
        </div>
      </div>

      <div className="card p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Bot className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-textSecondary">Bots Blocked</span>
            </div>
            <div className="text-lg font-bold text-white">{stats.botsBlocked}</div>
          </div>
        </div>
      </div>

      <div className="card p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-xs text-textSecondary">Time Saved</span>
            </div>
            <div className="text-lg font-bold text-white">{stats.timeSaved}min</div>
          </div>
        </div>
      </div>
    </div>
  );
}
