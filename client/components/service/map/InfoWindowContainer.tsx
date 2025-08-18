import { FC, MouseEvent } from "react";

import Gap from "@/components/common/Gap";
import StyledButton from "@/components/common/StyledButton";
import Text from "@/components/common/Text";

import { PlaceInfo } from "@/types/map";
import { getLastCategory } from "@/utils/string";

interface InfoWindowContentProps {
  place: PlaceInfo;
  handleSelectClick: (e: MouseEvent, place: PlaceInfo) => void;
  closeInfoWindow: () => void;
}

const InfoWindowContent: FC<InfoWindowContentProps> = ({
  place,
  handleSelectClick,
  closeInfoWindow,
}) => {
  const { place_name, road_address_name, category_name, phone, place_url } =
    place;
  const categoryName = getLastCategory(category_name);

  return (
    <div
      className="p-[10px] w-[200px] flex flex-col items-center rounded-[10px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
      onClick={closeInfoWindow}
    >
      <Text className="text-black-47 text-base font-bold">{place_name}</Text>
      <Gap side={5} />
      <Text className="text-black-47 text-xs font-regular">{categoryName}</Text>
      <Gap side={5} />
      <Text className="text-gray-130 text-xs font-regular">
        {road_address_name}
      </Text>
      <Text className="text-gray-130 text-xs font-regular">{phone}</Text>
      <Gap side={5} />
      {place_url && (
        <a
          href={place_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-point text-xxs font-bold hover:underline"
        >
          <Text>카카오 맵에서 자세히 보기</Text>
        </a>
      )}
      <Gap side={5} />
      <StyledButton
        buttonType="primary"
        text="저장하기"
        size="xSmall"
        onClick={(e) => {
          handleSelectClick(e, place);
          closeInfoWindow();
        }}
      />
    </div>
  );
};

export default InfoWindowContent;
