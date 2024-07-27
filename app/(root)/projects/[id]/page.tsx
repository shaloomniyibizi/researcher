// pages/project/[id].js

// Example data fetching function

const project = {
  title: 'AI-Powered Healthcare Monitoring',
  thumbnail: '/images/project2.png',
  author: 'Jane Doe',
  date: 'March 2024',
  description:
    "Developed an IoT-based healthcare system that uses AI to monitor patients' health data in real-time and provide timely interventions. This project developed an IoT-based healthcare system that leverages artificial intelligence to monitor patients' health data in real-time. The system collects vital signs and other health metrics from wearable devices and sensors, processes the data using machine learning algorithms, and provides timely alerts to healthcare providers. The goal is to enable proactive medical interventions, reduce hospital visits, and improve patient outcomes through continuous and personalized care.",
  details: {
    objective:
      'Enable proactive medical interventions..., This project developed an IoT-based healthcare system that leverages artificial intelligence to monitor patients health data in real-time...',
    technologies: 'IoT, AI, Machine Learning',
    methodology: 'Data collection, real-time processing...',
    challenges: 'Ensuring data privacy, managing large data streams...',
    results: 'Improved patient outcomes, reduced hospital visits...',
  },
  downloadLinks: {
    pdf: '#',
    code: '#',
  },
  comments: [
    { author: 'John Smith', date: 'April 2024', text: 'Great project!' },
    { author: 'Emily Johnson', date: 'May 2024', text: 'Very innovative.' },
  ],
};

import ProjectDetail from '@/app/(protected)/dashboard/projects/_components/ProjectDetail';
const page = () => {
  return <ProjectDetail project={project} />;
};

export default page;
