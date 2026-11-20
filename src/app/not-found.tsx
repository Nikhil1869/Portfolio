export default function NotFound() {
  return (
    <main
      className="section"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <span className="eyebrow">404 / OFF THE CIRCUIT</span>
      <h1
        style={{
          fontFamily: "var(--display)",
          fontSize: "clamp(50px, 8vw, 100px)",
          margin: "20px 0",
        }}
      >
        LET’S GET BACK ON TRACK.
      </h1>
      <p>This page isn’t part of the paddock.</p>
      <a href="/" className="button button-primary">
        Return to the starting grid
      </a>
    </main>
  );
}
