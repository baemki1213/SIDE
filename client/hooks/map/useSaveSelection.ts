import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { PlaceInfo } from "@/types/map";
import { saveSelection } from "@/api/map";

interface Props {
  userId: number;
  place: PlaceInfo;
  onSuccess: () => void;
  onError: (error: Error) => void;
}

const useSaveSelection = (
  { userId, place }: Props,
  onSuccess?: () => void,
  onError?: (error: Error) => void
): UseMutationResult<any, Error, { userId: number; place: PlaceInfo }> => {
  return useMutation<any, Error, { userId: number; place: PlaceInfo }>({
    mutationFn: () => saveSelection({ userId, place }),
    onSuccess,
    onError,
  });
};

export default useSaveSelection;
