import { useEffect, useState } from "react";
import axios from "axios";

export default function FreeComponent() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const configuration = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}free-endpoint`,
    };

    axios(configuration)
      .then((result) => {
        setMessage(result.data.message);
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-center">Free Component</h1>

      <h3 className="text-center text-danger">{message}</h3>
    </div>
  );
}
