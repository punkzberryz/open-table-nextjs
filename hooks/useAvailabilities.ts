import { useState } from "react";
import axios from "axios";

export default function useAvailabilities() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<
    { time: string; available: boolean }[] | null
  >(null);

  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time,
  }: {
    slug: string;
    partySize: string;
    day: string;
    time: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/restaurant/${slug}/availability`,
        {
          params: { day, time, partySize },
        }
      );

      console.log(response);
      setLoading(false);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };
  console.log(data);
  return { data, loading, error, fetchAvailabilities };
  // http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-05-23&time=14:30:00.000Z&partySize=2
}
