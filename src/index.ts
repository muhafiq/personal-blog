import app from "./config/app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App Start in port ${PORT}`));
