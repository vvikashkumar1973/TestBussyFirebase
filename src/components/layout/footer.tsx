import Link from 'next/link';
import { BookOpenCheck, Twitter, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto max-w-screen-2xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpenCheck className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-headline">TestBuddy.in</span>
            </Link>
            <p className="text-muted-foreground">
              Your partner in cracking Indian government exams.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold font-headline text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/exam-test" className="text-muted-foreground hover:text-primary">Exam Tests</Link></li>
              <li><Link href="/typing-test" className="text-muted-foreground hover:text-primary">Typing Tests</Link></li>
              <li><Link href="/performance" className="text-muted-foreground hover:text-primary">Performance</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold font-headline text-lg mb-4">Exams</h3>
            <ul className="space-y-2">
              <li><Link href="/exam-test?category=ssc" className="text-muted-foreground hover:text-primary">SSC</Link></li>
              <li><Link href="/exam-test?category=railways" className="text-muted-foreground hover:text-primary">Railways</Link></li>
              <li><Link href="/exam-test?category=banking" className="text-muted-foreground hover:text-primary">Banking</Link></li>
              <li><Link href="/exam-test?category=other" className="text-muted-foreground hover:text-primary">Other Exams</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold font-headline text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TestBuddy.in. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
