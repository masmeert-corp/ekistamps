import { S3Client } from "@aws-sdk/client-s3";
import { Config } from "@/config";

export const s3 = new S3Client({
	region: "us-east-1",
	endpoint: Config.S3_ENDPOINT,
	credentials: {
		accessKeyId: Config.S3_ACCESS_KEY,
		secretAccessKey: Config.S3_SECRET_KEY,
	},
	forcePathStyle: true, // Required for MinIO
});
