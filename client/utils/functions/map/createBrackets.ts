import { PlaceInfo } from "@/types/map";

const shuffle = (array: PlaceInfo[]) => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const groupByTwo = (array: any[]) => {
  return array.reduce((acc, curr, index) => {
    if (index % 2 === 0) {
      acc.push([curr]);
    } else {
      acc[acc.length - 1].push(curr);
    }
    return acc;
  }, []);
};

const createBrackets = (places: PlaceInfo[]) => {
  let shuffledPlaces = shuffle([...places]);
  const initialGroupedPlaces = groupByTwo(shuffledPlaces);

  return initialGroupedPlaces;
};

export default createBrackets;
