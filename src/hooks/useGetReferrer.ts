import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";

export function useGetReferrer() {
  const [referrer, setReferrer] = useState<{ id: string, handle: string, display_name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchReferrer = useCallback(async () => {
    const { data: userRes } = await supabase.auth.getUser();
    const user = userRes?.user;
    if (user?.id) {
      setUserId(user.id);
    } else {
      setReferrer(null);
      setLoading(false);
      return;
    }
    console.log(userId);
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.rpc("get_my_referrer");
    if (error) setError(error.message);
    else {
      setReferrer(data?.[0]);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchReferrer();
  }, [fetchReferrer]);

  return { referrer, loading, error, refetch: fetchReferrer };
}
