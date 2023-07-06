import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AddBooking from "../components/AddBooking";
import BookingCard from "../components/BookingCard";

//const API_URL = "http://localhost:5005";

function BabysitterDetailsPage(props) {
  const [babysitterService, setBabysitterService] = useState(null);
  const { babysitterServicessId } = useParams();

  const getBabysitterService = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/babysitterServices/${babysitterServiceId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )

      .then((response) => {
        const oneBabysitterService = response.data;
        setBabysitterService(oneBabysitterService);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getBabysitterService();
  });
  console.log(babysitterService);
  return (
    <div className="BabysitterDetails">
      <h1>"Babysitter Details"</h1>
      {babysitterService && (
        <>
          <h1>{babysitterService.babysitterName}</h1>
          <p>{babysitterService.aboutMe}</p>
          <h4>{babysitterService.languages}</h4>
          <h4>{babysitterService.yearsOfExperience}</h4>
          <h4>{babysitterService.provideServiceFor}</h4>
          <h4>{babysitterService.pricePerHour}</h4>
          <h4>{babysitterService.supportServices}</h4>
        </>
      )}

      <AddBooking
        refreshBabysitterService={getBabysitterService}
        babysitterServiceId={babysitterServiceId}
      />

      {babysitterService &&
        babysitterService.bookings.map((booking) => (
          <BookingCard key={booking._id} {...booking} />
        ))}

      <Link to="/babysitterServices">
        <button>Back to Babysitters</button>
      </Link>

      <Link to={`/babysitterServices/edit/${babysitterServiceId}`}>
        <button>Edit Babysitter</button>
      </Link>
    </div>
  );
}

export default BabysitterDetailsPage;
