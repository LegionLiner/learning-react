import { useState } from "react";

export const useFetch = (callback) => {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const fetching = async () => {
        try {
            setIsPending(true);
            await callback();
        } catch (e) {
            setError(e.message);
        } finally {
            setIsPending(false);
        }
    }

    return [fetching, isPending, error];
}