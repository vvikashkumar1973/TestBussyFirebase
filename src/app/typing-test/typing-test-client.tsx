'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Timer, Zap, Target, RefreshCw } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"


const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet. Typing it is a good way to practice.",
  "In the heart of India, vibrant festivals paint the streets with color and joy. Each celebration, from Diwali to Holi, tells a story of culture and tradition.",
  "Success in competitive exams requires dedication, strategic preparation, and consistent practice. Analyze your mistakes and learn from them.",
  "The digital age has transformed how we learn and work. Online platforms offer accessible education and skill development opportunities for everyone.",
  "Maintaining a healthy work-life balance is crucial for long-term well-being. Remember to take breaks, pursue hobbies, and spend time with loved ones."
];

export function TypingTestClient() {
  const [duration, setDuration] = useState(60);
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const endTest = useCallback(() => {
    if (timerId.current) clearInterval(timerId.current);
    setIsTyping(false);
    calculateMetrics(true);
  }, [timerId, duration, userInput, text]);


  const startTest = () => {
    resetTest(false);
    const newText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(newText);
    setIsTyping(true);
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
  
  const resetTest = (clearText = true) => {
    if (timerId.current) clearInterval(timerId.current);
    setIsTyping(false);
    setTimeLeft(duration);
    setUserInput('');
    if (clearText) setText('');
    setWpm(0);
    setAccuracy(100);
  };

  useEffect(() => {
    return () => {
      if (timerId.current) clearInterval(timerId.current);
    };
  }, []);
  
  useEffect(() => {
    if(!isTyping) {
        setTimeLeft(duration);
    }
  }, [duration, isTyping]);
  
  const calculateMetrics = (isFinished = false) => {
    const typedChars = userInput.length;
    if (typedChars === 0) {
      setWpm(0);
      setAccuracy(100);
      return;
    }

    const timeElapsed = isFinished ? duration : duration - timeLeft;
    const wordsTyped = (typedChars / 5);
    const currentWpm = timeElapsed > 0 ? (wordsTyped / timeElapsed) * 60 : 0;
    setWpm(Math.round(currentWpm));
    
    let correctChars = 0;
    userInput.split('').forEach((char, index) => {
        if(text[index] === char) {
            correctChars++;
        }
    });
    setAccuracy(Math.round((correctChars / typedChars) * 100));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTyping) return;
    const newTypedText = e.target.value;
    
    if (newTypedText.length >= text.length) {
      setUserInput(text);
      endTest();
    } else {
      setUserInput(newTypedText);
    }
  };
  
  useEffect(() => {
    if (isTyping) {
      calculateMetrics();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput, isTyping, timeLeft]);


  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
            <StatCard icon={Timer} label="Time Left" value={`${timeLeft}s`} />
            <StatCard icon={Zap} label="Speed (WPM)" value={wpm} />
            <StatCard icon={Target} label="Accuracy" value={`${accuracy}%`} />
             <div className="flex items-center justify-center">
                <Button onClick={isTyping ? () => resetTest(true) : startTest} className="w-full md:w-auto" variant={isTyping ? "destructive" : "default"}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    {isTyping ? 'Reset' : text ? 'Restart' : 'Start'}
                </Button>
            </div>
        </div>
        
        {(!isTyping && !text) && (
             <div className="flex flex-col items-center justify-center p-8 space-y-4">
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
        )}

        {text && (
            <div className="relative">
                <div
                    className={cn(
                        "text-2xl leading-relaxed tracking-wider p-4 rounded-md bg-muted select-none",
                         !isTyping && text.length > 0 && "opacity-50"
                    )}
                >
                    {text.split('').map((char, index) => (
                    <span key={index} className={cn({
                        'text-green-500': index < userInput.length && char === userInput[index],
                        'text-red-500 bg-red-500/10': index < userInput.length && char !== userInput[index],
                        'text-muted-foreground': index >= userInput.length
                    })}>
                        {char}
                    </span>
                    ))}
                </div>
                <textarea
                    ref={inputRef}
                    value={userInput}
                    onChange={handleInputChange}
                    className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-primary resize-none border-none focus:outline-none text-2xl leading-relaxed tracking-wider"
                    disabled={!isTyping}
                    aria-label="Typing input"
                />
            </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) {
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
