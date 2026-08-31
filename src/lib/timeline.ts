export interface Milestone {
  title: string;
  dateStr: string;
  status: 'upcoming' | 'active' | 'closed';
}

export function isDeadlineApproaching(dateStr: string, daysThreshold = 14): boolean {
  const target = new Date(dateStr).getTime();
  const now = Date.now();
  const diffDays = (target - now) / (1000 * 60 * 60 * 24);
  return diffDays > 0 && diffDays <= daysThreshold;
}
