'use client';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth'; // Correct imports
import { useAuth } from '@/firebase/provider'; // Use useAuth from the provider

// Define the shape of the hook's return value
export interface UserAuthHookResult {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null; // Keep it as Error for general cases
}

/**
 * A custom hook that subscribes to the Firebase auth state.
 *
 * @returns {UserAuthHookResult} An object containing the user, loading state, and error.
 */
export const useUser = (): UserAuthHookResult => {
  const auth = useAuth(); // Get the auth instance from context

  const [state, setState] = useState<UserAuthHookResult>({
    user: auth.currentUser, // Initialize with the current user if available
    isUserLoading: true, // Assume loading until the first auth check completes
    userError: null,
  });

  useEffect(() => {
    // If there's no auth instance, we can't determine the user.
    if (!auth) {
      setState({ user: null, isUserLoading: false, userError: new Error("Firebase Auth instance not found.") });
      return;
    }

    // Set initial loading state
    setState({ user: null, isUserLoading: true, userError: null });

    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        // When the auth state is determined, update the state
        setState({ user: firebaseUser, isUserLoading: false, userError: null });
      },
      (error) => {
        // If an error occurs during subscription, update the state
        console.error("useUser hook: onAuthStateChanged error:", error);
        setState({ user: null, isUserLoading: false, userError: error });
      }
    );

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [auth]); // Re-run the effect if the auth instance changes

  return state;
};
