import { IRCodeModel } from "./irCode";

//these are the basic steps for a store/campaign visit



export class StoreVisitModel {
    chainName: string;
    forDate: string;
    region: string;
    storeId: number;
    storeInstallDay: string;
    storeName: string;
    StoreVsistStarted: boolean;
    StoreVisitDate: Date;
    storeInstallations: CampaignVisit[];
  storeVisitCompleted: boolean;
  storeVisitOutOfSync: boolean;
  storeFilterText: string;
}

export class CampaignVisit {
  forDate: Date;
    CampaignNumber: string;
    campaignSpecialInstructionsRead: boolean;
    campaignPictureTaken: boolean;
  campaignIRCodeSelected: boolean;
    campaignFinished: boolean;
    categoryName: string;
    client: string;
    dayOfCommencementDate: string;
    dayOfTerminationDate: string;
  installationInstructions: string;
  installationScheduleCurrentID: string;
    jobNumber: string;
    mediaType: string;
    product: string;
    qtyToInstall: number;
    status: string;
    selectedIRCode: IRCodeModel;
  IRCodeComment: string = '';
  previousIRCode: IRCodeModel;
  previousIRCodeComment: string = '';
    ircodeDefaultComment: string = '';
    needsIrCodeComment: boolean;
    masterItem: any;
    masterItemGroups: any;
  masterItemWithBarcodes: masterItemWithBarcodes[];
  masterItemGroupWithBarcodes: masterItemGroupWithBarcodes[];
  forceCapexScan: boolean = false;
  baseImage: any;
  barcodesToRemove: barcodesWithId[];
  isMerchandisingContract: boolean = false;
  media: any;
  installationScheduleQuestionsAndAnswers: any[];
  hasAnswersChanged: boolean = false;
  amountOfPhotosTaken: number = 0;
  allMerchandisingQuestionsAnswered: boolean = false;
}
export class masterItemWithBarcodes {
    amountRequired: number;
    barcodes: barcodesWithId[];
    masterItemId: number;
    masterItemName: string;
    scannedBarcodes: barcodesWithId[] = new Array();
}

export class masterItemGroupWithBarcodes {
  amountRequired: number;
  barcodes: barcodesWithId[];
  masterItemGroupId: number;
  masterItemGroupName: string;
  scannedBarcodes: barcodesWithId[] = new Array();
}

export class barcodesWithId {
    id: number;
  barcode: string;
  installationTeamId: number;
  storeId: number;
  installationActionId: string;
}
