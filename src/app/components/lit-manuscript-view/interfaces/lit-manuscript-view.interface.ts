
export interface ILitManuscriptView {
      manuscriptId: number;    // System.Int32
      manuscriptTitle: string | null;    // System.String
      completionDate: number;    // System.DateTime
      beginningDate: number | null;    // System.DateTime ?
      authorIdRef: number;    // System.Int32
      genreIdRef: number;    // System.Int32
      dialectIdRef: string | null;    // System.String
      aFirstName: string | null;    // System.String
      aLastName: string | null;    // System.String
      aBirthDate: number | null;    // System.DateTime ?
      aCCountryName: string | null;    // System.String
      gGenreName: string | null;    // System.String
      dDialectName: string | null;    // System.String
      dCCountryName: string | null;    // System.String
}


