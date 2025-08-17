import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { PlaceInfo } from "@/types/map";
import { saveSelection } from "@/api/map";

interface SaveSelectionParams {
  userId: number;
  place: PlaceInfo;
}

interface UseSaveSelectionProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const useSaveSelection = ({
  onSuccess,
  onError,
}: UseSaveSelectionProps): UseMutationResult<
  any,
  Error,
  SaveSelectionParams
> => {
  return useMutation<any, Error, SaveSelectionParams>({
    mutationFn: ({ userId, place }) => saveSelection({ userId, place }),
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      if (onError) onError(error);
    },
  });
};

export default useSaveSelection;
