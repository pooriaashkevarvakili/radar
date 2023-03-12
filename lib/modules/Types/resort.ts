export interface Resort {
    Id: number;
    CityName: string;
    ProvinceName: string;
    NameFa: string;
    NameEn?: null;
    Capacity: number;
    ExraCapacity: number;
    CommentsCount: number;
    AverageRate?: null;
    Type: Type;
    ResidenceImage: ResidenceImage;
    Seller: Seller;
    Detail? : Detail,
    Amenities: (string)[] | null
  }
  export interface Type {
    Name: string;
    Stars?: null;
    FullName: string;
  }
  export interface ResidenceImage {
    Id: number;
    Caption?: null;
    URL: string;
  }
  export interface Seller {
    Logo: string;
    Name: string;
    URL: string;
    TotalPrice: number;
  }
  
  export interface Meta {
    Id: number;
    NameFa: string;
    NameEn?: null;
    URL?: null;
    Phone?: null;
    CommentsCount: number;
    AverageRate?: null;
    Amenities?: (string)[] | null;
    Categories?: (null)[] | null;
  }
  
  export interface Image {
    Id: number;
    Caption?: null;
    URL: string;
  }

  export interface Comments {
    Id: number;
    caption?: null;
  }
  
  export interface Detail {
    Meta: Meta,
    Images: Image[],
    Comments: Comments[]
  }

  export interface Score {
    label: string,
    name: string,
    min: number,
    max: number
  }

  export interface singleResort extends Detail {
    Price: Seller
  }
  
  export interface Amenities {
    Count: number,
    MinPrice: number,
    Name: string
  }

  export interface ResortType {
    Count: number,
    MinPrice: number,
    Name: string
  }

  export interface CityMeta {
    Amenities: Amenities[],
    Types: Type[],
    MaxPrice: number,
    MinPrice: number
  }

  export interface pricePerDate {
    Date: string,
    Price: number
  }