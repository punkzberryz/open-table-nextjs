import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";

export default function useReservasion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReservasion = async ({
    slug,
    partySize,
    day,
    time,
    bookerFirstName,
    bookerLastName,
    bookerPhone,
    bookerEmail,
    bookerOccasion,
    bookerRequest,
    setDidBook,
  }: {
    slug: string;
    partySize: string;
    day: string;
    time: string;
    bookerFirstName: string;
    bookerLastName: string;
    bookerPhone: string;
    bookerEmail: string;
    bookerOccasion: string;
    bookerRequest: string;
    setDidBook: Dispatch<SetStateAction<boolean>>;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerFirstName,
          bookerLastName,
          bookerPhone,
          bookerEmail,
          bookerOccasion,
          bookerRequest,
        },
        {
          params: { day, time, partySize },
        }
      );

      console.log(response);
      setLoading(false);
      setDidBook(true);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };

  return { loading, error, createReservasion };
  // http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-05-23&time=14:30:00.000Z&partySize=2
}
