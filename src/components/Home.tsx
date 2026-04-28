import backgroundImage from "../assets/home.png";
export const Home = () => {
  return (
    <div style={{ width: "100%"}}>
      <div
        style={{
          width: "100%",
          height: "68vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
};
