import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!currency) return; // avoid invalid requests

    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
      .then((res) => res.json())
      .then((res) => {
        if (res[currency]) {
          setData(res[currency]);
        } else {
          setData({}); // fallback instead of undefined
        }
      })
      .catch(() => setData({})); // in case of error
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
