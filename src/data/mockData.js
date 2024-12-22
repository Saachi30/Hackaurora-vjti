import { Trophy, Medal, Target, Users, Leaf } from 'lucide-react';

export const achievements = [
  { title: 'Carbon Warrior', description: 'Reduced carbon footprint by 50%', icon: <Trophy className="w-5 h-5 text-green-600" /> },
  { title: 'Eco Champion', description: 'Completed 10 eco-challenges', icon: <Medal className="w-5 h-5 text-blue-600" /> },
  { title: 'Green Influencer', description: 'Inspired 5 friends to join', icon: <Target className="w-5 h-5 text-purple-600" /> }
];

export const carbonData = [
  { month: 'Jan', footprint: 120 },
  { month: 'Feb', footprint: 100 },
  { month: 'Mar', footprint: 90 },
  { month: 'Apr', footprint: 85 },
  { month: 'May', footprint: 75 }
];

export const certificates = [
  {
    title: 'Ethical Labor Excellence',
    status: 'Awarded',
    score: 92,
    icon: <Users className="w-6 h-6 text-blue-600" />,
    criteria: 'Maintained >85% labor score for 12 months',
    awardedDate: '2024-03-15',
    name: 'John Doe'
  },
  {
    title: 'Sustainable Practice Leader',
    status: 'In Progress',
    score: 78,
    icon: <Leaf className="w-6 h-6 text-green-600" />,
    criteria: 'Maintain <80kg monthly carbon footprint',
    requiredScore: 85
  }
];
