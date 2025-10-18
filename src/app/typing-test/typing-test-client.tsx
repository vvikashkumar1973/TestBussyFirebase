'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Timer, Zap, Target, RefreshCw, Home } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea';
import { PerformanceHistory } from './performance-history';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';


const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet. Typing it is a good way to practice.",
  "In the heart of India, vibrant festivals paint the streets with color and joy. Each celebration, from Diwali to Holi, tells a story of culture and tradition.",
  "Success in competitive exams requires dedication, strategic preparation, and consistent practice. Analyze your mistakes and learn from them.",
  "The digital age has transformed how we learn and work. Online platforms offer accessible education and skill development opportunities for everyone.",
  "Maintaining a healthy work-life balance is crucial for long-term well-being. Remember to take breaks, pursue hobbies, and spend time with loved ones."
];

type TestStatus = 'idle' | 'typing' | 'finished';

export type TypingPerformance = {
  wpm: number;
  accuracy: number;
  duration: number;
  date: string;
};

const LS_PERF_KEY = 'typingPerformanceHistory';

export function TypingTestClient() {
  const [duration, setDuration] = useState(60);
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(duration);
  const [status, setStatus] = useState<TestStatus>('idle');
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [localHistory, setLocalHistory] = useState<TypingPerformance[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const { user } = useUser();
  const firestore = useFirestore();

  const typingResultsCollection = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'typing-results');
  }, [user, firestore]);

  const { data: firestoreHistory } = useCollection<TypingPerformance>(typingResultsCollection);

  const performanceHistory = firestoreHistory || localHistory;


  useEffect(() => {
    if (!user) {
        try {
            const storedHistory = localStorage.getItem(LS_PERF_KEY);
            if (storedHistory) {
                setLocalHistory(JSON.parse(storedHistory));
            }
        } catch (error) {
            console.error("Could not load performance history from localStorage", error);
        }
    }
  }, [user]);

  const savePerformance = (newPerf: TypingPerformance) => {
    if (user && typingResultsCollection) {
      addDocumentNonBlocking(typingResultsCollection, newPerf);
    } else {
        try {
          const updatedHistory = [newPerf, ...localHistory].slice(0, 10);
          setLocalHistory(updatedHistory);
          localStorage.setItem(LS_PERF_KEY, JSON.stringify(updatedHistory));
        } catch (error) {
            console.error("Could not save performance history to localStorage", error);
        }
    }
  };

  const calculateMetrics = useCallback(() => {
    const typedChars = userInput.trim().length;
    if (typedChars === 0) {
      return { wpm: 0, accuracy: 0 };
    }

    const timeElapsed = duration - timeLeft;
    const wordsTyped = (typedChars / 5);
    const currentWpm = timeElapsed > 0 ? (wordsTyped / timeElapsed) * 60 : 0;
    
    let correctChars = 0;
    const cleanText = text.trim();
    userInput.trim().split('').forEach((char, index) => {
        if(cleanText[index] === char) {
            correctChars++;
        }
    });
    
    const finalWpm = Math.round(currentWpm);
    const finalAccuracy = Math.round((correctChars / typedChars) * 100);
    
    setWpm(finalWpm);
    setAccuracy(finalAccuracy);
    
    return { wpm: finalWpm, accuracy: finalAccuracy };
  }, [duration, timeLeft, userInput, text]);

  const endTest = useCallback(() => {
    if (timerId.current) clearInterval(timerId.current);
    setStatus('finished');
    const { wpm, accuracy } = calculateMetrics();
    if(wpm > 0) {
        savePerformance({
            wpm,
            accuracy,
            duration,
            date: new Date().toISOString(),
        });
    }
  }, [calculateMetrics, duration, savePerformance]);

  const startTest = () => {
    resetTest();
    const newText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(newText);
    setStatus('typing');
    inputRef.current?.focus();

    if (timerId.current) clearInterval(timerId.current);
    timerId.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const resetTest = () => {
    if (timerId.current) clearInterval(timerId.current);
    setStatus('idle');
    setTimeLeft(duration);
    setUserInput('');
    setText('');
    setWpm(0);
    setAccuracy(0);
  };

  useEffect(() => {
    return () => {
      if (timerId.current) clearInterval(timerId.current);
    };
  }, []);
  
  useEffect(() => {
    if(status !== 'typing') {
        setTimeLeft(duration);
    }
  }, [duration, status]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (status !== 'typing') return;
    
    const newTypedText = e.target.value;
    setUserInput(newTypedText);

    if (newTypedText.length >= text.length) {
      endTest();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
            <StatCard icon={Timer} label="Time" value={`${timeLeft}s`} />
            <StatCard icon={Zap} label="Speed (WPM)" value={wpm} hidden={status !== 'finished'} />
            <StatCard icon={Target} label="Accuracy" value={`${accuracy}%`} hidden={status !== 'finished'} />
            <div className={cn("flex items-center justify-center", status === 'finished' && "md:col-start-4")}>
                {status !== 'finished' && (
                    <Button onClick={status === 'typing' ? resetTest : startTest} className="w-full md:w-auto" variant={status === 'typing' ? "destructive" : "default"}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        {status === 'typing' ? 'Reset' : 'Start'}
                    </Button>
                )}
            </div>
        </div>
        
        {status === 'idle' && (
             <div className="flex flex-col items-center justify-center p-8 space-y-4">
                 <div className='flex flex-col items-center justify-center space-y-4 text-center'>
                    <p className="text-muted-foreground">Select a test duration and click Start.</p>
                    <RadioGroup defaultValue="60" onValueChange={(val) => setDuration(parseInt(val))} className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="30" id="t30" />
                            <Label htmlFor="t30">30s</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="60" id="t60" />
                            <Label htmlFor="t60">1 min</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="120" id="t120" />
                            <Label htmlFor="t120">2 min</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="300" id="t300" />
                            <Label htmlFor="t300">5 min</Label>
                        </div>
                    </RadioGroup>
                </div>
                {performanceHistory && performanceHistory.length > 0 && <PerformanceHistory history={performanceHistory} />}
            </div>
        )}

        {status === 'typing' && (
            <div className="space-y-4">
                 <div className="text-xl leading-relaxed tracking-wider p-4 rounded-md bg-muted select-none">
                    {text}
                </div>
                <Textarea
                    ref={inputRef}
                    value={userInput}
                    onChange={handleInputChange}
                    className="text-xl leading-relaxed tracking-wider"
                    rows={5}
                    placeholder="Start typing here..."
                    aria-label="Typing input"
                />
            </div>
        )}

        {status === 'finished' && (
            <div className="text-center p-8">
                <h2 className="text-2xl font-bold font-headline mb-4">Test Complete!</h2>
                <div className="flex justify-center gap-8 mb-8">
                     <div className="p-4 bg-secondary/50 rounded-lg">
                        <div className="flex items-center justify-center space-x-2">
                            <Zap className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">Speed (WPM)</span>
                        </div>
                        <p className="text-3xl font-bold mt-1">{wpm}</p>
                    </div>
                     <div className="p-4 bg-secondary/50 rounded-lg">
                        <div className="flex items-center justify-center space-x-2">
                            <Target className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">Accuracy</span>
                        </div>
                        <p className="text-3xl font-bold mt-1">{accuracy}%</p>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <Button onClick={startTest}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Restart
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Home
                        </Link>
                    </Button>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatCard({ icon: Icon, label, value, hidden = false }: { icon: React.ElementType, label: string, value: string | number, hidden?: boolean }) {
  if (hidden) return <div className="hidden md:block"></div>;
  return (
    <div className="p-4 bg-secondary/50 rounded-lg">
      <div className="flex items-center justify-center space-x-2">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  )
}
