import app from "./routes/app";
import {connect} from "./config/mongo-config";

const port = process.env.PORT || 3001;

void (async () => {
  try {
    await connect();
  } catch (e) {
    console.error(`startupError(): ${e.message}`);
  }
})()

app.listen(port, () => {
  return console.log(`Express is listening on port: ${port}`);
});

