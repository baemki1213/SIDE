import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { PlaceInfo } from "@/types/map";
import { saveSelection } from "@/api/map";

interface SaveSelectionParams {
  userId: number;
  place: PlaceInfo;
}

interface UseSaveSelectionProps {
  token: string;
  dispatch: any;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const useSaveSelection = ({
  token,
  dispatch,
  onSuccess,
  onError,
}: UseSaveSelectionProps): UseMutationResult<
  any,
  Error,
  SaveSelectionParams
> => {
  return useMutation<any, Error, SaveSelectionParams>({
    mutationFn: ({ userId, place }) =>
      saveSelection({ userId, place }, token, dispatch),
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      if (onError) onError(error);
    },
  });
};

export default useSaveSelection;
