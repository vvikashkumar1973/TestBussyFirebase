import Image from 'next/image';
import { Award, Target, Users } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'about-hero') || { imageUrl: "https://picsum.photos/seed/default/1200/400", imageHint: "team" };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full flex items-center justify-center text-center text-white">
          <Image
            src={heroImage.imageUrl}
            alt="Team working together"
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 px-4">
              <h1 className="text-4xl md:text-6xl font-bold font-headline">About TestBuddy.in</h1>
              <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
                  Empowering Aspirants, Building Futures.
              </p>
          </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold font-headline">Our Mission</h2>
              <p className="text-muted-foreground">
                Our mission is to provide an accessible, affordable, and high-quality test preparation platform for every government job aspirant in India. We believe that with the right tools and guidance, anyone can achieve their dream of a stable and rewarding career in public service.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold font-headline">Our Vision</h2>
              <p className="text-muted-foreground">
                We envision a future where geographical and economic barriers no longer hinder a student's potential. TestBuddy.in aims to be the most trusted companion in the journey of millions of aspirants, leveraging technology to create a level playing field for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
       <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">Our Core Values</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">The principles that guide our work and our commitment to you.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center p-6 border rounded-lg bg-card">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline">Excellence</h3>
                <p className="mt-2 text-muted-foreground">We strive for the highest quality in our content and platform, ensuring an authentic exam experience.</p>
              </div>
              <div className="flex flex-col items-center p-6 border rounded-lg bg-card">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline">Student-Centric</h3>
                <p className="mt-2 text-muted-foreground">Your success is our success. We design every feature with your learning journey in mind.</p>
              </div>
              <div className="flex flex-col items-center p-6 border rounded-lg bg-card">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline">Integrity</h3>
                <p className="mt-2 text-muted-foreground">We are committed to transparent and ethical practices in all our interactions.</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
