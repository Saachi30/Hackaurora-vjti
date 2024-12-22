import { Trophy, Medal, Target, Users, Leaf, TrendingDown } from 'lucide-react';

export const achievements = [
  { title: 'Top Performer', description: 'Maintained 99% delivery accuracy', icon: <Trophy className="w-5 h-5 text-green-600" /> },
  { title: 'Quality Master', description: 'Zero defects for 6 months', icon: <Medal className="w-5 h-5 text-blue-600" /> },
  { title: 'Cost Optimizer', description: 'Reduced costs by 15%', icon: <TrendingDown className="w-5 h-5 text-purple-600" /> }
];

export const performanceData = [
  { month: 'Jan', deliveries: 120 },
  { month: 'Feb', deliveries: 145 },
  { month: 'Mar', deliveries: 135 },
  { month: 'Apr', deliveries: 160 },
  { month: 'May', deliveries: 150 }
];

export const certificates = [
  {
    title: 'Ethical Labor Excellence',
    status: 'Awarded',
    score: 92,
    icon: <Users className="w-6 h-6 text-blue-600" />,
    criteria: 'Maintained >85% labor compliance score for 12 months',
    awardedDate: '2024-03-15',
    name: 'Param Gogia'
  },
  {
    title: 'Green Supply Chain Leader',
    status: 'In Progress',
    score: 78,
    icon: <Leaf className="w-6 h-6 text-green-600" />,
    criteria: 'Maintain <80kg CO2 per delivery',
    requiredScore: 85
  }
];