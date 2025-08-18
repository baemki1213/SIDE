import Gap from "@/components/common/Gap";
import Text from "@/components/common/Text";

import { PlaceInfo } from "@/types/map";
import { getLastCategory } from "@/utils/string";

interface Props {
  place: PlaceInfo;
}

const PlaceInfoContent = ({ place }: Props) => {
  return (
    <>
      <Text>미리보기</Text>
      <Gap side={5} />
      <div className="w-full h-[300px] border border-gray-disabled cursor-pointer">
        <iframe
          src={place.place_url}
          allowFullScreen
          className="w-full h-full rounded-[10px] cursor-pointer"
        />
      </div>
      <Gap side={5} />
      <Text className="font-bold text-black-47 truncate">
        {place.place_name}
      </Text>
      <Gap side={5} />
      <Text className="text-xs font-normal text-black-47 truncate">
        {getLastCategory(place.category_name)}
      </Text>
      <Gap side={5} />
      <Text className="text-xs font-normal text-gray-130 truncate">
        {place.road_address_name}
      </Text>
      <Text className="text-xs text-gray-130 truncate">
        {place.phone || "-"}
      </Text>
      <Gap side={5} />
      {place.place_url && (
        <a
          href={place.place_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-point font-bold text-xs no-underline hover:underline"
        >
          <Text className="text-point font-bold text-xs truncate">
            카카오 맵에서 자세히 보기
          </Text>
        </a>
      )}
    </>
  );
};

export default PlaceInfoContent;
