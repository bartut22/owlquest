import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";

export function useReferralsDone() {
  const [referralsDone, setReferralsDone] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchReferralsDone = useCallback(async () => {
    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes?.user;
    if (user?.id) {
      setUserId(user.id);
    } else {
      setReferralsDone(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.rpc("get_my_referral_count");
    if (error) setError(error.message);
    else setReferralsDone(data);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchReferralsDone();
  }, [fetchReferralsDone]);

  return { referralsDone, loading, error, refetch: fetchReferralsDone };
}
