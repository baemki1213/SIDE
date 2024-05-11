export interface Area {
  name: string;
  coords: {
    center: {
      crs: string;
      x: number;
      y: number;
    };
  };
}

export interface Region {
  area0: Area;
  area1: Area;
  area2: Area;
  area3: Area;
  area4: Area;
}

export interface Result {
  name: string;
  code: {
    id: string;
    type: string;
    mappingId: string;
  };
  region: Region;
}

export interface Data {
  status: {
    code: number;
    name: string;
    message: string;
  };
  results: Result[];
}
