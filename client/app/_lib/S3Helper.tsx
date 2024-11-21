import config from "../_lib/config";
import { CookingClass } from "../_types/cooking-class";

export async function addPreSignedUrlToArray<T extends CookingClass>(array: T[], bucket: string) {
    const s3Objects: T[] = await Promise.all(
        array.map(async (item) => {
            const photo = item.PHOTO;
            const response = await fetch(`${config.serverEndpoint}s3/${bucket}/${photo}`);
            const preSignedUrl = await response.json();
            return { ...item, PRE_SIGNED_URL: preSignedUrl}
        })
    )

    return s3Objects;
}   

export async function addPreSignedUrlToString(bucket: string, object: string){
    const response = await fetch(`${config.serverEndpoint}s3/${bucket}/${object}`);
    const preSignedUrl = await response.json();
    return preSignedUrl
}