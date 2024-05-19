import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { PlaceInfo } from "@/types/map";
import { saveSelection } from "@/api/map";

interface Props {
  userId: number;
  place: PlaceInfo;
  token: string;
  dispatch: any;
}

const useSaveSelection = (
  { userId, place, token, dispatch }: Props,
  onSuccess?: () => void,
  onError?: (error: Error) => void
): UseMutationResult<any, Error, { userId: number; place: PlaceInfo }> => {
  return useMutation<any, Error, { userId: number; place: PlaceInfo }>({
    mutationFn: () => saveSelection({ userId, place }, token, dispatch),
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      if (onError) onError(error);
    },
  });
};

export default useSaveSelection;
