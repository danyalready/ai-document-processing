import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({
    path: path.resolve(
        process.cwd(),
        process.env.NODE_ENV === "production"
            ? "apps/worker/.env.production.local"
            : ".env.development.local",
    ),
});
