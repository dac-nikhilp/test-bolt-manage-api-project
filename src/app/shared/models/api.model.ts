export type ApiVisibility = 'Internal' | 'External' | 'Public' | 'None';

export interface ApiVersion {
  id: string;
  versionNumber: string;
  releaseDate: Date;
  deprecated: boolean;
}

export interface ApiContract {
  id: string;
  fileName: string;
  uploadDate: Date;
  fileSize: number;
  contractType: string;
}

export interface Api {
  id: string;
  name: string;
  description: string;
  visibility: ApiVisibility;
  versions: ApiVersion[];
  contracts: ApiContract[];
  gatewayIds: string[];
  createdAt: Date;
  updatedAt: Date;
  rating?: number;
  bookmarked?: boolean;
}

export interface ApiFormData {
  name: string;
  description: string;
  visibility: ApiVisibility;
  contractSpecificationType: string;
  gatewayIds: string[];
}