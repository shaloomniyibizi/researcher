import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

const testimonials = [
  {
    name: 'Jane Doe',
    feedback:
      'This platform has transformed the way I approach my research projects. The AI tools are incredibly helpful!',
    image: '/images/PassPort.jpg',
    role: 'Stundent at RP/IPRC Tumba',
  },
  {
    name: 'John Smith',
    feedback:
      'The originality check feature ensured my project was unique and helped me stand out.',
    image: '/images/PassPort.jpg',
    role: 'Stundent at RP/IPRC Huye',
  },
  {
    name: 'Alice Johnson',
    feedback:
      'Having access to past projects and reviews has significantly improved the quality of my work.',
    image: '/images/PassPort.jpg',
    role: 'Stundent at RP/IPRC Musanze',
  },
];

const TestimonialsSection = () => {
  return (
    <div className='py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='lg:text-center'>
          <h2 className='text-base text-primary font-semibold tracking-wide uppercase'>
            Testimonials
          </h2>
          <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl'>
            What Our Users Say
          </p>
        </div>

        <div className='mt-10'>
          <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10'>
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className='relative'>
                <CardHeader>
                  <div className='flex justify-start items-center gap-4'>
                    <Image
                      className='w-12 h-12 rounded-full border-2 border-primary'
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={1200}
                      height={1200}
                    />
                    <div className=''>
                      <CardTitle className='text-lg leading-6 font-medium'>
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className='text-xs leading-3 font-extralight'>
                        {testimonial.role}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>{testimonial.feedback}</CardContent>
              </Card>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
