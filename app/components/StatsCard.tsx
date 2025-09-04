'use client';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  chart?: boolean;
  compact?: boolean;
}

export function StatsCard({ title, value, subtitle, chart = false, compact = false }: StatsCardProps) {
  return (
    <div className={`card ${compact ? 'p-3' : 'p-4'}`}>
      <div className="space-y-2">
        <h3 className={`font-medium text-textSecondary ${compact ? 'text-xs' : 'text-sm'}`}>
          {title}
        </h3>
        <div className={`font-bold text-white ${compact ? 'text-lg' : 'text-2xl'}`}>
          {value}
        </div>
        <p className={`text-textSecondary ${compact ? 'text-xs' : 'text-sm'}`}>
          {subtitle}
        </p>
        
        {chart && (
          <div className="mt-4">
            <div className="h-20 flex items-end justify-between space-x-1">
              {[40, 65, 45, 70, 55, 80, 60, 75, 50, 85, 70, 90].map((height, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-t from-primary/30 to-primary flex-1 rounded-sm"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
