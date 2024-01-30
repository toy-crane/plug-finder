"use client";
import Image, { ImageProps } from "next/image";

const SupabaseImage = (props: ImageProps) => {
  return (
    <Image
      {...props}
      alt={props.alt}
      loader={({
        src,
        width,
        quality,
      }: {
        src: string;
        width: number;
        quality?: number;
      }) => {
        return `${
          process.env.NEXT_PUBLIC_SUPABASE_URL
        }/storage/v1/render/image/public/${src}?width=${width}&quality=${
          quality || 75
        }&resize=contain`;
      }}
    />
  );
};

export default SupabaseImage;
