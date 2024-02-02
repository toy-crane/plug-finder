"use client";
import Image, { ImageProps } from "next/image";

const SupabaseImage = (props: ImageProps) => {
  const params = new URLSearchParams();
  if (props.width) params.set("width", props.width.toString());
  if (props.quality) params.set("quality", props.quality.toString());

  return (
    <Image
      {...props}
      alt={props.alt}
      loader={({ src }: { src: string }) => {
        return `${
          process.env.NEXT_PUBLIC_SUPABASE_URL
        }/storage/v1/render/image/public/${src}?${params.toString()}`;
      }}
    />
  );
};

export default SupabaseImage;
