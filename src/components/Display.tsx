import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Display = () => {
  const userQuery = useQuery({
    queryKey: ["allListings"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3333/listing");
      console.log(response.data);
      return response.data;
    },
  });
  return <div>Display</div>;
};

export default Display;
