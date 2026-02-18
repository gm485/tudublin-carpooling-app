import styles from "./page.module.css";
import { connectToDatabase } from "./lib/mongoose";
import Carpool from "../models/Carpool";
import CarpoolMap from "./components/CarpoolMap";

export default async function Home() {
  
  let dbStatus = "not connected"

  //connect to database
  try {
    await connectToDatabase();
    dbStatus = "connected"
  } catch (err) {
    dbStatus = "error connecting to database"
    console.error(err)
  }


   const carpools = await Carpool.find({}).lean()
   if (carpools.length === 0){
    await Carpool.create({
      origin: "Dublin",
      destination: "Galway",
      date: new Date(),
      seatsAvailable: 3,
    })
   }

  function renderCarpools() {
    return carpools.map((carpool) => (
      <div key={carpool._id} className={styles.carpoolCard}>
        <h3>
          {carpool.origin} to {carpool.destination}
        </h3>
        <p>Date: {new Date(carpool.date).toLocaleDateString()}</p>
        <p>Seats Available: {carpool.seatsAvailable}</p>

        <CarpoolMap
          lat={carpool.originLat ?? 53.3498}
          lng={carpool.originLng ?? -6.2603}/>
      </div>
    ));
  }

  return (

    <main className={styles.main}>
      <h1>Welcome to the Carpool App</h1>
      <h2>mongodb test:</h2>
      <p>{dbStatus}</p>

      <section className={styles.carpoolList}>
        <h2>Available Carpools:</h2>
        {renderCarpools()}

      </section>
      </main>
  );
}
