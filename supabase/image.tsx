"use client";
import Image, { ImageProps } from "next/image";

const SupabaseImage = (props: ImageProps) => {
  return (
    <Image
      {...props}
      alt={props.alt}
      loader={({ src }: { src: string }) => {
        return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/render/image/public/${src}`;
      }}
    />
  );
};

export default SupabaseImage;
