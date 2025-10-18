import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  BookCopy,
  BarChart3,
  Keyboard,
  BrainCircuit,
  Award,
} from 'lucide-react';

const features = [
  {
    icon: BookCopy,
    title: 'Extensive Exam Library',
    description: 'Access a vast collection of tests for SSC, Banking, Railways, and more, all with detailed round patterns.',
  },
  {
    icon: Keyboard,
    title: 'Precision Typing Tests',
    description: 'Improve your speed and accuracy with our real-time feedback and performance-driven typing challenges.',
  },
  {
    icon: BarChart3,
    title: 'In-Depth Performance Analytics',
    description: 'Track your progress with detailed reports and visualizations to identify strengths and weaknesses.',
  },
  {
    icon: BrainCircuit,
    title: 'AI-Powered Mock Tests',
    description: 'Generate unique mock papers tailored to your needs, powered by our intelligent question engine.',
  },
];

const examCategories = [
  { name: 'SSC Exams', imageId: 'ssc-category' },
  { name: 'Banking Exams', imageId: 'banking-category' },
  { name: 'Railway Exams', imageId: 'railways-category' },
  { name: 'Other Govt. Exams', imageId: 'other-govt-category' },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'SSC CGL Aspirant',
    avatarId: 'testimonial-priya',
    quote: "TestBuddy's mock tests are a game-changer. The question quality and exam patterns are spot-on, which helped me score 20% higher in my latest attempt!",
  },
  {
    name: 'Rahul Verma',
    role: 'Banking PO',
    avatarId: 'testimonial-rahul',
    quote: "The typing tutor is fantastic. My speed went from 25 WPM to 45 WPM in just a month. It was crucial for clearing the skill test.",
  },
  {
    name: 'Anjali Singh',
    role: 'Railways NTPC',
    avatarId: 'testimonial-anjali',
    quote: "I love the performance analytics. It showed me exactly where I was losing marks, allowing me to focus my revision. Highly recommended!",
  },
];

export default function Home() {
  const findImage = (id: string) => {
    const defaultImage = { imageUrl: "https://picsum.photos/seed/default/600/400", imageHint: "placeholder" };
    return PlaceHolderImages.find(p => p.id === id) || defaultImage;
  };
  const heroImage = findImage('hero');

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Master Your Path to Government Job Success
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    TestBuddy.in offers a comprehensive platform with exam & typing tests to help you ace Indian government exams.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/exam-test">Start a Free Test</Link>
                  </Button>
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/typing-test">Practice Typing</Link>
                  </Button>
                </div>
              </div>
              <Image
                src={heroImage.imageUrl}
                width={600}
                height={400}
                alt="Hero"
                data-ai-hint={heroImage.imageHint}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Everything You Need to Succeed</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is packed with tools and resources designed to give you a competitive edge.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full h-fit">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-headline">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Exam Categories Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Popular Exam Categories</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find tailored tests for the most sought-after government jobs in India.
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {examCategories.map((category) => {
                const image = findImage(category.imageId);
                return (
                  <Card key={category.name} className="overflow-hidden group">
                    <CardContent className="p-0">
                      <Image
                        src={image.imageUrl}
                        width={600}
                        height={400}
                        alt={category.name}
                        data-ai-hint={image.imageHint}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <h3 className="font-bold font-headline text-lg">{category.name}</h3>
                        <Button variant="link" className="p-0 h-auto mt-2" asChild>
                          <Link href="/exam-test">Explore Tests &rarr;</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-center mb-12">
              From Our Users
            </h2>
            <Carousel
              opts={{ align: 'start', loop: true }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => {
                  const avatar = findImage(testimonial.avatarId);
                  return (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1 h-full">
                        <Card className="flex flex-col justify-between h-full">
                          <CardContent className="p-6 space-y-4">
                            <p className="text-sm text-muted-foreground">"{testimonial.quote}"</p>
                          </CardContent>
                          <CardHeader className="p-6 pt-0 flex flex-row items-center gap-4">
                            <Avatar>
                              <AvatarImage src={avatar.imageUrl} alt={testimonial.name} data-ai-hint={avatar.imageHint}/>
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base font-bold">{testimonial.name}</CardTitle>
                              <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </CardHeader>
                        </Card>
                      </div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-headline tracking-tighter md:text-4xl/tight">
                Ready to Start Your Journey?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Create an account and unlock your full potential. Get access to all our tests and features today.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-x-2">
              <Button size="lg" asChild>
                <Link href="/signup">Sign Up for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
