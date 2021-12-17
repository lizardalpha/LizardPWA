export class InventoryItemModel {
    irCodeID: string;
    barcode: string;
    code: string;
    description: string;
    qtyOnHand: number;
    location: location;
    locationType: locationType;
    locationCategory: string;
    batch: string;
    serialNumber: string;
    expiryDate: Date;
    dormant: boolean;
    createdBy: string;
    creationDate: string;
    itemType: MasterItemType;
   
}

export class locationType {
    locationTypeId: number;
    locationTypeName: string;
    locationTypeDescription: string;
    createdBy: string;
    creationDate: Date;
    dormant: boolean;
}
export class locationCategory {
    chainName: string;
    gategoryDescription: string;
    createdBy: string;
    creationDate: Date;
    dormant: boolean;
}


export class location {
    locationName: string;
    locationDescription: string;
    locationBarcode: string;
    locationCategory: locationCategory;
    locationType: locationType;
    createdBy: string;
    creationDate: Date;
    dormant: boolean;
}

export class MasterItemType {
    masterItemTypeId: number;
    masterItemTypeName: string;
    masterItemTypeDescription: string;
    dormant: boolean;
    createdBy: string;
    creationDate: Date;
}
