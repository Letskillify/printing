import React from 'react';
import { LiveStatCards } from './LiveStatCards';
import { RevenueCharts } from './RevenueCharts';
import { ExpressQueueStream } from './ExpressQueueStream';
import { ActivityFeed } from './ActivityFeed';

export const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <LiveStatCards />
      <ExpressQueueStream />
      <RevenueCharts />
      <ActivityFeed />
    </div>
  );
};
