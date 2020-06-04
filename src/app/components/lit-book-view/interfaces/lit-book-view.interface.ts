
export interface ILitBookView {
      bookId: number;    // System.Int32
      bookTitle: string | null;    // System.String
      publicationDate: number;    // System.DateTime
      price: number;    // System.Double
      publisherIdRef: number;    // System.Int32
      manuscriptIdRef: number;    // System.Int32
      editionIdRef: number | null;    // System.Int32 ?
      pPublisherName: string | null;    // System.String
      pCCountryName: string | null;    // System.String
      mManuscriptTitle: string | null;    // System.String
      mCompletionDate: number;    // System.DateTime
      mAFirstName: string | null;    // System.String
      mALastName: string | null;    // System.String
      mABirthDate: number | null;    // System.DateTime ?
      mACCountryName: string | null;    // System.String
      mGGenreName: string | null;    // System.String
      mDDialectName: string | null;    // System.String
      mDCCountryName: string | null;    // System.String
      eEditionName: string | null;    // System.String
}


