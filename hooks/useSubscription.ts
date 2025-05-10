import { useEffect, useState } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete' | null;

interface Subscription {
  id: string;
  status: SubscriptionStatus;
  current_period_end: string;
  plan_id: string;
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    async function getSubscription() {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user?.id || '')
          .single();

        if (error) throw error;
        setSubscription(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch subscription'));
      } finally {
        setLoading(false);
      }
    }

    getSubscription();
  }, [user, supabase]);

  const isActive = subscription?.status === 'active';
  const isTrialing = subscription?.status === 'trialing';
  const hasAccess = isActive || isTrialing;

  return {
    subscription,
    loading,
    error,
    isActive,
    isTrialing,
    hasAccess,
  };
} 