import SupabaseImage from "@/supabase/image";

const CarCard = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className="items-center justify-center bg-white rounded-2xl py-6 shadow-sm px-1">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full relative h-36 md:h-56">
          <SupabaseImage
            src={`cars/${imageUrl}`}
            alt="car Image"
            fill
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CarCard;
