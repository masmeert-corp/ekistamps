import "server-only";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { Config } from "@/config";
import { s3 } from "./client";

export async function getUploadUrl(key: string, contentType: string) {
	const command = new PutObjectCommand({
		Bucket: Config.S3_BUCKET_NAME,
		Key: key,
		ContentType: contentType,
	});
	return getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // 5 min
}

export function getPublicUrl(key: string) {
	return `${Config.S3_PUBLIC_URL}/${key}`;
}
